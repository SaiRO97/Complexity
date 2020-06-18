import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => (
  data? req.user[data] : req.user
))