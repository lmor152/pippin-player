# MPVKit — Pippin player build source

This directory is the complete, buildable source for the patched **libmpv** +
**FFmpeg** XCFrameworks that the Pippin player links. It is published here as the
"corresponding source" for those LGPL libraries: anyone can rebuild the
libraries from these scripts and patches and relink them.

- **Binaries** (the compiled XCFrameworks) are attached to this repository's
  GitHub Releases (`v1.0.14+`); `Package.swift` references them by URL + checksum.
- **Patches** applied on top of upstream mpv / FFmpeg live in
  `Sources/BuildScripts/patch/` — each is attributed in
  `Sources/BuildScripts/patch/PROVENANCE.md`.
- **Build tooling** is `Sources/BuildScripts/` (a SwiftPM executable).
- **Licenses / component notices** are in `LICENSE` and `NOTICE.md`.

## Versions

- mpv `v0.41.0`, FFmpeg `n8.0.1` (stock, built LGPLv3 — no `--enable-gpl` /
  `--enable-nonfree`). See `NOTICE.md` for the full component list and licenses.

## Rebuilding

```
swift run --package-path Sources/BuildScripts build platform=macos,ios,tvos version=<version>
```

This fetches the pinned upstream mpv / FFmpeg sources, applies the patches in
`Sources/BuildScripts/patch/`, builds the dependency libraries, and produces the
XCFrameworks under `dist/release/`.
