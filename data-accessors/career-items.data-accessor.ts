import { MongodbService } from '../services/mongodb.service'
import { DatabaseCollections } from '../enums/database-collection.enum'
import { Filter, Sort, WithId } from 'mongodb'
import { Document } from 'bson'
import { MongoDocument } from '../interfaces/mongo-document.interface'
import { CareerItem } from '../models/career-item.model'

export class CareerItemsDataAccessor {
    constructor(
        private mongodbService: MongodbService
    ) {}

    public async getCareerItems(
        query: Filter<WithId<Document>> = {},
        sort: Sort = {},
        limit = 0
    ): Promise<CareerItem[]> {
        const result = await this.mongodbService.get(DatabaseCollections.CareerItems, query, sort, limit)
        return result.map(currentCareerItem => CareerItem.fromJson(currentCareerItem))
    }

    public async insertCareerItem(
        documentData: Document
    ): Promise<MongoDocument> {
        return this.mongodbService.insert(DatabaseCollections.CareerItems, documentData)
    }

    public async updateCareerItems(
        documentData: Document,
        query: Filter<WithId<Document>> = {}
    ): Promise<void> {
        return this.mongodbService.update(DatabaseCollections.CareerItems, documentData, query)
    }

    public async deleteCareerItems(
        query: Filter<WithId<Document>> = {}
    ): Promise<void> {
        return this.mongodbService.delete(DatabaseCollections.CareerItems, query)
    }
}