export class CareerItem {
    position: string
    employer: string | undefined
    startDate: string | undefined
    endDate: string | undefined
    description: string[] | undefined
    tags: string[] | undefined

    public static fromJson(jsonObj: Record<string, unknown>) {
        const careerItem = new CareerItem()
        careerItem.position = jsonObj.position as string
        careerItem.employer = jsonObj.employer as string
        careerItem.startDate = jsonObj.startDate as string
        careerItem.endDate = jsonObj.endDate as string
        careerItem.description = jsonObj.description as string[]
        careerItem.tags = jsonObj.tags as string[]

        return careerItem
    }
}