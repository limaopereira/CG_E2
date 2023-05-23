//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var  scene, renderer,camera,frontCamera, sideCamera, topCamera, ortographicCamera, perspectiveCamera;
var geometry, material, material_container, material_wheel, material_connector, mesh;
var cameras = {};
var activeCamera;
var trailer, robot;
var cameras = [];
var trailer, robot,bounding_box_trailer, boundingbox_robot;
var keyCodes = [];
var redBasicMaterial = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true});
var blueBasicMaterial = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true });
var blackBasicMaterial = new THREE.MeshBasicMaterial({ color: 'black', wireframe: true });
var greyBasicMaterial = new THREE.MeshBasicMaterial({ color: 'grey', wireframe: true });
var in_animation = false;
var is_orthographic = true;

var robotSizes = {
    container: {
        x:8,
        y:8,
        z:19
    },
    connector: {
        x:1,
        y:1,
        z:1
    },
    chest: {
        x: 8,
        y: 4,
        z: 4.5,
    },
    head: {
        x: 2.5,
        y: 2.5,
        z: 2.5
    },
    antenna: {
        x:0.5,
        y:2,
        z:0.5,
    },
    
    arm: {
        x:2,
        y:4,
        z:3.25,
    },
    forearm: {
        x:2,
        y:1.5,
        z:7.75,
    },
    eye: {
        x:0.5,
        y:0.5,
        z:0.5,
    },
    abdomen: {
        x:4,
        y:1.5,
        z:4.5,
    },
    waist: {
        x:5,
        y:1.5,
        z:4.5,
    },
    wheel: {
        x:1,
        y:1,
        z:1.5,
    },
    thigh: {
        x:1,
        y:2,
        z:1,
    },
    leg: {
        x:2,
        y:6,
        z:1.5,
    },
    foot: {
        x:2,
        y:1,
        z:2,
    },
    pipe:{
        x:0.25,
        y:3,
        z:0.25,
    }

}


var freedomDegrees = {
    v1: 0,
    v2: 0,
    v3: 0,
    delta1: 0
}

/////////////////////
/*   CONSTANTS     */
/////////////////////

const X_MIN_ROBOT = -4.25
const X_MAX_ROBOT = 4.25
const Y_MIN_ROBOT = -5.5
const Y_MAX_ROBOT = 3.5
const Z_MIN_ROBOT = -5
const Z_MAX_ROBOT = 2.25

const X_MIN_TRAILER = 26
const X_MAX_TRAILER = 34
const Y_MIN_TRAILER = -5.5
const Y_MAX_TRAILER = 4.5
const Z_MIN_TRAILER = -0.5
const Z_MAX_TRAILER = 18.5

const CONNECTION_X = 0
const CONNECTION_Z = -16
/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcbd0b9);

    scene.add(new THREE.AxisHelper(10));


    //createTrailer(30, 0.5, 10);
    bounding_box_trailer = new BoundingBox(X_MIN_TRAILER, X_MAX_TRAILER, Y_MIN_TRAILER, Y_MAX_TRAILER, Z_MIN_TRAILER, Z_MAX_TRAILER);
    trailer = new Trailer(30, 0.5, 10, bounding_box_trailer);
    boundingbox_robot = new BoundingBox(X_MIN_ROBOT, X_MAX_ROBOT, Y_MIN_ROBOT, Y_MAX_ROBOT, Z_MIN_ROBOT, Z_MAX_ROBOT);
    robot = new Robot(0,0,0,boundingbox_robot);
    scene.add(trailer);
    scene.add(robot);
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
    cameras.front = new THREE.OrthographicCamera(window.innerWidth /  -40,
                                            window.innerWidth/40 ,
                                            window.innerHeight / 40,
                                            window.innerHeight / -40,
                                            0.1,
                                            1000);
    cameras.front.position.x = 0;
    cameras.front.position.y = 0;
    cameras.front.position.z = 50;
    cameras.front.lookAt(scene.position);
    activeCamera = cameras.front;
}

function createSideCamera() {
    'use strict';
    cameras.side = new THREE.OrthographicCamera(window.innerWidth /  -40,
                                            window.innerWidth/40 ,
                                            window.innerHeight / 40,
                                            window.innerHeight / -40,
                                            0.1,
                                            1000);
    cameras.side.position.x = 50;
    cameras.side.position.y = 0;
    cameras.side.position.z = 0;
    cameras.side.lookAt(scene.position);
}

function createTopCamera() {
    'use strict';
    cameras.top = new THREE.OrthographicCamera(window.innerWidth /  -40,
                                            window.innerWidth/40 ,
                                            window.innerHeight / 40,
                                            window.innerHeight / -40,
                                            0.1,
                                            1000);
    cameras.top.position.x = 0;
    cameras.top.position.y = 50;
    cameras.top.position.z = 0;
    cameras.top.lookAt(scene.position);
}

function createIsometricOrtographicCamera() {
    'use strict';
    //OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
    cameras.ortographic = new THREE.OrthographicCamera(window.innerWidth /  -40,
                                            window.innerWidth/40 ,
                                            window.innerHeight / 40,
                                            window.innerHeight / -40,
                                            0.1,
                                            1000);
    cameras.ortographic.position.x = 50;
    cameras.ortographic.position.y = 50;
    cameras.ortographic.position.z = 50;
    cameras.ortographic.lookAt(scene.position);
}

function createIsometricPerspectiveCamera() {
    'use strict';
    cameras.perspective = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    cameras.perspective.position.x = 50;
    cameras.perspective.position.y = 50;
    cameras.perspective.position.z = 50;
    cameras.perspective.lookAt(scene.position);
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
   
    var mesh1 = createCube(robotSizes.container, greyBasicMaterial);
    mesh1.position.set(x, y, z);
    obj.add(mesh1);
}


function addConnector(obj, x, y, z){
    'use strict';

    var mesh1 = createCylinder(robotSizes.connector, redBasicMaterial);
    mesh1.position.set(x, y, z);
    obj.add(mesh1);
}

class Trailer extends THREE.Object3D {
    constructor(x, y, z, boundingBox) {
        super();
        this.bounding_box = boundingBox;
        createTrailer(this, x, y, z);
    }

    moveX(x){
        trailer.position.x += x;
    }
    moveZ(z){
        trailer.position.z += z;
    }
}

function createTrailer(obj ,x, y, z){
    'use strict';

  
    addWheel(obj, -3.25, -5, -8.5);
    addWheel(obj, 3.25, -5, -8.5);
    addWheel(obj, -3.25, -5, -6);
    addWheel(obj, 3.25, -5, -6);
    addConnector(obj, 0, -4.5, 8.5);
    addContainer(obj, 0, 0, 0);
    obj.position.set(x,y,z);
}

/* -------------------------------------------------- */
/*                      ROBOT                         */
/* -------------------------------------------------- */

class BodyGroup extends THREE.Object3D{
    
    constructor(){
        super();
    }
    rotate(degrees){
        this.rotation.x += degrees * Math.PI/180;
    }
    move(x,y,z){
        this.position.add(new THREE.Vector3(x,y,z));
    }
}

class Robot extends THREE.Object3D{
    constructor(x , y, z, boundingBox){
        super();
        this.chestGroup = new BodyGroup();
        this.leftUpperLimbsGroup = new BodyGroup();
        this.rightUpperLimbsGroup = new BodyGroup();
        this.headGroup = new BodyGroup();
        this.leftLowerLimbsGroup = new BodyGroup();
        this.rightLowerLimbsGroup = new BodyGroup();
        this.leftFootGroup = new BodyGroup();
        this.rightFootGroup = new BodyGroup();
        this.bounding_box = boundingBox;
        this.add(this.chestGroup);
        createRobot(this, x, y, z);
    }

    rotateFeet(degrees){
        if(0<= freedomDegrees.v1 + degrees && freedomDegrees.v1 + degrees <= 180){
            freedomDegrees.v1 += degrees;
            this.leftFootGroup.rotate(degrees);
            this.rightFootGroup.rotate(degrees);
        }
        
    }

    rotateLowerLimbs(degrees){
        if(0<= freedomDegrees.v2 + degrees && freedomDegrees.v2 + degrees <= 90){
            freedomDegrees.v2 += degrees;
            this.leftLowerLimbsGroup.rotate(degrees);
            this.rightLowerLimbsGroup.rotate(degrees);
        }
    }

    rotateHead(degrees){
        if(-180 <= freedomDegrees.v3 + degrees && freedomDegrees.v3 + degrees <= 0){
            freedomDegrees.v3 += degrees;
            this.headGroup.rotate(degrees)
        }
        
    }

    moveUpperLimbs(units){
        if(0 <= freedomDegrees.delta1 + units &&  freedomDegrees.delta1 + units <= robotSizes.arm.x){
            freedomDegrees.delta1 += units;
            this.leftUpperLimbsGroup.move(units,0,0);
            this.rightUpperLimbsGroup.move(-units,0,0);
        }
    }
}


function createRobot(obj, x, y, z){
    'use strict'
    addChest(obj, x, y, z);
    addUpperLimbs(
        obj,
        -(robotSizes.chest.x+robotSizes.arm.x)/2,
        0,
        -(robotSizes.chest.z+robotSizes.arm.z)/2
    );
    addUpperLimbs(
        obj,
        (robotSizes.chest.x+robotSizes.arm.x)/2,
        0,
        -(robotSizes.chest.z+robotSizes.arm.z)/2
    );
    addHead(
        obj,
        0,
        robotSizes.chest.y/2,
        -robotSizes.chest.z/2
    );
    var abdomen = addAbdomen(obj, 0, -(robotSizes.chest.y+robotSizes.abdomen.y)/2,0);
    var waist = addWaist(abdomen, 0, -(robotSizes.abdomen.y+robotSizes.waist.y)/2,0);
    addLowerLimbs(
        waist,
        obj,
        (robotSizes.thigh.x-robotSizes.abdomen.x)/2,
        0,
        -robotSizes.waist.y
    );
    addLowerLimbs(
        waist,
        obj,
        -(robotSizes.thigh.x-robotSizes.abdomen.x)/2,
        0,
        -robotSizes.waist.y
    )
}

function addChest(obj , x, y, z){
    'use strict'
    obj.chestGroup.add(createCube(robotSizes.chest,redBasicMaterial))
    obj.chestGroup.move(x,y,z);
}

function addUpperLimbs(obj, x, y, z){
    'use strict'
    if(x > 0) {
        var pipeSignalX = 1;
        var upperLimbs = obj.rightUpperLimbsGroup;
    }
    else{
        var pipeSignalX = -1;
        var upperLimbs = obj.leftUpperLimbsGroup;
    }
    upperLimbs.move(x - pipeSignalX*freedomDegrees.delta1,y,z);
    addArm(upperLimbs,0,0,0);
    addForearm(
        upperLimbs,
        0,
        -(robotSizes.arm.y+robotSizes.forearm.y)/2, 
        (robotSizes.forearm.z-robotSizes.arm.z)/2
    );
    addPipe(
        upperLimbs,
        pipeSignalX*(robotSizes.arm.x+robotSizes.pipe.x)/2,
        robotSizes.arm.y/2,
        (robotSizes.pipe.z-robotSizes.arm.z)/2
    );
    obj.add(upperLimbs);
}


function addHead(obj, x, y, z){
    'use strict'
    var headCube = createCube(robotSizes.head, blueBasicMaterial);
    headCube.position.set(
        0,
        robotSizes.head.y/2,
        robotSizes.head.z/2,
    );    
    obj.headGroup.add(headCube);
    addAntenna(
        headCube,
        -(robotSizes.head.x+robotSizes.antenna.x)/2,
        robotSizes.antenna.y/2,
        (robotSizes.antenna.z-robotSizes.head.z)/2
    );
    addAntenna(
        headCube,
        (robotSizes.head.x+robotSizes.antenna.x)/2,
        robotSizes.antenna.y/2,
        (robotSizes.antenna.z-robotSizes.head.z)/2
    );
    addEye(
        headCube,
        -robotSizes.head.x/4,
        robotSizes.head.y/4,
        robotSizes.head.z/2
    );
    addEye(
        headCube,
        robotSizes.head.x/4,
        robotSizes.head.y/4,
        robotSizes.head.z/2
    );
    
    obj.headGroup.rotate(freedomDegrees.v3);
    obj.headGroup.move(x,y,z);
    obj.chestGroup.add(obj.headGroup);
}

function addAbdomen(obj, x, y, z){
    'use strict'
    var abdomen = createCube(robotSizes.abdomen, redBasicMaterial);
    abdomen.position.set(x,y,z);
    obj.chestGroup.add(abdomen);
    return abdomen;
}

function addFoot(obj, footGroup, x, y, z){
    'use strict'
    var footCube = createCube(robotSizes.foot, blueBasicMaterial);
    footCube.position.set(0,robotSizes.foot.y/2,robotSizes.foot.z/2);
    footGroup.add(footCube);
    footGroup.rotate(freedomDegrees.v1);
    footGroup.move(x,y,z);
    obj.add(footGroup);

}


function addLowerLimbs(obj, robotObj, x, y, z){
    'use strict'
    if(x>0){
        var wheelSignalX = 1;
        var lowerLimbs = robotObj.rightLowerLimbsGroup;
        var footGroup = robotObj.rightFootGroup;
    }
    else{
        var wheelSignalX = -1;
        var lowerLimbs = robotObj.leftLowerLimbsGroup;
        var footGroup = robotObj.leftFootGroup;
    }
    var thigh = addThigh(
        lowerLimbs,
        0,
        -robotSizes.waist.y/2-robotSizes.thigh.y/2,
        (robotSizes.thigh.z-robotSizes.waist.y)/2
    );
    var leg = addLeg(
        thigh,
        0,
        -(robotSizes.thigh.y+robotSizes.leg.y)/2,
        (robotSizes.leg.z-robotSizes.thigh.z)/2
    );
    addFoot(
        leg,
        footGroup,
        0,
        -robotSizes.leg.y/2,
        robotSizes.leg.z/2
    );
    addWheel(
        leg,
        wheelSignalX*(robotSizes.wheel.z+robotSizes.leg.x)/2,
        (2*robotSizes.wheel.x-robotSizes.leg.y)/2,
        (2*robotSizes.wheel.y-robotSizes.leg.z)/2
    );
    addWheel(
        leg,
        wheelSignalX*(robotSizes.wheel.z+robotSizes.leg.x)/2,
        (2*robotSizes.wheel.x-robotSizes.leg.y)/2 + 3,
        (2*robotSizes.wheel.y-robotSizes.leg.z)/2
    );

    lowerLimbs.rotate(freedomDegrees.v2);
    lowerLimbs.move(x,y,z);
    obj.add(lowerLimbs);
}


function createCube(size, material){
    'use strict'
    var {x, y, z} = size;
    geometry = new THREE.CubeGeometry(x, y, z);
    mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function createCylinder(size, material){
    'use strict'
    var {x, y, z} = size;
    geometry = new THREE.CylinderGeometry(x, y, z);
    mesh = new THREE.Mesh(geometry, material);
    return mesh;
}


function addArm(obj, x, y, z){
    'use strict'
    var arm = createCube(robotSizes.arm, redBasicMaterial);
    arm.position.set(x,y,z);
    obj.add(arm);
}


function addForearm(obj, x, y, z){
    'use strict'
    var forearm = createCube(robotSizes.forearm, blueBasicMaterial);
    forearm.position.set(x,y,z);
    obj.add(forearm);
}

function addPipe(obj, x, y, z){
    'use strict'
    var pipe = createCube(robotSizes.pipe, greyBasicMaterial);
    pipe.position.set(x,y,z);
    obj.add(pipe);
}



function addAntenna(obj, x, y, z){
    'use strict'
    var antenna = createCube(robotSizes.antenna, blackBasicMaterial);
    antenna.position.set(x,y,z);
    obj.add(antenna);
}

function addEye(obj, x, y, z){
    'use strict'
    var eye = createCylinder(robotSizes.eye, blackBasicMaterial);
    eye.rotation.x += 90 * Math.PI/180;
    eye.position.set(x,y,z);
    
    obj.add(eye);
}

function addWaist(obj, x, y, z){
    'use strict'

    var waist = createCube(robotSizes.waist, greyBasicMaterial);
    waist.position.set(x,y,z);
    obj.add(waist);
    addWheel(
        waist,
        -(robotSizes.waist.x+robotSizes.wheel.z)/2,
        (robotSizes.wheel.x-robotSizes.waist.y)/2,
        (robotSizes.wheel.y*2-robotSizes.waist.z)/2
    );
    addWheel(
        waist,
        (robotSizes.waist.x+robotSizes.wheel.z)/2,
        (robotSizes.wheel.x-robotSizes.waist.y)/2,
        (robotSizes.wheel.y*2-robotSizes.waist.z)/2
    );
    return waist;
}

function addWheel(obj, x, y, z){
    'use strict'
    var wheel = createCylinder(robotSizes.wheel, blackBasicMaterial);
    wheel.rotation.z += 90 * Math.PI/180;
    wheel.position.set(x,y,z);
    obj.add(wheel);
}

function addThigh(obj, x, y, z){
    var thigh = createCube(robotSizes.thigh, greyBasicMaterial);
    thigh.position.set(x,y,z)
    obj.add(thigh);
    return thigh;
}

function addLeg(obj, x, y, z){
    var leg = createCube(robotSizes.leg, blueBasicMaterial);
    leg.position.set(x,y,z);
    obj.add(leg);
    return leg;
}

////////////////////////
// BOUNDING BOX CLASS //
////////////////////////

class BoundingBox {

    constructor(x_min, x_max, y_min, y_max, z_min, z_max){
        this.x_min = x_min;
        this.x_max = x_max;
        this.y_min = y_min;
        this.y_max = y_max;
        this.z_min = z_min;
        this.z_max = z_max;;   
    }

    //getters

    get x_min_get(){
        return this.x_min;
    }

    get x_max_get(){
        return this.x_max;
    }

    get y_min_get(){
        return this.y_min;
    }

    get y_max_get(){
        return this.y_max;
    }

    get z_min_get(){
        return this.z_min;
    }

    get z_max_get(){
        return this.z_max;
    }

    //setters

    set x_min_set(x_min){
        this.x_min = x_min;
    }

    set x_max_set(x_max){
        this.x_max = x_max;
    }

    set y_min_set(y_min){
        this.y_min = y_min;
    }

    set y_max_set(y_max){
        this.y_max = y_max;
    }

    set z_min_set(z_min){
        this.z_min = z_min;
    }

    set z_max_set(z_max){
        this.z_max = z_max;
    }

    //methods

    intersect(other){
        return (this.x_min < other.x_max && this.x_max > other.x_min) &&
               (this.y_min < other.y_max && this.y_max > other.y_min) &&
                (this.z_min < other.z_max && this.z_max > other.z_min);
    }

    update_max_point(x,y,z){
        this.x_max = x;
        this.y_max = y;
        this.z_max = z;
    }

    update_min_point(x,y,z){
        this.x_min = x;
        this.y_min = y;
        this.z_min = z;
    }
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';
    return robot.bounding_box.intersect(trailer.bounding_box);
}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';
    console.log("COLLISION");

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
    renderer.render(scene, activeCamera);
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
    keyCodes[37]=false;
    keyCodes[38]=false;
    keyCodes[39]=false;
    keyCodes[40]=false;
    keyCodes[81]=false;
    keyCodes[87]=false;
    keyCodes[69]=false;
    keyCodes[82]=false;
    keyCodes[65]=false;
    keyCodes[83]=false;
    keyCodes[68]=false;
    keyCodes[70]=false;

    createScene();
    createCameras();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    for (const key in keyCodes) {
        if (keyCodes[key] && !in_animation) {
            switch (key) {
                case "37": //arrow left
                    trailer.moveX(-1);
                    trailer.bounding_box.x_max_set=trailer.bounding_box.x_max_get-1;
                    trailer.bounding_box.x_min_set=trailer.bounding_box.x_min_get-1;
                    break;
                case "38": //arrow up
                    trailer.moveZ(-1);
                    trailer.bounding_box.z_max_set=trailer.bounding_box.z_max_get-1;
                    trailer.bounding_box.z_min_set=trailer.bounding_box.z_min_get-1;
                    break;
                case "39": //arrow right
                    trailer.moveX(1);
                    trailer.bounding_box.x_max_set=trailer.bounding_box.x_max_get+1;
                    trailer.bounding_box.x_min_set=trailer.bounding_box.x_min_get+1;
                    break;
                case "40": //arrow down
                    trailer.moveZ(1);
                    trailer.bounding_box.z_max_set=trailer.bounding_box.z_max_get+1;
                    trailer.bounding_box.z_min_set=trailer.bounding_box.z_min_get+1;
                    break;
                case "81": //Q
                    robot.rotateFeet(1);
                    break;
                case "65": //A
                    robot.rotateFeet(-1);
                    break;
                case "87": //W
                    robot.rotateLowerLimbs(1);
                    break;
                case "83": //S
                    robot.rotateLowerLimbs(-1);
                    break;
                case "69": //E
                    robot.moveUpperLimbs(0.2);
                    break;
                case "68": //D
                    robot.moveUpperLimbs(-0.2);
                    break;
                case "82": //R
                    robot.rotateHead(1);
                    break;
                case "70": //F
                    robot.rotateHead(-1);
                    break;
                case "54": //6
                    redBasicMaterial.wireframe = !redBasicMaterial.wireframe;
                    blueBasicMaterial.wireframe = !blueBasicMaterial.wireframe;
                    blackBasicMaterial.wireframe = !blackBasicMaterial.wireframe;
                    greyBasicMaterial.wireframe = !greyBasicMaterial.wireframe;
                    break;
                case "49":
                    activeCamera = cameras.front;
                    is_orthographic=true;
                    break;
                case "50":
                    activeCamera = cameras.side;
                    is_orthographic=true;
                    break;
                case "51":
                    activeCamera = cameras.top;
                    is_orthographic= true;
                    break;
                case "52":
                    activeCamera = cameras.ortographic;
                    is_orthographic= true;
                    break;
                case "53":
                    activeCamera = cameras.perspective;
                    is_orthographic= false;
                    break;
            }

            // Definir a tecla como falsa após executar a ação correspondente
            keyCodes[key] = false;
        }
    }
    
    if(checkCollisions()){
        handleCollisions();
    }
   
    render();

    requestAnimationFrame(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        if(is_orthographic){
            if(window.innerHeight > window.innerWidth){
                activeCamera.left = window.innerWidth / -40;
                activeCamera.right = window.innerWidth / 40;
                activeCamera.top = window.innerHeight / 40;
                activeCamera.bottom = window.innerHeight / -40;
            }else{
                activeCamera.left = window.innerWidth / -40;
                activeCamera.right = window.innerWidth / 40;
                activeCamera.top = window.innerHeight / 40;
                activeCamera.bottom = window.innerHeight / -40;
            }
        }else{
            activeCamera.aspect = window.innerWidth / window.innerHeight;
        }
        
        activeCamera.updateProjectionMatrix();
    }

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 37: //arrow left
            keyCodes[37]=true;
            break;
        case 38: //arrow up
            keyCodes[38]=true;
            break;
        case 39: //arrow right
            keyCodes[39]=true;
            break;  
        case 40: //arrow down
            keyCodes[40]=true;
            break; 
        case 81: //Q
        case 113: //q
            keyCodes[81]=true;
            break;
        case 65: //A
        case 97: //a
            keyCodes[65]=true;
            break;
        case 87: //W
        case 119: //w
            keyCodes[87]=true;
            break;
        case 83: //S
        case 115: //s
            keyCodes[83]=true;
            break;
        case 69: //E
        case 101: //e
            keyCodes[69]=true;
            break;
        case 68: //D
        case 100: //d
            keyCodes[68]=true;
            break;
        case 82: //R
        case 114: //r
            keyCodes[82]=true;
            break;
        case 70: //F
        case 102: //f
            keyCodes[70]=true;
            break;
        case 54: //6
            keyCodes[54]=true;
            break;
        case 49:
            keyCodes[49]=true;
            break;
        case 50:
            keyCodes[50]=true;
            break;
        case 51:
            keyCodes[51]=true;
            break;
        case 52:
            keyCodes[52]=true;
            break;
        case 53:
            keyCodes[53]=true;
            break;
    }
    
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';


}