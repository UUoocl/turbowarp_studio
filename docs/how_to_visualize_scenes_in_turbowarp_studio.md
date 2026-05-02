# How to Visualize OBS Scenes in TurboWarp Studio

This guide explains how to use the OBS WebSocket extension to mirror your OBS scene configuration directly on the TurboWarp stage.

## Prerequisites

1.  **OBS Studio** with the **WebSocket Server** enabled (Tools > WebSocket Server Settings).
2.  **TurboWarp Desktop** (or web version) with the `turbowarp_studio.js` extension loaded.

> [!TIP]
> You can download a pre-configured demo project here: [obs_visualization_demo.sb3](./obs_visualization_demo.sb3)
>
> To set the correct 16:9 aspect ratio manually, use the `?size=640x360` query parameter: [turbowarp.org/editor?size=640x360](https://turbowarp.org/editor?size=640x360). This matches the OBS default canvas and ensures perfect coordinate mapping.

## Step 1: Connecting to OBS

Use the **Connect** block to establish a link between TurboWarp and OBS.

```scratch
connect to OBS at [ws://127.0.0.1:4455] password [your_password]
```

## Step 2: Synchronizing Lists

Before you can select scenes or items from the menus, you must populate the internal cache.

```scratch
update OBS scene and item lists
```

## Step 3: Mapping Coordinates

The extension automatically handles the translation between OBS pixels and TurboWarp's coordinate system (-240 to 240 on X, -180 to 180 on Y).

- **Position**: OBS (0,0) is top-left. TurboWarp (0,0) is center. The extension automatically adjusts the Scratch position based on the OBS **Alignment** setting (e.g., Top-Left, Center).
- **Scaling**: The extension scales sources based on your OBS "Base (Canvas) Resolution".

## Step 4: Visualizing Sources

To visualize scenes, you can create a sprite for each source or use clones.

### Example: Basic Visualization Loop

1. Create a "Source" sprite.
2. Use the following logic to position it:

```scratch
when I receive [Update Scene]
delete all clones
set [i v] to [1]
repeat (count of sources in current scene)
    create clone of [myself v]
    change [i v] by (1)
end

when I start as a clone
set [source name v] to (data for source (i) [name])
go to x: (data for source (i) [x]) y: (data for source (i) [y])
stretch sprite to width (data for source (i) [width]) height (data for source (i) [height])
point in direction (data for source (i) [rotation])
if <(data for source (i) [enabled]) = [true]> then
    show
else
    hide
end
```

## Step 5: Live Updates

To keep the visualization in sync when you move items in OBS, ensure you have the **SceneItemTransformChanged** subscription active.

```scratch
set subscription [SceneItemTransformChanged] to [true]
```

Then, use the generic event hat or the specialized scene change hat to trigger updates:

```scratch
when OBS scene changes
broadcast [Update Scene v]
```

## Tips for Premium Visuals

- **Sprite Mapping**: Use a generic rectangle sprite for all sources, or detect the source name and switch costumes (e.g., if name contains "Camera" switch to Camera costume).
- **Smooth Transitions**: Use the `glide` block instead of `go to` for a more dynamic "moving" effect when sources change position in OBS.
- **Z-Order**: Sources are returned in the order they appear in the OBS source list (bottom to top). You can use "go to front" or "go back (n) layers" to match the OBS layering.
