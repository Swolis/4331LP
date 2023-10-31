// CreateContactController.ts
import { Request, Response } from "express";
import { createProduct } from '../repositories/productRepository';

export const createProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        // extract product data from the request body
        const productData = req.body;

        // call the repository function to create the product
        const newProduct = await createProduct(productData);

        // return the created product in teh response
        res.status(201).json(newProduct);
    }catch (error) {
        console.error('Error creating product.', error);
        res.status(500).json({ error: 'Internal server error.'});
    }
};