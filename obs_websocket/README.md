# 🎥 OBS WebSocket Extension for TurboWarp

A powerful, self-contained, and unsandboxed extension that allows [TurboWarp](https://turbowarp.org/) projects to take full control of [OBS Studio](https://obsproject.com/).

## 🌟 Context & Potential

### What is TurboWarp?
TurboWarp is a high-performance variant of **Scratch**, the creative coding platform. It allows for much faster execution and the use of **Unsandboxed Extensions**, which can interact with local networks and hardware—making it perfect for professional-grade integrations.

### The Power of TurboWarp + OBS
Combining the intuitive, block-based logic of TurboWarp with the industry-standard broadcasting power of OBS Studio creates a unique environment for:
- **Interactive Live Streams**: Build overlays that react to code or viewer input.
- **Automated Broadcasting**: Create logic that switches scenes, starts recordings, or toggles sources automatically.
- **Educational Tools**: Learn complex concepts like WebSocket communication and automation through a visual and rewarding interface.

## 🔗 Useful Links
- **TurboWarp**: [turbowarp.org](https://turbowarp.org/)
- **OBS Studio**: [obsproject.com](https://obsproject.com/)
- **OBS WebSocket (v5)**: Included in OBS 28+.

## 🚀 Features
- **Self-Contained**: Inlines the `obs-websocket-js` library (no external dependencies).
- **Event-Driven**: Hat blocks for reacting to any OBS event in real-time.
- **Configurable Subscriptions**: Toggle event categories (General, Scenes, Inputs, etc.) to optimize performance.
- **Full v5 Support**: Send any request and receive any event data supported by OBS WebSocket 5.x.

## 📥 Installation

### Loading as a File (Recommended for Desktop)
1.  Download `obs_websocket.js`.
2.  Open **TurboWarp Desktop**.
3.  Click **Add Extension** (bottom left) -> **Custom Extension**.
4.  Select the **File** tab and pick the `obs_websocket.js` file.
5.  **IMPORTANT**: Check the **Unsandboxed** checkbox.
6.  Click **Load**.

## 🛠️ Developer Overview

### Architecture
The extension is built as a single-file TurboWarp extension. It includes a bundled version of the `obs-websocket-js` library to ensure it works offline and as a standalone file.

### Key Components
- **Library Integration**: The `obs-websocket-js` library is inlined at the top of the file.
- **Class Structure**: Inherits from the standard Scratch/TurboWarp extension pattern.
- **Dynamic Menus**: Uses a searchable menu for OBS events to provide a better developer experience.
- **Internal Messaging**: Uses a custom event emitter to bridge OBS events to Scratch hat blocks.

## 🧩 Blocks Reference

### Connection
- `connect to OBS at [URL] password [PASS]`: Connects to your OBS instance. Default URL is `ws://127.0.0.1:4455`.
- `disconnect from OBS`: Safely closes the connection.
- `is OBS connected?`: Returns `true` if currently connected.

### Subscriptions
- `set subscription [SUB] to [true/false]`: Configures which events OBS should send. High-volume events (like volume meters) are off by default to prevent lag.
  - *Note: Run this BEFORE the connect block.*

### Requests & Data
- `OBS request [METHOD] params [JSON]`: Sends a command to OBS.
- `last OBS event name`: Returns the type of the last event received (e.g., `CurrentProgramSceneChanged`).
- `last OBS event data`: Returns the full JSON data of the last event.
- `event data [PROP]`: Helper to get a specific value from the last event (e.g., `sceneName`).

### Events

#### Dedicated Blocks
- `when OBS scene changes`: Triggers when you switch scenes.
- `when OBS recording starts or stops`: Triggers on record state change.
- `when OBS streaming starts or stops`: Triggers on stream state change.
- `when OBS virtual cam starts or stops`: Triggers on virtual cam toggle.

#### Generic Block (with Searchable Menu)
- `when OBS event [EVENT] occurs`: A hat block with a searchable menu containing common events like `InputMuteStateChanged`, `InputVolumeChanged`, etc.

## 💡 Usage Examples

### 1. Connecting to OBS
Always start by connecting. If you have a password set in OBS, include it here.
![Connect Example](https://img.shields.io/badge/Connect-ws://127.0.0.1:4455-blue)

### 2. Changing Scenes
To switch to a scene named "Gaming", use the `SetCurrentProgramScene` request:
- **Method**: `SetCurrentProgramScene`
- **Params**: `{"sceneName": "Gaming"}`

### 3. Reacting to a Scene Change
You can make Scratch bark when you switch scenes!
1.  Use the `when OBS event [CurrentProgramSceneChanged]` hat block.
2.  Inside, use `event data [sceneName]` to get the name of the scene you just switched to.

### 4. Setting Subscriptions
If you want to track volume levels (high volume event):
1.  Run `set subscription [InputVolumeMeters] to [true]`.
2.  Run the `connect` block.

---
**Note**: This extension requires **Unsandboxed** mode because it needs to use WebSockets to communicate with your local network.

---
🚀 *This project was developed with the assistance of **Antigravity**, a powerful AI coding assistant. Please verify functionality in your specific OBS environment before use.*
