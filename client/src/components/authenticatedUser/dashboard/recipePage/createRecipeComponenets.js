import React, { Component } from 'react';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../../../../styles/tailwind.css';
import handleQuery from '../../../../handlers/inventory/searcProductHandler';

const DraggableProduct = ({ product }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'PRODUCT',
        item: { product },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} style={{opacity: isDragging ? 0.5 : 1 }}>
            {product.name},
            {product.price},
            {product.sku},
        </div>
    );
};

class ProductSearch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        query: '',
        products: [],
      };
    }
  
    componentDidMount() {
      this.handleQuery(0);
    }
  
    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
  
      const numericValue = Number(value);
  
      if (!isNaN(numericValue) || value.length > 2) {
        this.handleQuery(numericValue || value);
      } else {
        this.setState({ products: [] });
      }
    };
  
    handleQuery = (query) => {
      handleQuery({ query })
        .then((searchResult) => {
          this.setState({ products: searchResult });
        })
        .catch((error) => {
          console.error('Error handling query:', error.message);
        });
    };
  
    render() {

        const Montserrat = {
            fontFamily: 'Montserrat, sans-serif',
            marginTop: '0',
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: 'bold',
        };

      return (
        <DndProvider backend={HTML5Backend}>
          <div className='flex'>
            <div className='flex-1'>
                <input
                    type="text"
                    name="query"
                    placeholder="Search for products..."
                    value={this.state.query}
                    onChange={this.handleInputChange}
                />
                {this.state.products.map((product) => (
                    <DraggableProduct key={product.id} product={product} />
                ))}
            </div>
            <DroppableArea>
                <h3 style={Montserrat}>DroppableArea</h3>
            </DroppableArea>
          </div>
        </DndProvider>
      );
    }
  }

  const DroppableArea = ({ children }) => {
    retrun (
        <div style={{ border: '2px solid #000'}} className='p-10 min-h-100'>
            {children}
        </div>
    );
  };
  
  export default ProductSearch;
