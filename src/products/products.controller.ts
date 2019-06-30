import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    addProduct(@Body() completeBody: { title: string, description: string, price: number }) {
        const generatedId = this.productsService.insertProduct(
            completeBody.title,
            completeBody.description,
            completeBody.price,
        );
        return { id: generatedId };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

}