import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from '../config/typeorm.config';
import { configModule } from '../config/config-module.config';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from 'src/modules/products/products.module';
import * as dotenv from 'dotenv';
import { AuctionsModule } from 'src/modules/auctions/auctions.module';
import { UsersModule } from 'src/modules/users/users.module';
import { BidsModule } from 'src/modules/bids/bids.module';
import { WebsocketGateway } from 'src/modules/websockets/websocket.gateway';
import { AuthModule } from 'src/modules/auth/auth.module';

dotenv.config({ path: '../../.env' });

export const importsConfig = [
  ConfigModule.forRoot(configModule),
  TypeOrmModule.forRootAsync(typeOrmConfigAsync),
  UsersModule,
  ProductModule,
  AuctionsModule,
  BidsModule,
  AuthModule,
  WebsocketGateway
];

