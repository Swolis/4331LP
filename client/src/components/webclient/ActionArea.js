import React from 'react'
import DButton from './DButton'


const res = [{product:{
                name: 'test',
                color: 'grey',
                text: 'Test Product 1'
                }
            },
            {product:{
                name: 'test2',
                color: 'grey',
                text: 'Test Product 2'
                }
            },
            {product:{
                name: 'test2',
                color: 'grey',
                text: 'Test Product 3'
                }
            },
            {product:{
                name: 'test2',
                color: 'grey',
                text: 'Test Product 4'
                }
            }
        ]


function ListButtons ({res}) {
    const items = [];
    for (var item in res) {
        items.push(<DButton key={item} color={res[item].product.color} text={res[item].product.text} />);
    }
    
    return (
        <div className="flex flex-wrap justify-center">
            {items}
        </div>
    )
}

export default function ActionArea({mode}) {

    return (
        <div className="flex-initial justify-start w-5/12">
            {mode === 0 && <div></div>}
            {mode === 1 && (
                <div className="ActionArea flex flex-col justify-start w-full h-full"> 
                    <h3> Order List</h3>
                </div>)}
            {mode === 2 && ( 
                <div className="ActionArea flex flex-col justify-start w-full h-full"> 
                    <h3> Edit Console </h3>
                    <ListButtons res={res}/>
                </div>)}
        </div>
    )
}
