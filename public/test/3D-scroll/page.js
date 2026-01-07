import app, { App, el, div, View, h1, h2, h3, p, is, icon, style } from "/app.js";

app.$root.ac("page");

style(`
    .root { background: white;transform-style: preserve-3d; max-width: 80%; margin: 0 auto; perspective: 3000px; transition: transform 0.2s ease-out; }
    body { perspective: 1000px; }
`);

const maxRotation = 50;
const scene = app.$root.el;

function updateRootTransform(e){
    // Get viewport dimensions
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // 3. Calculate normalized position (-1 to 1) from the center
  // X: -0.5 (left) to 0.5 (right)
  const xCenter = e.clientX - vw / 2;
  // Y: -0.5 (top) to 0.5 (bottom)
  const yCenter = e.clientY - vh / 2;

  // Calculate the rotation degrees
  // NOTE: For a "follow" effect, mouse movement on the X-axis controls Y-rotation, and vice-versa.
  // Y-rotation (horizontal mouse movement)
  const rotateY = (xCenter / vw) * maxRotation * 2;
  // X-rotation (vertical mouse movement) - reversed for natural feel
  const rotateX = -(yCenter / vh) * maxRotation * 2;

  // 4. Apply the new transform
  scene.style.transform = `
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg)
  `;
}
document.addEventListener("mousemove", updateRootTransform);

// document.addEventListener("mousemove", e => {
//     // Normalize X and Y to be from -50 to 50 (or similar range for subtle effect)
//   const centerX = window.innerWidth / 2;
//   const centerY = window.innerHeight / 2;
//   const offsetX = (e.clientX - centerX) / centerX * 50; // -50 to 50
//   const offsetY = (e.clientY - centerY) / centerY * 50; // -50 to 50

//   const originX = 50 + offsetX * 0.1; // Adjust multiplier (0.1) for subtle movement
//   const originY = 50 + offsetY * 0.1; // Adjust multiplier (0.1) for subtle movement

//   scene.style.perspectiveOrigin = 
//     `${originX}% ${originY}%`;
// });

// Get the scene container element (the one with the 'perspective' property)
const sceneContainer = document.querySelector('.scene-container-parent'); 
// NOTE: 'perspective' is typically applied to the parent of the rotated element.
// Make sure this selector targets the element with the CSS 'perspective' set.

const bg = app.$app.main.background;
/**
 * Calculates the scroll percentage and updates the perspective origin (Y-axis).
 */
function updatePerspectiveOrigin() {
    console.log("update origin");
    // debugger;
  // 1. Calculate Scroll Metrics
  // The distance the user has scrolled from the top (0 at top, maxScroll at bottom)
  const scrollY = bg.el.scrollTop;
  
  // The total scrollable height of the document (body height - viewport height)
  const maxScroll = bg.el.scrollHeight - bg.el.clientHeight;

//   debugger;
  
  // Handle the case where there is no scrollable content to prevent division by zero
  if (maxScroll <= 0) {
    return;
  }

  // 2. Calculate Scroll Percentage
  // Normalized value from 0 (top) to 1 (bottom)
  const scrollPercent = scrollY / maxScroll;

  // 3. Map to CSS Percentage
  // Convert the 0-1 range to a 0-100% string value
//   const originY = Math.round(scrollPercent * 100);
  const originY = scrollPercent*200;

  // 4. Apply the Transform
  // Set the perspective origin. X is fixed at 50% (center), Y is the scroll percentage.
  // The format is: perspective-origin: X Y;
  scene.style.perspectiveOrigin = `50% ${originY}%`;

  // Optional: Console log to see the effect
  // console.log(`Scroll: ${originY}%, perspective-origin-y: ${originY}%`);
}


// --- Event Listeners ---

// 1. Initial call to set the position when the page loads
app.ready.then(() => { 
    setTimeout(() => {
        updatePerspectiveOrigin() 
    }, 0);
});


// 2. Attach the function to the scroll event for dynamic updates
bg.on('scroll', updatePerspectiveOrigin);

// 3. Attach to resize event to recalculate maxScroll when the window size changes
window.addEventListener('resize', updatePerspectiveOrigin);

// Optional: Reset rotation when the mouse leaves the viewport
// document.addEventListener('mouseleave', () => {
    
//     scene.style.transform = 'rotateX(0deg) rotateY(0deg)';
// });

document.addEventListener('mouseleave', () => {
    // 1. Temporarily add the transition property
    scene.style.transition = 'transform 0.4s ease-out';
    
    // 2. Set the target transform (this triggers the transition)
    scene.style.transform = 'rotateX(0deg) rotateY(0deg)';
    
    // 3. Listen for the end of the transition
    const handleTransitionEnd = () => {
        // 4. Remove the transition property once the animation is complete
        scene.style.transition = 'none'; 
        // 5. Clean up the listener so it doesn't fire again unexpectedly
        scene.removeEventListener('transitionend', handleTransitionEnd);
    };

    // Attach the cleanup function
    scene.addEventListener('transitionend', handleTransitionEnd);
});

// CRITICAL: You must also ensure that during mousemove, the transition is 'none'
document.addEventListener('mousemove', () => {
    // Immediately turn off the transition during active mouse control
    scene.style.transition = 'none'; 
    // ... then set the transform based on cursor position
});

p().filler("2-4s").style("transform", "translateZ(100px)");
p().filler("2-4s").style("transform", "translateZ(500px)");
p().filler("2-4s").style("transform", "translateZ(200px)");
p().filler("2-4s").style("transform", "translateZ(100px)");
p().filler("2-4s").style("transform", "translateZ(300px)");
p().filler("2-4s");

div.c("layout gap", () => {
    div(p().filler("2-4s").style("padding", "1em").style("background", "var(--bg)").style("color", "white")).style("transform", "translateZ(300px)");
    div(p().filler("2-4s")).style("transform", "translateZ(100px)")
}).style("transform", "translateZ(300px)").style("transform-style", "preserve-3d");
p().filler("2-4s");



p().filler("2-4s").style("transform", "translateZ(200px)");
p().filler("2-4s").style("transform", "translateZ(50px)");
p().filler("2-4s").style("transform", "translateZ(200px)");
p().filler("2-4s").style("transform", "translateZ(100px)");
p().filler("2-4s").style("transform", "translateZ(300px)");
p().filler("2-4s");

div.c("layout gap", () => {
    div(p().filler("2-4s")).style("transform", "translateZ(100px)")
    div(p().filler("2-4s").style("padding", "1em").style("background", "var(--bg)").style("color", "white")).style("transform", "translateZ(300px)");
}).style("transform", "translateZ(300px)").style("transform-style", "preserve-3d");
p().filler("2-4s");



p().filler("2-4s").style("transform", "translateZ(100px)");
p().filler("2-4s").style("transform", "translateZ(50px)");
p().filler("2-4s").style("transform", "translateZ(200px)");
p().filler("2-4s").style("transform", "translateZ(50px)");
p().filler("2-4s").style("transform", "translateZ(300px)");
p().filler("2-4s");

div.c("layout gap", () => {
    div(p().filler("2-4s").style("padding", "1em").style("background", "var(--bg)").style("color", "white")).style("transform", "translateZ(300px)");
    div(p().filler("2-4s")).style("transform", "translateZ(100px)")
}).style("transform", "translateZ(300px)").style("transform-style", "preserve-3d");
p().filler("2-4s");



p().filler("2-4s").style("transform", "translateZ(100px)");
p().filler("2-4s").style("transform", "translateZ(500px)");
p().filler("2-4s").style("transform", "translateZ(200px)");
p().filler("2-4s").style("transform", "translateZ(50px)");
p().filler("2-4s").style("transform", "translateZ(300px)");
p().filler("2-4s");

div.c("layout gap", () => {
    div(p().filler("2-4s")).style("transform", "translateZ(100px)")
    div(p().filler("2-4s").style("padding", "1em").style("background", "var(--bg)").style("color", "white")).style("transform", "translateZ(300px)");
}).style("transform", "translateZ(300px)").style("transform-style", "preserve-3d");
p().filler("2-4s");


