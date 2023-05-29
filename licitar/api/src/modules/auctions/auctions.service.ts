import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { Auction } from './auctions.entity';
import { Product } from '../products/products.entity';

@Injectable()
export class AuctionsService {

    constructor(
        @InjectRepository(Auction) 
        private auctionRepository: Repository<Auction>,
        @InjectRepository(Product) 
        private productRepository: Repository<Product>
    ) {}

    async findAll(): Promise<Auction[]> {
        const auctions = await this.auctionRepository
          .createQueryBuilder('auction')
          .leftJoinAndSelect('auction.product', 'product')
          .getMany();
      
        return auctions;
      }
      

    async create(auctionDetails: CreateAuctionDto): Promise<Auction> {
        
        const { productId } = auctionDetails;
        const product = await this.productRepository.findOne({where: {id: productId}});

        const newAuction = this.auctionRepository.create({
            ...auctionDetails,
            product,
        });

        return await this.auctionRepository.save(newAuction);
    }
    
    async findById(id: number): Promise<Auction> {
        const auction = await this.auctionRepository.findOne({ where: {id} });
        if (!auction)
            throw new NotFoundException('Leilão não encontrado');
        return auction;
    }        
    
    async updateById(id: number, auction: UpdateAuctionDto): Promise<Auction> {
        const existingAuction = await this.auctionRepository.findOne({ where: {id} });
        if (!existingAuction)
            throw new NotFoundException('Leilão não encontrado');
    
        const updatedAuction = { ...existingAuction, ...auction };
        try {
            return await this.auctionRepository.save(updatedAuction);
        } catch (error) {
            throw new BadRequestException('Fala ao editar o leilão');
        }
    }

    async deleteById(id: number): Promise<DeleteResult> {
        const deleteResult = await this.auctionRepository.delete(id);
        if (deleteResult.affected === 0)
            throw new NotFoundException('Leilão não encontrado');
    
        return deleteResult;
    }  
}
