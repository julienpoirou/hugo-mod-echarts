# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module.
When updating a library, replace the file, update this table, and update
`THIRD_PARTY_LICENSES.md` if the upstream license changed.

| File | Library | Version | Source | License | SHA-256 |
|---|---|---|---|---|---|
| `static/vendor/hugo-mod-echarts/echarts.min.js` | [Apache ECharts](https://github.com/apache/echarts) | 5.6.0 | `https://cdn.jsdelivr.net/npm/echarts@5.6.0/dist/echarts.min.js` | Apache-2.0 | `bf4a223524e40b77c304bec67e1222cf551f14880cf42c69dc046558e11c07b1` |
| `static/vendor/hugo-mod-echarts/echarts-gl.min.js` | [ECharts GL](https://github.com/ecomfe/echarts-gl) | 2.1.0 | `https://cdn.jsdelivr.net/npm/echarts-gl@2.1.0/dist/echarts-gl.min.js` | MIT | `d6d60f2165ce3eb1ea360ef62e8490835e0ae2c1e0c1788a772fff918e350842` |

First-party files (not covered above): `static/vendor/hugo-mod-echarts/hugo-mod-echarts.js`,
`static/vendor/hugo-mod-echarts/hugo-mod-echarts.css` — licensed under this
repository's [LICENSE](LICENSE).

## Verifying integrity

```bash
sha256sum static/vendor/hugo-mod-echarts/echarts.min.js
sha256sum static/vendor/hugo-mod-echarts/echarts-gl.min.js
```
