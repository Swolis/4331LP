import axios from 'axios';

const addProduct = async (productData) => {
    try {
        const response = await axios.post('http://localhost:3001/Product/CreateProduct', productData, {mode: 'cors'});
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