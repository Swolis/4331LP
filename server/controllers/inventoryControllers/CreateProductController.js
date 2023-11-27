import { createProduct } from '../../repositories/inventoryRepositories/productRepository';
import { getClientModel } from '../../models/ClientSchema';
export const createProductController = async (req, res) => {
    console.log('entering create product controller');
    try {
        const ClientModel = getClientModel(req.session.client);
        const client = await ClientModel.findOne({});
        if (!client) {
            throw new Error('user not found');
        }
        const sku = client.nextSKU++;
        await client.save();
        console.log(`sku: ${sku}`);
        req.body.sku = sku;
        const inventoryConfig = {
            innerPack: req.body.innerPackDef,
            each: req.body.eachDef,
        };
        const inventory = {
            case: req.body.caseQt,
            innerPack: req.body.innerPackQt,
            each: req.body.eachQt,
        };
        const productData = {
            name: req.body.name,
            price: req.body.price,
            sku: req.body.sku,
            description: req.body.description,
            inventoryConfig: inventoryConfig,
            inventory: inventory,
        };
        console.log('productData:', JSON.stringify(productData, null, 2));
        const newProduct = await createProduct(req.app.locals.client, productData);
        return res.status(201).json(newProduct);
    }
    catch (error) {
        console.log('error: ', error);
        if (error.message === 'user not found') {
            console.log('user not found');
            return res.status(404).json({ message: 'Database error: ', error });
        }
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
