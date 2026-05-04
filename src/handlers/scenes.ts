import { obsToScratch, scratchScale } from "../utils";
import OBSWebSocketExtension from "../extension";

export const refreshCache = async (extension: OBSWebSocketExtension) => {
  if (!extension.obs || !extension.connected) return;
  try {
    const scenes = await extension.obs.call("GetSceneList");
    const fullCache: any[] = [];
    for (const s of scenes.scenes as any[]) {
      const items = await extension.obs.call("GetSceneItemList", {
        sceneName: s.sceneName,
      });
      fullCache.push({
        sceneName: s.sceneName,
        items: (items.sceneItems as any[]).map((i) => ({
          name: i.sourceName,
          id: i.sceneItemId,
        })),
      });
    }
    extension.sceneCache = fullCache;
    console.log("OBS Cache Updated:", extension.sceneCache.length, "scenes");

    // Also update current items
    await extension.updateCurrentSceneItems();
  } catch (e) {
    console.error("Failed to refresh OBS cache:", e);
  }
};

export const setSceneItemEnabled = async (
  extension: OBSWebSocketExtension,
  args: { SCENE: string; ITEM: string; STATE: string }
) => {
  if (!extension.obs || !extension.connected) return;

  let sceneName = args.SCENE;
  let itemId: string | number = args.ITEM;

  if (itemId.includes("|")) {
    const parts = itemId.split("|");
    sceneName = parts[0];
    itemId = parseInt(parts[1], 10);
  } else {
    itemId = parseInt(itemId, 10);
  }

  await extension.obs.call("SetSceneItemEnabled", {
    sceneName: sceneName,
    sceneItemId: itemId as number,
    sceneItemEnabled: args.STATE === "true",
  });
};

export const switchScene = async (
  extension: OBSWebSocketExtension,
  args: { SCENE: string }
) => {
  if (!extension.obs || !extension.connected) return;
  await extension.obs.call("SetCurrentProgramScene", { sceneName: args.SCENE });
};

export const getCurrentSceneName = (extension: OBSWebSocketExtension) => {
  return extension.currentSceneName;
};

export const getSourceCount = (extension: OBSWebSocketExtension) => {
  return extension.currentSceneItems.length;
};

export const getSourceData = (
  extension: OBSWebSocketExtension,
  args: { INDEX: number; PROP: string }
) => {
  const index = Math.round(args.INDEX) - 1;
  if (index < 0 || index >= extension.currentSceneItems.length) return "";
  const item = extension.currentSceneItems[index];
  const prop = args.PROP;

  if (prop === "name") return item.sourceName;
  if (prop === "type") return item.inputKind || item.sourceType || "unknown";
  if (prop === "enabled") return item.sceneItemEnabled ? "true" : "false";

  const transform = item.sceneItemTransform;
  const stageWidth = (extension.runtime as any).stageWidth;
  const stageHeight = (extension.runtime as any).stageHeight;
  const scratchPos = obsToScratch(
    transform.positionX,
    transform.positionY,
    transform.width,
    transform.height,
    transform.alignment,
    extension.videoSettings,
    stageWidth,
    stageHeight
  );

  if (prop === "x") return scratchPos.x;
  if (prop === "y") return scratchPos.y;
  if (prop === "width")
    return scratchScale(
      transform.width,
      true,
      extension.videoSettings,
      stageWidth,
      stageHeight
    );
  if (prop === "height")
    return scratchScale(
      transform.height,
      false,
      extension.videoSettings,
      stageWidth,
      stageHeight
    );
  if (prop === "rotation") return transform.rotation;

  return "";
};

export const getSourceTransform = (
  extension: OBSWebSocketExtension,
  args: { NAME: string; PROP: string }
) => {
  const name = args.NAME;
  const item = extension.currentSceneItems.find((i) => i.sourceName === name);
  if (!item) return "";
  const prop = args.PROP;

  if (prop === "enabled") return item.sceneItemEnabled ? "true" : "false";

  const transform = item.sceneItemTransform;
  const stageWidth = (extension.runtime as any).stageWidth;
  const stageHeight = (extension.runtime as any).stageHeight;

  if (prop === "scaleX") return transform.scaleX;
  if (prop === "scaleY") return transform.scaleY;
  if (prop === "rotation") return transform.rotation;

  const scratchPos = obsToScratch(
    transform.positionX,
    transform.positionY,
    transform.width,
    transform.height,
    transform.alignment,
    extension.videoSettings,
    stageWidth,
    stageHeight
  );
  if (prop === "x") return scratchPos.x;
  if (prop === "y") return scratchPos.y;
  if (prop === "width")
    return scratchScale(
      transform.width,
      true,
      extension.videoSettings,
      stageWidth,
      stageHeight
    );
  if (prop === "height")
    return scratchScale(
      transform.height,
      false,
      extension.videoSettings,
      stageWidth,
      stageHeight
    );

  return "";
};

export const getAllSourcesJSON = (extension: OBSWebSocketExtension) => {
  return JSON.stringify(extension.currentSceneItems);
};

export const setSpriteStretch = (
  _extension: OBSWebSocketExtension,
  args: { WIDTH: string; HEIGHT: string },
  util: any
) => {
  const target = util.target;
  if (!target || target.isStage) return;

  const width = parseFloat(args.WIDTH);
  const height = parseFloat(args.HEIGHT);

  const costume = target.getCostumes()[target.currentCostume];
  if (!costume) return;

  const resolution = costume.bitmapResolution || 1;
  const origWidth = costume.size[0] / resolution;
  const origHeight = costume.size[1] / resolution;

  const scaleX = (width / origWidth) * 100;
  const scaleY = (height / origHeight) * 100;

  // Set base size to 100 to avoid conflicts with standard scaling
  target.setSize(100);

  // Apply stretch properties (used by some extensions and internal logic)
  target.stretch = [scaleX, scaleY];

  // Directly manipulate the renderer's drawable scale for non-uniform scaling
  // Swapping X and Y to address the reported transposition issue where width/height were swapped
  if (target.runtime && target.runtime.renderer) {
    target.runtime.renderer.updateDrawableProperties(target.drawableID, {
      scale: [scaleY, scaleX],
    });
  }
};
