import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject, LoggerService } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

import * as requestIp from 'request-ip';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        private readonly httpAdapterHost: HttpAdapterHost
    ){}
    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody = {
            Headers: request.Headers,
            query: request.query,
            body: request.body,
            params: request.params,
            timestamp: new Date().toISOString(),
            ip: requestIp.getClientIp(request),
            exception: exception['name'],
            error: exception['response'] || 'Internal Server Error'
        }

        this.logger.error('[usercq]', responseBody);
        httpAdapter.reply(response, responseBody, httpStatus)

    }
}