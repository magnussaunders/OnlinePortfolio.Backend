import { Filter, ObjectId, WithId } from 'mongodb'
import { Document } from 'bson'
import { MongoDocument } from '../interfaces/mongo-document.interface'
import { CareerItemsDataAccessor } from '../data-accessors/career-items.data-accessor'
import { CareerItem } from '../models/career-item.model'

export class CareerItemsService {
    constructor(
        private careerItemsDataAccessor: CareerItemsDataAccessor
    ) {

    }

    public async getAllCareerItems(): Promise<CareerItem[]>{
        return await this.careerItemsDataAccessor.getCareerItems()
    }

    public async getCareerItemById( projectId: ObjectId): Promise<CareerItem> {
        const result = await this.careerItemsDataAccessor.getCareerItems({ _id:projectId })
        return result[0]
    }

    public async getCareerItemsWithQuery(query: Filter<WithId<Document>>): Promise<CareerItem[]> {
        return await this.careerItemsDataAccessor.getCareerItems({ query })
    }
}