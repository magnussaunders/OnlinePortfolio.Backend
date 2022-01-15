import { Express, Request, Response } from 'express'
import { ProjectService } from '../services/projects.service'
import { ObjectId } from 'mongodb'
import { ErrorHandlerService } from '../services/error-handler.service'

export class ProjectRoutes {
    constructor(
        private projectService: ProjectService,
        private errorHandlerService: ErrorHandlerService
    ) {}

    public register(app: Express) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        app.get('/api/projects/featured', this.getFeaturedProjects.bind(this))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        app.get('/api/projects/:projectId', this.getProjectById.bind(this))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        app.get('/api/projects', this.getProjects.bind(this))
    }

    private async getProjects(request: Request, response: Response): Promise<void>{
        try {
            const result = await this.projectService.getAllProjects()
            response.status(200).send(result)
        } catch (error) {
            this.errorHandlerService.handleError(response, error)
        }
    }

    private async getProjectById(request: Request, response: Response): Promise<void> {
        try {
            const projectId = request.params.projectId
            const result = await this.projectService.getProjectById(new ObjectId(projectId))
            response.status(200).send(result)
        } catch (error) {
            this.errorHandlerService.handleError(response, error)
        }
    }

    private async getFeaturedProjects(request: Request, response: Response): Promise<void> {
        try {
            const result = await this.projectService.getFeaturedProjects()
            response.status(200).send(result)
        } catch (error){
            this.errorHandlerService.handleError(response, error)
        }
    }
}