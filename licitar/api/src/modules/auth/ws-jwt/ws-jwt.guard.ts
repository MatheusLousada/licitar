import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

@Injectable()
export class WsJwtGuard implements CanActivate {
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if(context.getType() !== 'ws')
      return true;
    
    const client: Socket = context.switchToWs().getClient();
    WsJwtGuard.validateToken(client);

    return true;
  }

  static validateToken(client: Socket) {
    const authorization = client.handshake.headers.authorization ? client.handshake.headers.authorization : client.handshake.auth.Authorization;
    if(authorization == undefined){
      Logger.log("Você precisa estar autorizado para acessar essa websocket");
      throw new UnauthorizedException("Você precisa estar autorizado para acessar essa websocket");
    }

    const token: string = authorization.split(' ')[1];
    const payload = verify(token, process.env.JWT_SECRET);
    return payload;
  }
}
