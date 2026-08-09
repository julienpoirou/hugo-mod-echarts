# hugo-mod-echarts

[![CI](https://github.com/julienpoirou/hugo-mod-echarts/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/julienpoirou/hugo-mod-echarts/actions/workflows/ci.yml)
[![CodeQL](https://github.com/julienpoirou/hugo-mod-echarts/actions/workflows/codeql.yml/badge.svg)](https://github.com/julienpoirou/hugo-mod-echarts/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/julienpoirou/hugo-mod-echarts/badge)](https://scorecard.dev/viewer/?uri=github.com/julienpoirou/hugo-mod-echarts)
[![Release](https://img.shields.io/github/v/release/julienpoirou/hugo-mod-echarts?include_prereleases&sort=semver)](https://github.com/julienpoirou/hugo-mod-echarts/releases)
[![Hugo Module](https://img.shields.io/badge/Hugo-Module-FF4088?logo=hugo&logoColor=white)](https://gohugo.io/hugo-modules/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

<p align="center">
  <img src="./logo.svg" alt="hugo-mod-echarts logo" width="160" height="160">
</p>

<p align="center">
  <strong>Apache ECharts charts in your Hugo pages.</strong><br>
  One shortcode, plain-JSON options, vendored <code>echarts</code> and <code>echarts-gl</code>.
</p>

## Requires

- Hugo >= `0.124`. The extended edition is not required.

## Install

**Binary** - Hugo and Go installed locally:

```bash
hugo mod init example.com/my-site
hugo mod get github.com/julienpoirou/hugo-mod-echarts
```

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/julienpoirou/hugo-mod-echarts"
```

**Container** - Docker installed locally:

```bash
alias hugo='docker run --rm -v "$PWD":/src -p 1313:1313 hugomods/hugo:go-git hugo'
hugo mod init example.com/my-site
hugo mod get github.com/julienpoirou/hugo-mod-echarts
```

## Usage

**Shortcode** - Raw JSON option between the tags:

```text
{{< echarts height="320px" >}}
{
  "xAxis": { "type": "category", "data": ["Mon", "Tue", "Wed"] },
  "yAxis": { "type": "value" },
  "series": [{ "type": "bar", "data": [12, 20, 15] }]
}
{{< /echarts >}}
```

**Self-closing shortcode** - Source read from a file:

```text
{{< echarts height="320px" src="renderers/echarts.json" />}}
```

**Self-closing shortcode** - Source passed as base64:

```text
{{< echarts b64="eyJzZXJpZXMiOlt7InR5cGUiOiJwaWUiLCJkYXRhIjpbMSwyXX1dfQ==" />}}
```

### Parameters

| Param | Default | Description |
|---|---|---|
| inner content | - | The chart option, as JSON, between the opening and closing tags |
| `src` | - | Path, relative to `assets/`, of a file holding the JSON option |
| `b64` | - | Base64-encoded JSON option |
| `height` | `420px` | CSS height of the chart container |
| `renderer` | `canvas` | `canvas` or `svg` |
| `theme` | *(none)* | Name of a theme already registered with `echarts.registerTheme()` |
| `gl` | `false` | Load `echarts-gl` for 3D and WebGL chart types |

> At least one source input is required. If several are given, `b64` wins over `src`, and `src` wins over the inner content, the others are ignored silently.

> A missing or empty source fails the build with an explicit error rather than emitting a blank page. Invalid JSON is not caught at build time: it surfaces at render time, as the parser message in place of the chart.

> `src` is resolved with `readFile` from the project root, so the file must live in your own site's `assets/`. A file mounted from a theme or from another module will not be found.

> `theme` only accepts themes you registered yourself: the vendored bundle ships none, so an unknown name (including `dark`) renders a visible error instead of a chart. Register it from your own script, before this module's runtime runs.

> `gl="true"` is injected once per page, however many shortcodes ask for it:

```text
{{< echarts gl="true" >}}
{"series":[{"type":"scatter3D","data":[[1,2,3]]}]}
{{< /echarts >}}
```

## Rendering

The chart is drawn in the reader's browser by ECharts. Its height is fixed by `height`, its width follows the surrounding layout.

- The stylesheet and both scripts are injected once per page, at the first `echarts` shortcode, in the flow of the content, not in `<head>`. Each one is fingerprinted and carries a Subresource Integrity hash.
- `echarts-gl` is only injected when at least one shortcode on the page sets `gl="true"`, and then only once.
- The option is parsed as strict JSON: no comments, no trailing commas, and no JavaScript values, so callback-style options such as a `formatter` function cannot be expressed inline.
- Every chart is watched by a `ResizeObserver` on its own container, so it re-lays out on any layout change, not just on window resizes. Engines without `ResizeObserver` fall back to a window `resize` listener.
- Without JavaScript the shortcode leaves an empty block of the configured height: there is no server-side fallback.

## Vendored assets

Apache ECharts `5.6.0` (1.0 MB) and, opt-in, ECharts GL `2.1.0` (625 kB) ship inside the module, no CDN, no third-party request at page load. Provenance, licenses and SHA-256 are recorded in [VENDORED.md](VENDORED.md).

## License

MIT © 2025 [Julien Poirou](mailto:julienpoirou@protonmail.com)
