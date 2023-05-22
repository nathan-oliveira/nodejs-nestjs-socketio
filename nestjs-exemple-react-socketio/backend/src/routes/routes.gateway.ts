import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  path: '/',
  cors: {
    allowedHeaders: ['*'],
    origin: '*',
    methods: ['*'],
    exposedHeaders: ['*'],
  },
})
export class RoutesGateway implements OnGatewayConnection {
  private users = {};

  @WebSocketServer()
  private server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    this.users[client.id] = { name: 'fulano', email: 'fulano@gmail.com' };
    console.log(client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    // envia para todos os outros clients!
    client.emit('receive-message', payload);

    // enviar apenas para um so client
    // this.server.sockets._ids[client.id].emit(payload);

    // enviar para todos os outros clients, menos para o client que realizou o emit!
    client.broadcast.emit('receive-message', payload);
  }

  @SubscribeMessage('new-direction')
  handleNewDirection(client: Socket, payload: { routeId: string }): void {
    // this.kafkaProducer.send('route.new-direction', {
    //   routeId: payload.routeId,
    //   clientId: client.id,
    // });
  }
}
