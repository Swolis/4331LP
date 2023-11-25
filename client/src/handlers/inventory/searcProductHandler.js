import axios from "axios";

const baseURL = `${window.location.protocol}//${window.location.hostname}:5000`;

const searchForProduct = async(query) => {
    try {
        console.log(`searching for: ${query}`);
        const response = await axios.post(`${baseURL}/Product/Search`, query, {mode: 'cors'});
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