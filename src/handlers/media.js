export const controlStream = async (extension, args) => {
  if (!extension.obs || !extension.connected) return;
  await extension.obs.call(args.ACTION + 'Stream');
};

export const controlRecord = async (extension, args) => {
  if (!extension.obs || !extension.connected) return;
  await extension.obs.call(args.ACTION + 'Record');
};

export const controlVirtualCam = async (extension, args) => {
  if (!extension.obs || !extension.connected) return;
  await extension.obs.call(args.ACTION + 'VirtualCam');
};
