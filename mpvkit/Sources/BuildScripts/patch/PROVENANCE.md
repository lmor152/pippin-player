# Patch provenance

> ## ⚠️ FROZEN — historical record for the mpv-era releases
>
> Pippin has moved to a native playback engine and no longer builds mpv. This
> tree is the **corresponding source for `v1.0.14`–`v1.0.16`**, the releases that
> shipped inside mpv-era versions of the app, and it stays published for exactly
> that reason: those versions are out in the world and their users are entitled
> to rebuild and relink the LGPL libraries inside them. Nothing new is built from
> it, and its CI workflows are disabled.
>
> The **current** FFmpeg + libass build — the eight-patch Dolby Vision series,
> its build scripts and its releases — lives at
> [`lmor152/pippin-ffmpeg`](https://github.com/lmor152/pippin-ffmpeg).

Every patch applied to the vendored libmpv / FFmpeg builds is listed here with
its origin and license, so the build is auditable and each contribution is
attributed. The LGPL libraries are statically linked; the patches and build
scripts in this repository let end-users rebuild and relink with modified
versions.

## FFmpeg (n8.0.1)
Native VideoToolbox Dolby Vision decode series, ported from
[edde746/MPVKit](https://github.com/edde746/MPVKit) (the Plezy fork) for Pippin's
native DV passthrough path (`dvh1` → `AVSampleBufferDisplayLayer` + Dolby Vision
HDMI mode). Modifications to `libavcodec/videotoolbox.c` and
`libavcodec/hevc/hevcdec.c`; P7→P8.1 conversion links the bundled `libdovi 3.3.2`.
edde746's temporary DV diagnostics (its FFmpeg `0012`) are folded out as the net
result — no `[Plezy DV]` logs, no `PLEZY_DV_CONVERSION_LOG` gate, no
`dovi_rpu_log_done` field; `vt_internal.h` stays stock. The runtime env var is
renamed `PLEZY_DV_CONVERSION_MODE` → `PIPPIN_DV_CONVERSION_MODE` (internal
`PlezyDoviConversionMode`/`PLEZY_DOVI_*` → `PippinDoviConversionMode`/`PIPPIN_DOVI_*`).

| Patch | Origin | License |
|---|---|---|
| `0001-videotoolbox-add-dolby-vision-hevc-format` | Ported from edde746/MPVKit FFmpeg `0002` (`dvh1` codec type, dvcC/dvvC atom synthesis, EnableHardware DV spec) | LGPLv2.1+ |
| `0002-videotoolbox-preserve-dolby-vision-attachments` | Ported from edde746/MPVKit FFmpeg `0004` | LGPLv2.1+ |
| `0003-videotoolbox-tag-dolby-vision-hdr` | Ported from edde746/MPVKit FFmpeg `0005` (BT.2020/PQ\|HLG tagging + per-frame HDR-metadata Propagate/Generate session props) | LGPLv2.1+ |
| `0004-videotoolbox-set-sample-size` | Ported from edde746/MPVKit FFmpeg `0008` | LGPLv2.1+ |
| `0005-videotoolbox-forward-dolby-vision-rpus` | Ported from edde746/MPVKit FFmpeg `0009` (net/diagnostic-free) + folds edde746 FFmpeg `0010` (duplicate-RPU log WARNING→VERBOSE) | LGPLv2.1+ |
| `0006-videotoolbox-never-signal-dv-metadata-compression` | Ported from edde746/MPVKit FFmpeg `0013` | LGPLv2.1+ |
| `0007-videotoolbox-fall-back-to-plain-hevc-session` | Ported from edde746/MPVKit FFmpeg `0014` (per-frame DV gated on live session codec type) | LGPLv2.1+ |
| `0008-videotoolbox-convert-dolby-vision-p7` | Ported from edde746/MPVKit FFmpeg `0003` (net/diagnostic-free); P7→P8.1 RPU conversion via bundled libdovi 3.3.2; env renamed `PIPPIN_DV_CONVERSION_MODE` | LGPLv2.1+ |

## libmpv (v0.41.0)
| Patch | Origin | License |
|---|---|---|
| `0001-player-add-moltenvk-context` | Upstream [mpvkit/MPVKit](https://github.com/mpvkit/MPVKit) | LGPLv2.1+ |
| `0002-revert-build-static` | Upstream [mpvkit/MPVKit](https://github.com/mpvkit/MPVKit) | LGPLv2.1+ |
| `0003-enable-avfoundation-ao-tvos` | Upstream [mpvkit/MPVKit](https://github.com/mpvkit/MPVKit) — guards the CoreAudio HAL for iOS/tvOS so libmpv compiles there and the AVFoundation audio output is usable | LGPLv2.1+ |
| `0004-avfoundation-video-output` | Alex Kim (base) + Pippin modifications (rotation resync, OSD recovery, PiP-composite OSD) | LGPLv2.1+ |
| `0005-avfoundation-timebase-rate-from-speed` | Pippin | LGPLv2.1+ |
| `0006-avfoundation-ac3-eac3-passthrough` | Pippin — AC-3 / E-AC-3 passthrough implemented from public specs (IEC 61937-1/-3, ATSC A/52, ETSI TS 102 366) plus Apple AVFoundation/CoreAudio documentation and the upstream mpv `ao` driver API | LGPLv2.1+ |
| `0007-avfoundation-coremedia-source-timebase` | Ported from edde746/MPVKit libmpv `0008` — anchors the ASBDL control timebase in the CoreMedia source-clock epoch instead of mpv's timer epoch (fixes Match-Frame-Rate judder) | LGPLv2.1+ |
| `0008-avfoundation-osd-performance` | Ported from edde746/MPVKit libmpv `0007` — NEON blends, per-IOSurface dirty-rect clears, subtitle-bounds-from-parts, 4K OSD downscale (`osd-max-height`/`osd-video-res`), perf telemetry; reconciled onto Pippin's diverged `0004` | LGPLv2.1+ |
| `0009-avfoundation-sw-frame-upload-performance` | Ported from edde746/MPVKit libmpv `0009` — planar 10/12-bit accept, fused NEON interleave+shift upload, format-desc caching | LGPLv2.1+ |
| `0010-avfoundation-high-speed-playback` | Re-authored merge of edde746/MPVKit libmpv `0011` (anchor-span rate inference, drift adoption, deadline pacing, permanent ~5s pacing diagnostics) with Pippin's `0005` (`--speed` kept as base-truth nominal rate; drift correction layered on) | LGPLv2.1+ |
| `0011-avfoundation-preserve-dolby-vision-transfer` | Ported from edde746/MPVKit libmpv `0014` — restores the PQ transfer tag on DV Profile-5 VideoToolbox frames when VT strips it (primaries/matrix left unspecified) | LGPLv2.1+ |
| `0012-moltenvk-gate-presentation-on-hidden-layer` | Re-authored port of edde746/MPVKit libmpv `0013` — gates presentation via `ra_ctx_params.check_visible` when the `CAMetalLayer` is hidden/asleep; forces `VO_EVENT_EXPOSE` redraw on re-show. Adapted to Pippin's minimal `context_moltenvk.m` | LGPLv2.1+ |
| `0013-avfoundation-multichannel-pcm` | Pippin — multichannel LPCM output path (canonical CoreAudio MPEG 5.1/7.1 layout tags + matching channel order; tvOS/iOS route-capability negotiation with stereo-only → core downmix). Route-capability reasoning adapted from the pattern in edde746/MPVKit libmpv `0010` | LGPLv2.1+ |
| `0014-avfoundation-bound-pcm-lookahead` | Ported from edde746/MPVKit libmpv `0015` — macOS-only bounded PCM lookahead (`--ao-avfoundation-max-lookahead`, default 0.5s) so software volume/gain applies promptly | LGPLv2.1+ |
| `0015-avfoundation-presentation-phase-diagnostics` | Pippin-original — per-frame presentation-phase instrumentation for `vo_avfoundation`. tvOS has no vblank feedback under `--video-sync=audio`, so display-fps/vsync-ratio/mistimed/delayed all read unavailable and two bracketed on-device judder episodes produced no distinguishing signal. Accumulates the audio-vs-host phase error (timebase projected position at the frame's presentation host time, minus its PTS) that was previously discarded below the 20 ms re-anchor threshold, and summarises it per ~5s window | LGPLv2.1+ |
