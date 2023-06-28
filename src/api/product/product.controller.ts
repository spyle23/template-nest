import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  test() {
    return 'bonjour tout le monde';
  }
}
