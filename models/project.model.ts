import { ProjectResource } from './project-resource.model'

export class Project {
    _id: string | undefined
    pid: string | undefined
    name: string | undefined
    description: string | undefined
    creationDate: string | undefined
    featured: boolean | undefined
    resources: ProjectResource[] | undefined
    tags: string[] | undefined

    public static fromJson(jsonObj: Record<string, unknown>): Project {
        const project = new Project()
        project._id = jsonObj._id as string
        project.name = jsonObj.name as string
        project.description = jsonObj.description as string
        project.creationDate = jsonObj.creationDate as string
        project.featured = jsonObj.featured as boolean
        project.resources = (jsonObj.resources as Record<string, unknown>[]).map(
            currentResource => ProjectResource.fromJson(currentResource)
        )
        project.tags = jsonObj.tags as string[]

        return project
    }
}
