import { getBlocks, getMenus } from './blocks.js';
import * as connectionHandlers from './handlers/connection.js';
import * as sceneHandlers from './handlers/scenes.js';
import * as mediaHandlers from './handlers/media.js';
import * as audioHandlers from './handlers/audio.js';
import * as eventHandlers from './handlers/events.js';
import * as genericHandlers from './handlers/generic.js';

class OBSWebSocketExtension {
  constructor() {
    this.runtime = Scratch.vm.runtime;
    this.obs = null;
    this.connected = false;
    this.lastEventData = {};
    this.lastEventType = '';
    
    // Default subscriptions
    this.subscriptions = {
      General: true,
      Config: true,
      Scenes: true,
      Inputs: true,
      Transitions: true,
      Filters: true,
      Outputs: true,
      SceneItems: true,
      MediaInputs: true,
      Vendors: true,
      Ui: true,
      InputVolumeMeters: false,
      InputActiveStateChanged: false,
      InputShowStateChanged: false,
      SceneItemTransformChanged: false
    };

    this.sceneCache = []; 
    this.videoSettings = { baseWidth: 1920, baseHeight: 1080 };
    this.currentSceneItems = [];
    this.currentSceneName = '';
    
    Scratch.vm.runtime.on('PROJECT_STOP_ALL', () => {
      this.disconnect();
    });
  }

  getInfo() {
    return {
      id: 'obswebsocket',
      name: 'OBS WebSocket',
      color1: '#000000',
      color2: '#2b2e33',
      blocks: getBlocks(this),
      menus: getMenus(this)
    };
  }

  // Internal helpers
  async updateVideoSettings() {
    if (!this.obs || !this.connected) return;
    try {
      const settings = await this.obs.call('GetVideoSettings');
      this.videoSettings = settings;
      console.log('OBS Video Settings:', settings);
    } catch (e) {}
  }

  async updateCurrentSceneItems() {
    if (!this.obs || !this.connected) return;
    try {
      const scene = await this.obs.call('GetCurrentProgramScene');
      this.currentSceneName = scene.sceneName;
      const items = await this.obs.call('GetSceneItemList', { sceneName: scene.sceneName });
      this.currentSceneItems = items.sceneItems;
      console.log(`Updated items for scene "${scene.sceneName}":`, this.currentSceneItems.length);
    } catch (e) {
      console.error('Failed to update scene items:', e);
    }
  }

  // Helper menus
  getSceneMenu() {
    if (this.sceneCache.length === 0) return ['Click "Update Lists" first'];
    return this.sceneCache.map(s => s.sceneName);
  }

  getItemMenu() {
    if (this.sceneCache.length === 0) return ['Click "Update Lists" first'];
    const items = [];
    this.sceneCache.forEach(scene => {
      scene.items.forEach(item => {
        items.push({
          text: `${scene.sceneName} > ${item.name}`,
          value: `${scene.sceneName}|${item.id}|${item.name}`
        });
      });
    });
    return items;
  }

  // Bind handlers
  connect(args) { return connectionHandlers.connect(this, args); }
  disconnect() { return connectionHandlers.disconnect(this); }
  isConnected() { return connectionHandlers.isConnected(this); }

  refreshCache() { return sceneHandlers.refreshCache(this); }
  setSceneItemEnabled(args) { return sceneHandlers.setSceneItemEnabled(this, args); }
  switchScene(args) { return sceneHandlers.switchScene(this, args); }
  getCurrentSceneName() { return sceneHandlers.getCurrentSceneName(this); }
  getSourceCount() { return sceneHandlers.getSourceCount(this); }
  getSourceData(args) { return sceneHandlers.getSourceData(this, args); }
  getSourceTransform(args) { return sceneHandlers.getSourceTransform(this, args); }
  getAllSourcesJSON() { return sceneHandlers.getAllSourcesJSON(this); }

  controlStream(args) { return mediaHandlers.controlStream(this, args); }
  controlRecord(args) { return mediaHandlers.controlRecord(this, args); }
  controlVirtualCam(args) { return mediaHandlers.controlVirtualCam(this, args); }

  setInputMute(args) { return audioHandlers.setInputMute(this, args); }
  toggleInputMute(args) { return audioHandlers.toggleInputMute(this, args); }
  setInputVolume(args) { return audioHandlers.setInputVolume(this, args); }

  setSpriteStretch(args, util) {
    return sceneHandlers.setSpriteStretch(this, args, util);
  }

  whenSceneBecomes(args) { return eventHandlers.whenSceneBecomes(this, args); }
  whenEvent(args) { return eventHandlers.whenEvent(this, args); }
  whenSceneChanged() { return eventHandlers.whenSceneChanged(); }
  whenRecordStateChanged() { return eventHandlers.whenRecordStateChanged(); }
  whenStreamStateChanged() { return eventHandlers.whenStreamStateChanged(); }
  whenVirtualCamStateChanged() { return eventHandlers.whenVirtualCamStateChanged(); }

  sendRequest(args) { return genericHandlers.sendRequest(this, args); }
  setSubscription(args) { return genericHandlers.setSubscription(this, args); }
  getLastEventName() { return genericHandlers.getLastEventName(this); }
  getLastEventData() { return genericHandlers.getLastEventData(this); }
  getEventProperty(args) { return genericHandlers.getEventProperty(this, args); }
}

export default OBSWebSocketExtension;
