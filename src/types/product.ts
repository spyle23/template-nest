export type ProductArg = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
};

export type CategoryArg = {
  name: string;
  isCategory: boolean;
  categoryId?: number;
};
