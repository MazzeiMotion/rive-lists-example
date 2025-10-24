// helper.js might contain this
function computeSize(riveInstance) {
  if (riveInstance) {
    riveInstance.resizeDrawingSurfaceToCanvas();
  }
}

// Debounce helper function
function debounce(func, delay = 150) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 1. Centralized Configuration
const RIVE_CONFIG = {
  src: "badge-list.riv",
  canvas: document.getElementById("canvas"),
  artboard: "display",
  stateMachines: "State Machine 1",
  layout: new rive.Layout({
    fit: rive.Fit.Contain, // Use Contain or Cover for responsiveness
  }),
  autoplay: true,
  autoBind: true,
};

const badgesData = [
  { icon: "basketball", quality: "bronze" },
  { icon: "football", quality: "silver" },
  { icon: "baseball", quality: "gold" },
];

function createBadge(icon, quality, riveInstance, list) {
  if (!riveInstance || !list) return;

  const badgeVM = riveInstance.viewModelByName("badgeVM");
  if (!badgeVM) {
    console.error("ViewModel 'badgeVM' not found.");
    return;
  }
  const newBadge = badgeVM.instance();
  newBadge.enum("icon").value = icon;
  newBadge.enum("quality").value = quality;
  list.addInstance(newBadge);
}

// Initialize the Rive app
const riveInstance = new rive.Rive({
  ...RIVE_CONFIG, // Spread the config object
  onLoad: () => {
    // Ensure the canvas is sized correctly on load
    computeSize(riveInstance);

    const vmi = riveInstance.viewModelInstance;
    if (!vmi) {
      console.error("ViewModelInstance not available.");
      return;
    }
    
    const list = vmi.list("list");
    if (!list) {
      console.error("List named 'list' not found in the ViewModel.");
      return;
    }

    // 5. Loop through data to create badges
    badgesData.forEach(badge => {
      createBadge(badge.icon, badge.quality, riveInstance, list);
    });
  },
  onLoadError: (error) => {
    console.error("Failed to load Rive file:", error);
  },
});

// Layout evaluations
const debouncedResize = debounce(() => computeSize(riveInstance), 150);
window.addEventListener('resize', debouncedResize);
const mediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
mediaQuery.addEventListener('change', debouncedResize);