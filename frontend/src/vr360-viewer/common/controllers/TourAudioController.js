import { AUDIO_SCOPE } from '../audio/constants.js';

/** Tour boundary used by autoplay and the Audio bottom sheet. */
export function createTourAudioController({ manager } = {}) {
  const optionsFor = (narration = {}, fallbackTitle = '') => ({
    sourceId: 'tour',
    title: narration.title || fallbackTitle || 'Tour narration',
    volume: narration.volume,
    loop: narration.loop,
    playbackRate: narration.playbackRate,
  });

  return Object.freeze({
    preload(narration = {}, fallbackTitle = '') {
      if (!narration.enabled || !narration.url) return Promise.resolve({ status: 'stopped' });
      return manager.preload(narration.url, AUDIO_SCOPE.TOUR, optionsFor(narration, fallbackTitle));
    },
    play(narration = {}, fallbackTitle = '') {
      if (!narration.enabled || !narration.url) return Promise.resolve({ status: 'stopped' });
      return manager.playNarration(narration.url, AUDIO_SCOPE.TOUR, optionsFor(narration, fallbackTitle));
    },
  });
}

export default createTourAudioController;
