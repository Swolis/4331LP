import { Connection, Model } from "mongoose";
import orderSchema,{IOrder} from "../../models/registerModels/orderSchema";

export const createOrder: (clientDatabase: Connection, ProductData: any) => Promise<IOrder> = async (clientDatabase: Connection, ProductData: any) => {
    try {
        const OrderModel: Model<IOrder> = clientDatabase.model<IOrder>('orders', orderSchema);

        const newOrder = new OrderModel(ProductData);

        // Save the new product
        await newOrder.save();

   

        return newOrder;
    } catch (error: any) {
        console.error('Error creating order:', error);
        throw new Error('Internal Server Error');
    }
};
