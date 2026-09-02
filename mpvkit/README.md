# MPVKit — Pippin player build source (FROZEN)

> **This tree is a historical record, kept for licence compliance.**
>
> Pippin has replaced mpv with a native playback engine. What is here is the
> corresponding source for the **mpv-era releases `v1.0.14`–`v1.0.16`** — the
> libmpv and FFmpeg builds that shipped inside versions of the app people are
> still running. The LGPL entitles those users to rebuild and relink those
> libraries, and this is where they do it, which is why nothing has been deleted
> or moved. The releases and their assets stay attached to this repository
> indefinitely.
>
> Nothing new is built from it. Its CI workflows are disabled — see
> `.github/workflows/README.md`; they had in fact never run, because GitHub does
> not read workflows from a subdirectory.
>
> **The current build is elsewhere.** Patched FFmpeg and libass — the eight-patch
> Dolby Vision series, the build scripts, working CI and the current releases —
> live at [`lmor152/pippin-ffmpeg`](https://github.com/lmor152/pippin-ffmpeg).
> The player's issue tracker stays here.

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
