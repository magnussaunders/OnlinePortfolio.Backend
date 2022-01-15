export class ProjectResource {
    type: string | undefined
    name: string | undefined
    url: string | undefined

    public static fromJson(jsonObj: Record<string, unknown>): ProjectResource {
        const projectResource = new ProjectResource()
        projectResource.type = jsonObj.type as string
        projectResource.name = jsonObj.name as string
        projectResource.url = jsonObj.url as string

        return projectResource
    }
}
