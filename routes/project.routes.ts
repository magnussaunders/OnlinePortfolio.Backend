import { Express, Request, Response } from 'express'
import { ProjectService } from '../services/projects.service'
import { ObjectId } from 'mongodb'

export class ProjectRoutes {
    constructor(
        private projectService: ProjectService
    ) {}

    public register(app: Express) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        app.get('/projects/featured', this.getFeaturedProjects.bind(this))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        app.get('/projects/:projectId', this.getProjectById.bind(this))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        app.get('/projects', this.getProjects.bind(this))

    }

    private async getProjects(response: Response): Promise<void>{
        try {
            const result = await this.projectService.getAllProjects()
            response.status(200).send({ projects: result })
        } catch {
            //TODO Create error handler service
        }
    }

    private async getProjectById(request: Request, response: Response): Promise<void> {
        try {
            const projectId = request.params.projectId
            const result = await this.projectService.getProjectById(new ObjectId(projectId))
            response.status(200).send({ project: result })
        } catch {
            //TODO Create error handler service
        }
    }

    private async getFeaturedProjects(response: Response): Promise<void> {
        try {
            const result = await this.projectService.getFeaturedProjects()
            response.status(200).send({ projects: result })
        } catch {
            //TODO Create error handler service
        }
    }
}