
import axios from 'axios';

const baseURL = `${window.location.protocol}//${window.location.hostname}:5000`;

const createRecipe = async (RecipeData) => {
    try{
        const response = await axios.post(`${baseURL}/Recipe-Router/Create-Recipe`, RecipeData, {withCredentials: true, mode: 'cors'});
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