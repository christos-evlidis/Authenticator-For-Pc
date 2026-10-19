/** Loads a screenshot data URL into an Image element. */
function contentScreenshotLoad(dataUrl) {
  const img = new Image();

  return new Promise((resolve) => {
    img.onload = () => resolve(img);
    img.src = dataUrl;
  });
}

export { contentScreenshotLoad };
