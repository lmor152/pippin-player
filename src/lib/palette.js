/**
 * palette.js — Pippin accent → surface palette derivation.
 *
 * This ports the app's core "pick an accent → the whole UI re-tints" feature.
 * Every surface colour is derived from the ACCENT's HUE: we keep the hue and
 * recompute saturation/brightness per surface and per theme (light / dark /
 * black-OLED). A `tint` (0..1) scales saturation so surfaces can be pushed
 * toward neutral grey (tint→0) or full accent tinting (tint→1, default).
 *
 * ---------------------------------------------------------------------------
 * PUBLIC API
 * ---------------------------------------------------------------------------
 *   derivePalette(accentHex, theme = 'dark', tint = 1) -> { ...cssColorStrings }
 *   applyPalette(el, accentHex, theme = 'dark', tint = 1)  // sets CSS vars on el
 *
 *   Low-level helpers (exported for previews):
 *     hexToHsb(hex)   -> { h, s, b }   // h,s,b all 0..1
 *     hsbToRgb(h,s,b) -> { r, g, b }   // r,g,b 0..255
 *     hsbToCss(h,s,b) -> 'rgb(r, g, b)'
 *
 * ---------------------------------------------------------------------------
 * RETURNED KEYS (from derivePalette) — all are CSS color strings:
 * ---------------------------------------------------------------------------
 *   accent              the accent itself (as passed in, normalised to rgb)
 *   accentSubtle        accent @ 15% opacity   (rgba)
 *   accentMuted         accent @ 28% opacity   (rgba)
 *   background          app background surface
 *   groupedBackground   grouped-list background
 *   secondaryBackground secondary surface
 *   cardBackground      card surface (matches app card radius usage)
 *   separator           hairline separator colour (accent-hued)
 *   emeraldDepths       the brand "Emerald Depths" deep background
 *   label               primary text colour   (theme-appropriate)
 *   labelSecondary      secondary text colour  (theme-appropriate, translucent)
 *
 * ---------------------------------------------------------------------------
 * CSS CUSTOM PROPERTIES set by applyPalette(el, ...):
 * ---------------------------------------------------------------------------
 *   --accent            --accent-subtle      --accent-muted
 *   --bg                --bg-grouped         --bg-secondary
 *   --card              --separator
 *   --label             --label-secondary
 *   --emerald-depths
 *
 * (These names deliberately mirror the tokens declared in global.css :root so
 *  that a section can call applyPalette on a preview container and everything
 *  inside re-tints live without any other wiring.)
 */

// ---------------------------------------------------------------------------
// Colour-space helpers
// ---------------------------------------------------------------------------

/** Parse "#rrggbb" / "#rgb" -> { h, s, b } with all channels in 0..1. */
export function hexToHsb(hex) {
  const { r, g, b } = hexToRgb(hex);
  const rf = r / 255, gf = g / 255, bf = b / 255;
  const max = Math.max(rf, gf, bf);
  const min = Math.min(rf, gf, bf);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rf) h = ((gf - bf) / delta) % 6;
    else if (max === gf) h = (bf - rf) / delta + 2;
    else h = (rf - gf) / delta + 4;
    h /= 6;
    if (h < 0) h += 1;
  }
  const s = max === 0 ? 0 : delta / max;
  const brightness = max;
  return { h, s, b: brightness };
}

/** HSB (all 0..1) -> { r, g, b } in 0..255. */
export function hsbToRgb(h, s, b) {
  h = ((h % 1) + 1) % 1; // wrap
  s = clamp01(s);
  b = clamp01(b);
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = b * (1 - s);
  const q = b * (1 - f * s);
  const t = b * (1 - (1 - f) * s);
  let r, g, bl;
  switch (i % 6) {
    case 0: r = b; g = t; bl = p; break;
    case 1: r = q; g = b; bl = p; break;
    case 2: r = p; g = b; bl = t; break;
    case 3: r = p; g = q; bl = b; break;
    case 4: r = t; g = p; bl = b; break;
    default: r = b; g = p; bl = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(bl * 255),
  };
}

/** HSB -> "rgb(r, g, b)" CSS string. */
export function hsbToCss(h, s, b) {
  const { r, g, b: bl } = hsbToRgb(h, s, b);
  return `rgb(${r}, ${g}, ${bl})`;
}

// ---------------------------------------------------------------------------
// Palette derivation
// ---------------------------------------------------------------------------

/**
 * Derive the full surface palette from an accent hex.
 * @param {string} accentHex  e.g. "#5FBF8A"
 * @param {'light'|'dark'|'black'} theme
 * @param {number} tint       0..1 saturation multiplier (default 1)
 * @returns {Record<string,string>} map of CSS colour strings (see keys above)
 */
export function derivePalette(accentHex, theme = 'dark', tint = 1) {
  const { h, s } = hexToHsb(accentHex);
  const t = clamp01(tint);
  const accentRgb = hexToRgb(accentHex);
  const accent = `rgb(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b})`;
  const accentSubtle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.15)`;
  const accentMuted = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.28)`;

  // Brand "Emerald Depths" deep background (behind hero art / icons).
  const emeraldDepths = hsbToCss(h, Math.min(s + 0.10, 0.70) * t, 0.10);

  let surfaces;
  if (theme === 'light') {
    surfaces = {
      background: hsbToCss(h, 0.04 * t, 0.985),
      groupedBackground: hsbToCss(h, 0.055 * t, 0.96),
      secondaryBackground: hsbToCss(h, 0.07 * t, 0.935),
      cardBackground: hsbToCss(h, 0.022 * t, 1.0),
      separator: hsbToCss(h, 0.10 * t, 0.83),
    };
  } else {
    // dark + black share the dark formulas; black overrides bg + card below.
    surfaces = {
      background: hsbToCss(h, Math.min(s + 0.05, 0.44) * t, 0.11),
      groupedBackground: hsbToCss(h, Math.min(s + 0.05, 0.44) * t, 0.15),
      secondaryBackground: hsbToCss(h, Math.min(s + 0.04, 0.42) * t, 0.22),
      cardBackground: hsbToCss(h, Math.min(s + 0.14, 0.66) * t, 0.165),
      separator: hsbToCss(h, 0.20 * t, 0.34),
    };
    if (theme === 'black') {
      // True black (OLED): pure-black bg, card darkened toward black (~0.6×).
      surfaces.background = '#000000';
      surfaces.cardBackground = hsbToCss(h, Math.min(s + 0.14, 0.66) * t, 0.165 * 0.6);
    }
  }

  const isLight = theme === 'light';
  const label = isLight ? 'rgb(20, 22, 24)' : 'rgb(244, 245, 247)';
  const labelSecondary = isLight
    ? 'rgba(20, 22, 24, 0.55)'
    : 'rgba(255, 255, 255, 0.60)';

  return {
    accent,
    accentSubtle,
    accentMuted,
    ...surfaces,
    emeraldDepths,
    label,
    labelSecondary,
  };
}

/**
 * Apply the derived palette to a DOM element as CSS custom properties.
 * Section agents call this on a preview container so its children re-tint live.
 * @param {HTMLElement} el
 * @param {string} accentHex
 * @param {'light'|'dark'|'black'} theme
 * @param {number} tint
 * @returns {Record<string,string>} the derived palette (for convenience)
 */
export function applyPalette(el, accentHex, theme = 'dark', tint = 1) {
  const p = derivePalette(accentHex, theme, tint);
  const map = {
    '--accent': p.accent,
    '--accent-subtle': p.accentSubtle,
    '--accent-muted': p.accentMuted,
    '--bg': p.background,
    '--bg-grouped': p.groupedBackground,
    '--bg-secondary': p.secondaryBackground,
    '--card': p.cardBackground,
    '--separator': p.separator,
    '--label': p.label,
    '--label-secondary': p.labelSecondary,
    '--emerald-depths': p.emeraldDepths,
  };
  for (const [k, v] of Object.entries(map)) el.style.setProperty(k, v);
  return p;
}

/** The six preset accents shipped in the app. */
export const PRESET_ACCENTS = [
  { name: 'Emerald', hex: '#5FBF8A' }, // default
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Indigo', hex: '#5856D6' },
  { name: 'Rose', hex: '#E0637F' },
  { name: 'Purple', hex: '#AF52DE' },
  { name: 'Amber', hex: '#F59E0B' },
];

export const DEFAULT_ACCENT = '#5FBF8A';

// ---------------------------------------------------------------------------
// internals
// ---------------------------------------------------------------------------

function hexToRgb(hex) {
  let h = String(hex).trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const int = parseInt(h, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function clamp01(x) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}
