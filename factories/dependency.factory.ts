import { MongodbService } from '../services/mongodb.service'
import { ProjectDataAccessor } from '../data-accessors/projects.data-accessor'
import { ProjectService } from '../services/projects.service'
import { ProjectRoutes } from '../routes/project.routes'
import { ErrorHandlerService } from '../services/error-handler.service'

export class DependencyFactory {
    private static _mongodbService: MongodbService
    public static get mongodbService(): MongodbService {
        if (!this._mongodbService) this._mongodbService = new MongodbService()
        return this._mongodbService
    }

    private static _errorHandlerService: ErrorHandlerService
    public static get errorHandlerService(): ErrorHandlerService {
        if (!this._errorHandlerService) this._errorHandlerService = new ErrorHandlerService()
        return this._errorHandlerService
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
        if (!this._projectRoutes) this._projectRoutes = new ProjectRoutes(this.projectService, this.errorHandlerService)
        return this._projectRoutes
    }

}