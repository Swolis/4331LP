// skuService.js


import { error } from 'console';
import { connectToDatabase}  from '../config/databaseConnection'
import mongoose from 'mongoose';


// define sku schema

const skuSchema = new mongoose.Schema({
    value: {
        type: Number,
        default: 0,
    },
});

// create sku model

const SKU = mongoose.model('SKU', skuSchema);

async function getNewSKU(): Promise<number> {
    try {
        const skuDocument = await SKU.findOne();

        if(!skuDocument) {
            // The document does not yet exits, creat it.
            console.log('making new');
            const newSKU = new SKU({});
            await newSKU.save();
            const skuValue: number = newSKU.value++;
            await newSKU.save();
            return skuValue;
        }

        const skuValue: number = skuDocument.value++;
        await skuDocument.save()
        //console.log('value: ', skuDocument.value);
        return skuValue;
    }catch (error){
        console.error('Error getting SKU: ', error);
        throw error;
    }
}




async function main() {
    const client: typeof mongoose = await connectToDatabase();
    const newSku: number = await getNewSKU();
    console.log('newSku: ', newSku);
    //console.log('client: ', client);
    await client.connection.close();
}

main();

