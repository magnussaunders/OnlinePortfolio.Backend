import { Express } from 'express'

export interface ExpressRoutes {
    register(app: Express): void
}