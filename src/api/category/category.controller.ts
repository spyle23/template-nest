import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ResponseForm } from 'src/types/response';
import { Category } from '@prisma/client';

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
