import React, { useState, useEffect } from 'react'
import DButton from './DButton'

function ListButtons ({mode,res}) {
    const items = [];
    for (var item in res) {
        if ("recipe" in res[item]) {
            let recipe = res[item].recipe;
            items.push(<DButton key={recipe.id} mode={mode} id={recipe.id} fill={recipe.color} text={recipe.text} />);
        }
        else {
            let product = res[item].product;
            items.push(<DButton key={product.i} mode={mode} id={product.id} fill={product.color} text={product.text} />);
        }
    }
    
    return (
        <div className="flex flex-wrap justify-center">
            {items}
        </div>
    )
}

export default function ActionArea({mode}) {

    // State for storing request data
    const [data, setData]=useState([]);

    function submitOrder() {
        return "order submitted.";
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

    useEffect(() => {
        getData()
    },[])

    useEffect(() => {

    }, [mode])

    return (
        <div className="flex-initial justify-start w-5/12">
            {mode === 0 && <div></div>}
            {mode > 0 && mode < 3 && (
                <div className="ActionArea flex flex-col justify-start w-full h-screen"> 
                    <h3> Order List</h3>
                    <div className="OrderItems flex grow w-full h-5/6"></div>
                    <div className="OrderTotals flex h-min">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Subtotal:</td>
                                    <td>$0.00</td>
                                </tr>
                                <tr>
                                    <td>Tax:</td>
                                    <td>$0.00</td>
                                </tr>
                                <tr>
                                    <td>Tip:</td>
                                    <td>$0.00</td>
                                </tr>
                                <tr>
                                    <td>Total:</td>
                                    <td>$0.00</td>
                                </tr>
                                </tbody>
                        </table>
                    </div>
                    <div className="OrderButtons flex relative bottom-0 justify-center w-full">
                        <button className='bg-yellow-500 text-blue-900 justify-center text-lg p-5 w-full drop-shadow-2xl rounded' onClick={() => submitOrder()}>Complete Order</button>
                    </div>
                </div>
            )}
            {mode === 3 && ( 
                <div className="ActionArea flex flex-col justify-start w-full h-full"> 
                    <h3> Edit Console </h3>
                    <ListButtons mode={mode} res={data}/>
                </div>)}
        </div>
    )
}
