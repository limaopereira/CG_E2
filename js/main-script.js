/////////////////////
/*   CONSTANTS     */
/////////////////////

const ARROW_LEFT = "37";
const ARROW_UP = "38";
const ARROW_RIGHT = "39";
const ARROW_DOWN = "40";
const KEY_Q = "81";
const KEY_A = "65";
const KEY_W = "87";
const KEY_S = "83";
const KEY_E = "69";
const KEY_D = "68";
const KEY_R = "82";
const KEY_F = "70";
const KEY_6 = "54";
const KEY_1 = "49";
const KEY_2 = "50";
const KEY_3 = "51";
const KEY_4 = "52";
const KEY_5 = "53";

const TRAILER_MOVE_UNIT = 1;
const ROBOT_ROTATION_DEGREES = 1;
const ROBOT_MOVE_UNIT = 0.2;

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
const Z_MIN_TRAILER = 0.5
const Z_MAX_TRAILER = 19.5

const CONNECTION_X = 0
const CONNECTION_Z = -16

const keyHandlers = {
    [ARROW_LEFT]: () => {
        trailer.moveX(-TRAILER_MOVE_UNIT);
        trailer.bounding_box.x_max_set=trailer.bounding_box.x_max_get-1;
        trailer.bounding_box.x_min_set=trailer.bounding_box.x_min_get-1;
    },
    [ARROW_UP]: () => {
        trailer.moveZ(-TRAILER_MOVE_UNIT);
        trailer.bounding_box.z_max_set=trailer.bounding_box.z_max_get-1;
        trailer.bounding_box.z_min_set=trailer.bounding_box.z_min_get-1;
    },
    [ARROW_RIGHT]: () => {
        trailer.moveX(TRAILER_MOVE_UNIT);
        trailer.bounding_box.z_max_set=trailer.bounding_box.x_max_get+1;
        trailer.bounding_box.z_min_set=trailer.bounding_box.x_min_get+1;
    },
    [ARROW_DOWN]: () => {
        trailer.moveZ(TRAILER_MOVE_UNIT);
        trailer.bounding_box.z_max_set=trailer.bounding_box.z_max_get+1;
        trailer.bounding_box.z_min_set=trailer.bounding_box.z_min_get+1;
    },
    [KEY_Q]: () => robot.rotateFeet(2*ROBOT_ROTATION_DEGREES),
    [KEY_A]: () => robot.rotateFeet(-2*ROBOT_ROTATION_DEGREES),
    [KEY_W]: () => robot.rotateLowerLimbs(ROBOT_ROTATION_DEGREES),
    [KEY_S]: () => robot.rotateLowerLimbs(-ROBOT_ROTATION_DEGREES),
    [KEY_E]: () => robot.moveUpperLimbs(ROBOT_MOVE_UNIT),
    [KEY_D]: () => robot.moveUpperLimbs(-ROBOT_MOVE_UNIT),
    [KEY_R]: () => robot.rotateHead(-2*ROBOT_ROTATION_DEGREES),
    [KEY_F]: () => robot.rotateHead(2*ROBOT_ROTATION_DEGREES),
    [KEY_1]: () => { activeCamera = cameras.front; keyCodes[KEY_1] = false;is_orthographic=true;},
    [KEY_2]: () => { activeCamera = cameras.side; keyCodes[KEY_2] = false; is_orthographic=true;},
    [KEY_3]: () => { activeCamera = cameras.top; keyCodes[KEY_3] = false; is_orthographic=true;},
    [KEY_4]: () => { activeCamera = cameras.ortographic;  keyCodes[KEY_4] = false; is_orthographic=true;},
    [KEY_5]: () => { activeCamera = cameras.perspective;  keyCodes[KEY_5] = false; is_orthographic=false;},
    [KEY_6]: () => { 
        for(const material of materials){
            material.wireframe = !material.wireframe;
        }
        keyCodes[KEY_6] = false;
    },
}

const materials = [
    redBasicMaterial = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true}),
    blueBasicMaterial = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true }),
    blackBasicMaterial = new THREE.MeshBasicMaterial({ color: 'black', wireframe: true }),
    greyBasicMaterial = new THREE.MeshBasicMaterial({ color: 'grey', wireframe: true }),
];

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


//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var  scene, renderer,camera;
var cameras = {};
var activeCamera;
var trailer, robot;
var trailer, robot,bounding_box_trailer, boundingbox_robot;
var keyCodes = {};
var in_animation = false;
var is_orthographic = true;

var freedomDegrees = {
    v1: 0,
    v2: 0,
    v3: 0,
    delta1: 0
}


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
    var geometry = new THREE.CubeGeometry(x, y, z);
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function createCylinder(size, material){
    'use strict'
    var {x, y, z} = size;
    var geometry = new THREE.CylinderGeometry(x, y, z);
    var mesh = new THREE.Mesh(geometry, material);
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
        if (keyCodes[key] && keyHandlers[key]) {
            keyHandlers[key]();
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
    keyCodes[e.keyCode] = true;
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
    keyCodes[e.keyCode] = false;
}