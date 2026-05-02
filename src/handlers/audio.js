export const setInputMute = async (extension, args) => {
  if (!extension.obs || !extension.connected) return;
  await extension.obs.call('SetInputMute', { inputName: args.INPUT, inputMuted: args.STATE === 'true' });
};

export const toggleInputMute = async (extension, args) => {
  if (!extension.obs || !extension.connected) return;
  await extension.obs.call('ToggleInputMute', { inputName: args.INPUT });
};

export const setInputVolume = async (extension, args) => {
  if (!extension.obs || !extension.connected) return;
  const vol = parseFloat(args.VOLUME) / 100;
  await extension.obs.call('SetInputVolume', { inputName: args.INPUT, inputVolumeMul: vol });
};
