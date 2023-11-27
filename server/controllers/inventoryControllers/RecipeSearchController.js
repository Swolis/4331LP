import { getRecipeModel } from "../../models/inventoryModels/recipieSchema";
export const RecipeSearchController = async (req, res) => {
    console.log('entering search recipe controller');
    const { model: RecipeModel, closeConnection } = getRecipeModel(req.session.client);
    const query = req.body.query;
    console.log(`query: ${query}`);
    try {
        let searchResult;
        if (typeof (query) === 'string') {
            searchResult = await RecipeModel.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                ],
            });
        }
        else if (typeof (query) === 'number') {
            if (query === 0) {
                searchResult = await RecipeModel.find({});
            }
            else {
                searchResult = await RecipeModel.find({
                    $or: [
                        { price: query },
                        { sku: query },
                    ],
                });
            }
        }
        else {
            throw new Error('Search type invalid.');
        }
        if (searchResult.length === 0) {
            res.status(404).json({ message: 'No recipe found.' });
            return;
        }
        res.status(201).json(searchResult);
        return;
    }
    catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: `Internal server error: ${error}` });
    }
};
