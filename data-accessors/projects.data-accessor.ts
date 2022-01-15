import { MongodbService } from '../services/mongodb.service'
import { DatabaseCollections } from '../enums/database-collection.enum'
import { Filter, Sort, WithId } from 'mongodb'
import { Document } from 'bson'
import { MongoDocument } from '../interfaces/mongo-document.interface'
import { Project } from '../models/project.model'

export class ProjectDataAccessor {
    constructor(
        private mongodbService: MongodbService
    ) {}

    public async getProjects(
        query: Filter<WithId<Document>> = {},
        sort: Sort = {},
        limit = 0
    ): Promise<Project[]> {
        const result = await this.mongodbService.get(DatabaseCollections.Projects, query, sort, limit)
        return result.map(currentProject => Project.fromJson(currentProject))
    }

    public async insertProject(
        documentData: Document
    ): Promise<MongoDocument> {
        return this.mongodbService.insert(DatabaseCollections.Projects, documentData)
    }

    public async updateProjects(
        documentData: Document,
        query: Filter<WithId<Document>> = {}
    ): Promise<void> {
        return this.mongodbService.update(DatabaseCollections.Projects, documentData, query)
    }

    public async deleteProjects(
        query: Filter<WithId<Document>> = {}
    ): Promise<void> {
        return this.mongodbService.delete(DatabaseCollections.Projects, query)
    }
}