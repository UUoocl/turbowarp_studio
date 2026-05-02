import json
import zipfile
import os

def create_demo_sb3(filename):
    # Minimal project.json
    project = {
        "targets": [
            {
                "isStage": True,
                "name": "Stage",
                "variables": {},
                "lists": {},
                "broadcasts": {},
                "blocks": {},
                "comments": {},
                "currentCostume": 0,
                "costumes": [
                    {
                        "name": "backdrop1",
                        "dataFormat": "svg",
                        "assetId": "cd21514d0531fdffb22204e0ec5ed84a",
                        "md5ext": "cd21514d0531fdffb22204e0ec5ed84a.svg",
                        "rotationCenterX": 320,
                        "rotationCenterY": 180
                    }
                ],
                "sounds": [],
                "volume": 100,
                "layerOrder": 0,
                "tempo": 60,
                "videoTransparency": 50,
                "videoState": "on",
                "textToSpeechLanguage": None
            },
            {
                "isStage": False,
                "name": "OBS_Source",
                "variables": {
                    "i": ["i", 0]
                },
                "lists": {},
                "broadcasts": {
                    "update": "Update Scene",
                    "connect": "Connect",
                    "clear": "Clear"
                },
                "blocks": {
                    "on_connect": {
                        "opcode": "event_whenbroadcastreceived",
                        "next": "connect",
                        "parent": None,
                        "inputs": {},
                        "fields": {
                            "BROADCAST_OPTION": ["Connect", "connect"]
                        },
                        "shadow": False,
                        "topLevel": True,
                        "x": 0,
                        "y": 0
                    },
                    "connect": {
                        "opcode": "obswebsocket_connect",
                        "next": "refresh",
                        "parent": "on_connect",
                        "inputs": {
                            "URL": [1, [10, "ws://127.0.0.1:4455"]],
                            "PASS": [1, [10, "1Jogi2chsgTSH49X"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "refresh": {
                        "opcode": "obswebsocket_refreshCache",
                        "next": "sub_transform",
                        "parent": "connect",
                        "inputs": {},
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "sub_transform": {
                        "opcode": "obswebsocket_setSubscription",
                        "next": None,
                        "parent": "refresh",
                        "inputs": {
                            "SUB": [1, [10, "SceneItemTransformChanged"]],
                            "STATE": [1, [10, "true"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "when_clicked": {
                        "opcode": "event_whenflagclicked",
                        "next": "connect",
                        "parent": None,
                        "inputs": {},
                        "fields": {},
                        "shadow": False,
                        "topLevel": True,
                        "x": 0,
                        "y": 0
                    },
                    "when_scene_change": {
                        "opcode": "obswebsocket_whenSceneChanged",
                        "next": "broadcast_update",
                        "parent": None,
                        "inputs": {},
                        "fields": {},
                        "shadow": False,
                        "topLevel": True,
                        "x": 0,
                        "y": 200
                    },
                    "broadcast_update": {
                        "opcode": "event_broadcast",
                        "next": None,
                        "parent": "when_scene_change",
                        "inputs": {
                            "BROADCAST_INPUT": [1, [11, "Update Scene", "update"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "on_update": {
                        "opcode": "event_whenbroadcastreceived",
                        "next": "broadcast_clear",
                        "parent": None,
                        "inputs": {},
                        "fields": {
                            "BROADCAST_OPTION": ["Update Scene", "update"]
                        },
                        "shadow": False,
                        "topLevel": True,
                        "x": 300,
                        "y": 0
                    },
                    "broadcast_clear": {
                        "opcode": "event_broadcast",
                        "next": "set_i",
                        "parent": "on_update",
                        "inputs": {
                            "BROADCAST_INPUT": [1, [11, "Clear", "clear"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "set_i": {
                        "opcode": "data_setvariableto",
                        "next": "repeat",
                        "parent": "broadcast_clear",
                        "inputs": {
                            "VALUE": [1, [10, "1"]]
                        },
                        "fields": {
                            "VARIABLE": ["i", "i"]
                        },
                        "shadow": False,
                        "topLevel": False
                    },
                    "repeat": {
                        "opcode": "control_repeat",
                        "next": None,
                        "parent": "set_i",
                        "inputs": {
                            "TIMES": [3, "get_count", [10, "10"]],
                            "SUBSTACK": [2, "create_clone"]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "get_count": {
                        "opcode": "obswebsocket_getSourceCount",
                        "next": None,
                        "parent": "repeat",
                        "inputs": {},
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "create_clone": {
                        "opcode": "control_create_clone_of",
                        "next": "inc_i",
                        "parent": "repeat",
                        "inputs": {
                            "CLONE_OPTION": [1, [10, "_myself_"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "inc_i": {
                        "opcode": "data_changevariableby",
                        "next": None,
                        "parent": "create_clone",
                        "inputs": {
                            "VALUE": [1, [10, "1"]]
                        },
                        "fields": {
                            "VARIABLE": ["i", "i"]
                        },
                        "shadow": False,
                        "topLevel": False
                    },
                    "on_clear": {
                        "opcode": "event_whenbroadcastreceived",
                        "next": "delete_this_clone",
                        "parent": None,
                        "inputs": {},
                        "fields": {
                            "BROADCAST_OPTION": ["Clear", "clear"]
                        },
                        "shadow": False,
                        "topLevel": True,
                        "x": 300,
                        "y": 200
                    },
                    "delete_this_clone": {
                        "opcode": "control_delete_this_clone",
                        "next": None,
                        "parent": "on_clear",
                        "inputs": {},
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "start_clone": {
                        "opcode": "control_start_as_clone",
                        "next": "set_costume_base",
                        "parent": None,
                        "inputs": {},
                        "fields": {},
                        "shadow": False,
                        "topLevel": True,
                        "x": 600,
                        "y": 0
                    },
                    "set_costume_base": {
                        "opcode": "looks_switchcostumeto",
                        "next": "set_costume",
                        "parent": "start_clone",
                        "inputs": {
                            "COSTUME": [1, [10, "base"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "set_costume": {
                        "opcode": "looks_switchcostumeto",
                        "next": "go_to",
                        "parent": "set_costume_base",
                        "inputs": {
                            "COSTUME": [3, "get_type", [10, "unknown"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "get_type": {
                        "opcode": "obswebsocket_getSourceData",
                        "next": None,
                        "parent": "set_costume",
                        "inputs": {
                            "INDEX": [3, [12, "i", "i"], [10, "1"]],
                            "PROP": [1, [10, "type"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "go_to": {
                        "opcode": "motion_gotoxy",
                        "next": "point_in_dir",
                        "parent": "set_costume",
                        "inputs": {
                            "X": [3, "get_x", [4, "0"]],
                            "Y": [3, "get_y", [4, "0"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "get_x": {
                        "opcode": "obswebsocket_getSourceData",
                        "next": None,
                        "parent": "go_to",
                        "inputs": {
                            "INDEX": [3, [12, "i", "i"], [10, "1"]],
                            "PROP": [1, [10, "x"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "get_y": {
                        "opcode": "obswebsocket_getSourceData",
                        "next": None,
                        "parent": "go_to",
                        "inputs": {
                            "INDEX": [3, [12, "i", "i"], [10, "1"]],
                            "PROP": [1, [10, "y"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "point_in_dir": {
                        "opcode": "motion_pointindirection",
                        "next": "set_size",
                        "parent": "go_to",
                        "inputs": {
                            "DIRECTION": [3, "get_rotation", [4, "90"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "get_rotation": {
                        "opcode": "obswebsocket_getSourceData",
                        "next": None,
                        "parent": "point_in_dir",
                        "inputs": {
                            "INDEX": [3, [12, "i", "i"], [10, "1"]],
                            "PROP": [1, [10, "rotation"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "set_size": {
                        "opcode": "obswebsocket_setSpriteStretch",
                        "next": "if_enabled",
                        "parent": "point_in_dir",
                        "inputs": {
                            "WIDTH": [3, "get_width", [10, "100"]],
                            "HEIGHT": [3, "get_height", [10, "100"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "get_width": {
                        "opcode": "obswebsocket_getSourceData",
                        "next": None,
                        "parent": "set_size",
                        "inputs": {
                            "INDEX": [3, [12, "i", "i"], [10, "1"]],
                            "PROP": [1, [10, "width"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "get_height": {
                        "opcode": "obswebsocket_getSourceData",
                        "next": None,
                        "parent": "set_size",
                        "inputs": {
                            "INDEX": [3, [12, "i", "i"], [10, "1"]],
                            "PROP": [1, [10, "height"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "if_enabled": {
                        "opcode": "control_if_else",
                        "next": None,
                        "parent": "set_size",
                        "inputs": {
                            "CONDITION": [2, "check_enabled"],
                            "SUBSTACK": [2, "show"],
                            "SUBSTACK2": [2, "hide"]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "check_enabled": {
                        "opcode": "operator_equals",
                        "next": None,
                        "parent": "if_enabled",
                        "inputs": {
                            "OPERAND1": [3, "get_enabled", [10, ""]],
                            "OPERAND2": [1, [10, "true"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "get_enabled": {
                        "opcode": "obswebsocket_getSourceData",
                        "next": None,
                        "parent": "check_enabled",
                        "inputs": {
                            "INDEX": [3, [12, "i", "i"], [10, "1"]],
                            "PROP": [1, [10, "enabled"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "show": {
                        "opcode": "looks_show",
                        "next": None,
                        "parent": "if_enabled",
                        "inputs": {},
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    },
                    "hide": {
                        "opcode": "looks_hide",
                        "next": None,
                        "parent": "if_enabled",
                        "inputs": {},
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    }
                },
                "comments": {},
                "currentCostume": 0,
                "costumes": [
                    { "name": "base", "dataFormat": "svg", "assetId": "c0000000000000000000000000000000", "md5ext": "c0000000000000000000000000000000.svg", "rotationCenterX": 50, "rotationCenterY": 50 },
                    { "name": "dshow_input", "dataFormat": "svg", "assetId": "c0000000000000000000000000000001", "md5ext": "c0000000000000000000000000000001.svg", "rotationCenterX": 50, "rotationCenterY": 50 },
                    { "name": "browser_source", "dataFormat": "svg", "assetId": "c0000000000000000000000000000002", "md5ext": "c0000000000000000000000000000002.svg", "rotationCenterX": 50, "rotationCenterY": 50 },
                    { "name": "image_source", "dataFormat": "svg", "assetId": "c0000000000000000000000000000003", "md5ext": "c0000000000000000000000000000003.svg", "rotationCenterX": 50, "rotationCenterY": 50 },
                    { "name": "ffmpeg_source", "dataFormat": "svg", "assetId": "c0000000000000000000000000000004", "md5ext": "c0000000000000000000000000000004.svg", "rotationCenterX": 50, "rotationCenterY": 50 },
                    { "name": "window_capture", "dataFormat": "svg", "assetId": "c0000000000000000000000000000005", "md5ext": "c0000000000000000000000000000005.svg", "rotationCenterX": 50, "rotationCenterY": 50 },
                    { "name": "monitor_capture", "dataFormat": "svg", "assetId": "c0000000000000000000000000000006", "md5ext": "c0000000000000000000000000000006.svg", "rotationCenterX": 50, "rotationCenterY": 50 },
                    { "name": "text_gdiplus_v2", "dataFormat": "svg", "assetId": "c0000000000000000000000000000007", "md5ext": "c0000000000000000000000000000007.svg", "rotationCenterX": 50, "rotationCenterY": 50 },
                    { "name": "macos-avcapture", "dataFormat": "svg", "assetId": "c0000000000000000000000000000008", "md5ext": "c0000000000000000000000000000008.svg", "rotationCenterX": 50, "rotationCenterY": 50 },
                    { "name": "color_source_v3", "dataFormat": "svg", "assetId": "c0000000000000000000000000000009", "md5ext": "c0000000000000000000000000000009.svg", "rotationCenterX": 50, "rotationCenterY": 50 },
                    { "name": "unknown", "dataFormat": "svg", "assetId": "927d672925e7b99f7813735c484c6922", "md5ext": "927d672925e7b99f7813735c484c6922.svg", "rotationCenterX": 50, "rotationCenterY": 50 }
                ],
                "sounds": [],
                "volume": 100,
                "layerOrder": 1,
                "visible": True,
                "x": 0,
                "y": 0,
                "size": 100,
                "direction": 90,
                "draggable": False,
                "rotationStyle": "all around"
            },
            {
                "isStage": False,
                "name": "Connect_Button",
                "variables": {},
                "lists": {},
                "broadcasts": {},
                "blocks": {
                    "when_clicked": {
                        "opcode": "event_whenthisspriteclicked",
                        "next": "broadcast_connect",
                        "parent": None,
                        "inputs": {},
                        "fields": {},
                        "shadow": False,
                        "topLevel": True,
                        "x": 0,
                        "y": 0
                    },
                    "broadcast_connect": {
                        "opcode": "event_broadcast",
                        "next": None,
                        "parent": "when_clicked",
                        "inputs": {
                            "BROADCAST_INPUT": [1, [11, "Connect", "connect"]]
                        },
                        "fields": {},
                        "shadow": False,
                        "topLevel": False
                    }
                },
                "comments": {},
                "currentCostume": 0,
                "costumes": [
                    {
                        "name": "button",
                        "dataFormat": "svg",
                        "assetId": "ca67779a22639c9e2cf78917097c6f95",
                        "md5ext": "ca67779a22639c9e2cf78917097c6f95.svg",
                        "rotationCenterX": 60,
                        "rotationCenterY": 20
                    }
                ],
                "sounds": [],
                "volume": 100,
                "layerOrder": 2,
                "visible": True,
                "x": -260,
                "y": 150,
                "size": 100,
                "direction": 90,
                "draggable": False,
                "rotationStyle": "all around"
            }
        ],
        "monitors": [],
        "extensions": ["obswebsocket"],
        "meta": {
            "semver": "3.0.0",
            "vm": "0.2.0",
            "agent": "TurboWarp Studio AI"
        }
    }

    # Helper to generate SVG with emoji
    def make_svg(emoji, color="#00ffff"):
        return f'<?xml version="1.0" encoding="UTF-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="none" stroke="{color}" stroke-width="4" width="96" height="96" x="2" y="2"/><text x="50" y="65" text-anchor="middle" font-size="50" transform="rotate(90, 50, 50)">{emoji}</text></svg>'

    backdrop_svg = '<?xml version="1.0" encoding="UTF-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect fill="#2b2e33" width="640" height="360"/></svg>'
    button_svg = '<?xml version="1.0" encoding="UTF-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40"><rect fill="#000000" stroke="#ffffff" stroke-width="2" width="118" height="38" x="1" y="1"/><text x="60" y="25" text-anchor="middle" fill="white" font-family="Arial" font-size="14">CONNECT</text></svg>'

    with zipfile.ZipFile(filename, 'w') as zipf:
        zipf.writestr('project.json', json.dumps(project))
        zipf.writestr('cd21514d0531fdffb22204e0ec5ed84a.svg', backdrop_svg)
        zipf.writestr('ca67779a22639c9e2cf78917097c6f95.svg', button_svg)
        zipf.writestr('c0000000000000000000000000000000.svg', make_svg(''))
        zipf.writestr('927d672925e7b99f7813735c484c6922.svg', make_svg('📦'))
        zipf.writestr('c0000000000000000000000000000001.svg', make_svg('🎥'))
        zipf.writestr('c0000000000000000000000000000002.svg', make_svg('🌐'))
        zipf.writestr('c0000000000000000000000000000003.svg', make_svg('🖼️'))
        zipf.writestr('c0000000000000000000000000000004.svg', make_svg('🎬'))
        zipf.writestr('c0000000000000000000000000000005.svg', make_svg('🪟'))
        zipf.writestr('c0000000000000000000000000000006.svg', make_svg('🖥️'))
        zipf.writestr('c0000000000000000000000000000007.svg', make_svg('🔤'))
        zipf.writestr('c0000000000000000000000000000008.svg', make_svg('🎥'))
        zipf.writestr('c0000000000000000000000000000009.svg', make_svg('🎨'))

if __name__ == "__main__":
    create_demo_sb3("obs_visualization_demo.sb3")
    print("Created obs_visualization_demo.sb3")
