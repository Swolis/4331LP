// OrderContext.js
import { createContext, useContext, useReducer } from 'react';
import orderReducer from './orderReducer';

const OrderStateContext = createContext();
const OrderDispatchContext = createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, { orderItems: [0], total: 0 });

  return (
    <OrderStateContext.Provider value={state}>
      <OrderDispatchContext.Provider value={dispatch}>
        {children}
      </OrderDispatchContext.Provider>
    </OrderStateContext.Provider>
  );
};

export const useOrderState = () => {
  const context = useContext(OrderStateContext);
  if (!context) {
    throw new Error('useOrderState must be used within an OrderProvider');
  }
  return context;
};

export const useOrderDispatch = () => {
  const context = useContext(OrderDispatchContext);
  if (!context) {
    throw new Error('useOrderDispatch must be used within an OrderProvider');
  }
  return context;
};
