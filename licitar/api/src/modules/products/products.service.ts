import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) 
        private productRepository: Repository<Product>
    ) {}

    async findAll(): Promise<Product[]> {
        const products = await this.productRepository.find();
        return products;
    }

    async create(productDetails: CreateProductDto): Promise<Product> {
        const newProduct = this.productRepository.create(productDetails);
        return await this.productRepository.save(newProduct);
    } 
    
    async findById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({ where: {id} });
        if (!product)
            throw new NotFoundException('Product not found');
        return product;
    }        
    
    async updateById(id: number, product: UpdateProductDto): Promise<Product> {
        const existingProduct = await this.productRepository.findOne({ where: {id} });
        if (!existingProduct)
            throw new NotFoundException('Product not found');
    
        const updatedProduct = { ...existingProduct, ...product };
        try {
            return await this.productRepository.save(updatedProduct);
        } catch (error) {
            throw new BadRequestException('Failed to update the product');
        }
    }

    async deleteById(id: number): Promise<DeleteResult> {
        const deleteResult = await this.productRepository.delete(id);
        if (deleteResult.affected === 0)
            throw new NotFoundException('Product not found');
    
        return deleteResult;
    }  
}
