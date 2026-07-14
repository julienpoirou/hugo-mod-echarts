# hugo-mod-echarts

[![CI](https://github.com/julienpoirou/hugo-mod-echarts/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/julienpoirou/hugo-mod-echarts/actions/workflows/ci.yml)
[![CodeQL](https://github.com/julienpoirou/hugo-mod-echarts/actions/workflows/codeql.yml/badge.svg)](https://github.com/julienpoirou/hugo-mod-echarts/actions/workflows/codeql.yml)
[![Release](https://img.shields.io/github/v/release/julienpoirou/hugo-mod-echarts?include_prereleases&sort=semver)](https://github.com/julienpoirou/hugo-mod-echarts/releases)
[![Hugo Module](https://img.shields.io/badge/Hugo-Module-FF4088?logo=hugo&logoColor=white)](https://gohugo.io/hugo-modules/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196.svg)](https://www.conventionalcommits.org)

<p align="center">
  <img src="./logo.svg" alt="hugo-mod-echarts logo" width="160" height="160">
</p>

Standalone Hugo module for ECharts rendering with vendored `echarts` and `echarts-gl` assets.

## Features

- Render charts with `{{< echarts >}}`
- Support `src`, `b64`, and inline body JSON input modes
- Ship vendored `echarts` and `echarts-gl`
- Keep chart instances attached to elements for resize handling
- Fail explicitly at build time when shortcode source is missing

## Requirements

- Hugo `>= 0.124`
- A Hugo site with Hugo Modules enabled

## Installation

Import the module in your Hugo site:

```toml
[module]
  [[module.imports]]
    path = "github.com/julienpoirou/hugo-mod-echarts"
```

## Usage

Inline source:

```text
{{< echarts height="320px" >}}
{
  "xAxis": { "type": "category", "data": ["Mon", "Tue", "Wed"] },
  "yAxis": { "type": "value" },
  "series": [{ "type": "bar", "data": [12, 20, 15] }]
}
{{< /echarts >}}
```

File source:

```text
{{< echarts height="320px" src="renderers/echarts.json" />}}
```

Base64 source (when the JSON would otherwise conflict with Markdown or
shortcode parsing):

```text
{{< echarts b64="eyJzZXJpZXMiOlt7InR5cGUiOiJwaWUiLCJkYXRhIjpbMSwyXX1dfQ==" />}}
```

## Parameters

| Param | Default | Description |
|---|---|---|
| `height` | `420px` | CSS height of the chart container. |
| `theme` | *(none)* | Name of a theme already registered with `echarts.registerTheme()`. **The vendored bundle ships no themes** — passing an unregistered name (e.g. `dark`, which is not built in) throws and the wrapper renders a visible error message instead of a chart. Register your theme in your own script, before this module's runtime script executes, to use this param. |
| `renderer` | `canvas` | ECharts renderer: `canvas` or `svg`. |
| `gl` | `false` | Set `true` to load `echarts-gl` for 3D/WebGL charts (see below). |
| `src` | *(none)* | Path under `assets/` to a JSON options file. |
| `b64` | *(none)* | Base64-encoded JSON options. |

## Options are JSON, not JavaScript

The chart option is parsed with `JSON.parse`, so it must be **pure JSON**.
Features that require JavaScript values — `formatter` callbacks, functions in
`tooltip`/`label`, `Date` objects — are not supported by design (author
content is never evaluated as code). Provide such values through pre-computed
data or formatted strings instead.

## 3D / WebGL charts

`echarts-gl` (~640 kB) is **not** loaded by default. Enable it per shortcode
for 3D chart types:

```text
{{< echarts gl="true" >}}
{"series":[{"type":"scatter3D","data":[[1,2,3]]}]}
{{< /echarts >}}
```

It is injected once per page, regardless of how many `gl="true"` shortcodes
appear.

## Output assets

The module publishes, through Hugo Pipes (`resources.Get` + `fingerprint`),
so each file's published URL includes a content hash for cache-busting and
ships a Subresource Integrity attribute:

- `libs/hugo-mod-echarts/echarts.<hash>.min.js`
- `libs/hugo-mod-echarts/echarts-gl.<hash>.min.js` (only when `gl="true"`)
- `libs/hugo-mod-echarts/hugo-mod-echarts.<hash>.js`
- `libs/hugo-mod-echarts/hugo-mod-echarts.<hash>.css`

Source files live under `assets/libs/hugo-mod-echarts/` in this
repository; see [`VENDORED.md`](VENDORED.md) for their unfingerprinted
checksums.

## Development

```bash
git clone https://github.com/julienpoirou/hugo-mod-echarts
cd hugo-mod-echarts
```

The main verification is handled by GitHub Actions with a minimal Hugo site that mounts the module and builds a sample page.

## Contributing

- Use Conventional Commits for branch history
- Update docs or changelog when behavior changes
- Keep JSON examples valid and readable
- See [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md) for contribution guidance
