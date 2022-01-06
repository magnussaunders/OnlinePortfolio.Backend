import { MongodbService } from '../services/mongodb.service'
import { DatabaseCollections } from '../enums/database-collection.enum'
import { Filter, Sort, WithId } from 'mongodb'
import { Document } from 'bson'
import { MongoDocument } from '../interfaces/mongo-document.interface'

export class ProjectDataAccessor {
    constructor(
        private mongodbService: MongodbService
    ) {}

    public async getProjects(
        query: Filter<WithId<Document>> = {},
        sort: Sort = {},
        limit = 0
    ): Promise<MongoDocument[]> {
        return await this.mongodbService.get(DatabaseCollections.Projects, query, sort, limit)
    }

    public async insertProjects(
        documentData: Document
    ): Promise<MongoDocument> {
        return await this.mongodbService.insert(DatabaseCollections.Projects, documentData)
    }

    public async updateProjects(
        documentData: Document,
        query: Filter<WithId<Document>> = {}
    ): Promise<void> {
        return await this.mongodbService.update(DatabaseCollections.Projects, documentData, query)
    }

    public async deleteProjects(
        query: Filter<WithId<Document>> = {}
    ): Promise<void> {
        return await this.mongodbService.delete(DatabaseCollections.Projects, query)
    }
}