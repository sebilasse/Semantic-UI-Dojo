import { lang } from '@dojo/core/main';
interface Enum { [id: number]: string }

export const META = {
  NAME: {
    SUI: Symbol('Semantic UI')
  },
  TYPES: {
    ADDON: Symbol('Semantic UI addon'),
    COLLECTION: Symbol('Semantic UI collection'),
    ELEMENT: Symbol('Semantic UI element'),
    VIEW: Symbol('Semantic UI view'),
    MODULE: Symbol('Semantic UI module')
  },
  ATOMIC: {
    ATOM: Symbol('Atomic Design atom'),
    MOLECULE: Symbol('Atomic Design molecule'),
    ORGANISM: Symbol('Atomic Design organism'),
    TEMPLATE: Symbol('Atomic Design template'),
    PAGE: Symbol('Atomic Design page')
  }
}

/* Constant Enums and Types */
enum AB { above = 'above', below = 'below' }
enum HV { horizontally = 'horizontally', vertically = 'vertically' }
enum LR { left = 'left', right = 'right' }
enum TB { top = 'top', bottom = 'bottom' }
enum C { center = 'center' }
enum M { middle = 'middle' }
enum J { justified = 'justified' }
enum EQ { equal = 'equal' }
enum CENTERED { centered }
enum CORNER { 'top left', 'top right', 'bottom left', 'bottom right' }
enum LRCORNER { 'left corner', 'right corner' }
/* Semantic UI 'directions' */
export const POS = { AB, HV, LR, TB, C, M, J, EQ, CENTERED }
/* Semantic UI alignments */
export const ALIGN = {
  ALL:lang.mixin(LR,TB), V:lang.mixin(M,TB),
  /* Semantic UI text alignments */
  TEXT:lang.mixin(C,LR), TEXTJUSTIFY:lang.mixin(M,J,LR),
  /* other */
  CENTERED: CENTERED, POINT:lang.mixin(AB,LR),
  CORNER:lang.mixin(TB,CORNER), LRCORNER:lang.mixin(LR,LRCORNER)
}
/* Semantic UI named sizes */
enum S { mini, tiny, small, medium, large, huge, big, massive }
enum S_SCREEN { fullscreen, large, small }
enum S_TABLE { small, large }
enum S_BASIC { mini, tiny, small, large, huge }
enum S_PROGRESS { tiny, small, medium, large, big }
enum S_NOMEDIUM { mini, tiny, small, large, huge, big, massive }
enum S_NOMEDIUMBIG { mini, tiny, small, large, huge, massive }
enum S_NOBIGMASSIVE { mini, tiny, small, medium, large, huge }
export const SIZE = {
  ALL: S, SCREEN: S_SCREEN, TABLE: S_TABLE, BASIC: S_BASIC, PROGRESS: S_PROGRESS,
  NO_MEDIUM: S_NOMEDIUM, NO_MEDIUM_BIG: S_NOMEDIUMBIG, NO_BIG_MASSIVE: S_NOBIGMASSIVE
}

/* Utilities for 1 - 16 */
export enum NUMBER { /* NOTE: The default for R in './main' */
  one = 1, two, three, four, five, six, seven, eight, nine, ten,
  eleven, twelve, thirteen, fourteen, fifteen, sixteen
}
const nrArr = Object.keys(NUMBER);
const nrAsStr = nrArr.slice(0, Math.ceil(nrArr.length / 2));
const nr2wordMap = nrAsStr.reduce((o: any, k: any) => {o[k] = NUMBER[k]; return o}, {});
/**
 * Return the number word for numbers 1-16.
 * Returns strings or numbers as is if there is no corresponding word.
 * Returns an empty string if value is not a string or number.
 * @param {string|number} value The value to convert to a word.
 * @returns {string}
 */
export function numberToWord(value: any) {
  var type = typeof value;
  if (type === 'string' || type === 'number') { return nr2wordMap[value] || value }
  return '';
}

/* Semantic UI devices / named breakpoints */
export enum DEVICE { mobile, tablet, computer, 'large screen', widescreen }
/* Semantic UI named colors */ /* TODO FIXME : SOCIAL[redaktor] + light + special */
export enum COLOR {
  red, orange, yellow, olive, green, teal, blue, pink, violet, purple, brown, grey, black
}
export enum SOCIAL {facebook, 'google plus', instagram, linkedin, twitter, vk, youtube}
export const SOCIALCOLOR = lang.mixin(SOCIAL, COLOR);
/* Semantic UI animations */
enum ANIM_BASIC { fade, 'small fade', move, 'move right', 'move up', 'move down' }
enum ANIM_ROTATE { rotate, 'rotate left' }
enum ANIM_MINI { fade, vertical }
enum ANIM_OVER { overlay, push, uncover, 'scale down', 'slide out', 'slide along' }
export const ANIM = {
  ALL: lang.mixin(ANIM_BASIC, ANIM_ROTATE),
  BASIC: ANIM_BASIC,
  MINI: ANIM_MINI,
  OVER: ANIM_OVER,
}
/* Semantic UI named aspects */
export enum RATIO { '4:3', '16:9', '21:9' }
export enum CALC { percent, ratio }
export enum SORT { ascending, descending }
export enum DIMMER { inverted, blurring }
export enum RATE_ICON { star, heart }
export enum SHAPE { circular, rounded }
export enum ROTATE { clockwise, counterclockwise }
export enum CONTAINER { fluid, text }
export enum REVERSE {
  computer = 'computer', 'computer vertically' = 'computer vertically',
  mobile = 'mobile', 'mobile vertically' = 'mobile vertically',
  tablet = 'tablet', 'tablet vertically' = 'tablet vertically'
}
export enum AD {
  banner, 'mobile banner', 'vertical banner', 'top banner', 'half banner',
  leaderboard, 'mobile leaderboard', 'large leaderboard', billboard,
  button, 'square button', 'small button',
  skyscraper, 'wide skyscraper',
  square, 'small square',
  'small rectangle', 'medium rectangle', 'large rectangle', 'vertical rectangle',
  panorama, netboard, 'half page'
}
export enum SIDEWIDTH { thin, 'very thin', wide, 'very wide' }
export enum VIDEOSILO { youtube, vimeo }
export enum VERY { very }
export enum LABELED { labeled }
