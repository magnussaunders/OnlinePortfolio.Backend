import { MongodbService } from '../services/mongodb.service'
import { ProjectDataAccessor } from '../data-accessors/projects.data-accessor'
import { ProjectService } from '../services/projects.service'
import { ProjectRoutes } from '../routes/project.routes'
import { ExcerptsDataAccessor } from '../data-accessors/excerpts.data-accesor'
import { ExcerptsService } from '../services/excerpts.service'
import { ExcerptsRoutes } from '../routes/excerpts.routes'
import { ErrorHandlerService } from '../services/error-handler.service'

export class DependencyFactory {
    private static _mongodbService: MongodbService
    public static get mongodbService(): MongodbService {
        if (!this._mongodbService) this._mongodbService = new MongodbService()
        return this._mongodbService
    }

    private static _projectsDataAccessor: ProjectDataAccessor
    public static get projectsDataAccessor(): ProjectDataAccessor {
        if (!this._projectsDataAccessor) this._projectsDataAccessor = new ProjectDataAccessor(this.mongodbService)
        return this._projectsDataAccessor
    }

    private static _projectsService: ProjectService
    public static get projectsService(): ProjectService {
        if (!this._projectsService) this._projectsService = new ProjectService(this.projectsDataAccessor)
        return this._projectsService
    }

    private static _projectRoutes: ProjectRoutes
    public static get projectsRoutes(): ProjectRoutes {
        if (!this._projectRoutes) this._projectRoutes = new ProjectRoutes(this.projectsService, this.errorHandlerService)
        return this._projectRoutes
    }

    private static _excerptsDataAccessor: ExcerptsDataAccessor
    public static get excerptsDataAccessor(): ExcerptsDataAccessor {
        if (!this._excerptsDataAccessor) this._excerptsDataAccessor = new ExcerptsDataAccessor(this.mongodbService)
        return this._excerptsDataAccessor
    }

    private static _excerptsService: ExcerptsService
    public static get excerptsService(): ExcerptsService {
        if (!this._excerptsService) this._excerptsService = new ExcerptsService(this.excerptsDataAccessor)
        return this._excerptsService
    }

    private static _excerptsRoutes: ExcerptsRoutes
    public static get excerptsRoutes(): ExcerptsRoutes {
        if (!this._excerptsRoutes) this._excerptsRoutes = new ExcerptsRoutes(this.excerptsService)
        return this._excerptsRoutes
    }
}