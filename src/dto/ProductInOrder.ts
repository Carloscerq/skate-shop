import { Products } from "../entities/products";

export interface ProductInOrder {
  product: Products;
  amount: number;
}
