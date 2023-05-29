import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateBidDto } from './dto/create-bid.dto';
import { Bid } from './bids.entity';
import { User } from '../users/users.entity';
import { Auction } from '../auctions/auctions.entity';

@Injectable()
export class BidsService {

    constructor(
        @InjectRepository(Bid) 
        private bidRepository: Repository<Bid>,
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        @InjectRepository(Auction) 
        private auctionRepository: Repository<Auction>
    ) {}

    async findAll(): Promise<Bid[]> {
        const bids = await this.bidRepository.find();
        return bids;
    }

    async create(bidDetails: CreateBidDto): Promise<Bid> {
        const { userId, auctionId } = bidDetails;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const auction = await this.auctionRepository.findOne({ where: { id: auctionId } });

        if (!user || !auction) {
            throw new NotFoundException('Usuário ou leilão não encontrado');
        }

        const newBid = this.bidRepository.create({
            ...bidDetails,
            user,
            auction,
        });

        return await this.bidRepository.save(newBid);
    }
    
    async findById(id: number): Promise<Bid> {
        const bid = await this.bidRepository.findOne({ where: { id } });
        if (!bid) {
            throw new NotFoundException('Lance não encontrado');
        }
        return bid;
    }       

    async deleteById(id: number): Promise<DeleteResult> {
        const deleteResult = await this.bidRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new NotFoundException('Lance não encontrado');
        }
    
        return deleteResult;
    }
}
