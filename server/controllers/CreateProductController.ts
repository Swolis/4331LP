import { Request, Response } from "express";
import { createProduct } from '../repositories/productRepository';
import { getNewSKU } from '../services/skuService';
import User, { IUser } from "../models/ClientSchema";

export const createProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get user by their ID (assuming you're using Mongoose)
        const UserID = '6542f3406e0f1642db20a668';
        const user = await User.findById(UserID);

        if (!user) {
            // Handle the case where the user is not found
            throw res.status(404).json({ error: 'User not found.' });
        }

        // Get SKU
        const sku: number = await getNewSKU();

        // Add SKU to the request body
        req.body.sku = sku;

        // Extract product data from the request body
        const productData = req.body;

        // Call the repository function to create the product
        const newProduct = await createProduct(user, productData);

        // Set the HTTP response status code
        res.status(201);

        // Use the json() method to send the response with JSON data
        res.json(newProduct);
    } catch (error: any) {
        console.error('Error creating product.', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
