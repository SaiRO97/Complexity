import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    request.user = await this.validateToken(request.headers.authorization)
    return this.validateRequest(request);
  }

  private validateRequest(request) {
    return !!request.headers.authorization
  }

  private async validateToken(authToken: string) {
    if (authToken.split(' ')[0] !== 'Bearer') throw new HttpException('invalid token', HttpStatus.FORBIDDEN)
    const token =  authToken.split(' ')[1];
    try{
      return await jwt.verify(token, process.env.SECRET);
    }catch(error){
      const message = `Token error ${error.message || error.name}`
      throw new HttpException(message, HttpStatus.FORBIDDEN)
    }
  }

}