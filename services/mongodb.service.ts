/* eslint-disable */
import { Db, Filter, MongoClient, ObjectId, Sort, WithId } from 'mongodb'
import { Document } from 'bson'
import {DatabaseCollections} from "../enums/database-collection.enum";

export class MongodbService {
    private database: Db

    private async connectToDatabase(): Promise<void> {
        if (this.database)
            return

        // eslint-disable-next-line max-len
        const uri = 'mongodb+srv://admin:admin@portfoliowebsite-db.j0puk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        const client = await MongoClient.connect(uri)
        this.database = client.db('OnlinePortfolio-DB')
    }

    public async get(
        collectionName: DatabaseCollections,
        query: Filter<WithId<Document>> = {},
        sort: Sort = {},
        limit = 0
    ): Promise<any> {
        await this.connectToDatabase()
        const collection = this.database.collection(collectionName)

        return await collection.find(
            query, { sort, limit }
        ).toArray() as { _id: ObjectId, pid: string, [key: string]: any}[]
    }

    public async insert(
        collectionName: DatabaseCollections,
        documentData: Document
    ): Promise<any> {
        await this.connectToDatabase()
        const collection = this.database.collection(collectionName)

        const result = await collection.insertOne(documentData)
        documentData._id = result.insertedId.toString()

        return documentData
    }

    public async update(
        collectionName: DatabaseCollections,
        documentData: Document,
        query: Filter<WithId<Document>> = {},
        shouldUpsert: false
    ): Promise<void> {
        await this.connectToDatabase()
        const collection = this.database.collection(collectionName)
        await collection.updateMany(query, { $set: documentData}, { upsert: shouldUpsert })
    }
}