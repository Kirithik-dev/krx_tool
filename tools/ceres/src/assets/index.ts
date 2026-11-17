import ceresCardVideo from '../../../../src/tools/ceres/card.mp4';
import ceresCardArtwork from '../card.png';

/**
 * Natural botanical/tomato fallback SVG data URI used as video poster
 * and fallback if video playback is blocked or fails.
 */
export const CERES_VIDEO_FALLBACK_POSTER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
      <defs>
        <radialGradient id="bg" cx="50%" cy="44%" r="72%">
          <stop offset="0%" stop-color="#3a2419"/>
          <stop offset="52%" stop-color="#1e1712"/>
          <stop offset="100%" stop-color="#0f0c0a"/>
        </radialGradient>
        <radialGradient id="tomato" cx="42%" cy="38%" r="48%">
          <stop offset="0%" stop-color="#d84a32"/>
          <stop offset="65%" stop-color="#8f2416"/>
          <stop offset="100%" stop-color="#3a120c"/>
        </radialGradient>
        <radialGradient id="gold" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#d8b879" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="#d8b879" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)"/>
      <circle cx="620" cy="430" r="320" fill="url(#gold)"/>
      <circle cx="520" cy="450" r="155" fill="url(#tomato)" opacity="0.88"/>
      <circle cx="725" cy="410" r="135" fill="url(#tomato)" opacity="0.82"/>
    </svg>`
  );

export const CERES_ASSETS = {
  cardVideo: ceresCardVideo,
  cardPoster: CERES_VIDEO_FALLBACK_POSTER,
  cardArtwork: ceresCardArtwork,
} as const;

export { ceresCardVideo, ceresCardArtwork };
