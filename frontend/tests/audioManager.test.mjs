import assert from 'node:assert/strict';
import AudioManager from '../src/vr360-viewer/common/audio/AudioManager.js';
import { AUDIO_SCOPE, AUDIO_STATUS } from '../src/vr360-viewer/common/audio/constants.js';

class FakeAudio {
  static instances = [];

  constructor(src) {
    this.src = src;
    this.paused = true;
    this.ended = false;
    this.currentTime = 0;
    this.duration = 120;
    this.readyState = 4;
    this.volume = 1;
    this.muted = false;
    this.loop = false;
    this.playbackRate = 1;
    this.listeners = new Map();
    FakeAudio.instances.push(this);
  }

  addEventListener(type, listener, options = {}) {
    const listeners = this.listeners.get(type) || [];
    listeners.push({ listener, once: Boolean(options.once) });
    this.listeners.set(type, listeners);
  }

  removeEventListener(type, listener) {
    this.listeners.set(type, (this.listeners.get(type) || []).filter((item) => item.listener !== listener));
  }

  dispatch(type, cause) {
    const listeners = [...(this.listeners.get(type) || [])];
    listeners.forEach((item) => {
      item.listener(cause);
      if (item.once) this.removeEventListener(type, item.listener);
    });
  }

  play() {
    this.paused = false;
    this.ended = false;
    return Promise.resolve();
  }

  pause() { this.paused = true; }
  load() {}
  removeAttribute() {}
}

globalThis.Audio = FakeAudio;

const manager = new AudioManager();
const tour = await manager.playNarration('tour.mp3', AUDIO_SCOPE.TOUR, { title: 'Tour' });
assert.equal(tour.status, AUDIO_STATUS.PLAYING);
assert.equal(manager.getActiveSession().sourceType, 'tour');
assert.equal(manager.getActiveSession().status, AUDIO_STATUS.PLAYING);

const poi = await manager.playNarration('poi.mp3', AUDIO_SCOPE.POI, { title: 'POI' });
assert.equal(poi.status, AUDIO_STATUS.PLAYING);
assert.equal(manager.getActiveSession().sourceType, 'poi');
assert.equal(FakeAudio.instances[0].paused, true, 'POI must pause Tour by priority');

FakeAudio.instances[1].ended = true;
FakeAudio.instances[1].paused = true;
FakeAudio.instances[1].dispatch('ended');
await new Promise((resolve) => setImmediate(resolve));
assert.equal(manager.getActiveSession().sourceType, 'tour');
assert.equal(manager.getActiveSession().status, AUDIO_STATUS.PLAYING, 'Tour must resume after POI ends');

manager.dispose();

class RejectedAudio extends FakeAudio {
  play() {
    return Promise.reject(new Error('NotAllowedError'));
  }
}

globalThis.Audio = RejectedAudio;
const rejectedManager = new AudioManager();
const rejected = await rejectedManager.playNarration('blocked.mp3', AUDIO_SCOPE.TOUR);
assert.equal(rejected.blocked, true, 'A rejected browser play() call must be surfaced');
assert.equal(rejectedManager.getActiveSession().status, AUDIO_STATUS.ERROR);
rejectedManager.dispose();
delete globalThis.Audio;
console.log('AudioManager tests passed');
