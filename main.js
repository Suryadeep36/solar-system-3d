import * as THREE from 'three';

//scene settings
const scene =  new THREE.Scene();
const backgroundTexture = new THREE.TextureLoader().load( "./space.jpeg" );
scene.background = backgroundTexture;

//camera settings
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.aspect= window.innerWidth/window.innerHeight;
camera.position.z = 25;

//renderer settings
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});
renderer.setSize(window.innerWidth, window.innerHeight);

//directional light
const directionalLight = new THREE.DirectionalLight( 'white', 5 );
const dirVector = new THREE.Vector3(0,0,1);
directionalLight.position.add(dirVector);
scene.add( directionalLight);


// //helper for directional light
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionalLightHelper);

//adding 250 stars
Array(250).fill().forEach(addStar)


//sun model
const sunGeometry = new THREE.SphereGeometry(5, 32, 16);
const sunMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./sun.jpg')
})
const sun = new THREE.Mesh( sunGeometry, sunMaterial ); 
let sunInitPosX = 15;
sun.position.z = -30;
sun.position.x = sunInitPosX;
scene.add( sun );

//scroll
document.body.onscroll = moveCamera;

renderer.setAnimationLoop(renderStuff);

//function to animate everything
function renderStuff(){
    sun.rotateX(0.004);
    sun.rotateY(0.002);
    renderer.render( scene, camera );
}

//this module will help when user scrolls
function moveCamera(){
    let t = document.body.getBoundingClientRect().top;
    sun.position.x =  (t * 0.01) + sunInitPosX;
    camera.position.z = t * 0.02
}

//this function will add star to random place in the space
function addStar(){
    const starGeomatry = new THREE.SphereGeometry(0.15, 26, 26);
    const starMaterial = new THREE.MeshStandardMaterial({
        color: "yellow"
    })
    const star = new THREE.Mesh(starGeomatry, starMaterial);
    const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}


// function to handle window resize
function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    scene.background = backgroundTexture;
}

// add event listener for window resize
window.addEventListener('resize', handleResize);