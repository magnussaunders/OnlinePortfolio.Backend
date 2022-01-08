import { MongodbService } from '../services/mongodb.service'
import { DatabaseCollections } from '../enums/database-collection.enum'
import { Filter, Sort, WithId } from 'mongodb'
import { Document } from 'bson'
import { MongoDocument } from '../interfaces/mongo-document.interface'

export class ExcerptsDataAccessor {
    constructor(
        private mongodbService: MongodbService
    ) {}

    public async getExcerpts(
        query: Filter<WithId<Document>> = {},
        sort: Sort = {},
        limit = 0
    ): Promise<MongoDocument[]> {
        return this.mongodbService.get(DatabaseCollections.Excerpts, query, sort, limit)
    }

    public async insertExcerpt(
        documentData: Document
    ): Promise<MongoDocument> {
        return this.mongodbService.insert(DatabaseCollections.Excerpts, documentData)
    }

    public async updateExcerpts(
        documentData: Document,
        query: Filter<WithId<Document>> = {}
    ): Promise<void> {
        return this.mongodbService.update(DatabaseCollections.Excerpts, documentData, query)
    }

    public async deleteExcerpts(
        query: Filter<WithId<Document>> = {}
    ): Promise<void> {
        return this.mongodbService.delete(DatabaseCollections.Excerpts, query)
    }
}