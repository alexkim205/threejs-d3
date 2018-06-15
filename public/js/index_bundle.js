(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// import three.js
// var THREE = require('three')
// var Projector = require('three/examples/js/renderers/Projector')(THREE)
// var CanvasRenderer = require('three/examples/js/renderers/CanvasRenderer')(THREE)

// threejs variables
var camera, scene, renderer
var axisHelper, plane
var controls

init()

function init() {

    /////////////////////////////////////////
    // Scene Setup
    /////////////////////////////////////////

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xfff000)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(5, 5, 5)
    camera.lookAt(scene.position)
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    /////////////////////////////////////////
    // Trackball Controller
    /////////////////////////////////////////
    controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', render)

    /////////////////////////////////////////
    // Utilities
    /////////////////////////////////////////

    axisHelper = new THREE.AxisHelper(1.25);
    scene.add(axisHelper);

    plane = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5, 5, 5),
        new THREE.MeshBasicMaterial({
            color: 0x393839,
            wireframe: true
        })
    )
    plane.rotateX(Math.PI / 2)
    scene.add(plane)
    render()

    /////////////////////////////////////////
    // Render Loop
    /////////////////////////////////////////

    function render() {
        renderer.render(scene, camera)
    }
    // controls.addEventListener('change', render)

    // function animLoop() {
    //     requestAnimationFrame(animLoop)
    //     controls.update()
    // }

    // animLoop()

    /////////////////////////////////////////
    // Window Resizing
    /////////////////////////////////////////

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        controls.handleResize();
        render();
    }, false);

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
