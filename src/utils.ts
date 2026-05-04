export const obsToScratch = (
  x: number,
  y: number,
  width: number,
  height: number,
  alignment: number,
  videoSettings: { baseWidth: number; baseHeight: number },
  stageWidth: number = 480,
  stageHeight: number = 360
) => {
  let ax = x;
  let ay = y;

  // Adjust for alignment (OBS alignment bitmask)
  // 0: Center, 1: Left, 2: Right, 4: Top, 8: Bottom
  // 5: Top-Left, 6: Top-Right, 9: Bottom-Left, 10: Bottom-Right

  // horizontal
  if (alignment & 1) {
    // Left
    ax += width / 2;
  } else if (alignment & 2) {
    // Right
    ax -= width / 2;
  }

  // vertical
  if (alignment & 4) {
    // Top
    ay += height / 2;
  } else if (alignment & 8) {
    // Bottom
    ay -= height / 2;
  }

  const sx = (ax / videoSettings.baseWidth) * stageWidth - stageWidth / 2;
  const sy = stageHeight / 2 - (ay / videoSettings.baseHeight) * stageHeight;
  return { x: sx, y: sy };
};

export const scratchScale = (
  val: number,
  isWidth: boolean,
  videoSettings: { baseWidth: number; baseHeight: number },
  stageWidth: number = 480,
  stageHeight: number = 360
) => {
  if (isWidth) {
    return val * (stageWidth / videoSettings.baseWidth);
  }
  return val * (stageHeight / videoSettings.baseHeight);
};
