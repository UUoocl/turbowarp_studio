import { getBlocks, getMenus } from "./blocks";
import * as connectionHandlers from "./handlers/connection";
import * as sceneHandlers from "./handlers/scenes";
import * as mediaHandlers from "./handlers/media";
import * as audioHandlers from "./handlers/audio";
import * as eventHandlers from "./handlers/events";
import * as genericHandlers from "./handlers/generic";
import OBSWebSocket from "obs-websocket-js";

class OBSWebSocketExtension implements Scratch.Extension {
  runtime: VM.Runtime;
  obs: OBSWebSocket | null;
  connected: boolean;
  lastEventData: any;
  lastEventType: string;
  subscriptions: Record<string, boolean>;
  sceneCache: any[];
  videoSettings: { baseWidth: number; baseHeight: number; [key: string]: any };
  currentSceneItems: any[];
  currentSceneName: string;

  constructor() {
    this.runtime = Scratch.vm.runtime;
    this.obs = null;
    this.connected = false;
    this.lastEventData = {};
    this.lastEventType = "";

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
      SceneItemTransformChanged: false,
    };

    this.sceneCache = [];
    this.videoSettings = { baseWidth: 1920, baseHeight: 1080 };
    this.currentSceneItems = [];
    this.currentSceneName = "";

    this.runtime.on("PROJECT_STOP_ALL", () => {
      this.disconnect();
    });
  }

  getInfo(): Scratch.Info {
    return {
      id: "obswebsocket",
      name: "OBS WebSocket",
      color1: "#000000",
      color2: "#2b2e33",
      blocks: getBlocks(this),
      menus: getMenus(this),
    };
  }

  // Internal helpers
  async updateVideoSettings() {
    if (!this.obs || !this.connected) return;
    try {
      const settings = await this.obs.call("GetVideoSettings");
      this.videoSettings = settings;
      console.log("OBS Video Settings:", settings);
    } catch (e) {}
  }

  async updateCurrentSceneItems() {
    if (!this.obs || !this.connected) return;
    try {
      const scene = await this.obs.call("GetCurrentProgramScene");
      this.currentSceneName = scene.sceneName;
      const items = await this.obs.call("GetSceneItemList", {
        sceneName: scene.sceneName,
      });
      this.currentSceneItems = items.sceneItems;
      console.log(
        `Updated items for scene "${scene.sceneName}":`,
        this.currentSceneItems.length
      );
    } catch (e) {
      console.error("Failed to update scene items:", e);
    }
  }

  // Helper menus
  getSceneMenu() {
    if (this.sceneCache.length === 0) return ['Click "Update Lists" first'];
    return this.sceneCache.map((s) => s.sceneName);
  }

  getItemMenu() {
    if (this.sceneCache.length === 0) return ['Click "Update Lists" first'];
    const items: { text: string; value: string }[] = [];
    this.sceneCache.forEach((scene) => {
      scene.items.forEach((item: any) => {
        items.push({
          text: `${scene.sceneName} > ${item.name}`,
          value: `${scene.sceneName}|${item.id}|${item.name}`,
        });
      });
    });
    return items;
  }

  // Bind handlers
  connect(args: any) {
    return (connectionHandlers as any).connect(this, args);
  }
  disconnect() {
    return (connectionHandlers as any).disconnect(this);
  }
  isConnected() {
    return (connectionHandlers as any).isConnected(this);
  }

  refreshCache() {
    return (sceneHandlers as any).refreshCache(this);
  }
  setSceneItemEnabled(args: any) {
    return (sceneHandlers as any).setSceneItemEnabled(this, args);
  }
  switchScene(args: any) {
    return (sceneHandlers as any).switchScene(this, args);
  }
  getCurrentSceneName() {
    return (sceneHandlers as any).getCurrentSceneName(this);
  }
  getSourceCount() {
    return (sceneHandlers as any).getSourceCount(this);
  }
  getSourceData(args: any) {
    return (sceneHandlers as any).getSourceData(this, args);
  }
  getSourceTransform(args: any) {
    return (sceneHandlers as any).getSourceTransform(this, args);
  }
  getAllSourcesJSON() {
    return (sceneHandlers as any).getAllSourcesJSON(this);
  }

  controlStream(args: any) {
    return (mediaHandlers as any).controlStream(this, args);
  }
  controlRecord(args: any) {
    return (mediaHandlers as any).controlRecord(this, args);
  }
  controlVirtualCam(args: any) {
    return (mediaHandlers as any).controlVirtualCam(this, args);
  }

  setInputMute(args: any) {
    return (audioHandlers as any).setInputMute(this, args);
  }
  toggleInputMute(args: any) {
    return (audioHandlers as any).toggleInputMute(this, args);
  }
  setInputVolume(args: any) {
    return (audioHandlers as any).setInputVolume(this, args);
  }

  setSpriteStretch(args: any, util: any) {
    return (sceneHandlers as any).setSpriteStretch(this, args, util);
  }

  whenSceneBecomes(args: any) {
    return (eventHandlers as any).whenSceneBecomes(this, args);
  }
  whenEvent(args: any) {
    return (eventHandlers as any).whenEvent(this, args);
  }
  whenSceneChanged() {
    return (eventHandlers as any).whenSceneChanged();
  }
  whenRecordStateChanged() {
    return (eventHandlers as any).whenRecordStateChanged();
  }
  whenStreamStateChanged() {
    return (eventHandlers as any).whenStreamStateChanged();
  }
  whenVirtualCamStateChanged() {
    return (eventHandlers as any).whenVirtualCamStateChanged();
  }

  sendRequest(args: any) {
    return (genericHandlers as any).sendRequest(this, args);
  }
  setSubscription(args: any) {
    return (genericHandlers as any).setSubscription(this, args);
  }
  getLastEventName() {
    return (genericHandlers as any).getLastEventName(this);
  }
  getLastEventData() {
    return (genericHandlers as any).getLastEventData(this);
  }
  getEventProperty(args: any) {
    return (genericHandlers as any).getEventProperty(this, args);
  }
}

export default OBSWebSocketExtension;
