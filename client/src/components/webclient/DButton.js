import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd';

export default function DButton({ color, text, posX, posY }) {
    const fill = color;
    const name = text;
    const x = posX;
    const y = posY;

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.BUTTON,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div className='DButton flex justify-center' 
            ref={drag}
            style={{
                background: fill,
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
        }}>
            { name }
        </div>
    )
}