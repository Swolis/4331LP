import { getProductModel } from "../../models/inventoryModels/productSchema";
export const findProductController = async (req, res) => {
    console.log('entering product search controller');
    const { model: ProductModel, closeConnection } = getProductModel(req.session.client);
    const query = req.body.query;
    console.log(`query: ${query}`);
    try {
        let searchResult;
        if (typeof (query) === 'string') {
            console.log('query is a string');
            searchResult = await ProductModel.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                ],
            });
        }
        else if (typeof (query) === 'number') {
            if (query === 0) {
                searchResult = await ProductModel.find({});
            }
            else {
                console.log('query is a number');
                searchResult = await ProductModel.find({
                    $or: [
                        { price: query },
                        { sku: query },
                    ],
                });
            }
        }
        else {
            throw new Error('search type invalid');
        }
        closeConnection();
        if (searchResult.length === 0) {
            console.log('no product found');
            res.status(404).json({ message: 'product no found' });
            return;
        }
        res.status(201).json(searchResult);
        return;
    }
    catch (error) {
        console.log('error: ', error);
        res.status(500).json({ message: `Internal server error: ${error}` });
    }
};
