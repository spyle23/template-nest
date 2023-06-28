import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ProductArg } from 'src/types/product';
import { ResponseForm } from 'src/types/response';
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct(): Promise<ResponseForm<Product[]>> {
    const products = await this.productService.getProducts();
    const response: ResponseForm<Product[]> = {
      success: true,
      message: 'all products',
      data: products,
    };
    return response;
  }

  @Get(':id')
  async getOneProduct(
    @Param('id') id: string,
  ): Promise<ResponseForm<Product | null>> {
    const products = await this.productService.getProductById({
      id: parseInt(id),
    });
    const response: ResponseForm<Product | null> = {
      success: true,
      message: 'one product',
      data: products,
    };
    return response;
  }

  @Post()
  async createProduct(
    @Body() { name, description, stock, categoryId, price }: ProductArg,
  ): Promise<ResponseForm<Product>> {
    const product = await this.productService.createProduct({
      name,
      description,
      price,
      stock,
      Category: {
        connect: {
          id: categoryId,
        },
      },
    });
    const response: ResponseForm<Product> = {
      success: true,
      message: 'product created',
      data: product,
    };

    return response;
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() { name, price, stock, description, categoryId }: ProductArg,
  ): Promise<ResponseForm<Product>> {
    const product = await this.productService.updateProduct(
      { id: parseInt(id) },
      {
        name,
        price,
        stock,
        description,
        Category: { connect: { id: categoryId } },
      },
    );
    const response: ResponseForm<Product> = {
      success: true,
      message: 'product updated',
      data: product,
    };

    return response;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<ResponseForm<Product>> {
    const product = await this.productService.deleteProduct({
      id: parseInt(id),
    });
    const response: ResponseForm<Product> = {
      success: true,
      message: 'product deleted',
      data: product,
    };
    return response;
  }
}
