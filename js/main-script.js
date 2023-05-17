//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var  scene, renderer,camera,frontCamera, sideCamera, topCamera, ortographicCamera, perspectiveCamera;
var geometry, material, mesh;
var cameras = [];

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcbd0b9);

    scene.add(new THREE.AxisHelper(10));

    createTrailer(0, 0, 0);

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
    frontCamera= new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    frontCamera.position.x = 50;
    frontCamera.position.y = 5;
    frontCamera.position.z = 0;
    frontCamera.lookAt(scene.position);
}

function createSideCamera() {
    'use strict';
    sideCamera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    sideCamera.position.x = 0;
    sideCamera.position.y = 5;
    sideCamera.position.z = 50;
    sideCamera.lookAt(scene.position);
}

function createTopCamera() {
    'use strict';
    topCamera= new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    topCamera.position.x = 0;
    topCamera.position.y = 50;
    topCamera.position.z = 0;
    topCamera.lookAt(scene.position);
}

function createIsometricOrtographicCamera() {
    'use strict';
    //OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
    ortographicCamera = new THREE.OrthographicCamera(window.innerWidth / -2,
                                            window.innerWidth / 2,
                                            window.innerHeight / 2,
                                            window.innerHeight / -2,
                                            0.1,
                                            1000);
    ortographicCamera.position.x = 10;
    ortographicCamera.position.y = 10;
    ortographicCamera.position.z = 10;
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

    geometry = new THREE.CubeGeometry(8, 8, 19);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLeftBackWheel(obj, x, y, z){
    'use strict';

    new THREE.TorusGeometry(2, 1.5, 16, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addRightBackWheel(obj, x, y, z){
    'use strict';

    new THREE.TorusGeometry(2, 1.5, 16, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addLeftFrontWheel(obj, x, y, z){
    'use strict';

    new THREE.TorusGeometry(2, 1.5, 16, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addRightFrontWheel(obj, x, y, z){
    'use strict';

    new THREE.TorusGeometry(1, 0.75, 16, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addConnector(obj, x, y, z){
    'use strict';

    geometry = new THREE.CubeGeometry(1, 1, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTrailer(x, y, z){
    'use strict';

    var trailer = new THREE.Object3D();
    addContainer(trailer, 0, 0, 0);
    addLeftBackWheel(trailer, -3.25, -5, 8.5);
    addRightBackWheel(trailer, 3.25, -5, 8.5);
    addLeftFrontWheel(trailer, -3.25, -5, 6);
    addRightFrontWheel(trailer, 3.25, -5, 6);
    addConnector(trailer, 0, 0, 0);

    scene.add(trailer);

    trailer.position.x = x;
    trailer.position.y = y;
    trailer.position.z = z;
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
    camera = perspectiveCamera;

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