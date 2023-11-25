import React, { Component } from 'react';
import handleQuery from '../../../../handlers/inventory/searcProductHandler';

import '../../../../styles/productList.css';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            products: [],
        };
    }

    componentDidMount() {
        handleQuery({ query: 0 })
            .then(searchResult => {
                this.setState({ products: searchResult });
            })
            .catch(error => {
                console.error('Error in handle query on load', error.message);
            });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    
        // Check if the value is a valid number
        const numericValue = Number(value);

        console.log('value: ', value);
        console.log('numericValue: ', numericValue);
    
        if (!isNaN(numericValue)) {
            handleQuery({ query: numericValue })
                .then(searchResult => {
                    this.setState({ products: searchResult });
                })
                .catch(error => {
                    console.error('Error in handleQuery:', error.message);
                });
        } else if(value.length > 2){
            handleQuery({ query: value })
            .then(searchResult => {
                this.setState({ products: searchResult });
            })
            .catch(error => {
                console.error('Error in handleQuery:', error.message);
            });
            
        }else {
            this.setState({ products: [] });
        }
    };

    // handle submit

    render() {
        return (
            <div className='mx-auto gap-6 w-full object-contain p-10 flex flex-col items-center'>
                <form>
                    <input
                        className='mx-auto w-full rounded-full shadow-inner p-1 px-4'
                        type='search'
                        name='query'
                        placeholder='Search'
                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                </form>
                {/* display searched items */}
                <table className='mt-4 w-full table-auto' style={{ borderRadius: '6px' }}>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Price</th>
                            <th className='px-4 py-2'>SKU</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products?.map((product, index) => {
                            // Split the name into parts before and after the matched query
                            const nameParts = product.name.split(new RegExp(`(${this.state.query})`, 'i'));
                            
                            return (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td className='border px-4 py-2'>
                                        {nameParts.map((part, partIndex) => (
                                            part.toLowerCase() === this.state.query.toLowerCase()
                                                ? <strong key={partIndex}>{part}</strong>
                                                : part
                                        ))}
                                    </td>
                                    <td className='border px-4 py-2'>{product.price}</td>
                                    <td className='border px-4 py-2'>{product.sku}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ProductList;
