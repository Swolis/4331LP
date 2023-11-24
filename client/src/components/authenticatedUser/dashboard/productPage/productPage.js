import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddProductForm from './addProductForm';
import ProductList from './ProductList';
import '../../../../styles/tailwind.css';

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchCard: true,
            showCreateCard: false,
        };
    }

    handleToggleCard = (cardName) => {
        this.setState({
            showSearchCard: cardName === 'search',
            showCreateCard: cardName === 'create',
        });
    };

    render() {
        const cardStyle = {
            background: 'bg-yellow-500',
        };
        const Montserrat = {
            fontFamily: 'Montserrat, sans-serif',
            marginTop: '0',
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: 'bold',
        };

        return (
            <div className="bg-slate-800 min-h-screen flex flex-col items-center">
                <Link to={'/'} className="items-center m-8">
                    <img src='/LogoEnhancedSmall.png' alt='Business Crafter Logo' className='h-24' />
                </Link>

                {/* Create new product card */}
                <div
                    id='search-card'
                    style={cardStyle}
                    className={`form-card flex flex-col justify-center items-center bg-slate-200 bg-opacity-10 py-10 w-4/5 max-w-md drop-shadow-2xl rounded-xl ${this.state.showSearchCard ? '' : 'hidden'}`}
                >
                    <h2 style={Montserrat}>Search Product</h2>
                    <ProductList />
                    <button style={{ background: '#ffd485' }} className='rounded-full p-1 px-4 text-black-600 m-2' onClick={() => this.handleToggleCard('create')}>Create New Product</button>
                </div>

                {/* Create new product card */}
                <div
                    id='create-card'
                    style={cardStyle}
                    className={`form-card flex flex-col justify-center items-center bg-slate-200 bg-opacity-10 py-10 w-4/5 max-w-md drop-shadow-2xl rounded-xl ${this.state.showCreateCard ? '' : 'hidden'}`}
                >
                    <h2 style={Montserrat}>Create New Product</h2>
                    <AddProductForm />
                    <button style={{ background: 'red'}} className='rounded-full p-1 px-4 text-black-600 m-2' onClick={() => this.handleToggleCard('search')}>Return</button>
                </div>
            </div>
        );
    }
}

export default ProductPage;
