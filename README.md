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

## Output assets

The module publishes:

- `vendor/hugo-mod-echarts/echarts.min.js`
- `vendor/hugo-mod-echarts/echarts-gl.min.js`
- `vendor/hugo-mod-echarts/hugo-mod-echarts.js`
- `vendor/hugo-mod-echarts/hugo-mod-echarts.css`

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
