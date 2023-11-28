import React from 'react'

export default function Square ({children}) {
    return (
        <div 
            className='flex flex-row'
            style={{ width:'96px', height:'96px'}}>
                {children}
        </div>
    )
}