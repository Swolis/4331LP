import React, { Component } from "react";
import PropTypes from 'prop-types';
import FinalizeRecipe from "./FinallizeRecipeCard";

class RecipeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percentProfitMargin: '30', // Set the initial value for percentProfitMargin
    };
  }

  calculateTotalCost = () => {
    const { droppedProducts } = this.props;

    return droppedProducts.reduce((acc, product) => {
      const { eachPrice, quantity } = product;
      const productCost = eachPrice * quantity;
      return acc + productCost;
    }, 0);
  };

  calculatePriceWithProfitMargin = (totalCost) => {
    const { percentProfitMargin } = this.state;
    console.log(`totalCost: ${totalCost}`);
    console.log(`percentProfitMargin: ${percentProfitMargin}`);

    const calcPrice = totalCost * (1 + percentProfitMargin / 100);
    return calcPrice.toFixed(2);
  };

  handlePercentChange = (event) => {
    const value = event.target.value;
    if (value === '' || (value === '0' && event.nativeEvent.inputType === 'deleteContentBackward')) {
      // Allow backspace when the value is '0'
      this.setState({ percentProfitMargin: value });
    } else {
      this.setState({ percentProfitMargin: parseFloat(value) || '' });
    }
  };

  handleFinalizeClick = (totalCost) => {
    const { droppedProducts } = this.props;
    this.setState({ showFinalizeCard: true, totalCost, droppedProducts });
  };

  onGoBack = () => {
    this.setState({ showFinalizeCard: false });
  }

  render() {
    const { showFinalizeCard } = this.state;
    const { droppedProducts } = this.props;
    const totalCost = this.calculateTotalCost();
    const calculatedPrice = this.calculatePriceWithProfitMargin();

    return (
      <div className="flex-1 mt-5 text-left text-white">
        <h2 className="text-left text-xl font-bold text-white">Recipe Details</h2>

        <h1 className="text-left">Products:</h1>

        <h1 className="text-left">Total Cost: {`$${totalCost.toFixed(2)}`}</h1>

        <div className="flex m-2 w-full"></div>

        <div className="text-center mt-3">
          <button
            onClick={() => this.handleFinalizeClick(totalCost)}
            className="font-bold bg-yellow-600 mb-4 rounded-lg p-2 hover:ring-8 hover:ring-yellow-500 hover:ring-opacity-80 active:bg-yellow-500 active:text-black active:ring-yellow-300"
          >
            Finalize Recipe
          </button>
        </div>
        
        {showFinalizeCard && <FinalizeRecipe totalCost={totalCost} droppedProducts={droppedProducts} onGoBack={this.onGoBack} />}
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  droppedProducts: PropTypes.array.isRequired,
  showFinalizeCard: PropTypes.bool.isRequired,
  totalCost: PropTypes.number.isRequired,
  onGoBack: PropTypes.func.isRequired,
};

export default RecipeDetails;
