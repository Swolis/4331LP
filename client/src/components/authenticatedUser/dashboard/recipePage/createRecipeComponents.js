import React, { Component } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../../../../styles/tailwind.css';
import ProductBox from './ProductBox';
import handleQuery from '../../../../handlers/inventory/searcProductHandler';
import RecipeDetails from './recipeDetails';
import FinalizeRecipe from './FinallizeRecipeCard'

const DraggableProduct = ({ product, index }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'PRODUCT',
    item: { product },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // Apply alternating row colors
  const rowStyle = {
    backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0',
  };

  return (
    <tr ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', ...rowStyle }}>
      <td>{product.name}</td>
      <td>{product.eachPrice}</td>
      <td>{product.sku}</td>
    </tr>
  );
};

class ProductSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      products: [],
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

  handleDrop = (product) => {
    // Add the dropped product to the list of dropped products with an initial quantity
    const updatedProduct = {
      ...product,
      quantity: 1, // Set an initial quantity (adjust as needed)
    };
  
    this.setState(
      (prevState) => ({
        droppedProducts: [...prevState.droppedProducts, updatedProduct],
      }),
      () => {
        this.handleQuery();
      }
    );
  };
  
  
  

  // ProductSearch component
  handleRemove = (event, productToRemove) => {
    event.stopPropagation(); // Stop the event from propagating to parent elements
    const updatedDroppedProducts = this.state.droppedProducts.filter(
      (product) => product.sku !== productToRemove.sku
    );

    this.setState({ droppedProducts: updatedDroppedProducts }, () => this.handleQuery());
  };

  calculatePriceForEach = (product) => {
    if (product) {
      const { inventoryConfig, price } = product;
      const { innerPack, each } = inventoryConfig;

      const totalEachs = innerPack * each;

      const eachCost = parseFloat((price / totalEachs).toFixed(2));


      return eachCost;
    }
  };

  // Add the following two functions to handle increase and decrease
  handleIncrease = (sku, updatedQuantity) => {
    // Find the product in droppedProducts array and update its quantity
    const updatedDroppedProducts = this.state.droppedProducts.map((product) =>
      product.sku === sku ? { ...product, quantity: updatedQuantity } : product
    );

    this.setState({ droppedProducts: updatedDroppedProducts }, () => this.handleQuery(0));
  };

  handleDecrease = (sku, updatedQuantity) => {
    // Find the product in droppedProducts array and update its quantity
    const updatedDroppedProducts = this.state.droppedProducts.map((product) =>
      product.sku === sku ? { ...product, quantity: updatedQuantity } : product
    );

    this.setState({ droppedProducts: updatedDroppedProducts }, () => this.handleQuery(0));
  };

  render() {
    const Montserrat = {
      fontFamily: 'Montserrat, sans-serif',
      marginTop: '0',
      marginBottom: '1rem',
      fontSize: '2rem',
      fontWeight: 'bold',
    };

    const { showFinalizeCard, totalCost, droppedProducts } = this.state;


    

    return (
        <DndProvider backend={HTML5Backend} className="flex justify-center items-center">
          <div className='flex rounded-md justify-items-center align-middle'>
            <div className='flex-1 rounded-md align-middle overflow-hidden' style={{ minWidth: '500px' }}>
              <h3 style={Montserrat} className='text-white mb-4'>Product Search</h3>
              <input
                className='rounded-md w-full mb-4'
                type='text'
                name='query'
                placeholder='Search for products...'
                value={this.state.query}
                onChange={this.handleInputChange}
              />
              <div className='rounded-tl-lg rounded-tr-lg overflow-hidden'>
                <table className='w-full'>
                  <thead>
                    <tr className='bg-gray-200'>
                      <th className='px-4 py-2'>Product</th>
                      <th className='px-4 py-2'>Cost Per Each</th>
                      <th className='px-4 py-2'>SKU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.products.map((product, index) => (
                      <DraggableProduct key={product.sku} product={product} index={index} />
                    ))}
                  </tbody>
                </table>
              </div>
              {this.state.products.length > 0 && (
                <div className='rounded-bl-lg rounded-br-lg bg-gray-200 p-2'>
                  {/* This div ensures that the bottom corners remain rounded */}
                </div>
              )}
            </div>
            <div className='flex-1 h-auto w-auto' style={{ minWidth: '500px' }}>
              <h3 style={Montserrat} className='text-white mb-4'>DroppableArea</h3>
              <p>Drag desired product to the recipe container to build your recipe</p>
              <DroppableArea
                className='h-auto mt-3 '
                droppedProducts={this.state.droppedProducts}
                onDrop={this.handleDrop}
                onRemove={this.handleRemove}
                onIncrease={this.handleIncrease}
                onDecrease={this.handleDecrease}  // Fix the typo here
                style={{ minWidth: '5px' }}
              />

            </div>
            
          </div>
          <RecipeDetails className="justify-center self-center" 
          droppedProducts={droppedProducts}
          showFinalizeCard={showFinalizeCard}
          totalCost={totalCost}
          onGoBack={this.onGoBack}
        />
        </DndProvider>
        
      );
      
  }
}

const DroppableArea = ({ droppedProducts, onDrop, onRemove, onIncrease, onDecrease, className }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'PRODUCT',
    drop: (item) => onDrop(item.product),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  const calculateBoxStyle = () => {
    const columnCount = Math.min(
      droppedProducts.length, // Number of columns
      3 // Maximum number of columns
    );
  
    console.log(`column count:  ${columnCount}`);
  
    const boxWidth = 145; // Fixed width for each box
    const gapWidth = 5; // Adjust the gap width as needed
  
    return {
      border: '2px solid #000',
      padding: '2px',
      minHeight: '100px',
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: `repeat(${columnCount}, ${boxWidth}px)`, // Fixed width for each box
      gap: `${gapWidth}px`, // Adjust the gap width
    };
  };  
  
  return (
    <div
      ref={drop}
      style={calculateBoxStyle()}
      className={`m-5 rounded-lg bg-slate-400 ${className}`}
    >
      {droppedProducts.map((product, index) => (
        <ProductBox
          key={index}
          product={product}
          onRemove={(event) => onRemove(event, product)}
          onIncrease={onIncrease}  // Pass onIncrease prop
          onDecrease={onDecrease}  // Pass onDecrease prop
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      ))}
      {isActive && <div>Release to drop</div>}
    </div>
  );
};

export default ProductSearch;
