export const whenSceneBecomes = (extension, args) => {
  return extension.currentSceneName === args.SCENE;
};

export const whenEvent = (extension, args) => {
  return true; 
};

export const whenSceneChanged = () => true;
export const whenRecordStateChanged = () => true;
export const whenStreamStateChanged = () => true;
export const whenVirtualCamStateChanged = () => true;
