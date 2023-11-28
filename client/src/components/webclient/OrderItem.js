import React from 'react';

const OrderItem = ({ item, onRemoveItem }) => {

  return (
    <>
    <div className="font-bold flex w-full">+ {item.name} - ${item.price.toFixed(2)}</div>
            <button className="bg-gray-400 text-gray-600 flex font-bold pl-4 pr-4 pt-1 pb-1 rounded-l-md justify-end" 
                  onClick={() => onRemoveItem(item)}>-</button>
      </>
  );
};

export default OrderItem;
