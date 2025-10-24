// This is the High level JS runtime for Rive
// https://rive.app/community/doc/web-js/docvlgbnS1mp
// Thx, Pedro!

import { getBindedViewModel, computeSize } from './helpers.js';

const RIVE_FILE = "button.riv";
const DEFAULT_ARTBOARD = "default";
const DEFAULT_STATEMACHINES = "default";
const DEFAULT_CONTAINER = document.getElementById("canvas");
const CONTAINER_WIDTH = '200px';
const CONTAINER_HEIGHT = '200px';
const DEFAULT_LAYOUT = new rive.Layout({
    fit: rive.Fit.Contain,
    //fit: rive.Fit.Layout, // use this for responsive layouts
    // layoutScaleFactor: .5, // if needed
  });

const riveInstance = new rive.Rive({
  src: RIVE_FILE,
  canvas: DEFAULT_CONTAINER,
  autoplay: true,
  autoBind: true,
  layout: DEFAULT_LAYOUT,
  artboard: DEFAULT_ARTBOARD,
  stateMachines: DEFAULT_STATEMACHINES,

  onLoad: () => {
    requestAnimationFrame(() => {
      computeSize(riveInstance);
    });
    applyStyles(DEFAULT_CONTAINER,CONTAINER_WIDTH,CONTAINER_HEIGHT);
    const vmi = getBindedViewModel(riveInstance); // For Data-Binds!
  },
});

function applyStyles(element, width, height) {
  element.classList.add('canvas-modified');
  element.style.width = width;
  element.style.height = height;
}

// Subscribe to window size changes and update call `resizeDrawingSurfaceToCanvas`
window.onresize = computeSize(riveInstance);

// Subscribe to devicePixelRatio changes and call `resizeDrawingSurfaceToCanvas`
window
.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
.addEventListener("change", computeSize(riveInstance));