import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// load texture
const textureLoader = new THREE.TextureLoader();
const images = {
  image1: textureLoader.load("textures/360/image1.jpg"),
  image2: textureLoader.load("/textures/360/image2.jpg"),
  image3: textureLoader.load("/textures/360/image3.jpg"),
  image4: textureLoader.load("/textures/360/image4.jpg"),
  image5: textureLoader.load("/textures/360/image5.jpg"),
  image6: textureLoader.load("/textures/360/image6.jpg"),
  image7: textureLoader.load("/textures/360/image7.jpg"),
  image8: textureLoader.load("/textures/360/image8.jpg"),
  image9: textureLoader.load("/textures/360/image9.jpg"),
  image10: textureLoader.load("/textures/360/image10.jpg"),
  navigation: textureLoader.load("/textures/360/navigation.png"),
  SetWrapsAndRepeatSettings(image) {
    image.repeat.x = -1;
    image.wrapS = THREE.RepeatWrapping;
  },
};
/* Define logic functions*/
const picker = (min, max) => {
  const number = Math.floor(Math.random() * (max - min) + min);
  const image = images[`image${number}`];
  image.repeat.x = -1;
  image.wrapS = THREE.RepeatWrapping;
  return image;
};
// images.image1.repeat.x = -1;
// images.image1.wrapS = THREE.RepeatWrapping;
const tracker = document.querySelector(".mouse-tracker");
const handleMouseMove = (e) => {
  tracker.style.position = "absolute";
  tracker.style.left = e.pageX + "px";
  tracker.style.top = e.pageY + "px";
};
const body = document.body;
body.addEventListener("mousemove", handleMouseMove);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// mesh
const material = new THREE.MeshBasicMaterial({
  color: "#ddaff9",
  map: picker(1, 1),
  side: THREE.DoubleSide,
});

const geometry = new THREE.Mesh(
  new THREE.SphereBufferGeometry(50, 64, 64),
  material
);

scene.add(geometry);
// Create sprites
const sprite1 = new THREE.Sprite(
  new THREE.SpriteMaterial({ map: images.navigation })
);
sprite1.name = "image1:position1";
const position1 = new THREE.Vector3(
  -3.664786834853695,
  -23.18277113381041,
  44.11085563783491
);
sprite1.position.copy(position1.clone().normalize().multiplyScalar(30));
scene.add(sprite1);
const sprite2 = new THREE.Sprite(
  new THREE.SpriteMaterial({ map: images.navigation })
);
sprite2.name = "image1:position2";
const position2 = new THREE.Vector3(
  43.94528714071758,
  -17.733029438589956,
  15.737305366509236
);
sprite2.position.copy(position2.clone().normalize().multiplyScalar(30));
scene.add(sprite2);
scene.add(sprite1);
const sprite3 = new THREE.Sprite(
  new THREE.SpriteMaterial({ map: images.navigation })
);
sprite3.name = "image1:position3";
const position3 = new THREE.Vector3(
  30.493901861173367,
  -15.347452801129043,
  36.48824099832306
);
sprite3.position.copy(position3.clone().normalize().multiplyScalar(30));
scene.add(sprite3);
const sprite4 = new THREE.Sprite(
  new THREE.SpriteMaterial({ map: images.navigation })
);
sprite4.name = "image1:position4";
const position4 = new THREE.Vector3(
  29.92287741916638,
  -8.615160912664276,
  39.10843072028056
);
sprite4.position.copy(position4.clone().normalize().multiplyScalar(30));
scene.add(sprite4);
const addTooltip = (position) => {
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: images.navigation })
  );
  sprite.position.copy(position.clone().normalize().multiplyScalar(30));
  scene.add(sprite);
};

/**
 * Sizes
 */

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
// camera.position.x = 1
// camera.position.y = 1
camera.position.set(-1, 0, 0);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.rotateSpeed = 0.2;
controls.enableZoom = false;
// controls.zoomSpeed = 5;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

body.addEventListener("dblclick", (event) => {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  const rayCaster = new THREE.Raycaster();
  rayCaster.setFromCamera(mouse, camera);
  const intersects = rayCaster.intersectObjects(scene.children);
  intersects.forEach((intersect) => {
    if (intersect.object.type === "Sprite") {
      console.log(intersect.object.name);
      switch (intersect.object.name) {
        case "image1:position1":
          images.SetWrapsAndRepeatSettings(images.image4);
          material.map = images.image4;
          break;
        case "image1:position2":
          images.SetWrapsAndRepeatSettings(images.image2);
          material.map = images.image2;
          break;
        case "image1:position3":
          images.SetWrapsAndRepeatSettings(images.image3);
          material.map = images.image3;
          break;
        case "image1:position4":
          images.SetWrapsAndRepeatSettings(images.image5);
          material.map = images.image5;
          break;
        default:
          images.SetWrapsAndRepeatSettings(images.image3);
          material.map = images.image1;
          break;
      }
    }
  });
  // if (intersects.length > 0) {
  //   console.log(intersects[0].point);
  //   addTooltip(intersects[0].point);
  // }
});
