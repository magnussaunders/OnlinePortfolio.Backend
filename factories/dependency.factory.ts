import { MongodbService } from '../services/mongodb.service'
import { ProjectDataAccessor } from '../data-accessors/projects.data-accessor'
import { ProjectService } from '../services/projects.service'
import { ProjectRoutes } from '../routes/project.routes'
import { CareerItemsRoutes } from '../routes/career-items.routes'
import { CareerItemsService } from '../services/career-items.service'
import { CareerItemsDataAccessor } from '../data-accessors/career-items.data-accessor'

export class DependencyFactory {
    private static _mongodbService: MongodbService
    public static get mongodbService(): MongodbService {
        if (!this._mongodbService) this._mongodbService = new MongodbService()
        return this._mongodbService
    }

    private static _projectsDataAccessor: ProjectDataAccessor
    public static get projectDataAccessor(): ProjectDataAccessor {
        if (!this._projectsDataAccessor) this._projectsDataAccessor = new ProjectDataAccessor(this.mongodbService)
        return this._projectsDataAccessor
    }

    private static _projectsService: ProjectService
    public static get projectService(): ProjectService {
        if (!this._projectsService) this._projectsService = new ProjectService(this.projectDataAccessor)
        return this._projectsService
    }

    private static _projectRoutes: ProjectRoutes
    public static get projectRoutes(): ProjectRoutes {
        if (!this._projectRoutes) this._projectRoutes = new ProjectRoutes(this.projectService)
        return this._projectRoutes
    }

    private static _careerItemsDataAccessor: CareerItemsDataAccessor
    public static get careerItemsDataAccessor(): CareerItemsDataAccessor {
        if (!this._careerItemsDataAccessor) this._careerItemsDataAccessor = new CareerItemsDataAccessor(this.mongodbService)
        return this._careerItemsDataAccessor
    }

    private static _careerItemsService: CareerItemsService
    public static get careerItemsService(): CareerItemsService {
        if (!this._careerItemsService) this._careerItemsService = new CareerItemsService(this.careerItemsDataAccessor)
        return this._careerItemsService
    }

    private static _careerItemsRoutes: CareerItemsRoutes
    public static get careerItemsRoutes(): CareerItemsRoutes {
        if (!this._careerItemsRoutes) this._careerItemsRoutes = new CareerItemsRoutes(this.careerItemsService)
        return this._careerItemsRoutes
    }

}