(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// import three.js
// var THREE = require('three')
// var Projector = require('three/examples/js/renderers/Projector')(THREE)
// var CanvasRenderer = require('three/examples/js/renderers/CanvasRenderer')(THREE)

// threejs variables
var camera, scene, renderer, axisHelper
var controls
var ambientLight, pointLight, shadowMaterial
var shape1, shape2

init()

function init() {

    /////////////////////////////////////////
    // Scene Setup
    /////////////////////////////////////////
    // Scene
    scene = new THREE.Scene()
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(100, 100, 20)
    camera.lookAt(scene.position)
    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xfff6e6);
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    // Lights
    ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)
    pointLight = new THREE.PointLight(0xffffff, 1, 0, 2)
    pointLight.position.set(25, 50, 25)
    pointLight.castShadow = true
    pointLight.shadow.mapSize.width = 1024
    pointLight.shadow.mapSize.height = 1024
    scene.add(pointLight)
    // Shadows
    shadowMaterial = new THREE.ShadowMaterial({
        color: 0x669999,
        opacity: 0.5,
    })

    document.body.appendChild(renderer.domElement)

    /////////////////////////////////////////
    // Trackball Controller
    /////////////////////////////////////////
    controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.target = new THREE.Vector3(0, 15, 0)
    // controls.maxPolarAngle = Math.PI / 2
    controls.addEventListener('change', render)

    /////////////////////////////////////////
    // Utilities
    /////////////////////////////////////////

    axisHelper = new THREE.AxesHelper(1.25);
    scene.add(axisHelper);

    /////////////////////////////////////////
    // Shapes
    /////////////////////////////////////////
    // ground
    plane = new THREE.Mesh(
        new THREE.BoxGeometry(100, .1, 100),
        shadowMaterial
    )
    plane.receiveShadow = true
    scene.add(plane)
    // generic octahedron
    var Octa = function () {
        THREE.Group.apply(this, arguments);
        let shape = new THREE.Mesh(
            new THREE.OctahedronGeometry(10, 1),
            new THREE.MeshStandardMaterial({
                color: getRandomColor(),
                flatShading: THREE.FlatShading,
                metalness: 0,
                roughness: 0.8
            })
        )
        shape.rotateZ(Math.PI / Math.random())
        shape.castShadow = true
        shape.receiveShadow = true

        let bb_box3 = new THREE.Box3().setFromObject(shape)
        let bb = new THREE.Box3Helper(bb_box3, 0xff0066)
        shape.position.y += bb_box3.max.y
        // shape.position.x += bb_box3.max.x
        this.add(shape) // add to group
        this.add(bb)
    }
    Octa.prototype = Object.create(THREE.Group.prototype)
    Octa.prototype.constructor = Octa

    // add shapes
    shape1 = new Octa()
    shape1.position.x += 10
    scene.add(shape1)
    shape2 = new Octa()
    shape2.position.x -= 10
    shape2.scale.set(.8,.8,.8);
    scene.add(shape2)

    /////////////////////////////////////////
    // Window Resizing
    /////////////////////////////////////////

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }, false);

    /////////////////////////////////////////
    // Render Loop
    /////////////////////////////////////////

    function render() {
        renderer.render(scene, camera)
    }

}

/////////////////////////////////////////
// Helper Functions (not rltd to scene)
/////////////////////////////////////////

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
},{}],2:[function(require,module,exports){
// import three.js
// var Detector = require('three/examples/js/Detector')

// import jquery with jsdom
// require("jsdom/lib/old-api").env("", function (err, window) {
//     if (err) {
//         console.error(err)
//         return
//     }
//     var $ = require("jquery")(window)
// })

// check if WebGL supported
if (Detector.webgl) {
    console.log("WebGL is supported. You are good to go!")
} else {
    console.log("WebGL is not supported!")
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById(container).appendChild(warning);
}

var graphics = require("./graphics")
},{"./graphics":1}]},{},[2]);
