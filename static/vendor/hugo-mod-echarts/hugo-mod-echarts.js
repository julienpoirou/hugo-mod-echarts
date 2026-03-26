(() => {
  if (window.__hugoModEchartsInit) return;
  window.__hugoModEchartsInit = true;

  // Shortcodes pass source through base64 so Hugo does not mangle JSON payloads.
  const decodeBase64Utf8 = (value) => {
    const binary = window.atob(value || "");
    if (typeof TextDecoder !== "undefined") {
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return new TextDecoder("utf-8").decode(bytes);
    }

    let escaped = "";
    for (let index = 0; index < binary.length; index += 1) {
      escaped += `%${binary.charCodeAt(index).toString(16).padStart(2, "0")}`;
    }
    return decodeURIComponent(escaped);
  };

  const renderElement = (element) => {
    if (element.dataset.rendered === "true" || typeof echarts === "undefined") return;

    const output = element.querySelector("[data-echarts-output]");
    if (!output) return;

    try {
      const source = decodeBase64Utf8(element.dataset.source || "").trim();
      if (!source) {
        throw new Error("ECharts source is empty");
      }

      const options = JSON.parse(source);
      // Keep the chart instance on the element so resize handling stays local.
      const chart = echarts.init(output, element.dataset.theme || undefined, {
        renderer: element.dataset.renderer || "canvas"
      });
      chart.setOption(options);
      element._hugoModEchartsChart = chart;
      output.classList.remove("is-error");
      element.dataset.rendered = "true";
    } catch (error) {
      output.textContent = error.message;
      output.classList.add("is-error");
    }
  };

  const renderAll = (root = document) => {
    root.querySelectorAll("[data-hugo-mod-echarts]").forEach(renderElement);
  };

  window.addEventListener("resize", () => {
    document.querySelectorAll("[data-hugo-mod-echarts]").forEach((element) => {
      if (element._hugoModEchartsChart) {
        element._hugoModEchartsChart.resize();
      }
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => renderAll(), { once: true });
  } else {
    renderAll();
  }

  window.HugoModEcharts = { renderAll };
})();
