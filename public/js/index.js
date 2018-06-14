// import three.js
var Detector = require('three/examples/js/Detector')

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
    // Initiate function or other initializations here
    // animate();
    console.log("WebGL is supported. You are good to go!")
} else {
    console.log("WebGL is not supported!")
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById(container).appendChild(warning);
}

var graphics = require("./graphics")