// Verifies, in a real headless browser, that the shortcode's runtime
// actually renders, not just that Hugo emitted the right HTML/script tags
// (which is all the shell-based CI assertions can check).
"use strict";

const path = require("path");
const { chromium } = require("playwright");
const { serve } = require("./serve.js");

const PORT = 4173;

async function main() {
  const publicDir = process.argv[2];
  const pagePath = process.argv[3] || "test/";
  if (!publicDir) {
    console.error("usage: node verify-render.js <public-dir> [page-path]");
    process.exit(1);
  }

  const server = await serve(path.resolve(publicDir), PORT);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const errors = [];
    const failedRequests = [];
    page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
    page.on("requestfailed", (req) => failedRequests.push(req.url()));

    await page.goto(`http://127.0.0.1:${PORT}/${pagePath}`);
    // Settle: 2 wrappers render successfully; the middle one uses
    // theme="dark", a name the vendored bundle never registers, so it must
    // settle into a graceful .is-error state instead of a chart - both are
    // "settled" outcomes, so wait for all three to leave the pending state.
    await page.waitForFunction(
      () => {
        const wrappers = document.querySelectorAll("[data-hugo-mod-echarts]");
        return wrappers.length >= 3 && Array.from(wrappers).every(
          (el) => el.dataset.rendered === "true" || el.querySelector(".is-error")
        );
      },
      { timeout: 15000 }
    );

    const wrappers = await page.locator("[data-hugo-mod-echarts]").all();
    const canvasBox = await page.locator("[data-hugo-mod-echarts] canvas").first().boundingBox();
    const svgWrapper = wrappers[1];
    const svgErrorText = await svgWrapper.locator(".is-error").textContent().catch(() => null);

    if (errors.length > 0) {
      console.error("FAIL: page errors:", errors);
      process.exit(1);
    }
    if (failedRequests.length > 0) {
      console.error("FAIL: failed network requests:", failedRequests);
      process.exit(1);
    }
    if (!canvasBox || canvasBox.width === 0 || canvasBox.height === 0) {
      console.error("FAIL: canvas-renderer chart did not mount with a nonzero size");
      process.exit(1);
    }
    if (!svgErrorText) {
      console.error("FAIL: theme=\"dark\" (unregistered) should render a visible .is-error message, not silently hang or crash");
      process.exit(1);
    }

    console.log("PASS: canvas-renderer charts mounted; unregistered theme failed gracefully with a visible error, no page crash, no failed requests");
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
