# 🚀 TurboWarp Studio

Welcome to **TurboWarp Studio**, a collection of advanced extensions and tools designed to push the boundaries of creative coding.

## 🌟 What is TurboWarp?

[TurboWarp](https://turbowarp.org/) is a powerful, high-performance variant of **Scratch**, the world's most popular creative coding platform for learning. While Scratch is designed for beginners, TurboWarp introduces advanced features like:

- **Compiler**: Runs projects significantly faster than the standard Scratch interpreter.
- **Unsandboxed Extensions**: Allows projects to interact with the local system, network, and external hardware.
- **Enhanced Editor**: Dark mode, custom stage sizes, and high-quality pen rendering.

## 🎬 TurboWarp + OBS: The Power Duo

The combination of **TurboWarp** and **OBS (Open Broadcaster Software)** unlocks incredible potential for both learning and professional production:

### 🎓 Learning Potential
- **Interactive Education**: Create live-coded educational streams where the code controls the broadcast in real-time.
- **Visual Feedback**: Use Scratch's intuitive blocks to learn about automation, networking, and state management by controlling a complex production environment.

### 💼 Professional Potential
- **Dynamic Overlays**: Build complex, interactive stream overlays using Scratch's visual engine.
- **Automated Production**: Create "Auto-Director" systems that switch scenes, trigger stingers, or update text sources based on logic or external inputs.
- **Interactive Streams**: Build games or utilities that viewers can interact with, which then trigger visual changes in OBS.

## 🔗 Useful Links

- **TurboWarp**: [turbowarp.org](https://turbowarp.org/)
- **OBS Studio**: [obsproject.com](https://obsproject.com/)
- **OBS WebSocket Plugin**: [github.com/obsproject/obs-websocket](https://github.com/obsproject/obs-websocket)

## 📂 Workspace Overview

This workspace currently contains:

### [OBS WebSocket Extension](./obs_websocket/)
A self-contained, unsandboxed extension that allows TurboWarp projects to communicate with OBS Studio via the WebSocket v5 protocol.

## 🛠️ Developer Overview

This repository is structured for easy extension development and testing.

### Structure
- Each subdirectory contains a standalone extension.
- Extensions are typically single JS files that can be loaded directly into TurboWarp Desktop.

### Workflow
1.  **Develop**: Write your extension logic in Javascript using the [TurboWarp Extension API](https://docs.turbowarp.org/development/extensions).
2.  **Test**: Load the extension as a "Custom Extension" in TurboWarp Desktop (ensure "Unsandboxed" is checked if required).
3.  **Document**: Maintain a detailed README for each extension.

---
🚀 *This workspace is curated and developed with the assistance of **Antigravity**, an advanced AI coding assistant.*
