import {
  CORE_FACADE_EVENTS,
  CORE_FACADE_NOT_AVAILABLE,
  ViewerCoreFacade,
} from '../../../src/vr360-viewer/index.js';

export const NOT_AVAILABLE = CORE_FACADE_NOT_AVAILABLE;
export const CORE_EVENTS = CORE_FACADE_EVENTS;

function assertFacade(facade) {
  if (!(facade instanceof ViewerCoreFacade)) {
    throw new TypeError('ViewerAdapter requires a ViewerCoreFacade instance.');
  }
}

/**
 * V2 boundary. UI talks to this adapter; this adapter only talks to the public
 * ViewerCoreFacade and never imports runtime implementation modules.
 */
export class ViewerAdapter {
  #facade = null;
  #connected = false;
  #eventUnsubscribers = [];
  #listeners = new Map();

  constructor(facade) {
    assertFacade(facade);
    this.#facade = facade;
  }

  get facade() {
    return this.#facade;
  }

  get connected() {
    return this.#connected;
  }

  get capabilities() {
    return this.#facade.getCapabilities();
  }

  setFacade(facade) {
    assertFacade(facade);
    const reconnect = this.#connected;
    if (reconnect) this.disconnect();
    this.#facade = facade;
    if (reconnect) this.connect();
    return this;
  }

  connect() {
    if (this.#connected) return this;
    this.#connected = true;
    this.#facade.connect();
    for (const eventName of CORE_EVENTS) {
      this.#eventUnsubscribers.push(
        this.#facade.on(eventName, (payload) => this.#publish(eventName, payload)),
      );
    }
    return this;
  }

  disconnect() {
    for (const unsubscribe of this.#eventUnsubscribers.splice(0)) unsubscribe();
    this.#facade.disconnect();
    this.#connected = false;
    return this;
  }

  destroy() {
    this.disconnect();
    this.#listeners.clear();
    this.#facade = null;
  }

  on(eventName, callback) {
    if (!CORE_EVENTS.includes(eventName)) {
      throw new RangeError(`Unsupported core facade event: ${eventName}`);
    }
    if (typeof callback !== 'function') throw new TypeError('Event callback must be a function.');
    const listeners = this.#listeners.get(eventName) || new Set();
    listeners.add(callback);
    this.#listeners.set(eventName, listeners);
    return () => this.off(eventName, callback);
  }

  off(eventName, callback) {
    const listeners = this.#listeners.get(eventName);
    if (!listeners) return false;
    const removed = listeners.delete(callback);
    if (listeners.size === 0) this.#listeners.delete(eventName);
    return removed;
  }

  getScenes() { return this.#facade.getScenes(); }
  getCurrentScene() { return this.#facade.getCurrentScene(); }
  getCurrentSceneId() { return this.#facade.getCurrentSceneId(); }
  getCurrentSceneIndex() { return this.#facade.getCurrentSceneIndex(); }
  getSceneState() { return this.#facade.getSceneState(); }
  isFirstScene() { return this.#facade.isFirstScene(); }
  isLastScene() { return this.#facade.isLastScene(); }
  goToScene(sceneId, options) { return this.#facade.goToScene(sceneId, options); }
  nextScene() { return this.#facade.nextScene(); }
  previousScene() { return this.#facade.previousScene(); }

  getView() { return this.#facade.getView(); }
  setView(view, options) { return this.#facade.setView(view, options); }
  resetView() { return this.#facade.resetView(); }
  getViewMode() { return this.#facade.getViewMode(); }
  setViewMode(mode) { return this.#facade.setViewMode(mode); }
  getAvailableViewModes() { return this.#facade.getAvailableViewModes(); }
  getFov() { return this.#facade.getFov(); }
  setFov(fov) { return this.#facade.setFov(fov); }
  zoomIn(step) { return this.#facade.zoomIn(step); }
  zoomOut(step) { return this.#facade.zoomOut(step); }

  getAudioState() { return this.#facade.getAudioState(); }
  playAudio() { return this.#facade.playAudio(); }
  pauseAudio() { return this.#facade.pauseAudio(); }
  resumeAudio() { return this.#facade.resumeAudio(); }
  toggleAudio() { return this.#facade.toggleAudio(); }
  stopAudio() { return this.#facade.stopAudio(); }
  seekAudio(time) { return this.#facade.seekAudio(time); }
  getAudioCurrentTime() { return this.#facade.getAudioCurrentTime(); }
  getAudioDuration() { return this.#facade.getAudioDuration(); }
  getAudioVolume() { return this.#facade.getAudioVolume(); }
  setAudioVolume(volume) { return this.#facade.setAudioVolume(volume); }
  isAudioPlaying() { return this.#facade.isAudioPlaying(); }
  isAudioPaused() { return this.#facade.isAudioPaused(); }
  isAudioMuted() { return this.#facade.isAudioMuted(); }
  setAudioMuted(muted) { return this.#facade.setAudioMuted(muted); }

  startAutorotate() { return this.#facade.startAutorotate(); }
  stopAutorotate() { return this.#facade.stopAutorotate(); }
  toggleAutorotate(force) { return this.#facade.toggleAutorotate(force); }
  getAutorotateState() { return this.#facade.getAutorotateState(); }
  isAutorotateEnabled() { return this.#facade.isAutorotateEnabled(); }

  enterFullscreen() { return this.#facade.enterFullscreen(); }
  exitFullscreen() { return this.#facade.exitFullscreen(); }
  toggleFullscreen() { return this.#facade.toggleFullscreen(); }
  isFullscreen() { return this.#facade.isFullscreen(); }

  getIntroState() { return this.#facade.getIntroState(); }
  startIntro() { return this.#facade.startIntro(); }

  #publish(eventName, payload) {
    const listeners = this.#listeners.get(eventName);
    if (!listeners) return;
    for (const callback of [...listeners]) callback(payload);
  }
}

export default ViewerAdapter;
