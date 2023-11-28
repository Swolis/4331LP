import React from 'react';
import { ItemTypes } from './Constants';
import { useDrag } from 'react-dnd';

export default function DButton( props ) {
    const id = props.id;
    const fill = props.fill;
    const name = props.text;
    const clickFunct = props.funct;

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.BUTTON,
        item: {props},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <button key={id} className='DButton bg-neutral-400 border-neutral-900 text-gray-950 border p-3 mr-2 mt-2 flex content-center items-center justify-content-center text-center shadow-md align-middle' 
            ref={props.mode === 3 ? drag : null}
            style={{
                background: fill,
                opacity: isDragging ? 0.5 : 1,
                cursor: props.mode === 3 ? 'grab' : '',
            }}
            onClick={() => clickFunct(props)}    
            >
            { name }
        </button>
    )
}