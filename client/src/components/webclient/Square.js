import React from 'react'

export default function Square ({children}) {
    return (
        <div 
            className='flex flex-row'
            style={{ width:'100px', height:'100px'}}>
                {children}
        </div>
    )
}