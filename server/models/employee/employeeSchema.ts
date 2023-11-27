// productSchema.ts
import mongoose, {  Schema, Document, Model } from "mongoose";

// Define Schema


export interface IEmployee extends Document {
    name: string,
    pin: string,
    employeeId:string
    permission:boolean
}
const employeeSchema= new Schema<IEmployee>({
    name: {type: String, required: true},
    pin:{type:String,required:true},
    employeeId:{type:String,reaquired:true},
    permission:{type:Boolean,required:true}


});

export const getEmloyeeModel = (clientInfo: any): any => {
    const uri: string = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';

    const { databaseName } = clientInfo;
    const connection = mongoose.createConnection(uri, {
        dbName: databaseName,
        ssl: true,
    });

    const EmployeeModel: Model<IEmployee> = connection.model<IEmployee>('Employee', employeeSchema);

    const closeConnection = () => {
        connection.close()
        .then(() => {
            console.log('Connection closed successfully.');
          })
          .catch((error) => {
            console.error('Error closing the connection:', error);
          });
    };

    return { model: EmployeeModel, closeConnection };
};
export default employeeSchema;