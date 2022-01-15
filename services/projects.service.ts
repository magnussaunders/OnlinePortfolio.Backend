import { ProjectDataAccessor } from '../data-accessors/projects.data-accessor'
import { Filter, ObjectId, WithId } from 'mongodb'
import { Document } from 'bson'
import { MongoDocument } from '../interfaces/mongo-document.interface'
import { Project } from '../models/project.model'

export class ProjectService {
    constructor(
        private projectDataAccessor: ProjectDataAccessor
    ) {

    }

    public async getAllProjects(): Promise<Project[]>{
        return await this.projectDataAccessor.getProjects()
    }

    public async getProjectById( projectId: ObjectId): Promise<Project> {
        const result = await this.projectDataAccessor.getProjects({ _id:projectId })
        return result[0]
    }

    public async getFeaturedProjects(): Promise<Project[]> {
        return await this.projectDataAccessor.getProjects({ featured:'true' })
    }

    public async getProjectsWithQuery(query: Filter<WithId<Document>>): Promise<Project[]> {
        return await this.projectDataAccessor.getProjects({ query })
    }
}