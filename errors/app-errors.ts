export class HttpError implements Error {
    name: string
    message: string
    statusCode: number

    constructor(message: string, statusCode: number) {
        this.name = this.constructor.name
        this.message = message
        this.statusCode = statusCode
    }
}

export class UnexpectedError extends HttpError {
    constructor(public originalError: unknown) {
        super('An unexpected error occurred. Please try again later.', 500)
    }
}