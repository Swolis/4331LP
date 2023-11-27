import mongoose, { Schema, Document, Types, Model } from "mongoose";


export const productTrackerSchema: Schema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: {type: String, required: true },
    quantity: { type: Number, required: true },
});


export interface ProductTrackerInterface {
    productId: string;
    name: string;
    quantity: number;
}


const recipeSchema: Schema = new mongoose.Schema({

    name: { type: String, required: true },
    cost: { type: Number, required: true },
    price: { type: Number, required: true },

    recipeNumber: { type: Number, required: true },
    products: [{ type: productTrackerSchema, required: true }],

    description: { type: String }
});

export interface IRecipe extends Document {
    name: string;
    price: number;

    recipeNumber: number;
    products: ProductTrackerInterface[];

    description?: string;
}

export const getRecipeModel = (clientInfo: any): any => {

    const uri: string = 'mongodb+srv://jjoslin0994:22maGentafagoTTa@cluster0.zwwns9p.mongodb.net/';
  
    const { databaseName } = clientInfo;
    const connection = mongoose.createConnection(uri, {
      dbName: databaseName,
      ssl: true,
    });
  
    const RecipeModel: Model<IRecipe> = connection.model<IRecipe>('Recipe', recipeSchema);

    const closeConnection = () => {
        connection.close()
          .then(() => {
            console.log('Connection closed successfully.');
          })
          .catch((error) => {
            console.error('Error closing the connection:', error);
          });
      };

      return { model: RecipeModel, closeConnection};
}


export default recipeSchema;