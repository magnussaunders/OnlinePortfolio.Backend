/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import http from 'http'
import { ProjectRoutes } from './routes/project.routes'
import { ProjectDataAccessor } from './data-accessors/projects.data-accessor'
import { MongodbService } from './services/mongodb.service'
import { ProjectService } from './services/projects.service'

const app = express()
const server = http.createServer(app)

app.use(morgan('dev'))
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    }),
)
app.use(
    bodyParser.json({
        limit: '2mb'
    })
)
app.use(
    bodyParser.raw({
        type: 'image/*',
        limit: '5mb'
    })
)

new ProjectRoutes(new ProjectService(new ProjectDataAccessor(new MongodbService()))).register(app)

server.listen(process.env.PORT || 3000)
console.warn('processId:' + process.pid.toString() + ' App Running...')