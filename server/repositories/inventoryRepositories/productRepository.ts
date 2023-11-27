import { Connection, Model } from "mongoose";
import productSchema, { IProduct, getProductModel } from "../../models/inventoryModels/productSchema";


export const createProduct: (clientDatabase: Connection, ProductData: any) => Promise<IProduct> = async (clientDatabase: Connection, ProductData: any) => {
    try {
        const ProductModel = getProductModel(clientDatabase);

        const newProduct = new ProductModel(ProductData);

        // Save the new product
        await newProduct.save();

   

        return newProduct;
    } catch (error: any) {
        console.error('Error creating product:', error);
        throw new Error('Internal Server Error');
    }
};
