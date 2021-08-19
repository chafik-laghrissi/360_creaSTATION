import * as THREE from "three";
const textureLoader = new THREE.TextureLoader();
const navigationIcon = textureLoader.load("/textures/360/navigation.png");
// const images = {
//   image1: textureLoader.load("textures/360/image1.jpg"),
//   image2: textureLoader.load("/textures/360/image2.jpg"),
//   image3: textureLoader.load("/textures/360/image3.jpg"),
//   image4: textureLoader.load("/textures/360/image4.jpg"),
//   image5: textureLoader.load("/textures/360/image5.jpg"),
//   image6: textureLoader.load("/textures/360/image6.jpg"),
//   image7: textureLoader.load("/textures/360/image7.jpg"),
//   image8: textureLoader.load("/textures/360/image8.jpg"),
//   image9: textureLoader.load("/textures/360/image9.jpg"),
//   image10: textureLoader.load("/textures/360/image10.jpg"),
//   navigation: textureLoader.load("/textures/360/navigation.png"),
//   SetWrapsAndRepeatSettings(image) {
//     image.repeat.x = -1;
//     image.wrapS = THREE.RepeatWrapping;
//   },
// };

const createStripe = (name, position, multiplyScalarBy = 30) => {
  position = new THREE.Vector3(position.x, position.y, position.z);
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: navigationIcon })
  );
  sprite.name = name;
  sprite.position.copy(
    position.clone().normalize().multiplyScalar(multiplyScalarBy)
  );
  return sprite;
};
export { createStripe };
