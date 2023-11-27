import React, { useEffect, useState } from 'react';
import ActiveArea from './ActiveArea';
import ActionArea from './ActionArea';
import PinPad from './PinPad';
import '../../styles/tailwind.css';
import '../../styles/webclient.css';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default function RegisterClient() {
    const [mode, setMode] = useState(0);
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0.00);
    const [orderItem, setOrderItem] = useState({});
    const [orderTrigger, setOrderTrigger] = useState(false);

    let backend = HTML5Backend;

    function changeMode(newMode) {
        setMode(newMode);
    }
  
    const addItem = (item) => {
        console.log(item)
        const newItem = { name: item.text, price: item.price, modifiers: [] };
        setOrderItem(newItem);
        updateTotalPrice();
        setOrderTrigger(true);
        console.log(order);
    };
  
    const addModifier = (item) => {
        const updatedOrder = [...order];
        console.log(order);
        updatedOrder[order.length-1].modifiers.push({ name: item.text, price: item.price });
        setOrder(updatedOrder);
        updateTotalPrice();
    };
  
    const removeItem = (itemIndex) => {
      const updatedOrder = [...order];
      updatedOrder.splice(itemIndex, 1);
      setOrder(updatedOrder);
      updateTotalPrice();
    };
  
    const updateTotalPrice = () => {
      const newPrice = order.reduce((acc, item) => {
        const itemPrice = item.price + item.modifiers.reduce((modifierAcc, modifier) => modifierAcc + modifier.price, 0);
        return acc + itemPrice;
      }, 0);
      setTotalPrice(newPrice);
    };

    useEffect(() =>{

    }, [])

    useEffect(() => {
        if (orderTrigger) {
            setOrder([...order, orderItem]);
            updateTotalPrice();
            setOrderTrigger(false);
        }
    }, [orderItem, orderTrigger]);


    return (
        
        <DndProvider backend={backend}>
            <div className='bg-slate-800 min-h-screen flex'>
                <PinPad mode={mode} setMode={changeMode}/>
                <ActionArea mode={mode} order={order} onRemoveItem={removeItem} totalPrice={totalPrice} />
                <ActiveArea mode={mode} setMode={changeMode} order={order} onAddItem={addItem} onAddModifier={addModifier}  /> 
            </div>
        </DndProvider>
    );
}

