# Patch provenance

Every patch applied to the vendored libmpv / FFmpeg builds is listed here with
its origin and license, so the build is auditable and each contribution is
attributed. The LGPL libraries are statically linked; the patches and build
scripts in this repository let end-users rebuild and relink with modified
versions.

## FFmpeg
No patches. Built from stock FFmpeg n8.0.1 with the LGPLv3 configuration
described in `NOTICE.md`.

## libmpv (v0.41.0)
| Patch | Origin | License |
|---|---|---|
| `0001-player-add-moltenvk-context` | Upstream [mpvkit/MPVKit](https://github.com/mpvkit/MPVKit) | LGPLv2.1+ |
| `0002-revert-build-static` | Upstream [mpvkit/MPVKit](https://github.com/mpvkit/MPVKit) | LGPLv2.1+ |
| `0003-enable-avfoundation-ao-tvos` | Upstream [mpvkit/MPVKit](https://github.com/mpvkit/MPVKit) — guards the CoreAudio HAL for iOS/tvOS so libmpv compiles there and the AVFoundation audio output is usable | LGPLv2.1+ |
| `0004-avfoundation-video-output` | Alex Kim (base) + Pippin modifications (rotation resync, OSD recovery, PiP-composite OSD) | LGPLv2.1+ |
| `0005-avfoundation-timebase-rate-from-speed` | Pippin | LGPLv2.1+ |
| `0006-avfoundation-ac3-eac3-passthrough` | Pippin — AC-3 / E-AC-3 passthrough implemented from public specs (IEC 61937-1/-3, ATSC A/52, ETSI TS 102 366) plus Apple AVFoundation/CoreAudio documentation and the upstream mpv `ao` driver API | LGPLv2.1+ |
