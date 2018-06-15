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