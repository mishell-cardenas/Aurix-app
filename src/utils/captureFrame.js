export function captureFrame(webcamRef) {
  const screenshot = webcamRef.current?.getScreenshot()

  if (!screenshot) return null

  return screenshot.split(',')[1]
}