# 🚀 TurboWarp Studio

Welcome to **TurboWarp Studio**, a project designed to bridge the world of creative coding with professional broadcasting.

## 🌟 What is TurboWarp?

[TurboWarp](https://turbowarp.org/) is a powerful, high-performance variant of **Scratch** that introduces professional-grade features such as:
- **High Performance**: A custom compiler that runs projects significantly faster than the standard Scratch interpreter.
- **Unsandboxed Extensions**: The ability to interact with the local file system, network, and external hardware (like OBS).
- **Advanced Editor**: Support for custom stage sizes, high-quality rendering, and a wide array of developer tools.

## 🧩 What is Scratch?

[Scratch](https://scratch.mit.edu/) is the world’s largest creative coding platform for children and beginners, developed by the Lifelong Kindergarten Group at the MIT Media Lab. It uses a visual, block-based interface that allows users to create interactive stories, games, and animations while learning fundamental computational concepts like loops, variables, and event-driven programming.

## 🎬 TurboWarp + OBS: The Power Duo

The combination of **TurboWarp** and **OBS (Open Broadcaster Software)** unlocks incredible potential for both learning and professional production:

### 🎓 Learning Potential
- **Interactive Education**: Create live-coded educational streams where the code controls the broadcast in real-time.
- **Visual Feedback**: Use Scratch's intuitive blocks to learn about automation, networking, and state management by controlling a complex production environment.

### 💼 Professional Potential
- **Dynamic Overlays**: Build complex, interactive stream overlays using Scratch's visual engine.
- **Automated Production**: Create "Auto-Director" systems that switch scenes, trigger stingers, or update text sources based on logic or external inputs.
- **Interactive Streams**: Build games or utilities that viewers can interact with, which then trigger visual changes in OBS.

---

## 🎥 OBS WebSocket Extension

A powerful, self-contained, and unsandboxed extension that allows [TurboWarp](https://turbowarp.org/) projects to take full control of [OBS Studio](https://obsproject.com/).

### 🚀 Features
- **Self-Contained**: Inlines the `obs-websocket-js` library (no external dependencies).
- **Event-Driven**: Hat blocks for reacting to any OBS event in real-time.
- **Configurable Subscriptions**: Toggle event categories (General, Scenes, Inputs, etc.) to optimize performance.
- **Full v5 Support**: Send any request and receive any event data supported by OBS WebSocket 5.x.

### 📥 Installation

#### Loading as a File (Recommended for Desktop)
1.  Download `dist/turbowarp_studio.js`.
2.  Open **TurboWarp Desktop**.
3.  Click **Add Extension** (bottom left) -> **Custom Extension**.
4.  Select the **File** tab and pick the `turbowarp_studio.js` file.
5.  **IMPORTANT**: Check the **Unsandboxed** checkbox.
6.  Click **Load**.

### Getting started video

[Getting started with Turbowarp Studio on youtube](https://youtu.be/r0GnJWjeixw)

#### 📚 Documentation
- [How to Visualize OBS Scenes](./docs/how_to_visualize_scenes_in_turbowarp_studio.md) - A step-by-step guide on mirroring OBS layouts in TurboWarp.
- [Block Reference](./docs/block_reference.md) - Detailed descriptions of every block available in the extension.

---

### 🛠️ Developer Overview

This repository has been migrated to **TypeScript** to ensure robust development and maintainability. The codebase follows a modular ES6 approach and adheres to strict security standards.

#### Infrastructure
- **Source**: Extension code is located in `src/` (now in `.ts`).
- **Bundling**: We use `esbuild` for high-speed bundling and dependency management.
- **Type Safety**: Full TypeScript integration with specialized types for the Scratch VM and OBS WebSocket.
- **Linting & Formatting**: Integrated ESLint rules and Prettier configurations from the official TurboWarp extensions master repository.
- **Security**: Strict avoidance of `eval()` and `new Function()` for executing project-supplied code.

#### Commands
- `npm run build`: Bundles the extension into `dist/turbowarp_studio.js`.
- `npm run dev`: Rebuilds automatically on file changes.
- `npm run type-check`: Verifies code correctness without emitting files.
- `npm run lint`: Checks for common errors and style violations.
- `npm run format`: Ensures a consistent code style across the project.

#### Demo Generation
To maintain high-fidelity test projects, we use a Python-based generator located in `scratch/generate_demo.py`. This script programmatically creates `.sb3` files with:
- Pre-configured block stacks.
- Bundled SVG assets (e.g., source type icons).
- Hardcoded test credentials for rapid debugging.

#### Workflow
1.  **Modify Source**: Edit TypeScript files in `src/`.
2.  **Verify**: Run `npm run type-check` and `npm run lint`.
3.  **Build**: Run `npm run build` to update the distribution file.
4.  **Generate Demo**: Run `python3 scratch/generate_demo.py` to rebuild the sample project.
5.  **Test**: Load the bundled script or the generated `.sb3` into TurboWarp.

---
🚀 *This workspace is curated and developed with the assistance of **Antigravity**, an advanced AI coding assistant.*
