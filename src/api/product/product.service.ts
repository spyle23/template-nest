import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  /**
   * Use this method to create product
   * @param product
   * @returns
   */
  async createProduct(product: Prisma.ProductCreateInput): Promise<Product> {
    return await this.prisma.product.create({
      data: product,
    });
  }

  /**
   * use this method to get all product
   * @returns { Promise<Product[]> }
   */
  async getProducts(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      include: {
        Category: true,
      },
    });
  }

  /**
   * use this method to get one user
   * @param where
   * @returns
   */
  async getProductById(
    where: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return await this.prisma.product.findUnique({
      where,
    });
  }

  /**
   * use this method to update product model
   * @param where
   * @param data
   * @returns
   */
  async updateProduct(
    where: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return await this.prisma.product.update({
      where,
      data,
    });
  }

  /**
   * use this method to delete product in table
   * @param where
   * @returns
   */
  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return await this.prisma.product.delete({
      where,
    });
  }
}
