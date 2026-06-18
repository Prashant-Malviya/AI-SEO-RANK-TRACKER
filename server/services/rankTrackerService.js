import { chromium } from "playwright-core";
import Browserbase from "@browserbasehq/sdk";

//search google for a keyword and extract ranking results for a target domain

export async function rankTracker(keyword, targetDomain) {
  let browser;

  try {
    if (!process.env.BROWSERBASE_API_KEY) {
      return {
        success: false,
        error: "Browserbase API key is not configured",
      };
    }

    const bb = new Browserbase({
      apiKey: process.env.BROWSERBASE_API_KEY,
    });

    //1. Initialize browserbase session & connect playwright

    const session = await bb.sessions.create({
      browserSettings: { blockAds: true },
    });

    browser = await chromium.connectOverCDP(session.connectUrl);

    const context = browser.contexts()[0];
    const page = context.pages()[0] || await context.newPage();

    page.setDefaultNavigationTimeout(45000);

    //2. Initial google visit & consent handling

    await page.goto("https://www.google.com", { waitUntil: "domcontentloaded" });

    try {
      const btn = await page.$(
        'button[id="L2AGLb"], form[action*="consent"] button',
      );

      if (btn) {
        await btn.click();
        await page.waitForTimeout(1500);
      }
    } catch {}

    let found = null;
    const allResults = [];

    const cleanTarget = targetDomain.replace("www.", "").toLowerCase();

    // 3. Search loop: iterate through up to 5 pages of google results

    for (let gPage = 0; gPage < 5; gPage++) {
      await page.goto(
        `https://www.google.com/search?q=${encodeURIComponent(keyword)}&start=${gPage * 10}&num=10&hl=en&gl=us`,
        { waitUntil: "domcontentloaded" },
      );

      //4. page extraction: retry up to 3 times if results are missing

      let pageResults = [];

      for (let retry = 0; retry < 3; retry++) {
        try {
          await page.waitForSelector("h3", { timeout: 8000 });
          await page.waitForTimeout(1500);
          pageResults = await page.evaluate(() =>
            Array.from(document.querySelectorAll("h3"))
              .map((h3) => {
                let a = h3.closest("a");
                if (!a) {
                  let p = h3.parentElement;
                  for (let j = 0; j < 5 && p; j++, p = p.parentElement) {
                    if (p.tagName === "A") {
                      a = p;
                      break;
                    }
                    const sub = p.querySelector("a[href]");
                    if (sub && sub.contains(h3)) {
                      a = sub;
                      break;
                    }
                  }
                }
                if (
                  !a ||
                  !a.href.startsWith("http") ||
                  a.href.includes("google.")
                )
                  return null;

                let s = "",
                  c = a.parentElement;
                for (let j = 0; j < 6 && c; j++, c = c.parentElement) {
                  const txt = c.innerText || "";
                  if (txt.length > h3.innerText.length + 50) {
                    s = (
                      txt
                        .split("\n")
                        .find(
                          (l) =>
                            l.length > 30 &&
                            !l.includes(h3.innerText.substring(0, 20)),
                        ) || ""
                    )
                      .trim()
                      .substring(0, 300);
                    if (s) break;
                  }
                }
                return {
                  url: a.href,
                  domain: new URL(a.href).hostname.replace("www.", ""),
                  title: h3.innerText.trim(),
                  snippet: s,
                };
              })
              .filter(Boolean),
          );

          if (pageResults.length > 0) break;

          await page.reload({ waitUntil: "networkidle" });
        } catch (error) {
          if (retry === 2) break;
          await page.reload({ waitUntil: "networkidle" });
        }
        if (!pageResults.length) break;
      }

      pageResults.forEach((result, index) => {
        const position = gPage * 10 + index + 1;
        const entry = {
          ...result,
          position,
          page: gPage + 1,
        };

        allResults.push(entry);

        if (!found && result.domain.replace("www.", "").toLowerCase() === cleanTarget) {
          found = entry;
        }
      });

      if (found) break;
    }

    const competitors = allResults
      .filter((result) => result.domain.replace("www.", "").toLowerCase() !== cleanTarget)
      .slice(0, 10);

    return {
      success: true,
      data: {
        position: found?.position || null,
        page: found?.page || null,
        title: found?.title || "",
        snippet: found?.snippet || "",
        competitors,
        totalResultsScanned: allResults.length,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
}
