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
