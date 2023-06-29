import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  /**
   * use this method to get all category and sous-category
   * @returns
   */
  async getCategories(): Promise<Category[]> {
    const cat = await this.prisma.category.findMany({
      include: { sousCategory: true },
    });
    return cat;
  }

  /**
   * use this method to get one category
   * @param where
   * @returns
   */
  async getCategory(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where,
      include: {
        Category: true,
      },
    });
  }

  /**
   * use this method to create category
   * @param data
   * @returns
   */
  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return await this.prisma.category.create({
      data,
    });
  }

  /**
   * use this method to update category
   * @param where
   * @param data
   * @returns
   */
  async updateCategory(
    where: Prisma.CategoryWhereUniqueInput,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category> {
    return await this.prisma.category.update({
      where,
      data,
    });
  }

  /**
   * use this method to delete category
   * @param where
   * @returns
   */
  async deleteCategory(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category> {
    return await this.prisma.category.delete({
      where,
    });
  }
}
