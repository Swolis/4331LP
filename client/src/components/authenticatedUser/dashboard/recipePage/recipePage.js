import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../../../../styles/tailwind.css';
import ProductSearch from "./createRecipeComponents";


class RecipePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchCard: false,
            showCreateCard: true,
        };
    }

    handleToggleCard = (cardName) => {
        this.setState({
            showSearchCard: cardName ==='search',
            showCreateCard: cardName === 'create',
        });
    };

    render () {
        const cardStyle = {
            background: 'bg-yellow-500'
        }
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
                    <img src='LogoEnhancedSmall.png' alt='Business Crafter Logo' className="h-24" />
                </Link>

                <div
                    id='search-card'
                    style={cardStyle}
                    className={`form-card flex flex-col justify-center items-center bg-slate-200 bg-opacity-10 py-10 w-4/5 max-w-md drop-shadow-2xl rounded-xl ${this.state.showCreateCard ? '' : 'hidden'}`}
                >
                    <h2 style={Montserrat}>Search Recipe</h2>
                </div>


                <div
                    id='create-card'
                    style={cardStyle}
                    className={`form-card bg-slate-200 bg-opacity-10 w-full text-center items-center justify-center max-w-max drop-shadow-2xl rounded-xl ${this.state.showCreateCard ? '' : 'hidden'}`}
                >
                    <h2 style={Montserrat}>Create Recipe</h2>
                    <div className="w-1/2 p-4">
                        <h2 style={Montserrat}></h2>
                            <ProductSearch />
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default RecipePage;