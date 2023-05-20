//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var  scene, renderer,camera,frontCamera, sideCamera, topCamera, ortographicCamera, perspectiveCamera;
var geometry, material, material_container, material_wheel, material_connector, mesh;
var cameras = [];
var trailer, robot;
var keyCodes = [];
var redBasicMaterial = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true });
var blueBasicMaterial = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true });
var blackBasicMaterial = new THREE.MeshBasicMaterial({ color: 'black', wireframe: true });
var greyBasicMaterial = new THREE.MeshBasicMaterial({ color: 'grey', wireframe: true });

var robotSizes = {
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
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcbd0b9);

    scene.add(new THREE.AxisHelper(10));


    createTrailer(30, 0.5, 10);
    robot = new Robot(0,0,0);
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
    material_container = new THREE.MeshBasicMaterial({ color: 0xa9a9a9, wireframe: true });
    geometry = new THREE.CubeGeometry(8, 8, 19);
    var mesh1 = new THREE.Mesh(geometry, material_container);
    mesh1.position.set(x, y, z);
    obj.add(mesh1);
}


function addConnector(obj, x, y, z){
    'use strict';

    material_connector = new THREE.MeshBasicMaterial({ color: 0x00008b, wireframe: true });
    var geometry_connector = new THREE.CylinderGeometry(1, 1, 1);
    var mesh1 = new THREE.Mesh(geometry_connector, material_connector);
    mesh1.position.set(x, y, z);
    obj.add(mesh1);
}

function createTrailer(x, y, z){
    'use strict';

    trailer = new THREE.Object3D();
    addWheel(trailer, -3.25, -5, -8.5);
    addWheel(trailer, 3.25, -5, -8.5);
    addWheel(trailer, -3.25, -5, -6);
    addWheel(trailer, 3.25, -5, -6);
    addConnector(trailer, 0, -4.5, 8.5);
    addContainer(trailer, 0, 0, 0);
    
    trailer.position.x = x;
    trailer.position.y = y;
    trailer.position.z = z;

    scene.add(trailer);

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
    constructor(x , y, z){
        super();
        this.chestGroup = new BodyGroup();
        this.leftUpperLimbsGroup = new BodyGroup();
        this.rightUpperLimbsGroup = new BodyGroup();
        this.headGroup = new BodyGroup();
        this.leftLowerLimbsGroup = new BodyGroup();
        this.rightLowerLimbsGroup = new BodyGroup();
        this.leftFootGroup = new BodyGroup();
        this.rightFootGroup = new BodyGroup();
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
    keyCodes[37]=false;
    keyCodes[38]=false;
    keyCodes[39]=false;
    keyCodes[40]=false;

    createScene();
    createCameras();
    camera = perspectiveCamera;

    render();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    if(keyCodes[37]){
        trailer.position.x -= 1;
        keyCodes[37]=false;
    }else if(keyCodes[38]){
        trailer.position.z -= 1;
        keyCodes[38]=false;
    }else if(keyCodes[39]){
        trailer.position.x += 1;
        keyCodes[39]=false;
    }else if(keyCodes[40]){
        trailer.position.z += 1;
        keyCodes[40]=false;
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
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
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
        } 
}



///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';


}