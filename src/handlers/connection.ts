import OBSWebSocket, { EventSubscription } from "obs-websocket-js";
import OBSWebSocketExtension from "../extension";

export const connect = async (
  extension: OBSWebSocketExtension,
  args: { URL?: string; PASS?: string }
) => {
  const url = args.URL || "ws://127.0.0.1:4455";
  const password = args.PASS || "";

  try {
    if (extension.obs) {
      await extension.disconnect();
    }

    extension.obs = new OBSWebSocket();

    const originalEmit = (extension.obs as any).emit;
    (extension.obs as any).emit = (event: string, data: any) => {
      const internalEvents = [
        "ConnectionOpened",
        "Hello",
        "Identified",
        "ConnectionClosed",
        "ConnectionError",
      ];
      if (!internalEvents.includes(event)) {
        extension.lastEventType = event;
        extension.lastEventData = data || {};

        console.log(`[OBS] Triggering event: ${event}`);

        // Generic Event Hat
        extension.runtime.startHats("obswebsocket_whenEvent", {
          EVENT: event,
        });

        // Dedicated Event Hats
        if (event === "CurrentProgramSceneChanged") {
          extension.currentSceneName = data.sceneName;
          extension.updateCurrentSceneItems();
          extension.runtime.startHats("obswebsocket_whenSceneChanged");
          extension.runtime.startHats("obswebsocket_whenSceneBecomes", {
            SCENE: data.sceneName,
          });
        }
        if (event === "RecordStateChanged")
          extension.runtime.startHats("obswebsocket_whenRecordStateChanged");
        if (event === "StreamStateChanged")
          extension.runtime.startHats("obswebsocket_whenStreamStateChanged");
        if (event === "VirtualcamStateChanged")
          extension.runtime.startHats(
            "obswebsocket_whenVirtualCamStateChanged"
          );

        // Internal Cache Updates
        if (
          event === "SceneItemTransformChanged" &&
          data.sceneName === extension.currentSceneName
        ) {
          const item = extension.currentSceneItems.find(
            (i) => i.sceneItemId === data.sceneItemId
          );
          if (item) item.sceneItemTransform = data.sceneItemTransform;
        }
        if (
          event === "SceneItemEnableStateChanged" &&
          data.sceneName === extension.currentSceneName
        ) {
          const item = extension.currentSceneItems.find(
            (i) => i.sceneItemId === data.sceneItemId
          );
          if (item) item.sceneItemEnabled = data.sceneItemEnabled;
        }
      }
      return originalEmit.call(extension.obs, event, data);
    };

    // Calculate bitmask
    let subs = 0;
    const SubEnum: any = EventSubscription || {
      General: 1,
      Config: 2,
      Scenes: 4,
      Inputs: 8,
      Transitions: 16,
      Filters: 32,
      Outputs: 64,
      SceneItems: 128,
      MediaInputs: 256,
      Vendors: 512,
      Ui: 1024,
      InputVolumeMeters: 65536,
      InputActiveStateChanged: 131072,
      InputShowStateChanged: 262144,
      SceneItemTransformChanged: 524288,
    };

    Object.keys(extension.subscriptions).forEach((key) => {
      if (extension.subscriptions[key] && SubEnum[key]) {
        subs |= SubEnum[key];
      }
    });

    await extension.obs!.connect(url, password, { eventSubscriptions: subs });

    extension.connected = true;
    console.log("OBS Connected with subs:", subs);

    // Initialize visualization data
    await extension.updateVideoSettings();
    await extension.updateCurrentSceneItems();
  } catch (err) {
    console.error("OBS Connection Error:", err);
    extension.connected = false;
    extension.obs = null;
  }
};

export const disconnect = async (extension: OBSWebSocketExtension) => {
  if (extension.obs) {
    try {
      await extension.obs.disconnect();
    } catch (e) {}
    extension.obs = null;
  }
  extension.connected = false;
};

export const isConnected = (extension: OBSWebSocketExtension) => {
  return extension.connected;
};
