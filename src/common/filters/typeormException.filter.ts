import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(EntityNotFoundError, QueryFailedError)
export class TypeormExceptionFilter implements ExceptionFilter {
  catch(
    exception: EntityNotFoundError | QueryFailedError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = exception instanceof EntityNotFoundError ? 404 : 500;

    return response.status(statusCode).json({
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
