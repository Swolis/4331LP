import orderSchema from "../../models/registerModels/orderSchema";
export const RecipeSearchController = async (req, res) => {
    console.log('entering search ordere controller');
    const clientDatabase = req.app.locals.client;
    const OrderModel = clientDatabase.model('orders', orderSchema);
    const query = req.body.query;
    console.log(`query: ${query}`);
    try {
        let searchResult;
        if (typeof (query) === 'number') {
            if (query === 0) {
                searchResult = await OrderModel.find({});
            }
            else {
                searchResult = await OrderModel.find({
                    $or: [
                        { totalprice: query },
                        { orderID: query }
                    ],
                });
            }
        }
        else {
            throw new Error('Search type invalid.');
        }
        if (searchResult.length === 0) {
            res.status(404).json({ message: 'No order found.' });
            return;
        }
        res.status(201).json(searchResult);
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: `Internal server error: ${error}` });
    }
};
