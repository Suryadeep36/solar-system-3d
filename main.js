import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
let is360On = false;
//validations for landscape mode
if(screen.orientation.type == "portrait-primary" || screen.orientation.type == "portrait-secondary"){
    stuffToDoIfNotLandScape();
}

screen.orientation.addEventListener('change',(event)=>{
    const type = event.target.type;
    if(type == "portrait-primary" || type == "portrait-secondary"){
        stuffToDoIfNotLandScape();
    }
    else{
        stuffToDoIfLandScape();
    }
})

//scene settings
const scene =  new THREE.Scene();

//camera settings
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.aspect= window.innerWidth/window.innerHeight;
camera.position.z = 25;

// //camera helper
// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper);

//renderer settings
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});
renderer.setSize(window.innerWidth, window.innerHeight);

//directional light
const directionalLight = new THREE.DirectionalLight( 'white', 5 );
const dirVector = new THREE.Vector3(0,0,10);
directionalLight.position.add(dirVector);
scene.add( directionalLight);

// //helper for directional light
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionalLightHelper);

//adding 25000 stars
for(let i = 10; i <= 500; i+=10){
    for(let j = 1; j <= 50; j++){
        addStar(i);
    }
}

//orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
document.body.addEventListener('keydown', (e) =>{
    if(e.key.toLowerCase() == 'v'){
        if(is360On == true){
            is360On = false;
            document.querySelector('.main').style.zIndex = '99';
			document.querySelector('canvas').style.zIndex = '1';
            alert('360 degree view off')
            controls.reset();
        }
        else{
            controls.target.set(camera.position.x, camera.position.y, camera.position.z);
            is360On = true;
			document.querySelector('.main').style.zIndex = '-1';
			document.querySelector('canvas').style.zIndex = '99';
            console.log(controls)
            alert('360 degree view on press the up arrow key and start exploring!!')
        }
    }
})
//galaxy model
const galaxyGeometry = new THREE.SphereGeometry(1000, 700, 1400);
const galaxyMaterial = new THREE.MeshBasicMaterial({
    map:  new THREE.TextureLoader().load( "./galaxy.png" ),
    side: THREE.BackSide,
    transparent: true
});
const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
scene.add(galaxy);

//sun model
const sunGeometry = new THREE.SphereGeometry(15, 32, 16);
const sunMaterial = new THREE.MeshBasicMaterial({
    map:  new THREE.TextureLoader().load( "./sun.jpg" ),
})
const sun = new THREE.Mesh( sunGeometry, sunMaterial ); 
sun.position.z = -50;
sun.position.x = 25;
scene.add( sun );

//mercury model
const mercuryGeometry = new THREE.SphereGeometry(1, 32, 16);
const mercuryMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./mercury.jpg')
})
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.x = 35;
mercury.position.z = -70;
scene.add(mercury);

//venus model
const venusGeometry = new THREE.SphereGeometry(3, 32, 16);
const venusMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./venus.jpg')
})
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.x = 45;
venus.position.z = -90;
scene.add(venus);

//earth model
const earthGeometry = new THREE.SphereGeometry(3, 32, 16);
const earthMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./earth.jpg')
})
const earth = new THREE.Mesh(earthGeometry,earthMaterial);
earth.position.x = 55;
earth.position.z = -110;
scene.add(earth);

//mars model
const marsGeometry = new THREE.SphereGeometry(2, 32, 16);
const marsMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./mars.jpg')
})
const mars = new THREE.Mesh(marsGeometry,marsMaterial);
mars.position.x = 70;
mars.position.z = -140;
scene.add(mars);

//jupital model
const jupitalGeometry = new THREE.SphereGeometry(7, 32, 16);
const jupitalMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./jupiter.jpg')
})
const jupital = new THREE.Mesh(jupitalGeometry,jupitalMaterial);
jupital.position.x = 150;
jupital.position.z = -300;
scene.add(jupital);

//saturn model
const saturnGeometry = new THREE.SphereGeometry(6, 32, 16);
const saturnMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./saturn.jpg')
})
const saturn = new THREE.Mesh(saturnGeometry,saturnMaterial);
saturn.position.x = 200;
saturn.position.z = -400;
scene.add(saturn);



//saturn rings model
const saturnRingGeometry = new THREE.RingGeometry(7, 12, 32);
const saturnRingMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./saturn_rings.jpg'),
    transparent: true,
    side: THREE.DoubleSide
})
const saturnRings = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturnRings.position.x = 200;
saturnRings.position.z = -400;
saturnRings.rotateX(2);
scene.add(saturnRings);

//fix for the texture of saturn's ring
const uvAttribute = saturnRingGeometry.attributes.uv;

for (let i = 0; i < uvAttribute.count; i++) {
    const vertex = new THREE.Vector3().fromBufferAttribute(saturnRingGeometry.attributes.position, i);
    const radius = vertex.length();
    const angle = Math.atan2(vertex.y, vertex.x);
    const normalizedAngle = (angle / (2 * Math.PI)) + 0.5;
    const innerRadius = 7;
    const outerRadius = 12;
    const normalizedRadius = (radius - innerRadius) / (outerRadius - innerRadius);
    uvAttribute.setXY(i, normalizedRadius, normalizedAngle);
}

// Mark the attribute as needing an update
uvAttribute.needsUpdate = true;
//uranus model
const uranusGeometry = new THREE.SphereGeometry(5, 32, 16);
const uranusMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./uranus.jpg')
})
const uranus = new THREE.Mesh(uranusGeometry,uranusMaterial);
uranus.position.x = 250;
uranus.position.z = -500;
scene.add(uranus);

//neptune model
const neptuneGeometry = new THREE.SphereGeometry(5, 32, 16);
const neptuneMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./neptune.jpg')
})
const neptune = new THREE.Mesh(neptuneGeometry,neptuneMaterial);
neptune.position.x = 300;
neptune.position.z = -600;
scene.add(neptune);

//scroll
document.body.onscroll = moveCamera;

renderer.setAnimationLoop(renderStuff);


//function to animate everything
function renderStuff(){
    sun.rotateY(0.025);
    mercury.rotateY(0.0008);
    venus.rotateY(0.0008);
    earth.rotateY(0.02);
    mars.rotateY(0.02);
    jupital.rotateY(0.57);
    saturn.rotateY(0.47);
    saturnRings.rotateZ(-0.47);
    uranus.rotateY(0.187);
    neptune.rotateY(0.123);
    renderer.render( scene, camera );
}

//this module will help when user scrolls
function moveCamera(){
    let t = document.body.getBoundingClientRect().top;
    camera.position.z = t * 0.02;
    camera.position.x = -t * 0.01;
}


//this function will add star to random place in the space
function addStar(k){
    const starGeomatry = new THREE.SphereGeometry(0.15, 26, 26);
    const starMaterial = new THREE.MeshStandardMaterial({
        color: "yellow"
    })
    const star = new THREE.Mesh(starGeomatry, starMaterial);
    const [x, y] = Array(2).fill().map(() => THREE.MathUtils.randFloatSpread(1000));
    const z = -k
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
}

// add event listener for window resize
window.addEventListener('resize', handleResize);

//modules for landscape mode
function stuffToDoIfNotLandScape(){
    document.body.style.visibility = 'hidden';
    let ele = document.getElementById('warning')
    ele.style.visibility = 'visible';
    console.log(ele);
}
function stuffToDoIfLandScape(){
    document.body.style.visibility = 'visible';
    let ele = document.getElementById('warning')
    ele.style.visibility = 'hidden';
    console.log(ele);
}