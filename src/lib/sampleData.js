/**
 * sampleData.js — the 8 Blender open-movie sample titles the app ships with.
 *
 * Used to recreate the app's PROCEDURAL poster / backdrop look in CSS:
 * each card is a diagonal (top-left → bottom-right) two-colour gradient
 * (`gradTop` → `gradBottom`) with the title + a genre/year line overlaid.
 * Where a transparent title-logo PNG exists (`logo`), overlay it instead of
 * plain text. Where real poster/backdrop art exists (`poster`/`backdrop`),
 * it may be used directly.
 *
 * Asset files live in /public/media/ — reference them as `/media/<file>`.
 *
 * All artwork is from the Blender Open Movie projects (licensed CC-BY).
 *
 * Field reference (per film):
 *   id       {string}  stable slug
 *   title    {string}
 *   year     {number}
 *   rating   {number}  out of 10
 *   genres   {string[]}
 *   gradTop  {string}  hex — gradient start (top-left)
 *   gradBottom {string} hex — gradient end (bottom-right)
 *   logo     {string|null}  transparent title-logo PNG filename, or null
 *   poster   {string|null}  poster image filename, or null
 *   backdrop {string|null}  backdrop image filename, or null
 */
export const sampleFilms = [
  {
    id: 'big-buck-bunny',
    title: 'Big Buck Bunny',
    year: 2008,
    rating: 7.5,
    genres: ['Animation', 'Comedy'],
    gradTop: '#7EC8E3',
    gradBottom: '#3B8C3F',
    logo: 'bbb_logo.png',
    poster: null,
    backdrop: null,
  },
  {
    id: 'sintel',
    title: 'Sintel',
    year: 2010,
    rating: 8.0,
    genres: ['Fantasy', 'Adventure'],
    gradTop: '#5B6B84',
    gradBottom: '#1E2536',
    logo: 'sintel_logo.png',
    poster: null,
    backdrop: null,
  },
  {
    id: 'tears-of-steel',
    title: 'Tears of Steel',
    year: 2012,
    rating: 6.9,
    genres: ['Sci-Fi', 'Action'],
    gradTop: '#E08A3C',
    gradBottom: '#1F6F6B',
    logo: 'tos_logo.png',
    poster: null,
    backdrop: null,
  },
  {
    id: 'elephants-dream',
    title: 'Elephants Dream',
    year: 2006,
    rating: 6.7,
    genres: ['Animation', 'Sci-Fi'],
    gradTop: '#3A4A7A',
    gradBottom: '#8C2B2B',
    logo: 'elephants_logo.png',
    poster: null,
    backdrop: null,
  },
  {
    id: 'cosmos-laundromat',
    title: 'Cosmos Laundromat',
    year: 2015,
    rating: 7.2,
    genres: ['Comedy', 'Fantasy'],
    gradTop: '#7A4FB0',
    gradBottom: '#1E7F8C',
    logo: null,
    poster: 'cosmos_poster.jpg',
    backdrop: 'cosmos_backdrop.jpg',
  },
  {
    id: 'spring',
    title: 'Spring',
    year: 2019,
    rating: 7.8,
    genres: ['Fantasy', 'Drama'],
    gradTop: '#4FA36B',
    gradBottom: '#25506A',
    logo: null,
    poster: null,
    backdrop: null,
  },
  {
    id: 'agent-327',
    title: 'Agent 327',
    year: 2017,
    rating: 7.4,
    genres: ['Action', 'Comedy'],
    gradTop: '#E0A33C',
    gradBottom: '#1B2A4A',
    logo: 'agent327_logo.png',
    poster: null,
    backdrop: null,
  },
  {
    id: 'sprite-fright',
    title: 'Sprite Fright',
    year: 2021,
    rating: 7.9,
    genres: ['Horror', 'Comedy'],
    gradTop: '#D95B8F',
    gradBottom: '#1E3A2B',
    logo: null,
    poster: null,
    backdrop: null,
  },
];

export default sampleFilms;
