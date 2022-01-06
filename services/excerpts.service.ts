import { Filter, ObjectId, WithId } from 'mongodb'
import { Document } from 'bson'
import { MongoDocument } from '../interfaces/mongo-document.interface'
import { ExcerptsDataAccessor } from '../data-accessors/excerpts.data-accesor'

export class ExcerptsService {
    constructor(
        private excerptsDataAccessor: ExcerptsDataAccessor
    ) {

    }

    public async getAllExcerpts(): Promise<MongoDocument[]>{
        return await this.excerptsDataAccessor.getExcerpts()
    }

    public async getExcerptById( excerptId: ObjectId): Promise<MongoDocument> {
        const result = await this.excerptsDataAccessor.getExcerpts({ _id:excerptId })
        return result[0]
    }

    public async getExcerptsWithQuery(query: Filter<WithId<Document>>): Promise<MongoDocument[]> {
        return await this.excerptsDataAccessor.getExcerpts({ query })
    }
}