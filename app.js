const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors')
const { existsSync } = require('fs')

const app = express()
const server = require('http').createServer(app)

app.use(
    bodyParser.urlencoded({
        extended : false
    }),
    bodyParser.json({
        extended: true,
        limit: '2mb'
    }),
    bodyParser.raw({
        type: 'application/octet-stream',
        limit: '5mb'
    }),
    bodyParser.raw({
        type: 'image/*',
        limit: '5mb'
    })
)

app.use(morgan('dev'))
app.use(cors())

server.listen(process.env.PORT || 3000)
console.warn('processId:' + process.pid + ' App Running...')