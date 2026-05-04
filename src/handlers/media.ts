import OBSWebSocketExtension from "../extension";

export const controlStream = async (
  extension: OBSWebSocketExtension,
  args: { ACTION: string }
) => {
  if (!extension.obs || !extension.connected) return;
  await (extension.obs as any).call(args.ACTION + "Stream");
};

export const controlRecord = async (
  extension: OBSWebSocketExtension,
  args: { ACTION: string }
) => {
  if (!extension.obs || !extension.connected) return;
  await (extension.obs as any).call(args.ACTION + "Record");
};

export const controlVirtualCam = async (
  extension: OBSWebSocketExtension,
  args: { ACTION: string }
) => {
  if (!extension.obs || !extension.connected) return;
  await (extension.obs as any).call(args.ACTION + "VirtualCam");
};
