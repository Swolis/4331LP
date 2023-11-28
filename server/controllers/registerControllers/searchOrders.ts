import { Request, Response } from "express";
import { getOrderModel} from "../../models/registerModels/orderSchema";

export const OrderSearchController = async (req: Request, res: Response): Promise<void> => {
    console.log('entering search order controller');
    const { model: OrderModel, closeConnection } = getOrderModel((req as any).session.client);

    const query:number = req.body.query;

    console.log(`query: ${query}`);

    try{
        
        const searchResult = await OrderModel.find({
            $or: [
                { totalprice: query },
                {orderID:query}
            ],
        });

        if(searchResult.length === 0 ) {
            res.status(404).json({message: 'No order found.'});
            return;
        }

        res.status(201).json(searchResult);
    } catch ( error: any ) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: `Internal server error: ${error}`});
    }finally {
        closeConnection();
    }
}