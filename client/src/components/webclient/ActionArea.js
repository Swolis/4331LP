import React, { useState, useEffect } from 'react'
import DraggableButton from './DraggableButton';
import OrderComponent from './OrderComponent';
import SearchComponent from './SearchComponent';
import { useMode } from './ModeContext';

function ListButtons ({res}) {
    const items = [];
    for (var item in res) {
        if ("recipe" in res[item]) {
            let recipe = res[item].recipe;
            items.push(<DraggableButton key={recipe.id} id={recipe.id} name={recipe.text} modifiers={recipe.modifiers} price={recipe.price}/>);
        }
        else {
            let product = res[item].product;
            items.push(<DraggableButton key={product.i} id={product.id} name={product.text} price={product.price}/>);
        }
    }
    
    return (
        <div className="flex flex-wrap justify-center">
            {items}
        </div>
    )
}

export default function ActionArea() {

    // const orderState = useOrderState();
    const { mode } = useMode();

    // State for storing request data
    const [data, setData]= useState([]);

    const orderID = 1;

    useEffect(() => {
        getData();
    },[])

    useEffect(() => {

    }, [mode])


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
            return response.json();
        })
        .then(function(myJson){
            setData(myJson);
        })
    }

    return (
        <div className="flex-initial justify-start w-5/12">
            {mode === 0 && <div></div>}
            {mode > 0 && mode < 3 && (
                <div className="ActionArea flex flex-col justify-start w-full h-screen"> 
                    <h1 className="bg-slate-100 text-slate-900 font-bold uppercase pl-2 pt-2 pb-3 text-lg shadow">Order: {orderID}</h1>
                    <OrderComponent />
                </div>
            )}
            {mode === 3 && ( 
                <div className="ActionArea flex flex-col justify-start w-full h-full"> 
                    <h2> Edit Console </h2>
                    <SearchComponent />
                    <ListButtons res={data}/>
                </div>)}
        </div>
    )
}
