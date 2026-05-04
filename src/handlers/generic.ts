import OBSWebSocketExtension from "../extension";

export const sendRequest = async (
  extension: OBSWebSocketExtension,
  args: { METHOD: string; JSON: string }
) => {
  if (!extension.obs || !extension.connected) return "Not connected";
  try {
    const method = args.METHOD as any;
    const params = JSON.parse(args.JSON || "{}");
    const response = await extension.obs.call(method, params);
    return JSON.stringify(response);
  } catch (err: any) {
    return `Error: ${err.message}`;
  }
};

export const setSubscription = (
  extension: OBSWebSocketExtension,
  args: { SUB: string; STATE: string }
) => {
  const sub = args.SUB;
  const state = args.STATE === "true";
  if (Object.prototype.hasOwnProperty.call(extension.subscriptions, sub)) {
    extension.subscriptions[sub] = state;
    console.log(`Subscription ${sub} set to ${state}`);
  }
};

export const getLastEventName = (extension: OBSWebSocketExtension) => {
  return extension.lastEventType;
};

export const getLastEventData = (extension: OBSWebSocketExtension) => {
  return JSON.stringify(extension.lastEventData);
};

export const getEventProperty = (
  extension: OBSWebSocketExtension,
  args: { PROP: string }
) => {
  const prop = args.PROP;
  if (
    extension.lastEventData &&
    Object.prototype.hasOwnProperty.call(extension.lastEventData, prop)
  ) {
    return extension.lastEventData[prop];
  }
  return "";
};
