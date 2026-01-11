import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let error = 'Internal Server Error';
        let data = null;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'object') {
                message = (exceptionResponse as any).message || message;
                error = (exceptionResponse as any).error || error;
                data = (exceptionResponse as any).data || null;
            } else {
                message = exceptionResponse as string;
            }
        }

        response.status(status).json({
            statusCode: status,
            message,
            error,
            data,
        });
    }
}
