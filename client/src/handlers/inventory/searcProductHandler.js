import axios from "axios";

const searchForProduct = async(query) => {
    try {
        console.log(`searching for: ${query}`);
        const response = await axios.post('http://localhost:3001/Product/Search', query, {mode: 'cors'});
        return response.data;
    }catch (error) {
        console.error(`product search error: ${error}`);
        throw new Error('Product Search Error.');
    }
};

const handleQuery = async(queryState) => {
    try {
        const searchResult = await searchForProduct(queryState);

        return searchResult;
    }catch (error) {
        console.error('Failed to retrieve products: ', error.message);
    }
}

export default handleQuery;