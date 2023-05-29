import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auction } from './auctions.entity';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { AuctionsService } from './auctions.service';

@Controller('auctions')
export class AuctionsController {
    constructor(private auctionService: AuctionsService) {}

    @Get()
    @UseGuards(AuthGuard())
    async getAllAuctionss(): Promise<Auction[]> {
        return this.auctionService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async getAuctions(
        @Param('id', ParseIntPipe) 
        id: number
    ): Promise<Auction> {
        return this.auctionService.findById(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    async createAuctions(
        @Body() 
        auction: CreateAuctionDto
    ) {
        return this.auctionService.create(auction);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateAuctions(
        @Param('id', ParseIntPipe) 
        id: number,
        @Body() 
        auction: UpdateAuctionDto
    ) {
        return this.auctionService.updateById(id, auction);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteAuctionsById(
        @Param('id', ParseIntPipe) 
        id: number
    ) {
        await this.auctionService.deleteById(id);
    }
}