/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import http from 'http'
import { ExpressRoutes } from './interfaces/express-routes.interface'
import { DependencyFactory } from './factories/dependency.factory'

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

const expressRoutes: ExpressRoutes[] = [
    DependencyFactory.projectRoutes,
    DependencyFactory.careerItemsRoutes
]
expressRoutes.forEach(expressRoute => expressRoute.register(app))

server.listen(process.env.PORT || 3000)
console.warn('processId:' + process.pid.toString() + ' App Running...')