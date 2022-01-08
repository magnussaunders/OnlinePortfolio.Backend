import { ObjectId } from 'mongodb'

export interface MongoDocument {
    _id: ObjectId,
    [key: string]: unknown
}