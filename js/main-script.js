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

const keyHandlers = {
    [ARROW_LEFT]: () => {
        trailer.moveX(-TRAILER_MOVE_UNIT);
        
    },
    [ARROW_UP]: () => {
        trailer.moveZ(-TRAILER_MOVE_UNIT);
    },
    [ARROW_RIGHT]: () => {
        trailer.moveX(TRAILER_MOVE_UNIT);
    },
    [ARROW_DOWN]: () => {
        trailer.moveZ(TRAILER_MOVE_UNIT);
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
    red = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true}),
    blue = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true }),
    black = new THREE.MeshBasicMaterial({ color: 'black', wireframe: true }),
    grey = new THREE.MeshBasicMaterial({ color: 'grey', wireframe: true }),
];

var sizes = {
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
    
    trailer = new Trailer(30, 0.5, 10);
    robot = new Robot(0,0,0);
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
/*                      GENERAL                       */
/* -------------------------------------------------- */


function createMesh(type, size, mat, x, y, z, r_x = 0, r_y = 0, r_z = 0){
    var mesh;
    switch (type){
        case 'cube':
            mesh = createCube(size, mat)
            break;
        case 'cylinder':
            mesh = createCylinder(size, mat);
            break;
    }
    mesh.position.set(x,y,z);
    mesh.rotation.x += r_x * Math.PI/180;
    mesh.rotation.y += r_y * Math.PI/180;
    mesh.rotation.z += r_z * Math.PI/180;
    return mesh;
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

/* -------------------------------------------------- */
/*                      TRAILER                       */
/* -------------------------------------------------- */

class Trailer extends THREE.Object3D {
    constructor(x, y, z) {
        super();
        this.createTrailer(x, y, z);
        this.boundingBox = this.createBoundingBox(x,y,z);
        console.log(this.boundingBox);
    }

    moveX(x){
        trailer.position.x += x;
        trailer.boundingBox.x_add(x);
        console.log(this.boundingBox);
    }

    moveZ(z){
        trailer.position.z += z;
        trailer.boundingBox.z_add(z);
        console.log(this.boundingBox);
    }

    createTrailer(x,y,z){
        var leftBackWheel = createMesh('cylinder', sizes.wheel, black, -3.25, -5, -8.5, 0, 0, 90);
        var rightBackWheel = createMesh('cylinder', sizes.wheel, black, 3.25, -5, -8.5, 0, 0, 90);
        var leftFrontWheel = createMesh('cylinder', sizes.wheel, black, -3.25, -5, -6, 0, 0, 90);
        var rightFrontWheel = createMesh('cylinder', sizes.wheel, black, 3.25, -5, -6, 0, 0, 90);
        var connector = createMesh('cylinder', sizes.connector, red, 0, -4.5, 8.5);
        var container = createMesh('cube', sizes.container, grey, 0, 0, 0);
    
        this.add(leftBackWheel);
        this.add(rightBackWheel);
        this.add(leftFrontWheel);
        this.add(rightFrontWheel);
        this.add(connector);
        this.add(container);
        this.position.set(x,y,z);
    }

    createBoundingBox(x, y, z){
        var xMin = x - sizes.container.x/2;
        var xMax = x + sizes.container.x/2;

        var yMin = y - sizes.container.y/2 - 2*sizes.wheel.y;
        var yMax = y + sizes.container.y/2;    
        
        var zMin = z - sizes.container.z/2;
        var zMax = z + sizes.container.z/2;

        var boundingBox = new BoundingBox(xMin, xMax, yMin, yMax, zMin, zMax);
        return boundingBox;
    }

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
    constructor(x,y,z){
        super();
        this.headGroup = this.createHeadGroup();
        this.upperLimbsGroup = this.createUpperLimbs();
        this.lowerLimbsGroup = this.createLowerLimbs();
        this.waist = this.createWaist();
        this.abdomen = this.createAbdomen();
        this.chest = this.createChest(x,y,z);
        this.boundingBox = this.createBoundingBox(x, y, z);
    }

    rotateFeet(degrees){
        if(0<= freedomDegrees.v1 + degrees && freedomDegrees.v1 + degrees <= 180){
            freedomDegrees.v1 += degrees;
            this.lowerLimbsGroup.children[2].rotate(degrees);
        }
    }

    rotateLowerLimbs(degrees){
        if(0<= freedomDegrees.v2 + degrees && freedomDegrees.v2 + degrees <= 90){
            freedomDegrees.v2 += degrees;
            this.lowerLimbsGroup.rotate(degrees);
        }
    }

    rotateHead(degrees){
        if(-180 <= freedomDegrees.v3 + degrees && freedomDegrees.v3 + degrees <= 0){
            freedomDegrees.v3 += degrees;
            this.headGroup.rotate(degrees)
        }
    }

    moveUpperLimbs(units){
        if(0 <= freedomDegrees.delta1 + units &&  freedomDegrees.delta1 + units <= sizes.arm.x){
            freedomDegrees.delta1 += units;
            this.upperLimbsGroup.children[0].move(units,0,0);
            this.upperLimbsGroup.children[1].move(-units,0,0);
        }
    }

    createHeadGroup(){
        'use strict'
        var headGroup = new BodyGroup();
        
        var head = createMesh('cube', sizes.head, blue,
            0,
            sizes.head.y/2, 
            sizes.head.z/2
        );
        var leftAntenna = createMesh('cube', sizes.antenna, black,
            -(sizes.head.x+sizes.antenna.x)/2,
            sizes.antenna.y/2,
            (sizes.antenna.z-sizes.head.z)/2
        );
        var rightAntenna = createMesh('cube', sizes.antenna, black,
            (sizes.head.x+sizes.antenna.x)/2,
            sizes.antenna.y/2,
            (sizes.antenna.z-sizes.head.z)/2
        );
        var leftEye = createMesh('cylinder', sizes.eye, black,
            -sizes.head.x/4,
            sizes.head.y/4,
            sizes.head.z/2,
            90
        );
        var rightEye = createMesh('cylinder', sizes.eye, black,
            sizes.head.x/4,
            sizes.head.y/4,
            sizes.head.z/2,
            90
        );
        
        head.add(leftAntenna);
        head.add(rightAntenna);
        head.add(leftEye);
        head.add(rightEye);
        headGroup.add(head);
        headGroup.move(0, sizes.chest.y/2, -sizes.chest.z/2);
        return headGroup;
    }

    createChest(x, y, z){
        var chest = createMesh('cube', sizes.chest, red, x, y, z);
        
        chest.add(this.headGroup);
        chest.add(this.upperLimbsGroup);
        chest.add(this.abdomen);
        this.add(chest);
        
        return chest;
    }

    createUpperLimb(side){
        var upperLimbGroup = new BodyGroup();
        var signal;
        
        switch (side){
            case 'left':
                signal = -1;
                break;
            case 'right':
                signal = 1;
                break;
        }
        
        var arm = createMesh('cube', sizes.arm, red, 
            signal*(sizes.chest.x+sizes.arm.x)/2,
            0,
            -(sizes.chest.z+sizes.arm.z)/2
        );
        var forearm = createMesh('cube', sizes.forearm, blue, 
            0,
            -(sizes.arm.y+sizes.forearm.y)/2, 
            (sizes.forearm.z-sizes.arm.z)/2
        );
        var pipe = createMesh('cube', sizes.pipe, grey,
            signal*(sizes.arm.x+sizes.pipe.x)/2,
            sizes.arm.y/2,
            (sizes.pipe.z-sizes.arm.z)/2
        );

        arm.add(forearm);
        arm.add(pipe);
        upperLimbGroup.add(arm);
        
        return upperLimbGroup;
    }

    createUpperLimbs(){
        var upperLimbsGroup = new BodyGroup();
        var leftUpperLimbGroup = this.createUpperLimb('left');
        var rightUpperLimbGroup = this.createUpperLimb('right');
        
        upperLimbsGroup.add(leftUpperLimbGroup);
        upperLimbsGroup.add(rightUpperLimbGroup);
        
        return upperLimbsGroup;
    }

    createAbdomen(){
        var abdomen = createMesh('cube', sizes.abdomen, red,
            0,
             -(sizes.chest.y+sizes.abdomen.y)/2,
            0
        );
        
        abdomen.add(this.waist);
        
        return abdomen;

    }
    createWaist(){
        var waist = createMesh('cube', sizes.waist, grey, 
            0,
             -(sizes.abdomen.y+sizes.waist.y)/2,
             0 
        );
        var leftWheel = createMesh('cylinder', sizes.wheel, black,
            -(sizes.waist.x+sizes.wheel.z)/2,
            (sizes.wheel.x-sizes.waist.y)/2,
            (sizes.wheel.y*2-sizes.waist.z)/2,
            0,
            0,
            90
        );
        var rightWheel = createMesh('cylinder', sizes.wheel, black,
            (sizes.waist.x+sizes.wheel.z)/2,
            (sizes.wheel.x-sizes.waist.y)/2,
            (sizes.wheel.y*2-sizes.waist.z)/2,
            0, 
            0,
            90
        );

        waist.add(leftWheel);
        waist.add(rightWheel);
        waist.add(this.lowerLimbsGroup);
        return waist;

    }

    createFoot(side){
        var signal;
        switch (side){
            case 'left':
                signal = -1;
                break;
            case 'right':
                signal = 1;
                break;
        }
        var foot = createMesh('cube', sizes.foot, blue,
            signal*(sizes.abdomen.x-sizes.thigh.x)/2,
            sizes.foot.y/2,
            sizes.foot.z/2
        );
        return foot;
    }

    createLowerLimb(side){
        var signal;
        switch (side){
            case 'left':
                signal = -1;
                break;
            case 'right':
                signal = 1;
                break;
        }

        var thigh = createMesh('cube', sizes.thigh, grey,
            signal*(sizes.abdomen.x-sizes.thigh.x)/2,
            -(sizes.waist.y+sizes.thigh.y)/2,
            (sizes.thigh.z-sizes.waist.y)/2
        );
        
        var leg = createMesh('cube', sizes.leg, blue,
            0,
            -(sizes.thigh.y+sizes.leg.y)/2,
            (sizes.leg.z-sizes.thigh.z)/2
        );

        var lowerWheel = createMesh('cylinder', sizes.wheel, black,
            signal*(sizes.wheel.z+sizes.leg.x)/2,
            (2*sizes.wheel.x-sizes.leg.y)/2,
            (2*sizes.wheel.y-sizes.leg.z)/2,
            0,
            0,
            90
        );
        var upperWheel = createMesh('cylinder', sizes.wheel, black,
            signal*(sizes.wheel.z+sizes.leg.x)/2,
            (2*sizes.wheel.x-sizes.leg.y)/2 +3,
            (2*sizes.wheel.y-sizes.leg.z)/2,
            0,
            0,
            90
        );

        thigh.add(leg);
        leg.add(lowerWheel);
        leg.add(upperWheel);

        return thigh;
    }
    
    createLowerLimbs(){
        var lowerLimbsGroup = new BodyGroup();
        var feetGroup = new BodyGroup();

        var leftLowerLimb = this.createLowerLimb('left');
        var rightLowerLimb = this.createLowerLimb('right');
        
        var leftFoot = this.createFoot('left');
        var rightFoot = this.createFoot('right');

        feetGroup.add(leftFoot);
        feetGroup.add(rightFoot);


        feetGroup.rotate(0);
        feetGroup.move(
           0,
            -(sizes.waist.y+2*sizes.thigh.y+2*sizes.leg.y)/2,
            (sizes.leg.z-sizes.waist.y+sizes.leg.z)/2
        );
        lowerLimbsGroup.move(0,0,-sizes.waist.y);
        
        lowerLimbsGroup.add(leftLowerLimb);
        lowerLimbsGroup.add(rightLowerLimb);
        lowerLimbsGroup.add(feetGroup);
        
        return lowerLimbsGroup;

    }

    createBoundingBox(x, y, z){
        var xMin = x - sizes.chest.x/2 - sizes.arm.x - sizes.pipe.x;
        var xMax = x + sizes.chest.x/2 + sizes.arm.x + sizes.pipe.x;

        var yMin = y - sizes.chest.y/2 - sizes.abdomen.y - sizes.waist.y - sizes.thigh.y - sizes.leg.y;
        var yMax = y + sizes.chest.y/2 + sizes.head.y/2 + sizes.antenna.y    
        
        var zMin = z - sizes.chest.z/2 - sizes.arm.z;
        var zMax = z + sizes.chest.z/2

        var boundingBox = new BoundingBox(xMin, xMax, yMin, yMax, zMin, zMax);
        return boundingBox;
    }
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

    x_add(units){
        this.x_max += units;
        this.x_min += units;
    }

    y_add(units){
        this.y_max += units;
        this.y_min += units;
    }

    z_add(units){
        this.z_max += units;
        this.z_min += units;
    }


    //methods

    intersect(other){
        return (this.x_min < other.x_max && this.x_max > other.x_min) &&
               (this.y_min < other.y_max && this.y_max > other.y_min) &&
                (this.z_min < other.z_max && this.z_max > other.z_min);
    }

}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';
    return robot.boundingBox.intersect(trailer.boundingBox);
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