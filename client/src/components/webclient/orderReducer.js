// orderReducer.js

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_ORDER':
      return {
        ...state,
        orderItems: [...state.orderItems, action.item],
        total: state.total + action.item.price,
      };
    case 'ADD_MODIFIER':
      return {
        ...state,
        orderItems: state.orderItems.map(i => {
          if (i.id === action.item.id) {
            return action.item;
          } else {
            return i;
          }
        }),
        total: state.total + action.item.price,
      }
    case 'REMOVE_FROM_ORDER':
      console.log(action.itemIndex);
      const newOrderItems = [...state.orderItems];
      newOrderItems.splice(action.itemIndex, 1);
      return {
        ...state,
        orderItems: newOrderItems,
        total: state.total - action.price,
      };

    default:
      return state;
  }
};

export default orderReducer;
  