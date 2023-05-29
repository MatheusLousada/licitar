import { Module } from '@nestjs/common';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './bids.entity';
import { User } from '../users/users.entity';
import { Auction } from '../auctions/auctions.entity';
import { AuctionsModule } from '../auctions/auctions.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bid, User, Auction]),
    UsersModule,
    AuctionsModule,
  ],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
