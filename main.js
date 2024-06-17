import * as THREE from 'three';
//scene settings
const scene =  new THREE.Scene();
const backgroundTexture = new THREE.TextureLoader().load( "./space.jpeg" );
scene.background = backgroundTexture;

//camera settings
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 25;

//renderer settings
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});
renderer.setSize(window.innerWidth, window.innerHeight);

//sun model
const sunGeometry = new THREE.SphereGeometry(5, 32, 16);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./sun.jpg')
})
const sun = new THREE.Mesh( sunGeometry, sunMaterial ); 
let sunInitPosX = 10;
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
    sun.position.z = t*-0.02;
   
}
