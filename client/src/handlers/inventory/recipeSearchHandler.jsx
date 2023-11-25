import axios from 'axios';

const baseURL = `${window.location.protocol}//${window.location.hostname}:5000`;

const searchForRecipe = async (query) => {
    try {
        const response = await axios.post(`${baseURL}/Recipe-Search`, query, {mode: 'cors'});
    }catch (error){
        throw new Error('Recipe search failed.');
    }
}

const handleQuery = async (queryState) => {
    try {
        const searchResult = await searchForRecipe(queryState);

        return searchResult;
    }catch (error){
        console.error(error);
    }
}

export default handleQuery;