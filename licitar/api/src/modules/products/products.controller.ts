import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.entity';

@Controller('products')
export class ProductsController {
    constructor(private bookService: ProductsService) {}

    @Get()
    @UseGuards(AuthGuard())
    async getAllProductss(): Promise<Product[]> {
        return this.bookService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async getProducts(
        @Param('id', ParseIntPipe) 
        id: number
    ): Promise<Product> {
        return this.bookService.findById(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    async createProducts(
        @Body() 
        book: CreateProductDto
    ) {
        return this.bookService.create(book);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateProducts(
        @Param('id', ParseIntPipe) 
        id: number,
        @Body() 
        book: UpdateProductDto
    ) {
        return this.bookService.updateById(id, book);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteProductsById(
        @Param('id', ParseIntPipe) 
        id: number
    ) {
        await this.bookService.deleteById(id);
    }
}