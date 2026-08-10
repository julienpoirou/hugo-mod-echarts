# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module. When updating a library: replace the file, update this table and the matching `sha256` in [.vendored/package.json](.vendored/package.json), and update [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) if the upstream license changed.

All files live in `assets/libs/hugo-mod-echarts/`.

| File | Library | Version | License | SHA-256 |
|---|---|---|---|---|
| `echarts.min.js` | [Apache ECharts](https://github.com/apache/echarts) | 5.6.0 | Apache-2.0 | `bf4a223524e40b77c304bec67e1222cf551f14880cf42c69dc046558e11c07b1` |
| `echarts-gl.min.js` | [ECharts GL](https://github.com/ecomfe/echarts-gl) | 2.1.0 | BSD 3-Clause License | `d6d60f2165ce3eb1ea360ef62e8490835e0ae2c1e0c1788a772fff918e350842` |

Sources: `https://cdn.jsdelivr.net/npm/echarts@5.6.0/dist/echarts.min.js` and `https://cdn.jsdelivr.net/npm/echarts-gl@2.1.0/dist/echarts-gl.min.js`

First-party files, under this repository's [LICENSE](LICENSE): `hugo-mod-echarts.js`, `hugo-mod-echarts.css`.

## How updates reach us

[.vendored/package.json](.vendored/package.json) pins the same versions as ordinary npm dependencies. Nothing ever installs it. It exists so Dependabot opens a pull request when one of these libraries releases, and so GitHub raises a security alert against the exact code this module serves to readers.

Dependabot can bump that manifest but cannot re-download a minified bundle, so a merged bump would otherwise leave the declared version and the shipped bytes silently out of sync. `scripts/check-vendored.mjs` closes that gap: it fails the build unless the pinned version, this table and the checksum of the committed file all agree.

## Verifying integrity

```bash
node scripts/check-vendored.mjs
sha256sum assets/libs/hugo-mod-echarts/echarts.min.js
sha256sum assets/libs/hugo-mod-echarts/echarts-gl.min.js
```
