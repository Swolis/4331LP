import React, { Component } from "react";
import handleCreateRecipe from "../../../../handlers/inventory/createRecipeHandler";

class FinalizeRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentProfitMargin: '30%', // Set the initial value for percentProfitMargin
      name: localStorage.getItem('recipeName') || '',
      price: '',
      description: localStorage.getItem('recipeDescription') || '',
      calcedPricePlaceholder: '', // Define calcedPricePlaceholder in the initial state
    };
  }

  componentDidMount() {
    const { totalCost } = this.props;
    // Set initial state based on totalCost
    this.setState({
      calcedPricePlaceholder: this.calculatePriceWithProfitMargin(totalCost),
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'description') {
      const words = value.split(/\s+/);
      if (words.length > 50) {
        const truncatedDescription = words.slice(0, 50).join(' ');
        this.setState({ [name]: truncatedDescription });
      } else {
        this.setState({ [name]: value });
      }
    } else if (name === 'price') {
      // Remove non-digit characters
      const cleanedValue = value.replace(/[^0-9.]/g, '');
  
      // Add dollar sign if there are digits, otherwise, leave it empty
      const formattedValue = cleanedValue.length > 0 ? `$${cleanedValue}` : '';
  
      // Update the state with the formatted value
      this.setState({ [name]: formattedValue });
    } else {
      this.setState({ [name]: value });
    }
  };
  
  

  handleGoBack = () => {
        // Save to localStorage
        localStorage.setItem('recipeName', this.state.name);
        localStorage.setItem('recipeDescription', this.state.description);
    this.props.onGoBack();
  };

  calculatePriceWithProfitMargin = (totalCost) => {
    const { percentProfitMargin } = this.state;
    let percent;

    if (typeof percentProfitMargin === 'string') {
        console.log('text: ', percentProfitMargin);
      percent = parseFloat(percentProfitMargin.replace(new RegExp('%', '')));
    } else {
      percent = percentProfitMargin;
    }

    console.log(`percent: ${percent}`);

    const calcPrice = totalCost * (1 + (percent / 100));

    console.log(`calcedPrice: ${calcPrice}`);

    
    return calcPrice.toFixed(2);
  };

  handleSubmit = () => {
    const recipeData = {
      name: this.state.name,
      cost: this.props.totalCost,
      price: this.state.price,
      products: this.props.droppedProducts.map(product => ({
        id: product._id,
        name: product.name,
        quantity: product.quantity,
      })),
      description: this.state.description,
    };
    console.log('Recipe Data:', recipeData); // Log the recipeData
  
    handleCreateRecipe(recipeData);
  };
  

handlePercentChange = (event) => {
  const value = event.target.value;
  const { totalCost } = this.props;

  if (value === '' || (value === '0' && event.nativeEvent.inputType === 'deleteContentBackward')) {
    // Allow backspace when the value is '0'
    this.setState({ percentProfitMargin: value }, () => {
      const calculatedPrice = this.calculatePriceWithProfitMargin(totalCost);
      console.log('calculated in handle: ', calculatedPrice);
      this.setState({ calcedPricePlaceholder: calculatedPrice });
    });
  } else {
    this.setState({ percentProfitMargin: parseFloat(value) || '' }, () => {
      const calculatedPrice = this.calculatePriceWithProfitMargin(totalCost);
      console.log('calculated in handle: ', calculatedPrice);
      this.setState({ calcedPricePlaceholder: calculatedPrice });
    });
  }
};

  

  render() {
    const { totalCost } = this.props;

    return (
      <div className="fixed inset-0 z-50 rounded-xl flex items-center justify-center h-full w-full bg-slate-800 backdrop-blur-3xl bg-opacity-50 text-black">
        <div className="bg-zinc-200 p-8 w-1/2 rounded-lg max-w-md text-center shadow-2xl relative shadow-outline drop-shadow-lg">
          <h1 className="mb-3 font-bold">Total Cost: {`$${totalCost.toFixed(2)}`}</h1>
          <form className="w-full m-3 items-center">
            <p>Enter Percent Profit Margin</p>
            <div className="relative text-black">
              <input
                className="self-center rounded-full w-5/6 pl-3 text-black m-3 mb-0 mt-0 shadow-inner"
                type="text"
                name="percentProfitMargin"
                placeholder="30%"
                value={this.state.percentProfitMargin}
                onChange={this.handlePercentChange}
              />

              <div className="ml-2 mt-0 text-xs mb-4">
                Suggested retail value: {`$${this.calculatePriceWithProfitMargin(totalCost)}`}
              </div>
            </div>

            <input
              className="w-5/6 rounded-full p-1 pl-2 shadow-inner"
              placeholder={`calulated price: $${this.state.calcedPricePlaceholder}`}
              type="float"
              name="price"
              value={`${this.state.price}`}
              onChange={this.handleInputChange}
            />

            <input
              className="w-5/6 rounded-full p-1 pl-2 shadow-inner mt-4"
              placeholder='Recipe Name'
              type="text"
              name="name"
              value={`${this.state.name}`}
              onChange={this.handleInputChange}
            />

            

            <textarea
              className="w-5/6 rounded-lg p-1 pl-2 m-4"
              rows={5}
              placeholder="Product Description (50 words)"
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </form>
          <div className="flex flex-col">
            <button className="bg-blue-500 text-white text-center px-4 py-2 rounded m-3" onClick={this.handleSubmit}>
              Submit
            </button>

            <button className="text-xs absolute left-0 bottom-0 m-2 hover:scale-110" onClick={this.handleGoBack}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FinalizeRecipe;
