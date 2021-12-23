import { createParamDecorator, ExecutionContext } from '@nestjs/common';

function getRequestContextFromExecutionContext(context: ExecutionContext) {
  return context.switchToHttp().getRequest().raw?.requestContext;
}
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getRequestContextFromExecutionContext(context)?.user;
  },
);
