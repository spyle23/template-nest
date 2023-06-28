import { Routes } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { ProductModule } from './api/product/product.module';
import { CommandModule } from './api/command/command.module';

export const routes: Routes = [
  {
    path: '/api',
    module: ApiModule,
    children: [
      {
        path: '/product',
        module: ProductModule,
      },
      {
        path: '/command',
        module: CommandModule,
      },
    ],
  },
];
