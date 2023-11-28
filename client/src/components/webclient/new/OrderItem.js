import React from 'react';

const OrderItem = ({ item, onAddModifier, onRemoveItem }) => {
  return (
    <li>
      {item.product.name} - ${item.product.price.toFixed(2)}
      <ul>
        {item.modifiers.map((modifier, modifierIndex) => (
          <li key={modifierIndex}>
            {modifier.name} - ${modifier.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <button onClick={() => onAddModifier(item)}>Add Modifier</button>
      <button onClick={() => onRemoveItem(item)}>Remove Item</button>
    </li>
  );
};

export default OrderItem;
