// OrderComponent (OrderComponent.js)
import React from 'react';
import OrderItem from './OrderItem';
import {useOrderState, useOrderDispatch} from './OrderContext';


const OrderComponent = () => {
  const orderState = useOrderState();
  const dispatch = useOrderDispatch();
  
  
  let tax = orderState.total * 0.07;
  let total = orderState.total + tax;

  const removeItemFromOrder = (item) => {
    console.log(item);
    dispatch({ type: 'REMOVE_FROM_ORDER', itemIndex: orderState.orderItems.indexOf(item), price: item.price });
  };

  const submitOrder = () => {
    console.log(orderState.orderItems);
  }

  React.useEffect(() => {
    console.log(orderState.orderItems);
  }, [orderState])

  return (
  <>
    <div className="OrderItems flex overflow-y-auto w-full h-5/6">
        <div className="flex w-full">
          <ul className="flex flex-col w-full">
            {orderState.orderItems.map((item, index) => (
            <li className="flex flex-col mt-2 w-full" key={index}>
                <div className="flex flex-row w-full h-fit">
                    <OrderItem key={index} item={item} itemIndex={index} onRemoveItem={removeItemFromOrder} />
                </div>
                <ul className="flex flex-col w-full">
                  {item?.modifiers?.map((modifier, modifierIndex) => (
                    <li key={modifierIndex}>
                        <div className="flex flex-row pl-5 w-full h-fit">
                            + {modifier.name} - ${modifier.price.toFixed(2)}
                        </div>
                    </li>
                ))}
                </ul>
            </li>
            ))}
          </ul>
        </div>
    </div>
    <div className="OrderTotals bg-slate-100 flex h-min shadow">
      <table>
          <tbody>
              <tr>
                  <td>Subtotal:</td>
                  <td>${orderState.total.toFixed(2)}</td>
              </tr>
              <tr>
                  <td>Tax:</td>
                  <td>${tax.toFixed(2)}</td>
              </tr>
              <tr>
                  <td>Total:</td>
                  <td>${total.toFixed(2)}</td>
              </tr>
              </tbody>
      </table>
    </div>
    <div className="OrderButtons flex relative bottom-0 justify-center w-full">
      <button className='bg-yellow-400 text-slate-900 active:bg-amber-600 font-bold uppercase 
                          text-sm px-6 py-3 h-20 w-full shadow 
                          hover:shadow-lg outline-none 
                          focus:outline-none 
                          ease-linear transition-all duration-150' 
                          onClick={() => submitOrder()}>Complete Order
      </button>
    </div>
  </>
  );
};

export default OrderComponent;
