
import Product, { IProduct } from '../models/productSchema';
import { IUser } from '../models/ClientSchema';

export const createProduct: (user: IUser, ProductData: any) => Promise<IProduct> = async (user: IUser, ProductData: any) => {
    const newProduct = new Product(ProductData);
    user.products.push(newProduct);
    await user.save();
    return newProduct;
}