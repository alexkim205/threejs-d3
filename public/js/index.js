// import three.js
var THREE = require('three')

require("jsdom/lib/old-api").env("", function (err, window) {
    if (err) {
        console.error(err)
        return
    }
    var $ = require("jquery")(window)
});