/** Crops an image to the selection rectangle at device pixel ratio. */
function contentScreenshotCrop(img, selection) {
  const dpr = window.devicePixelRatio || 1;
  const sx = Math.round(selection.x * dpr);
  const sy = Math.round(selection.y * dpr);
  const sw = Math.round(selection.width * dpr);
  const sh = Math.round(selection.height * dpr);

  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

  const imageData = ctx.getImageData(0, 0, sw, sh);

  return {
    imageData: Array.from(imageData.data),
    width: sw,
    height: sh,
  };
}

export { contentScreenshotCrop };
