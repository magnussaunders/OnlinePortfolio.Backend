import { Response } from 'express'
import { HttpError, UnexpectedError } from '../errors/app-errors'

export class ErrorHandlerService {
    public handleError(response: Response, error: Error | unknown): void {
        if (!(error instanceof Error || error instanceof HttpError))
            error = new Error(JSON.stringify(error))

        const unexpectedError = new UnexpectedError(error)
        response.statusCode = unexpectedError.statusCode
        response.send({ error: unexpectedError, errorMessage: unexpectedError.message })
    }
}