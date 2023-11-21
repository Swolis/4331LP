import React, { Component } from 'react';
import handleNewProduct from '../../../../handlers/inventory/newProductHandler';
import '../../../../styles/tailwind.css';

class AddProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            description: '',
            innerPackDef: '',
            eachDef: '',
            caseQt: '',
            innerPackQt: '',
            eachQt: '',
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target; 

        if (name === 'description') {
            const words = value.split(/\s+/);
            if (words.length > 50) {
                // Limit to the first 50 words
                const truncatedDescription = words.slice(0, 50).join(' ');
                this.setState({ [name]: truncatedDescription });
            } else {
                this.setState({ [name]: value });
            }
        } else {
            this.setState({ [name]: value });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        handleNewProduct(this.state);
    }

    render() {
        return (
            <form className='mx-auto gap-6 w-full object-contain p-10 flex flex-col items-center' onSubmit={this.handleSubmit}>
                <div className='form-group w-5/6'>
                    <label></label>
                    <input
                        className='mx-auto w-full rounded-full shadow-inner border-opacity-.5 p-1 px-4'
                        type='text'
                        name='name'
                        placeholder='product name'
                        value={this.state.name}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className='form-group w-5/6'>
                    <label></label>
                    <input
                        className='mx-auto w-full rounded-full shadow-inner border-opacity-.5 p-1 px-4'
                        type='text'
                        name='price'
                        placeholder='product price'
                        value={this.state.price}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className='form-group w-5/6'>
                    <label></label>
                    <textarea
                        className='mx-auto w-full rounded-xl shadow-inner border-opacity-.5 p-1 px-4'
                        rows='4'
                        name='description'
                        placeholder='Product Description (up to 50 words)'
                        value={this.state.description}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className='flex flex-col text-center'>
                    <p className='m-1 justify-center align-middle text-xl'>Configure Inventory</p>
                    <div className='flex'>
                        <div className='flex-col m-3'>
                            <p>Inner Packs per Case:</p>
                            <input
                                className='mx-auto w-40 rounded-lg shadow-inner border-opacity-.5 p-1 px-4 m-3'
                                type='text'
                                name='innerPackDef'
                                placeholder=''
                                value={this.state.innerPackDef}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className='flex-col m-3'>
                            <p>Eaches per Inner Pack:</p>
                            <input
                                className='mx-auto w-40 rounded-lg shadow-inner border-opacity-.5 p-1 px-4 m-3'
                                type='text'
                                name='eachDef'
                                placeholder=''
                                value={this.state.eachDef}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col text-center'>
                    <p className='m-1 justify-center align-middle text-xl'>On-Hand Quantities</p>
                    <div className='flex'>
                        <div className='flex-col m-2'>
                            <p>Case:</p>
                            <input
                                className='mx-auto w-20 rounded-lg shadow-inner border-opacity-.5 p-1 px-4 m-3'
                                type='text'
                                name='caseQt'
                                placeholder=''
                                value={this.state.caseQt}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className='flex-col m-2 '>
                            <p>Inner Pack:</p>
                            <input
                                className='mx-auto w-20 rounded-lg shadow-inner border-opacity-.5 p-1 px-4 m-3'
                                type='text'
                                name='innerPackQt'
                                placeholder=''
                                value={this.state.innerPackQt}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className='flex-col m-2'>
                            <p>Each:</p>
                            <input
                                className='mx-auto w-20 rounded-lg shadow-inner border-opacity-.5 p-1 px-4 m-3'
                                type='text'
                                name='eachQt'
                                placeholder=''
                                value={this.state.eachQt}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='button-container flex'>
                    <button style={{ background: '#ffd485' }} className='rounded p-1 px-4 text-gray-600 m-2' type='submit'>Create Product</button>
                </div>
            </form>
        );
    }
}

export default AddProductForm;
