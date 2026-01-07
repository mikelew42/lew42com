// import * as THREE from "/module/lib/three.js";
// import { OrbitControls } from '/three.js/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from "/three.js/examples/jsm/loaders/GLTFLoader.js";

// import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
// import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'https://unpkg.com/three@0.181.2/build/three.module.js';
// import { OrbitControls } from 'https://unpkg.com/three@0.181.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.181.2/examples/jsm/loaders/GLTFLoader.js';

import { App, el, div, View, h1, h2, h3, p, is, icon } from "/framework/core/App/App.js";

View.body().init();

window.THREE = THREE;
// const app = window.app = await new App().ready; 

// console.log(THREE);

const scene = window.scene = new THREE.Scene();
// console.log(scene);
const camera = scene.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000      );
camera.offset = new THREE.Vector3(0, 2, 10);
camera.position.add(camera.offset);

const renderer = scene.renderer = new THREE.WebGLRenderer({ 
	alpha: true,
	antialias: true
});  // Enable transparency in the renderer
renderer.setClearColor( 0x000000, 0 );  // Set the background color to transparent (alpha = 0)
// Set the pixel ratio based on the device's pixel density
renderer.setPixelRatio(window.devicePixelRatio);


var viewer, viewerRenderer, viewerCamera, controls;
if (is.mobile()) {
    console.log('Mobile browser detected');
    // window.addEventListener("load", () => {
    // 	setTimeout(1000, () => {
    // 		document.documentElement.requestFullscreen()
    // 	});
    // });
    document.documentElement.addEventListener("click", rfs);
    function rfs(){
    	document.documentElement.requestFullscreen();
    	document.documentElement.removeEventListener("click", rfs);

    	// window.addEventListener("deviceorientation", (e) => {
    	// 	console.log("orient", Math.round(e.alpha), Math.round(e.gamma), Math.round(e.beta));
    	// })
    }

    function handleMotionEvent(){}
    function handleOrientationEvent(){

    }
} else {
    console.log('Desktop browser detected');
	// see line 100 to add this back in
    // viewer = window.viewer = window.open("", "Viewer", "width=800, height=801");
    // viewerRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    // viewerRenderer.setClearColor( 0x000000, 0 );
    // viewer.document.body.appendChild(viewerRenderer.domElement);
    // viewer.document.body.style.margin = 0;
    // window.addEventListener("beforeunload", () => {
    // 	viewer.close();
    // });
	// viewerCamera = new THREE.PerspectiveCamera(75, viewer.innerWidth / viewer.innerHeight, 0.1, 1000);
	// // controls = new OrbitControls(viewerCamera, viewerRenderer.domElement);
	// // controls.update();

	// function resizeViewer(){
	// 	viewerRenderer.setSize(viewer.innerWidth, viewer.innerHeight);
	// 	// Update camera aspect ratio and projection matrix
	// 	viewerCamera.aspect = viewer.innerWidth / viewer.innerHeight;
	// 	viewerCamera.updateProjectionMatrix();
	// }
	// viewer.addEventListener("resize", resizeViewer);
	// resizeViewer();
}



const loader = new GLTFLoader();
// var ship;
loader.load("/assets/3D/spaceship.glb", function(gltf){
	window.ship = gltf.scene.children[0];

	// rotate
	ship.rotation.y = Math.PI;
	ship.position.y -= 0.5;
	// bake the matrix
	ship.updateMatrix();
	for (const child of ship.children){
		child.geometry.applyMatrix4(ship.matrix);
	}
	ship.position.set(0,0,0);
	ship.rotation.set(0,0,0);
	ship.scale.set(1,1,1);
	ship.updateMatrix();
	scene.add(ship);
	console.log(ship);
	ship.add(new THREE.AxesHelper(5));
	// // debugger;
	// if (!is.mobile()){
	// 	viewerRenderer.setAnimationLoop( animateViewer );
	// }
	renderer.setAnimationLoop( animate );
});


// Create a GridHelper
const size = 1000;        // Size of the grid (width/height)
const divisions = 10;   // Number of divisions in the grid
const gridHelper = new THREE.GridHelper(size, divisions);

// Add the GridHelper to the scene
scene.add(gridHelper);

// const grid2 = new THREE.GridHelper(size, divisions);
// grid2.position.y += 100;
// scene.add(grid2)

// Add the helper to the scene or attach it to an object
scene.add(new THREE.AxesHelper(50));  // Add to scene to show world axes
// OR attach to an object to show its local axes
// object.add(axesHelper);




function resize(){
	renderer.setSize(window.innerWidth, window.innerHeight);
	// Update camera aspect ratio and projection matrix
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	console.log("resized");
}
window.addEventListener("resize", resize);
resize();


document.body.appendChild(renderer.domElement);







const geometry = scene.geometry = new THREE.BoxGeometry(1, 1, 1);
const material = scene.material = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
const material2 = scene.material = new THREE.MeshStandardMaterial({ color: 0x444444 });
const cube = scene.cube = new THREE.Mesh(geometry, material2);
scene.add(cube.translateY(50));

// Add an ambient light (provides soft, even lighting)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color, intensity
scene.add(ambientLight);

// Create a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);  // Color: white, Intensity: 1

// Set the position of the light
directionalLight.position.set(500, 1500, 200);  // Position in world space

// Optionally, set the target (what the light is "pointing at")
directionalLight.target.position.set(0, 0, 0);  // Default target is at (0, 0, 0)
// scene.add(directionalLight.target);  // Ensure the target is added to the scene

// Add the light to the scene
scene.add(directionalLight);


const instanceCount = 1000;
const instancedMesh = new THREE.InstancedMesh(geometry, material2, instanceCount);
const matrix = new THREE.Matrix4();

for (let i = 0; i < instanceCount; i++){
	const x = Math.random() * 10000 - 5000;
	const z = Math.random() * 10000 - 5000;
	const scaleY = Math.random() * 1000;
	const y = (scaleY/2) + 0.1;

	// matrix.identity().scale({ x: 2, y: 2, z: 2 })
	// debugger;
	matrix.makeScale(Math.random() * 100, scaleY, Math.random() * 100)
	matrix.setPosition(x, y, z);
	instancedMesh.setMatrixAt(i, matrix);
}

scene.add(instancedMesh);

scene.add(new THREE.Mesh(
	new THREE.PlaneGeometry(10000, 10000), 
	material).rotateX(Math.PI/2))


// Create an exponential fog
// scene.fog = new THREE.FogExp2(0xffffff, 0.001); // (color, density)
scene.fog = new THREE.Fog(0xdddddd, 1000, 3000); // linear fog (color, near, far)


// // Add a point light (acts like a bulb that emits light in all directions)
// const pointLight = new THREE.PointLight(0xffffff, 100); // Color, intensity
// pointLight.position.set(5, 5, 5); // Set light position
// scene.add(pointLight);

// const pointLight2 = new THREE.PointLight(0xffffff, 100); // Color, intensity
// pointLight2.position.set(-15, -15, 5); // Set light position
// // scene.add(pointLight2);

// cube.rotation.x += 0.5;
// cube.rotation.y += 0.5;

var paused = false;
var boost = false;
document.addEventListener("keydown", e => {
	if (e.code == "KeyP"){
		paused = !paused;
	}
	if (e.code == "Space"){
		boost = true;
	}
});

document.addEventListener("keyup", e => {
	if (e.code == "Space"){
		boost = false;
	}	
});

window.matrixToEuler = function(mat4){
	const quat = new THREE.Quaternion();
	mat4.decompose(new THREE.Vector3(), quat, new THREE.Vector3());
	return new THREE.Euler().setFromQuaternion(quat);
}



// Create material for the line
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x6d00ff });  // Blue color

// Define the geometry (points) of the line
const points = [];
points.push(new THREE.Vector3(-10, 10, 10));  // Start point
points.push(new THREE.Vector3(10, 10, 10));   // End point

const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

// Create the line using the geometry and material
const line = new THREE.Line(lineGeometry, lineMaterial);


line.frustumCulled = false;
// Add the line to the scene
scene.add(line);




const forward = new THREE.Vector3(0,0,0);

const zero = new THREE.Vector3(0,0,10);
var speed;

const clock = new THREE.Clock();
var rollForce = 0, pitchForce = 0;
function animate() {
	if (paused)
		return;

	const dt = clock.getDelta();
	// console.log(dt);

	// thrust
	speed = (boost ? 500 : 100) * dt;
	forward.copy(new THREE.Vector3(0,0,-1).applyQuaternion(ship.quaternion));
	ship.position.add(forward.clone().multiplyScalar(speed))
	ship.updateMatrixWorld();

	// camera follow
	const cameraPosition = camera.offset.clone().applyMatrix4(ship.matrixWorld);
	camera.position.lerp(cameraPosition, 0.05);
	// camera.lookAt(ship.position);

	
	// roll
	const rollQuat = new THREE.Quaternion();
	rollQuat.setFromAxisAngle(new THREE.Vector3(0,0,-1), (rollForce * 2) * dt);
	ship.quaternion.multiply(rollQuat);

	// pitch
	const pitchQuat = new THREE.Quaternion();
	pitchQuat.setFromAxisAngle(new THREE.Vector3(1,0,0), (pitchForce) * dt);
	ship.quaternion.multiply(pitchQuat)

	// const yawQuat = new THREE.Quaternion();
	// yawQuat.setFromAxisAngle(new THREE.Vector3(0, -1, 0), rollForce/500);
	// ship.quaternion.multiply(yawQuat);

	// camera roll
	camera.quaternion.slerp(ship.quaternion, 0.05);

	points[0].copy(ship.position);
	points[1].copy(ship.position.clone().add(forward.multiplyScalar(10000)));
	lineGeometry.setFromPoints(points);
	// ship.rotation.z += 0.01;
	renderer.render( scene, camera );
}

function animateViewer(){
	controls.update();
	viewerRenderer.render(scene, viewerCamera);
}



// Smoothstep easing function for non-linear mapping
function smoothstep(min, max, value) {
    const t = Math.max(0, Math.min(1, (value - min) / (max - min)));  // Clamp t between 0 and 1
    return t * t * (3 - 2 * t);  // Smoothstep formula
}

// Example non-linear mapping from [-150, 150] to [-1, 1]
function mapSmoothstep(value, inputMin, inputMax, outputMin, outputMax) {
    const t = smoothstep(inputMin, inputMax, value);
    return outputMin + t * (outputMax - outputMin);
}



function calculateAngle(q1, q2){
	const e1 = new THREE.Euler().setFromQuaternion(q1);
	const e2 = new THREE.Euler().setFromQuaternion(q2);
	const e3 = new THREE.Euler().set(
		e1.x - e2.x, e1.y - e2.y, e1.z - e2.z );
	return e3;
}

function quaternionLerp(q1, q2, t) {
    const result = new THREE.Quaternion();
    result.x = THREE.MathUtils.lerp(q1.x, q2.x, t);
    result.y = THREE.MathUtils.lerp(q1.y, q2.y, t);
    result.z = THREE.MathUtils.lerp(q1.z, q2.z, t);
    result.w = THREE.MathUtils.lerp(q1.w, q2.w, t);
    result.normalize();  // Make sure the result is a valid quaternion
    return result;
}



function quaternionAngle(q1, q2) {
    // Compute the dot product
    const dot = q1.dot(q2);

    // Clamp the dot product to avoid numerical errors
    const clampedDot = THREE.MathUtils.clamp(dot, -1, 1);

    // Compute the angle (in radians)
    const angle = 2 * Math.acos(Math.abs(clampedDot));

    return angle;  // Angle in radians
}


var reverse = false;
function rotate(){
	if (cube.rotation.x > 1)
		reverse = true;
	else if (cube.rotation.x < -1)
		reverse = false;

	if (reverse)
		cube.rotation.x -= 0.001;
	else 
		cube.rotation.x += 0.001;

	cube.rotation.y += 0.01;
}
// renderer.setAnimationLoop( animate );
// animate();

const maxJoystickRange = 150;
var startX, startY, deltaX, deltaY, distance, angle;
const stick = div.c("stick", {
	circle:	div.c("circle").on("pointerdown", function(e){
		// console.log("down");
		if (is.mobile())
			boost = true;
		// e.preventDefault();
		document.body.classList.add("dragging");
		document.addEventListener("pointermove", joystickMove);
		document.addEventListener("pointerup", joystickUp);
		document.addEventListener("pointercancel", joystickUp);
		startX = e.clientX;
		startY = e.clientY;
	}),
	vis1: div(),
	vis2: div()
});

function joystickMove(e){
	// e.preventDefault();
	deltaX = e.clientX - startX;
	deltaY = e.clientY - startY;

	distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

	if (distance > maxJoystickRange){
		angle = Math.atan2(deltaY, deltaX);
		deltaX = Math.cos(angle) * maxJoystickRange;
		deltaY = Math.sin(angle) * maxJoystickRange;
	}

	stick.circle.style("transform", `translate(${deltaX}px, ${deltaY}px)`);

	// console.log("deltaX:", deltaX, ";  deltaY:", deltaY)
	rollForce = deltaX;
	pitchForce = deltaY;

		// console.log("rollForce before", rollForce);
	if (rollForce < 0){
		rollForce = mapSmoothstep(rollForce, -150, 0, -1, 0);
	} else {
		rollForce = mapSmoothstep(rollForce, 0, 150, 0, 1);
	}
		// console.log("rollForce after", rollForce);

		// console.log("pitchForce before", pitchForce);
	if (pitchForce < 0){
		pitchForce = mapSmoothstep(pitchForce, -150, 0, -1, 0);
	} else {
		pitchForce = mapSmoothstep(pitchForce, 0, 150, 0, 1);
	}
		// console.log("pitchForce after", pitchForce);

}

function joystickUp(e){
	if (is.mobile)
		boost = false;
	if (e.type== "pointercancel"){
		console.warn("pointercancel");
	} else {
		// console.log("up");
	}
	document.removeEventListener("pointermove", joystickMove);
	document.removeEventListener("pointerup", joystickUp);
	stick.circle.style("transform", "");
	rollForce = 0;
	pitchForce = 0;
}