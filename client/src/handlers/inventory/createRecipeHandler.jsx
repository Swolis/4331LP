import React from "react";
import axios from 'axios';

const createRecipe = async (RecipeData) => {
    try{
        const response = await axios.post('http://localhost:3001/Recipe-Router/Create-Recipe', RecipeData, {mode: 'cors'});
        return response.data;
    }catch (error) {
        throw new Error('Failed to Create Recipe');
    }
};

const handleCreateRecipe = async (recipeState) => {
    try {
        const createRecipeData = await createRecipe(recipeState);
    }catch (error){
        console.error('Error creating recipe: ', error);
    }
}

export default handleCreateRecipe;