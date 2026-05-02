export const getBlocks = (extension) => {
  return [
    {
      opcode: 'connect',
      blockType: Scratch.BlockType.COMMAND,
      text: 'connect to OBS at [URL] password [PASS]',
      arguments: {
        URL: { type: Scratch.ArgumentType.STRING, defaultValue: 'ws://127.0.0.1:4455' },
        PASS: { type: Scratch.ArgumentType.STRING, defaultValue: '' }
      }
    },
    {
      opcode: 'disconnect',
      blockType: Scratch.BlockType.COMMAND,
      text: 'disconnect from OBS'
    },
    {
      opcode: 'isConnected',
      blockType: Scratch.BlockType.BOOLEAN,
      text: 'is OBS connected?'
    },
    '---',
    {
      opcode: 'setSubscription',
      blockType: Scratch.BlockType.COMMAND,
      text: 'set subscription [SUB] to [STATE]',
      arguments: {
        SUB: {
          type: Scratch.ArgumentType.STRING,
          menu: 'SUBS_MENU',
          defaultValue: 'General'
        },
        STATE: {
          type: Scratch.ArgumentType.STRING,
          menu: 'STATE_MENU',
          defaultValue: 'true'
        }
      }
    },
    {
      opcode: 'setSpriteStretch',
      blockType: Scratch.BlockType.COMMAND,
      text: 'stretch sprite to width [WIDTH] height [HEIGHT]',
      arguments: {
        WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
        HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
      }
    },
    '---',
    {
      opcode: 'whenSceneChanged',
      blockType: Scratch.BlockType.EVENT,
      isEdgeActivated: false,
      text: 'when OBS scene changes'
    },
    {
      opcode: 'whenRecordStateChanged',
      blockType: Scratch.BlockType.EVENT,
      isEdgeActivated: false,
      text: 'when OBS recording starts or stops'
    },
    {
      opcode: 'whenStreamStateChanged',
      blockType: Scratch.BlockType.EVENT,
      isEdgeActivated: false,
      text: 'when OBS streaming starts or stops'
    },
    {
      opcode: 'whenVirtualCamStateChanged',
      blockType: Scratch.BlockType.EVENT,
      isEdgeActivated: false,
      text: 'when OBS virtual cam starts or stops'
    },
    '---',
    {
      opcode: 'refreshCache',
      blockType: Scratch.BlockType.COMMAND,
      text: 'update OBS scene and item lists'
    },
    {
      opcode: 'setSceneItemEnabled',
      blockType: Scratch.BlockType.COMMAND,
      text: 'set item [ITEM] in scene [SCENE] to active [STATE]',
      arguments: {
        SCENE: {
          type: Scratch.ArgumentType.STRING,
          menu: 'SCENE_MENU',
          defaultValue: 'Scene'
        },
        ITEM: {
          type: Scratch.ArgumentType.STRING,
          menu: 'ITEM_MENU',
          defaultValue: 'Item'
        },
        STATE: {
          type: Scratch.ArgumentType.STRING,
          menu: 'STATE_MENU',
          defaultValue: 'true'
        }
      }
    },
    '---',
    {
      opcode: 'switchScene',
      blockType: Scratch.BlockType.COMMAND,
      text: 'switch to OBS scene [SCENE]',
      arguments: {
        SCENE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Scene' }
      }
    },
    {
      opcode: 'controlStream',
      blockType: Scratch.BlockType.COMMAND,
      text: '[ACTION] OBS streaming',
      arguments: {
        ACTION: {
          type: Scratch.ArgumentType.STRING,
          menu: 'ACTION_MENU',
          defaultValue: 'Toggle'
        }
      }
    },
    {
      opcode: 'controlRecord',
      blockType: Scratch.BlockType.COMMAND,
      text: '[ACTION] OBS recording',
      arguments: {
        ACTION: {
          type: Scratch.ArgumentType.STRING,
          menu: 'ACTION_MENU',
          defaultValue: 'Toggle'
        }
      }
    },
    {
      opcode: 'controlVirtualCam',
      blockType: Scratch.BlockType.COMMAND,
      text: '[ACTION] OBS virtual cam',
      arguments: {
        ACTION: {
          type: Scratch.ArgumentType.STRING,
          menu: 'ACTION_MENU',
          defaultValue: 'Toggle'
        }
      }
    },
    '---',
    {
      opcode: 'setInputMute',
      blockType: Scratch.BlockType.COMMAND,
      text: 'set mute for [INPUT] to [STATE]',
      arguments: {
        INPUT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Mic/Aux' },
        STATE: {
          type: Scratch.ArgumentType.STRING,
          menu: 'MUTE_MENU',
          defaultValue: 'true'
        }
      }
    },
    {
      opcode: 'toggleInputMute',
      blockType: Scratch.BlockType.COMMAND,
      text: 'toggle mute for [INPUT]',
      arguments: {
        INPUT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Mic/Aux' }
      }
    },
    {
      opcode: 'setInputVolume',
      blockType: Scratch.BlockType.COMMAND,
      text: 'set volume for [INPUT] to [VOLUME]%',
      arguments: {
        INPUT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Mic/Aux' },
        VOLUME: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
      }
    },
    '---',
    {
      opcode: 'sendRequest',
      blockType: Scratch.BlockType.REPORTER,
      text: 'OBS request [METHOD] params [JSON]',
      arguments: {
        METHOD: { type: Scratch.ArgumentType.STRING, defaultValue: 'GetVersion' },
        JSON: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' }
      }
    },
    '---',
    {
      opcode: 'whenEvent',
      blockType: Scratch.BlockType.EVENT,
      isEdgeActivated: false,
      text: 'when OBS event [EVENT] occurs',
      arguments: {
        EVENT: { 
          type: Scratch.ArgumentType.STRING, 
          menu: 'EVENT_MENU',
          defaultValue: 'CurrentProgramSceneChanged' 
        }
      }
    },
    {
      opcode: 'getLastEventName',
      blockType: Scratch.BlockType.REPORTER,
      text: 'last OBS event name'
    },
    {
      opcode: 'getLastEventData',
      blockType: Scratch.BlockType.REPORTER,
      text: 'last OBS event data'
    },
    '---',
    {
      opcode: 'getCurrentSceneName',
      blockType: Scratch.BlockType.REPORTER,
      text: 'current OBS scene name'
    },
    {
      opcode: 'getSourceCount',
      blockType: Scratch.BlockType.REPORTER,
      text: 'count of sources in current scene'
    },
    {
      opcode: 'getSourceData',
      blockType: Scratch.BlockType.REPORTER,
      text: 'data for source [INDEX] [PROP]',
      arguments: {
        INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
        PROP: { 
          type: Scratch.ArgumentType.STRING, 
          menu: 'SOURCE_PROP_MENU',
          defaultValue: 'name' 
        }
      }
    },
    {
      opcode: 'getSourceTransform',
      blockType: Scratch.BlockType.REPORTER,
      text: 'transform of source [NAME] [PROP]',
      arguments: {
        NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'Source' },
        PROP: { 
          type: Scratch.ArgumentType.STRING, 
          menu: 'TRANSFORM_MENU',
          defaultValue: 'x' 
        }
      }
    },
    {
      opcode: 'getAllSourcesJSON',
      blockType: Scratch.BlockType.REPORTER,
      text: 'all OBS sources as JSON'
    },
    '---',
    {
      opcode: 'whenSceneBecomes',
      blockType: Scratch.BlockType.EVENT,
      isEdgeActivated: false,
      text: 'when OBS scene becomes [SCENE]',
      arguments: {
        SCENE: { 
          type: Scratch.ArgumentType.STRING, 
          menu: 'SCENE_MENU',
          defaultValue: 'Scene' 
        }
      }
    }
  ];
};

export const getMenus = (extension) => {
  return {
    SCENE_MENU: {
      acceptReporters: true,
      items: 'getSceneMenu'
    },
    ITEM_MENU: {
      acceptReporters: true,
      items: 'getItemMenu'
    },
    SUBS_MENU: {
      acceptReporters: true,
      items: Object.keys(extension.subscriptions)
    },
    STATE_MENU: {
      acceptReporters: true,
      items: ['true', 'false']
    },
    ACTION_MENU: {
      acceptReporters: true,
      items: ['Start', 'Stop', 'Toggle']
    },
    MUTE_MENU: {
      acceptReporters: true,
      items: ['true', 'false']
    },
    EVENT_MENU: {
      acceptReporters: true,
      items: [
        'CurrentProgramSceneChanged',
        'CurrentPreviewSceneChanged',
        'RecordStateChanged',
        'StreamStateChanged',
        'VirtualcamStateChanged',
        'InputMuteStateChanged',
        'InputVolumeChanged',
        'SceneItemVisibilityChanged',
        'InputActiveStateChanged',
        'InputShowStateChanged',
        'SourceFilterEnableStateChanged'
      ]
    },
    SOURCE_PROP_MENU: {
      acceptReporters: true,
      items: ['name', 'x', 'y', 'width', 'height', 'rotation', 'enabled']
    },
    TRANSFORM_MENU: {
      acceptReporters: true,
      items: ['x', 'y', 'width', 'height', 'rotation', 'scaleX', 'scaleY', 'enabled']
    }
  };
};
