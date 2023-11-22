import React, { Component } from "react";
import handleQuery from "../../../../handlers/inventory/recipeSearchHandler";


class RecipeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            recipes: [],
            droppedProducts: [],
        };
    }

    componentDidMount() {
        this.handleQuery(0);
    }

    handleInputChange = (event) => {
        if (event && event.target) {
          const { name, value } = event.target;
          this.setState({ [name]: value });
    
          const numericValue = Number(value);
    
          if (!isNaN(numericValue) || value.length > 2) {
            this.handleQuery(numericValue || value);
          } else {
            this.setState({ products: [] });
          }
        }
    };


    handleQuery = (query = this.state.query) => {
        handleQuery({ query })
          .then((searchResult) => {
            const productsWithEachPrice = searchResult.map((product) => {
              const eachPrice = this.calculatePriceForEach(product);
              return {
                ...product,
                eachPrice,
              };
            });
    
            const filteredResults = productsWithEachPrice.filter(
              (result) => !this.state.droppedProducts.some((item) => item.sku === result.sku)
            );
            this.setState({ products: filteredResults });
          })
          .catch((error) => {
            console.error('Error handling query:', error.message);
          });
      };

      /*needs to be finished*/
}

