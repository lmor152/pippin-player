/**
 * sampleData.js — the sample titles the marketing site's previews render.
 *
 * The artwork here is REAL: Primary posters, Backdrops, and (for the movies)
 * transparent clear-logo PNGs pulled straight from Pippin's demo Jellyfin
 * library — the exact art the app itself displays. Metadata (year, rating,
 * genres) is the real metadata from that library too.
 *
 * All titles are Blender Open Movie projects, licensed CC-BY, so the art is
 * safe to ship on the marketing site.
 *
 * Asset files live in /public/media/ — the site prefixes `/media/` to the
 * bare filenames stored below.
 *
 * `gradTop` / `gradBottom` are the poster's two dominant colours (upper /
 * lower region), kept as a graceful colour fallback behind the images.
 *
 * Field reference (per film):
 *   id       {string}  stable slug
 *   title    {string}
 *   year     {number}
 *   rating   {number|null}  out of 10 (null when the library has no rating)
 *   genres   {string[]}
 *   gradTop  {string}  hex — poster upper-region dominant colour
 *   gradBottom {string} hex — poster lower-region dominant colour
 *   logo     {string|null}  transparent clear-logo PNG filename, or null
 *   poster   {string|null}  poster image filename, or null
 *   backdrop {string|null}  backdrop image filename, or null
 */
export const sampleFilms = [
  {
    id: 'bbb',
    title: 'Big Buck Bunny',
    year: 2008,
    rating: 6.5,
    genres: ['Animation', 'Comedy', 'Family'],
    gradTop: '#FFFFFF',
    gradBottom: '#2E8DB3',
    logo: 'bbb_logo.png',
    poster: 'bbb_poster.jpg',
    backdrop: 'bbb_backdrop.jpg',
  },
  {
    id: 'sintel',
    title: 'Sintel',
    year: 2010,
    rating: 7.3,
    genres: ['Animation', 'Fantasy'],
    gradTop: '#79574A',
    gradBottom: '#462C20',
    logo: 'sintel_logo.png',
    poster: 'sintel_poster.jpg',
    backdrop: 'sintel_backdrop.jpg',
  },
  {
    id: 'tos',
    title: 'Tears of Steel',
    year: 2012,
    rating: 5.7,
    genres: ['Science Fiction', 'Animation'],
    gradTop: '#A09F93',
    gradBottom: '#1C262A',
    logo: 'tos_logo.png',
    poster: 'tos_poster.jpg',
    backdrop: 'tos_backdrop.jpg',
  },
  {
    id: 'elephants',
    title: 'Elephants Dream',
    year: 2006,
    rating: 5.8,
    genres: ['Animation', 'Science Fiction'],
    gradTop: '#271C13',
    gradBottom: '#291D14',
    logo: 'elephants_logo.png',
    poster: 'elephants_poster.jpg',
    backdrop: 'elephants_backdrop.jpg',
  },
  {
    id: 'cosmos-laundromat',
    title: 'Cosmos Laundromat',
    year: 2015,
    rating: 7.2,
    genres: ['Comedy', 'Fantasy'],
    gradTop: '#2F2B36',
    gradBottom: '#5E5D53',
    logo: null,
    poster: 'cosmos_poster.jpg',
    backdrop: 'cosmos_backdrop.jpg',
  },
  {
    id: 'caminandes',
    title: 'Caminandes',
    year: 2013,
    rating: null,
    genres: ['Animation', 'Short', 'Comedy'],
    gradTop: '#AE8F76',
    gradBottom: '#363435',
    logo: null,
    poster: 'caminandes_poster.jpg',
    backdrop: 'caminandes_backdrop.jpg',
  },
  {
    id: 'pepper',
    title: 'Pepper & Carrot',
    year: 2016,
    rating: null,
    genres: ['Animation', 'Fantasy', 'Comedy'],
    gradTop: '#FFFFFF',
    gradBottom: '#453046',
    logo: null,
    poster: 'pepper_poster.jpg',
    backdrop: 'pepper_backdrop.jpg',
  },
  {
    id: 'blender_shorts',
    title: 'Blender Studio Shorts',
    year: 2015,
    rating: null,
    genres: ['Animation', 'Short', 'Family'],
    gradTop: '#2F2C36',
    gradBottom: '#3B4340',
    logo: null,
    poster: 'blender_shorts_poster.jpg',
    backdrop: 'blender_shorts_backdrop.jpg',
  },
];

export default sampleFilms;
