import React, { useEffect } from 'react';
import { ItemTypes } from './Constants';
import { useDrag } from 'react-dnd';

export default function DButton( props ) {
    const currentMode = props.mode;
    const item = props;
    const id = props.id;
    const fill = props.fill;
    const name = props.text;
    const group = props.group;
    const price = props.price;
    const x = props.posX;
    const y = props.posY;
    const clickFunct = props.funct;

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.BUTTON,
        item: {item},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    useEffect(() => {
    }, [currentMode]);

    return (
        <button key={props.id} className='DButton bg-slate-400 border-gray-800 border-2 m-auto flex justify-center text-center align-middle' 
            ref={currentMode === 3 ? drag : null}
            style={{
                background: fill,
                opacity: isDragging ? 0.5 : 1,
                cursor: currentMode === 3 ? 'move' : '',
            }}
            onClick={() => clickFunct(props)}    
            >
            { name }
        </button>
    )
}