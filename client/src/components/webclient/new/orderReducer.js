// orderReducer.js
const initialState = {
    orderItems: [],
    total: 0,
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_ORDER':
        // Add logic to handle adding items to the order
        return {
          ...state,
          orderItems: [...state.orderItems, action.payload],
          total: state.total + action.payload.price,
        };
      case 'REMOVE_FROM_ORDER':
        // Add logic to handle removing items from the order
        return {
          ...state,
          orderItems: state.orderItems.filter(item => item.id !== action.payload.id),
          total: state.total - action.payload.price,
        };
        case 'INITIALIZE_ORDER_LIST':
          return {
            ...state,
            orderItems: action.payload, // Set the initial data.
          };
  
      default:
        return state;
    }
  };
  
  export default orderReducer;
  