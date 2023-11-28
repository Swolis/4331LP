// OrderComponent (OrderComponent.js)
import React, { useEffect } from 'react';
import OrderItem from './OrderItem';
import {useOrderState, useOrderDispatch} from './OrderContext';


const OrderComponent = () => {
  const orderState = useOrderState();
  const dispatch = useOrderDispatch();

  useEffect(() => {
    console.log(orderState.orderList);
  }, [orderState.orderList])
  console.log(orderState.orderList);
  // const addItemToOrder = (product) => {
  //   dispatch({ type: 'ADD_ITEM', product });
  // };

  // const addModifierToItem = (item) => {
  //   dispatch({ type: 'ADD_MODIFIER', itemIndex: orderState.orderList.indexOf(item), modifier: { name: 'Extra', price: 2 } });
  // };

  const removeItemFromOrder = (item) => {
    dispatch({ type: 'REMOVE_ITEM', itemIndex: orderState.orderList.indexOf(item) });
  };

  React.useEffect(() => {
    const newSubtotal = orderState?.orderList?.reduce((acc, item) => {
      const itemPrice = item.product.price + item.modifiers.reduce((modifierAcc, modifier) => modifierAcc + modifier.price, 0);
      return acc + itemPrice;
    }, 0);
    dispatch({ type: 'UPDATE_SUBTOTAL', subtotal: newSubtotal });
  }, [orderState.orderList, dispatch]);

  return (
    <div>
      <h2>Itemized Order</h2>
      <ul>
        {/* {orderState.orderList.map((item, index) => (
          <OrderItem
            key={index}
            item={item}
            onRemoveItem={removeItemFromOrder}
          />
        ))} */}
      </ul>

      {/* <p>Subtotal: ${orderState.subtotal.toFixed(2)}</p> */}
    </div>
  );
};

export default OrderComponent;
