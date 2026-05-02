# 🧩 OBS WebSocket Block Reference

This document provides a detailed overview of the blocks available in the OBS WebSocket extension for TurboWarp Studio.

---

## 🔌 Connection

### `connect to OBS at [URL] password [PASS]`
Establishes a connection to your OBS Studio instance.
- **URL**: The WebSocket URL (default: `ws://127.0.0.1:4455`).
- **PASS**: The server password configured in OBS.

### `disconnect from OBS`
Closes the active connection.

### `is OBS connected?` (Boolean)
Returns `true` if the extension is currently connected to OBS.

---

## ⚙️ Configuration

### `set subscription [SUB] to [STATE]`
Enables or disables specific OBS event categories to optimize network usage.
- **Categories**: General, Scenes, Inputs, Transitions, Filters, Outputs, SceneItems, MediaInputs, Vendors, Ui.

### `stretch sprite to width [WIDTH] height [HEIGHT]`
A specialized utility for non-uniform scaling of sprites, useful for mapping OBS sources with different aspect ratios.

---

## 📡 Events (Hats)

### `when OBS scene changes`
Triggers when the active program scene in OBS changes.

### `when OBS recording starts or stops`
Triggers when the recording state changes.

### `when OBS streaming starts or stops`
Triggers when the streaming state changes.

### `when OBS virtual cam starts or stops`
Triggers when the virtual camera state changes.

### `when OBS event [EVENT] occurs`
A generic hat block that triggers on any specific OBS event selected from the menu.

### `when OBS scene becomes [SCENE]`
Triggers only when the active scene changes to the specified scene.

---

## 🖼️ Scene & Source Control

### `update OBS scene and item lists`
Refreshes the internal cache of scenes and items. This is required to populate menus.

### `switch to OBS scene [SCENE]`
Changes the current program scene in OBS.

### `set item [ITEM] in scene [SCENE] to active [STATE]`
Toggles the visibility (enabled/disabled) of a specific source in a scene.

---

## 🎙️ Audio Control

### `set mute for [INPUT] to [STATE]`
Mutes or unmutes a specific audio input.

### `toggle mute for [INPUT]`
Toggles the current mute state for an input.

### `set volume for [INPUT] to [VOLUME]%`
Sets the volume level for an input (0-100%).

---

## 📊 Data & Reporters

### `current OBS scene name` (Reporter)
Returns the name of the currently active program scene.

### `count of sources in current scene` (Reporter)
Returns the total number of sources (scene items) in the active scene.

### `data for source [INDEX] [PROP]` (Reporter)
Retrieves properties for a source by its index (1-based).
- **Properties**: name, x, y, width, height, rotation, enabled, type.

### `transform of source [NAME] [PROP]` (Reporter)
Retrieves transform properties for a source by its name.

### `all OBS sources as JSON` (Reporter)
Returns a JSON string containing the full state of all sources in the current scene.

---

## 🛠️ Advanced Requests

### `OBS request [METHOD] params [JSON]` (Reporter)
Sends a custom OBS WebSocket v5 request and returns the result as a JSON string.
- **METHOD**: The OBS request name (e.g., `GetVersion`).
- **JSON**: A JSON string of arguments for the request.

### `last OBS event name` (Reporter)
Returns the name of the most recent event received from OBS.

### `last OBS event data` (Reporter)
Returns the raw data of the most recent event as a JSON string.
