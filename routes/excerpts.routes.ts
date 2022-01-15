import { Express, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { ExcerptsService } from '../services/excerpts.service'

export class ExcerptsRoutes {
    constructor(
        private excerptsService: ExcerptsService
    ) {}

    public register(app: Express) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        app.get('/api/excerpts/:excerptId', this.getExcerptById.bind(this))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        app.get('/api/excerpts', this.getExcerpts.bind(this))
    }

    private async getExcerpts(request: Request, response: Response): Promise<void>{
        try {
            const result = await this.excerptsService.getAllExcerpts()
            response.status(200).send({ excerpts: result })
        } catch (error) {
            //TODO Create error handler service
        }
    }

    private async getExcerptById(request: Request, response: Response): Promise<void> {
        try {
            const excerptId = request.params.excerptId
            const result = await this.excerptsService.getExcerptById(new ObjectId(excerptId))
            response.status(200).send({ excerpt: result })
        } catch {
            //TODO Create error handler service
        }
    }
}