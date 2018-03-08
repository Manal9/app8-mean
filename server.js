var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
 

const api = require('./server/routing/api')

app.use('/api',api)

console.log('marche')
app.listen(3000)


