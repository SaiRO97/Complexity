import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost, Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception;
    const error = {
      code: status,
      timeStamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: exception.message || null
    }

    Logger.error(`path:${request.url} , method: ${request.method}, message: ${exception.message}`, exception.stack, 'ExceptionFilter')
    response.status(status).json(error);
  }
}
