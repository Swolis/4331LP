import { Connection, Model } from "mongoose";
import orderSchema,{IOrder,getOrderModel} from "../../models/registerModels/orderSchema";

export const createOrder: (clientDatabase: Connection, ProductData: any) => Promise<IOrder> = async (clientDatabase: Connection, ProductData: any) => {
    try {
        const {model:OrderModel,closeConnection}=getOrderModel(clientDatabase)

        const newOrder = new OrderModel(ProductData);

        // Save the new product
        await newOrder.save();
        
        closeConnection()

        return newOrder;
    } catch (error: any) {
        console.error('Error creating order:', error);
        throw new Error('Internal Server Error');
    }
};
