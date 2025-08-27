
export function getBindedViewModel(riveInstance) {
  return riveInstance.viewModelInstance;
}

export function computeSize(riveInstance) {
  if (riveInstance) {
    riveInstance.resizeDrawingSurfaceToCanvas();
  }
}