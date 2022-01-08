import { Filter, ObjectId, WithId } from 'mongodb'
import { Document } from 'bson'
import { MongoDocument } from '../interfaces/mongo-document.interface'
import { CareerItemsDataAccessor } from '../data-accessors/career-items.data-accessor'

export class CareerItemsService {
    constructor(
        private careerItemsDataAccessor: CareerItemsDataAccessor
    ) {

    }

    public async getAllCareerItems(): Promise<MongoDocument[]>{
        return await this.careerItemsDataAccessor.getCareerItems()
    }

    public async getCareerItemById( projectId: ObjectId): Promise<MongoDocument> {
        const result = await this.careerItemsDataAccessor.getCareerItems({ _id:projectId })
        return result[0]
    }

    public async getCareerItemsWithQuery(query: Filter<WithId<Document>>): Promise<MongoDocument[]> {
        return await this.careerItemsDataAccessor.getCareerItems({ query })
    }
}