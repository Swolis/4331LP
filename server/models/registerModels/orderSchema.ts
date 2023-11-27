import itemSchema,{IItem} from "./itemSchema";
import mongoose,{Schema,Model} from "mongoose";


const orderSchema= new Schema<IOrder>({
    employeeID:{type:String,required:true},
    orderID:{type:Number, required:true},
    date:{type:String,required:true},
    listOfItems:{type:[itemSchema],required:true},
    totalPrice:{type:Number,required:true}


});
export interface IOrder extends Document{
    employeeID:string
    orderID:number
    date:string
    listOfItems:[IItem]
    totalPrice:number
}

export const getOrderModel = (clientInfo: any) => {
    const uri: string = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
  
    const { databaseName } = clientInfo;
    const connection = mongoose.createConnection(uri, {
      dbName: databaseName,
      ssl: true,
    });

    const OrderModel: Model<IOrder> = connection.model<IOrder>('orders', orderSchema);

      
    const closeConnection = () => {
        connection.close()
          .then(() => {
            console.log('Connection closed successfully.');
          })
          .catch((error) => {
            console.error('Error closing the connection:', error);
          });
    };

    return { model: OrderModel, closeConnection };
}



export default orderSchema