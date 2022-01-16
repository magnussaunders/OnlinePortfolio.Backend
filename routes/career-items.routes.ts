import { Express, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { CareerItemsService } from '../services/career-items.service'

export class CareerItemsRoutes {
    constructor(
        private careerItemsService: CareerItemsService
    ) {}

    public register(app: Express) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        app.get('/api/career/:careerItemId', this.getCareerItemById.bind(this))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        app.get('/api/career', this.getCareerItems.bind(this))
    }

    private async getCareerItems(request: Request, response: Response): Promise<void>{
        try {
            const result = await this.careerItemsService.getAllCareerItems()
            response.status(200).send(result)
        } catch (error) {
            //TODO Create error handler service
        }
    }

    private async getCareerItemById(request: Request, response: Response): Promise<void> {
        try {
            const careerItemId = request.params.careerItemId
            const result = await this.careerItemsService.getCareerItemById(new ObjectId(careerItemId))
            response.status(200).send(result)
        } catch {
            //TODO Create error handler service
        }
    }
}