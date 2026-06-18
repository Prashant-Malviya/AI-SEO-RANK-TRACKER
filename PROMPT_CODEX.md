# AI SEO Rank Tracker – Complete Architecture Review, Bug Fixing & Production Hardening

You are a **Senior Software Engineer** with deep expertise in:

* MERN Stack
* React + Vite
* Node.js
* Express
* MongoDB + Mongoose
* REST APIs
* JWT Authentication
* Browser Automation (Playwright + Browserbase)
* Google Gemini AI
* Web Scraping
* SEO Analysis
* Clean Architecture
* Production-level Software Engineering

Your responsibility is to behave like a senior engineer joining an existing production project.

Do **NOT** immediately start editing files.

Your first responsibility is to completely understand the project.

---

# Project Objective

This project is an **AI SEO Rank Tracker** that demonstrates modern Full Stack Development along with AI integration.

It has been built primarily as a portfolio project to help secure software engineering interviews.

The project should look like something built by a professional engineering team.

The final codebase should impress recruiters through:

* Clean Architecture
* Proper Folder Structure
* Maintainable Code
* Professional Documentation
* Robust APIs
* AI Integration
* Production Best Practices
* Good Error Handling
* High Code Quality

Treat every change as if senior engineers will review it during a hiring process.

---

# Current Working Branch

Work ONLY on the **bugfixes** branch.

Do not modify other branches.

Keep commits logically grouped by concern.

Do not rewrite working code unnecessarily.

---

# High-Level Architecture

The project is organized into three major backend modules.

Understand each module completely before making any changes.

---

## Module 1 — User Authentication

Flow:

User

↓

Express Server

↓

JWT Authentication

↓

Auth Controller

↓

User Model

↓

MongoDB

Responsibilities include:

* User Registration
* User Login
* JWT Generation
* Authentication
* User Role Retrieval

Review the complete authentication flow.

Verify:

* JWT generation
* password hashing
* middleware
* protected routes
* token validation
* response consistency
* security best practices

---

## Module 2 — Rank Tracker

Flow:

User

↓

Authentication Middleware

↓

Rank Controller

↓

Keyword Tracking Model

↓

MongoDB

*

Keyword Tracking Services

Responsibilities:

* Add Keyword
* Get All Keywords
* Get Keyword By ID
* Refresh Keyword
* Delete Keyword
* Toggle Tracking (Cron Jobs)

Inspect:

* controller logic
* services
* scheduled jobs
* keyword refresh logic
* database updates
* API responses
* frontend integration

Ensure keyword tracking behaves correctly.

---

## Module 3 — AI SEO Analysis

Flow:

User

↓

Authentication Middleware

↓

Analysis Controller

↓

Analysis Model

↓

MongoDB

*

AI Service

*

Scraper Service

Responsibilities:

* Analyze URL
* Store Analysis
* Retrieve Analysis
* Delete Analysis

Inspect the complete pipeline:

User URL

↓

Scraper

↓

Extract HTML

↓

SEO Processing

↓

Gemini AI

↓

Structured Analysis

↓

Database

↓

Frontend

Ensure the entire AI workflow functions correctly.

---

# Phase 1 — Complete Codebase Analysis

Before changing anything:

Study the entire project.

Understand:

* folder structure
* backend architecture
* frontend architecture
* routing
* API layer
* controllers
* middleware
* services
* models
* utilities
* Context API
* React components
* authentication flow
* AI flow
* Browserbase flow
* Gemini flow
* scraping flow
* SEO analysis flow
* keyword tracking flow
* database relationships

Trace every feature completely.

Understand every request lifecycle:

Frontend

↓

API

↓

Express Route

↓

Middleware

↓

Controller

↓

Service

↓

Model

↓

MongoDB

↓

Response

↓

Frontend Rendering

Only after fully understanding the codebase should you begin making modifications.

---

# Phase 2 — API Audit

Review every backend API.

Many APIs have already been integrated with the frontend, but some are producing incorrect responses.

Identify issues such as:

* incorrect response payloads
* inconsistent response structure
* wrong HTTP status codes
* async/await mistakes
* missing await
* missing return statements
* validation problems
* schema mismatches
* controller bugs
* service bugs
* repository issues
* model issues
* incorrect imports
* route registration problems
* middleware ordering
* broken error handling
* authentication bugs
* authorization bugs
* frontend/backend contract mismatches

Fix only genuine issues.

Do not rewrite stable code.

---

# Phase 3 — AI Integration Review

Inspect the Google Gemini implementation.

Verify:

* package installation
* SDK usage
* environment variables
* prompt construction
* response parsing
* structured output
* retry handling
* timeout handling
* fallback responses
* AI error handling

Modernize the implementation if needed while preserving functionality.

---

# Phase 4 — Browserbase Review

Inspect Browserbase integration.

Verify:

* SDK installation
* Playwright integration
* session creation
* browser connection
* scraping workflow
* browser closing
* resource cleanup
* exception handling
* retry logic

Ensure scraping failures are handled gracefully.

---

# IMPORTANT NOTE ABOUT API KEYS

The Browserbase API key and Google Gemini API key currently present in this repository **do not belong to me**.

They belong to a random source and **may or may not work**.

Do **NOT** assume any failures related to Browserbase or Gemini are caused by the application code until you've verified whether the credentials themselves are valid.

If Browserbase or Gemini requests fail because of invalid credentials, expired keys, quota limits, permission issues, or network restrictions:

* Do not treat those as application bugs.
* Do not rewrite the integration solely because the provided keys fail.
* Preserve the integration.
* Ensure the implementation, configuration, and error handling are correct.
* Clearly document that the functionality could not be fully verified due to potentially invalid API credentials.

I will replace these API keys with valid ones after all bugs have been fixed.

---

# Phase 5 — Dependency Audit

Review both:

Client

Server

Verify:

* missing dependencies
* outdated packages
* unused packages
* incorrect versions
* peer dependency issues

Install anything required.

Remove unnecessary packages only if completely safe.

The project should install successfully with:

npm install

and run without dependency-related failures.

---

# Phase 6 — Backend Engineering Review

Review every:

* Controller
* Route
* Middleware
* Model
* Service
* Utility

Inspect for:

* duplicate code
* poor naming
* inconsistent responses
* missing validation
* improper async handling
* missing try/catch
* security issues
* race conditions
* performance bottlenecks
* unnecessary database calls

Apply production-ready Express best practices.

---

# Phase 7 — Frontend Engineering Review

Inspect:

* React Components
* Context API
* Custom Hooks
* Pages
* API Layer
* Routing
* Forms
* Authentication Flow
* Loading States
* Error States

Find:

* unnecessary renders
* memory leaks
* API misuse
* incorrect loading states
* stale state
* poor component organization
* React anti-patterns

Improve maintainability while preserving functionality.

---

# Phase 8 — API Integration Verification

Verify every frontend API call.

Ensure:

* correct endpoint
* correct payload
* correct headers
* correct JWT token
* correct response parsing
* loading state
* error handling
* retry handling where appropriate

No API should silently fail.

---

# Phase 9 — Code Quality Improvements

Refactor only where it genuinely improves maintainability.

Apply:

* SOLID Principles
* DRY
* KISS
* Consistent Naming
* Modular Functions
* Reusable Utilities
* Clean Folder Structure
* Consistent Formatting

Do not over-engineer.

---

# Phase 10 — Documentation

Improve the professionalism of the repository.

Create or improve:

* README.md
* Project Overview
* Folder Structure
* Installation Guide
* Environment Variables
* API Documentation
* Architecture Documentation
* AI Workflow Documentation
* Browserbase Workflow
* Rank Tracking Workflow
* Future Improvements

Add meaningful comments only where necessary.

Do not comment obvious code.

---

# Phase 11 — Security Review

Inspect:

* JWT security
* authentication
* authorization
* API key handling
* environment variables
* CORS
* input validation
* NoSQL injection risks
* XSS risks
* rate limiting opportunities

Fix reasonable issues without changing business logic.

---

# Phase 12 — Final Verification

After completing all fixes:

Run the application.

Verify:

✅ Frontend starts successfully.

✅ Backend starts successfully.

✅ MongoDB connects.

✅ Authentication works.

✅ Protected routes work.

✅ Keyword Tracking works.

✅ SEO Analysis works.

✅ AI integration code executes correctly (subject to valid API keys).

✅ Browserbase integration executes correctly (subject to valid API keys).

✅ No build errors.

✅ No runtime errors.

✅ No console errors.

---

# Final Deliverables

After all work is complete, provide a detailed engineering report including:

1. Architecture Summary

2. Project Understanding

3. Bugs Found

4. Root Cause of Each Bug

5. Fixes Applied

6. Dependencies Installed

7. Files Modified

8. Code Quality Improvements

9. Documentation Improvements

10. Remaining Recommendations

11. Features Verified Successfully

12. Features That Could Not Be Fully Verified Due to Invalid Browserbase or Gemini API Keys

For every fix, explain why the issue occurred, how it was fixed, and how the fix improves reliability or maintainability.

The final result should be a recruiter-ready, production-quality MERN + AI application that demonstrates strong frontend, backend, API design, authentication, web scraping, AI integration, and software engineering best practices.
