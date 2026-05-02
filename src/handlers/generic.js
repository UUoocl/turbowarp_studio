export const sendRequest = async (extension, args) => {
  if (!extension.obs || !extension.connected) return 'Not connected';
  try {
    const method = args.METHOD;
    const params = JSON.parse(args.JSON || '{}');
    const response = await extension.obs.call(method, params);
    return JSON.stringify(response);
  } catch (err) {
    return `Error: ${err.message}`;
  }
};

export const setSubscription = (extension, args) => {
  const sub = args.SUB;
  const state = args.STATE === 'true';
  if (extension.subscriptions.hasOwnProperty(sub)) {
    extension.subscriptions[sub] = state;
    console.log(`Subscription ${sub} set to ${state}`);
  }
};

export const getLastEventName = (extension) => {
  return extension.lastEventType;
};

export const getLastEventData = (extension) => {
  return JSON.stringify(extension.lastEventData);
};

export const getEventProperty = (extension, args) => {
  const prop = args.PROP;
  if (extension.lastEventData && extension.lastEventData.hasOwnProperty(prop)) {
    return extension.lastEventData[prop];
  }
  return '';
};
