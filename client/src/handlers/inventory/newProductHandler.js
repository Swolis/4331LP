import axios from 'axios';

const baseURL = `${window.location.protocol}//${window.location.hostname}:5000`;


const addProduct = async (productData) => {
    try {
        const response = await axios.post(`${baseURL}/Product/CreateProduct`, productData, {withCredentials: true, mode: 'cors'});
        return response.data;
    }catch (error){
        throw new Error('Add new product failed!');
    }
};

const handleNewProduct = async (productState) => {
    try {
        const newProductData = await addProduct(productState);
        console.log(`Product added: ${newProductData}`);
    }catch (error) {
        console.error(`Failed to add new product: ${error.message}`);
    }
};

export default handleNewProduct;