import { AUDIO_SCOPE } from '../audio/constants.js';

/**
 * POI boundary: accepts a normalized runtime point and translates it into a
 * command for the single AudioManager instance owned by the Viewer layout.
 */
export function createPoiAudioController({ manager } = {}) {
  return Object.freeze({
    play(point = {}) {
      const audio = point.audio || {};
      const source = audio.url || point.audio_url || '';
      if (!source || audio.enabled === false) {
        return Promise.resolve({ status: 'stopped', source });
      }
      return manager.playNarration(source, AUDIO_SCOPE.POI, {
        sourceId: point.id,
        title: audio.title || point.label || 'Audio POI',
        volume: audio.volume,
        loop: audio.loop,
        playbackRate: audio.playbackRate,
      });
    },
  });
}

export default createPoiAudioController;
