import { Module } from '@nestjs/common';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './auctions.entity';
import { UsersModule } from '../users/users.module';
import { ProductModule } from '../products/products.module';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    TypeOrmModule.forFeature([Auction, User, Product])
  ],
  controllers: [AuctionsController],
  providers: [AuctionsService]
})
export class AuctionsModule {}
