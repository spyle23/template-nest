import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ResponseForm } from 'src/types/response';
import { Category, Prisma } from '@prisma/client';
import { CategoryArg } from 'src/types/product';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<ResponseForm<Category[]>> {
    const cat = await this.categoryService.getCategories();
    const response: ResponseForm<Category[]> = {
      success: true,
      message: 'all category',
      data: cat,
    };
    return response;
  }

  @Post()
  async createCategory(
    @Body() { name, categoryId }: CategoryArg,
  ): Promise<ResponseForm<Category>> {
    const existedCategory = categoryId
      ? await this.categoryService.getCategory({
          id: categoryId,
        })
      : null;
    const categoryCreateInput: Prisma.CategoryCreateInput = existedCategory
      ? {
          name,
          isCategory: false,
          Category: { connect: { id: existedCategory.id } },
        }
      : { name, isCategory: true };
    const cat = await this.categoryService.createCategory(categoryCreateInput);
    const response: ResponseForm<Category> = {
      success: true,
      message: existedCategory ? 'sous category created' : 'category created',
      data: cat,
    };
    return response;
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    const cat = await this.categoryService.getCategory({ id: parseInt(id) });
    const response: ResponseForm<typeof cat> = {
      message: 'info for category',
      success: true,
      data: cat,
    };
    return response;
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id') id: string,
  ): Promise<ResponseForm<Category>> {
    const cat = await this.categoryService.deleteCategory({ id: parseInt(id) });
    const response: ResponseForm<Category> = {
      success: true,
      message: 'category deleted',
      data: cat,
    };
    return response;
  }
}
