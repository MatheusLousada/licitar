import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WebsocketGateway } from "./websocket.gateway";
import { Auction } from "src/modules/auctions/auctions.entity";
import { AuctionsModule } from "src/modules/auctions/auctions.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Auction]),
    AuctionsModule
  ],
  providers: [WebsocketGateway],
})
export class WebsocketGatewayModule {}
