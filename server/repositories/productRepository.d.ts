import { IProduct } from '../models/productSchema';
import { IUser } from '../models/ClientSchema';
export declare const createProduct: (user: IUser, ProductData: any) => Promise<IProduct>;
