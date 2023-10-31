// productRepository.ts

//const Product = require('../models/productSchema');

import Product, { IProduct } from '../models/productSchema';

export const createProduct: (ProductData: any) => Promise<IProduct> = async (ProductData) => {
    const newProduct = new Product(ProductData);
    return newProduct.save();
}

