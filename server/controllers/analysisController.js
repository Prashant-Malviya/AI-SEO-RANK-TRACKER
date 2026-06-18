import Analysis from "../models/Analysis.js";
import { analyzeSeoData } from "../services/geminiService.js";
import { scraperUrl } from "../services/scraperService.js";

//analyse url
export const analyzeUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res
        .status(400)
        .json({ success: false, message: "Url is required" });
    }

    //validate url format

    let validUrl;

    try {
      validUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid URL format" });
    }

    //create analysis record with pending status

    const analysis = await Analysis.create({
      userId: req.userId,
      url: validUrl.href,
      status: "processing",
    });

    res.status(202).json({
      success: true,
      message: "Analysis started",
      analysisId: analysis._id,
    });

    //run scraping and analysis in background

    try {
      // stpe1 : scrape the url with browserbase

      const scrapeResult = await scraperUrl(validUrl.href);

      if (!scrapeResult.success) {
        analysis.status = "failed";
        await analysis.save();
        return;
      }

      //step2 : Analyse with gemini ai

      const aiResult = await analyzeSeoData(scrapeResult.data);

      if (!aiResult.success) {
        analysis.status = "failed";
        await analysis.save();
        return;
      }

      //step3: save results

      analysis.overallScore = aiResult.data.overallScore || 0;
      analysis.categories = aiResult.data.categories || {};
      analysis.metaData = scrapeResult.data.metaData || {};
      analysis.headings = scrapeResult.data.headings || {};
      analysis.links = scrapeResult.data.links || {};
      analysis.images = scrapeResult.data.images || {};
      analysis.keywords = aiResult.data.keywords || [];
      analysis.issues = aiResult.data.issues || [];
      analysis.loadTime = scrapeResult.data.loadTime || 0;
      analysis.pageSize = scrapeResult.data.pageSize || 0;
      analysis.wordCount = scrapeResult.data.wordCount || 0;
      analysis.status = "completed";

      await analysis.save();
    } catch (bgError) {
      console.error("background analysis error: ", bgError.message);

      try {
        analysis.status = "failed";
        await analysis.save();
      } catch (saveError) {
        console.error("Failed to save fialed status: ", saveError.message);
      }
    }
  } catch (error) {
    console.error("analyse url error: ", error.message);

    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "server error" });
    }
  }
};

//get analysis by id
export const getAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!analysis)
      return res
        .status(404)
        .json({ success: false, message: "Analysis not found" });

    res.json({ success: true, analysis });
  } catch (error) {
    console.error("get analysis error: ", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//get all analysis for user

export const getAllAnalysis = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);

    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);

    const skip = (page - 1) * limit;

    const analyses = await Analysis.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-issues -keywords");

    const total = await Analysis.countDocuments({ userId: req.userId });

    res.json({
      success: true,
      analyses,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("get analyses error: ", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//delete analysis
export const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!analysis)
      return res
        .status(404)
        .json({ success: false, message: "Analysis not found" });

    res.json({ success: true, message: "analysis deleted" });
  } catch (error) {
    console.error("delete analysis error: ", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};
