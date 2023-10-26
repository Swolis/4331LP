// skuService.js


import { error } from 'console';
import { connectToDatabase} from '../config/databaseConnection'

import { Collection, Document, MongoClient } from 'mongodb';
// connect to mongo server

async function getSkuCollection(client: MongoClient)
{
    const db = client.db();
    const collectionName: string = 'sku_counter';

    try {
        console.log('\nin try\n');        
        const skuCollection = db.collection(collectionName);
        //console.log('skuCollection: ', skuCollection);
        const documentCount: number = await skuCollection.countDocuments();
        if (documentCount < 1) throw new Error('newCollection');
        return skuCollection;

    }catch (error) {
        if(error.message === 'newCollection')
        {
            // the collection does not exist --> create it
            console.error(`Collection ${collectionName} did not exist`)
            const skuCollection: Collection<Document> = await db.createCollection('sku_counter');
            const skuDocument = {
                value: 0,
            }

            skuCollection.insertOne(skuDocument);

            return skuCollection;

        }else{
            console.log('\nother error\n');
            console.error('Other database error: ', error);
            throw error;
        }

    }

}
async function getNewSKU(client: MongoClient): Promise<number>
{
    const db = client.db();
    const skuCollection: Collection = await getSkuCollection(client);
    
    const result = await skuCollection?.findOneAndUpdate( 
        {}, // Filter, find any document in the collection
        { $inc: { value: 1 }}, // Increment the valuefield by 1
        { returnDocument: "before"
    });

    console.log('result: ', result);
    try{
        if (result && typeof result.value  === 'number'){
            return result.value;
        }else{
        throw error;
        }
    }catch(error){
        console.log('error: ', error);
        throw error;
    }


}


async function main() {
    const client: MongoClient = await connectToDatabase();
    const newSku: number = await getNewSKU(client);
    console.log('newSku: ', newSku);
    await client.close();
}

main();

