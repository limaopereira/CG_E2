//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var  scene, renderer,camera,frontCamera, sideCamera, topCamera, ortographicCamera, perspectiveCamera;
var geometry, material, material_container, material_wheel, mesh;
var cameras = [];
var trailer;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcbd0b9);

    scene.add(new THREE.AxisHelper(10));

    createTrailer(30, 0, 30);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////

function createCameras() {
    'use strict';
    createFrontCamera();
    createSideCamera();
    createTopCamera();
    createIsometricOrtographicCamera();
    createIsometricPerspectiveCamera();
}
function createFrontCamera() {
    'use strict';
    frontCamera= new THREE.OrthographicCamera(window.innerWidth /  -40,
                                            window.innerWidth/40 ,
                                            window.innerHeight / 40,
                                            window.innerHeight / -40,
                                            0.1,
                                            1000);
    frontCamera.position.x = 0;
    frontCamera.position.y = 0;
    frontCamera.position.z = 50;
    frontCamera.lookAt(scene.position);
}

function createSideCamera() {
    'use strict';
    sideCamera = new THREE.OrthographicCamera(window.innerWidth /  -40,
                                            window.innerWidth/40 ,
                                            window.innerHeight / 40,
                                            window.innerHeight / -40,
                                            0.1,
                                            1000);
    sideCamera.position.x = 50;
    sideCamera.position.y = 0;
    sideCamera.position.z = 0;
    sideCamera.lookAt(scene.position);
}

function createTopCamera() {
    'use strict';
    topCamera= new THREE.OrthographicCamera(window.innerWidth /  -40,
                                            window.innerWidth/40 ,
                                            window.innerHeight / 40,
                                            window.innerHeight / -40,
                                            0.1,
                                            1000);
    topCamera.position.x = 0;
    topCamera.position.y = 50;
    topCamera.position.z = 0;
    topCamera.lookAt(scene.position);
}

function createIsometricOrtographicCamera() {
    'use strict';
    //OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
    ortographicCamera = new THREE.OrthographicCamera(window.innerWidth /  -40,
                                            window.innerWidth/40 ,
                                            window.innerHeight / 40,
                                            window.innerHeight / -40,
                                            0.1,
                                            1000);
    ortographicCamera.position.x = 50;
    ortographicCamera.position.y = 50;
    ortographicCamera.position.z = 50;
    ortographicCamera.lookAt(scene.position);
}

function createIsometricPerspectiveCamera() {
    'use strict';
    perspectiveCamera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    perspectiveCamera.position.x = 50;
    perspectiveCamera.position.y = 50;
    perspectiveCamera.position.z = 50;
    perspectiveCamera.lookAt(scene.position);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////



////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

/* -------------------------------------------------- */
/*                      TRAILER                       */
/* -------------------------------------------------- */


function addContainer(obj, x, y, z){
    'use strict';
    material_container = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    geometry = new THREE.CubeGeometry(8, 8, 19);
    var mesh1 = new THREE.Mesh(geometry, material_container);
    mesh1.position.set(x, y, z);
    obj.add(mesh1);
}


function addWheel(obj, x, y, z){
    'use strict';
    material_wheel = new THREE.MeshBasicMaterial({ color: 0xff00f0, wireframe: true });

    var geometry_wheel = new THREE.CylinderGeometry(1, 1, 1.5);
    var mesh1 = new THREE.Mesh(geometry_wheel, material_wheel);
    mesh1.position.set(x, y, z);
    obj.add(mesh1);
}

function addConnector(obj, x, y, z){
    'use strict';

    geometry = new THREE.CubeGeometry(1, 1, 1);
    var mesh1 = new THREE.Mesh(geometry, material);
    mesh1.position.set(x, y, z);
    obj.add(mesh1);
}

function createTrailer(x, y, z){
    'use strict';

    trailer = new THREE.Object3D();
    addWheel(trailer, -3.25, -5, 8.5);
    addWheel(trailer, 3.25, -5, 8.5);
    addWheel(trailer, -3.25, -5, 6);
    addWheel(trailer, 3.25, -5, 6);
    addContainer(trailer, 0, 0, 0);
    // addConnector(trailer, 0, 0, 0);

    
    trailer.position.x = x;
    trailer.position.y = y;
    trailer.position.z = z;

    scene.add(trailer);

}


//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, camera);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCameras();
    camera = frontCamera;

    render();
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}