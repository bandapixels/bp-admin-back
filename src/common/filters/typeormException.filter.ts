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

    if (statusCode === 404) {
      return response.status(statusCode).send(`
      <!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
      
          <title>Not found</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
      
      </head>
      
      <body>
          <div class="container d-flex align-items-center justify-content-center mt-5 pt-5">
              <div class="alert alert-light text-center">
                  <h3 class="display-3">404</h3>
                  <p class="display-5">Entity was not found.</p>
              </div>
          </div>
      </body>
      
      </html>
      `);
    }

    return response.status(statusCode).json({
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
