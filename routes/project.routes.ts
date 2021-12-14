import { Express, Request, Response } from 'express'

export function registerRoutes(app: Express): void {
    app.get('/api/v1/projects', getProjects)
    app.post('/api/v1/projects', getProject)
}

function getProjects(request: Request, response: Response): void {
    // eslint-disable-next-line no-console
    console.log('hello world')
}

function getProject(request: Request, response: Response): void {
    // eslint-disable-next-line no-console
    console.log('bye bye')
}