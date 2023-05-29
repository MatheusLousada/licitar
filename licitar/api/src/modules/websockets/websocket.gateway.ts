import { Injectable, UseGuards } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { SocketAuthMiddleware } from "src/middlewares/auth.middleware";
import { WsJwtGuard } from "src/modules/auth/ws-jwt/ws-jwt.guard";
import { verify, JwtPayload } from 'jsonwebtoken';

@UseGuards(WsJwtGuard)
@WebSocketGateway({ namespace: '/events', cors: { origin: '*' } })
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    afterInit(client: Socket) {
        client.use(SocketAuthMiddleware() as any);
    }

    handleConnection(client: Socket) {
        console.log('conectou com o id: ' + client.id);
    }

    handleDisconnect() {
        console.log('desconectou');
    }

    @SubscribeMessage('newMessage')
    handleMessage(@MessageBody() body: any) {
        this.server.emit('onMessage', {
            msg: 'New Message',
            content: body
        });
    }

    @SubscribeMessage('newBid')
    handleBid(@MessageBody() body: any) {
        this.server.emit('onBid', {
            msg: 'New Bid',
            content: body
        });
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(client: any, data: any) {
        const roomKey = data.room;
        client.join(roomKey);
        const user = this.extractUserFromToken(client);
        this.server.to(roomKey).emit('onJoin', user.name + ' entrou');
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, roomName: string) {
        client.leave(roomName);
        const user = this.extractUserFromToken(client);
        if (user) {
            this.server.to(roomName).emit('message', `O ${user.name} saiu da sala ${roomName}.`);
        }
    }

    private extractUserFromToken(client: Socket): JwtPayload | null {
        const authorization = client.handshake.headers.authorization ? client.handshake.headers.authorization : client.handshake.auth.Authorization;
        const token: string = authorization.split(' ')[1];
        try {
            return verify(token, process.env.JWT_SECRET) as JwtPayload;
        } catch (error) {
            console.error('Falha ao decodificar o token JWT.');
            return null;
        }
    }
}
