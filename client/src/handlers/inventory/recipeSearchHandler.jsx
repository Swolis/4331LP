import axios from 'axios';
import { query } from 'express';

const searchForRecipe = async (query) => {
    try {
        const response = await axios.post('http"//localhost:3001/Recipe-Search', query, {mode: 'cors'});
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