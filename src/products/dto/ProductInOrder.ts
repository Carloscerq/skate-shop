import { Products } from "../products.entity";

export interface ProductInOrder {
  product: Products;
  amount: number;
}
