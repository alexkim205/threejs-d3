// express
var express = require('express')
const app = express()
// node-sass
var sass = require('node-sass')


// register pug as view engine
app.set('view engine', 'pug')

// get response
var indexRouter = require('./routes/index')
app.use('/', indexRouter);

// serve static files in folder called public
app.use(express.static('public'))
app.use(express.static('node_modules'))

// listen on port 3000
app.listen(8080, () => console.log('Example app listening on port 8080!'))
