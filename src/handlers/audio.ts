import OBSWebSocketExtension from "../extension";

export const setInputMute = async (
  extension: OBSWebSocketExtension,
  args: { INPUT: string; STATE: string }
) => {
  if (!extension.obs || !extension.connected) return;
  await extension.obs.call("SetInputMute", {
    inputName: args.INPUT,
    inputMuted: args.STATE === "true",
  });
};

export const toggleInputMute = async (
  extension: OBSWebSocketExtension,
  args: { INPUT: string }
) => {
  if (!extension.obs || !extension.connected) return;
  await extension.obs.call("ToggleInputMute", { inputName: args.INPUT });
};

export const setInputVolume = async (
  extension: OBSWebSocketExtension,
  args: { INPUT: string; VOLUME: string }
) => {
  if (!extension.obs || !extension.connected) return;
  const vol = parseFloat(args.VOLUME) / 100;
  await extension.obs.call("SetInputVolume", {
    inputName: args.INPUT,
    inputVolumeMul: vol,
  });
};
