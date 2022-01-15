export class Project {
    _id: string
    name: string
    description: string
    creationDate: string

    public static fromJson(jsonObj: Record<string, unknown>): Project {
        const project = new Project()
        project._id = jsonObj._id as string
        project.name = jsonObj.name as string
        project.description = jsonObj.description as string
        project.creationDate = jsonObj.creationDate as string

        return project
    }
}