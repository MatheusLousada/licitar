import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Bid } from './bids.entity';
import { CreateBidDto } from './dto/create-bid.dto';
import { BidsService } from './bids.service';

@Controller('bids')
export class BidsController {
    constructor(private bidService: BidsService) {}

    @Get()
    @UseGuards(AuthGuard())
    async getAllBids(): Promise<Bid[]> {
        return this.bidService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async getBid(
        @Param('id', ParseIntPipe) 
        id: number
    ): Promise<Bid> {
        return this.bidService.findById(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    async createBid(
        @Body() 
        bid: CreateBidDto
    ) {
        return this.bidService.create(bid);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteBidById(
        @Param('id', ParseIntPipe) 
        id: number
    ) {
        await this.bidService.deleteById(id);
    }
}
