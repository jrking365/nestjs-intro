import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number): string {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId);
        return { ...product.product };
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const product = this.findProduct(productId).product;
        const index = this.findProduct(productId).productIndex;
        const updatedProduct = { ...product };
        updatedProduct.title = title ? title : updatedProduct.title;
        updatedProduct.description = desc ? desc : updatedProduct.description;
        updatedProduct.price = price ? price : updatedProduct.price;
        this.products[index] = updatedProduct;

    }

    deleteProduct(prodId: string) {
        const productIndex = this.findProduct(prodId).productIndex;
        this.products.splice(productIndex, 1);
    }

    private findProduct(id: string) {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('could not find products');
        }
        return { product, productIndex };
    }
}
