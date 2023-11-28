import React, { useState, useEffect } from 'react'
import DraggableButton from './DraggableButton';
import OrderComponent from './OrderComponent';
import SearchComponent from './SearchComponent';
import { useMode } from './ModeContext';
import { useOrderState, useOrderDispatch } from './OrderContext';

function ListButtons ({mode,res}) {
    const items = [];
    for (var item in res) {
        if ("recipe" in res[item]) {
            let recipe = res[item].recipe;
            items.push(<DraggableButton key={recipe.id} mode={mode} id={recipe.id} text={recipe.text} price={recipe.price}/>);
        }
        else {
            let product = res[item].product;
            items.push(<DraggableButton key={product.i} mode={mode} id={product.id} text={product.text} price={product.price}/>);
        }
    }
    
    return (
        <div className="flex flex-wrap justify-center">
            {items}
        </div>
    )
}

export default function ActionArea() {

    const orderState = useOrderState();
    const orderDispatch = useOrderDispatch();
    const { mode } = useMode();

    // State for storing request data
    const [data, setData]= useState([]);

    const orderID = 1;

    console.log(orderState.total);

    useEffect(() => {
        getData();
    },[])

    useEffect(() => {

    }, [mode])


    // Totaling values
    let tax = orderState.total * 0.07;
    let total = orderState.total + tax;


    function submitOrder() {
        console.log("order submitted.");
    }

    // Get data from API for Recipe/Products by search function
    const getData = () => {
        fetch('./tests/recipes.json',
        {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response){
            // console.log(response);
            return response.json();
        })
        .then(function(myJson){
            // console.log(myJson);
            setData(myJson);
        })
    }

    return (
        <div className="flex-initial justify-start w-5/12">
            {mode === 0 && <div></div>}
            {mode > 0 && mode < 3 && (
                <div className="ActionArea flex flex-col justify-start w-full h-screen"> 
                    <h1 className="bg-slate-100 text-slate-900 font-bold uppercase pl-2 pt-2 pb-3 text-lg shadow">Order: {orderID}</h1>
                    <div className="OrderItems flex overflow-y-auto w-full h-5/6">
                    <div className="flex w-full">
                    <OrderComponent />
                    <ul className="flex flex-col w-full">
                        {orderState.orderItems.map((item, index) => (
                        <li className="flex flex-col mt-2 w-full" key={index}>
                            <div className="flex flex-row w-full h-fit">
                                <div className="font-bold flex w-full">+ {item.name} - ${item?.price?.toFixed(2)}</div>
                                <button className="bg-gray-400 text-gray-600 flex font-bold pl-4 pr-4 pt-1 pb-1 rounded-l-md justify-end" 
                                    onClick={() => {
                                        orderDispatch({
                                            type: 'REMOVE_FROM_ORDER',
                                            id: item.id,
                                            name: item.name,
                                            price: item.price
                                          });
                                        }}>-</button>
                            </div>
                            <ul className="flex flex-col w-full">
                                
                            {item.modifiers?.map((modifier, modifierIndex) => (
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
                </div>
            )}
            {mode === 3 && ( 
                <div className="ActionArea flex flex-col justify-start w-full h-full"> 
                    <h2> Edit Console </h2>
                    <SearchComponent onAddToOrder={(product) => console.log(`Adding ${product.name} to the order`)} />
                    <ListButtons mode={mode} res={data}/>
                </div>)}
        </div>
    )
}
