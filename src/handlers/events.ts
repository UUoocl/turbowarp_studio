import OBSWebSocketExtension from "../extension";

export const whenSceneBecomes = (
  extension: OBSWebSocketExtension,
  args: { SCENE: string }
) => {
  return extension.currentSceneName === args.SCENE;
};

export const whenEvent = (_extension: OBSWebSocketExtension, _args: any) => {
  return true;
};

export const whenSceneChanged = () => true;
export const whenRecordStateChanged = () => true;
export const whenStreamStateChanged = () => true;
export const whenVirtualCamStateChanged = () => true;
