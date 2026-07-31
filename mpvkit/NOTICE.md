# Open-Source Component Notices

MPVKit bundles the following open-source libraries. Each component's license
obligations apply to any application that links MPVKit. LGPL libraries that are
statically linked require end-users to be able to relink with modified versions;
the build scripts published in this repository satisfy that requirement.

---

## mpv
- **License:** LGPLv2.1+  
- **Upstream:** https://github.com/mpv-player/mpv  
- **Version bundled:** v0.41.0  

## FFmpeg (libavcodec, libavdevice, libavfilter, libavformat, libavutil, libswresample, libswscale)
- **License:** LGPL version 3 or later. Built with `--enable-version3` and **without**
  `--enable-gpl` / `--enable-nonfree` (the only GPL filter, delogo, is omitted), so the
  binaries report `libavutil license: LGPL version 3 or later` — verified in the shipped
  xcframeworks. No GPL-only or nonfree components are enabled.
- **Upstream:** https://github.com/FFmpeg/FFmpeg  
- **Version bundled:** n8.0.1  

## libass
- **License:** ISC / LGPLv2.1+  
- **Upstream:** https://github.com/libass/libass  
- **Version bundled:** 0.17.4  

## libfreetype
- **License:** FreeType License (FTL). FreeType is dual-licensed FTL / GPLv2+; this
  distribution **elects the FreeType License (FTL)**.  
- **Upstream:** https://gitlab.freedesktop.org/freetype/freetype  
- **Version bundled:** 0.17.4 (mpvkit build)  

## libfribidi
- **License:** LGPLv2.1+  
- **Upstream:** https://github.com/fribidi/fribidi  
- **Version bundled:** 0.17.4 (mpvkit build)  

## libharfbuzz
- **License:** MIT ("Old MIT" / HarfBuzz License)  
- **Upstream:** https://github.com/harfbuzz/harfbuzz  
- **Version bundled:** 0.17.4 (mpvkit build)  

## libunibreak
- **License:** BSD 2-Clause  
- **Upstream:** https://github.com/adah1972/libunibreak  
- **Version bundled:** 0.17.4 (mpvkit build)  

## libdav1d
- **License:** BSD 2-Clause  
- **Upstream:** https://code.videolan.org/videolan/dav1d  
- **Version bundled:** 1.5.2-xcode  

## MoltenVK (Vulkan on Metal)
- **License:** Apache 2.0  
- **Upstream:** https://github.com/KhronosGroup/MoltenVK  
- **Version bundled:** 1.4.1  

## libshaderc (Libshaderc_combined)
- **License:** Apache 2.0  
- **Upstream:** https://github.com/google/shaderc  
- **Version bundled:** 2025.5.0  

## lcms2
- **License:** MIT  
- **Upstream:** https://www.littlecms.com / https://github.com/mm2/Little-CMS  
- **Version bundled:** 2.17.0  

## libplacebo
- **License:** LGPLv2.1+  
- **Upstream:** https://code.videolan.org/videolan/libplacebo  
- **Version bundled:** 7.351.0-2512  

## libdovi
- **License:** MIT / Apache 2.0 (dual-licensed)  
- **Upstream:** https://github.com/quietvoid/dovi_tool (library component)  
- **Version bundled:** 3.3.2  

## libuavs3d
- **License:** BSD 3-Clause  
- **Upstream:** https://github.com/uavs3/uavs3d  
- **Version bundled:** 1.2.1-xcode  

## libuchardet
- **License:** LGPLv2.1+ / MPL 1.1 / GPLv2+ (tri-licensed; LGPLv2.1+ applies to this build)  
- **Upstream:** https://www.freedesktop.org/wiki/Software/uchardet/  
- **Version bundled:** 0.0.8-xcode  

## libbluray
- **License:** LGPLv2.1+  
- **Upstream:** https://www.videolan.org/developers/libbluray.html  
- **Version bundled:** 1.4.0  

## LuaJIT (libluajit, macOS only)
- **License:** MIT  
- **Upstream:** https://luajit.org  
- **Version bundled:** 2.1.0-xcode  

---

The full text of each license can be found at the upstream project URLs listed
above, or in the source archives downloaded during the MPVKit build process.
