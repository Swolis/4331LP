// CreateContactController.ts
import { Request, Response } from "express";
import { createProduct } from '../repositories/productRepository';
import { getNewSKU } from '../services/skuService';

export const createProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get SKU
        const sku: number = await getNewSKU();

        // Add SKU to the request body
        req.body.sku = sku;

        // Extract product data from the request body
        const productData = req.body;

        // Call the repository function to create the product
        const newProduct = await createProduct(productData);

        // Set the HTTP response status code
        res.status(201);

        // Use the json() method to send the response with JSON data
        res.json(newProduct);
    } catch (error) {
        console.error('Error creating product.', error);

        // Set the HTTP response status code for error
        res.status(500).json({ error: 'Internal server error.' });
    }
};
