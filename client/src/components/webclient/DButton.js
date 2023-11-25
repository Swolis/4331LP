import React, { useEffect } from 'react';
import { ItemTypes } from './Constants';
import { useDrag } from 'react-dnd';

export default function DButton( props ) {
    const currentMode = props.mode;
    const item = props;
    const id = props.id;
    const fill = props.fill;
    const name = props.text;
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
        console.log(currentMode);
    }, [currentMode]);

    return (
        <button className='DButton flex justify-center' 
            ref={props.mode === 3 ? drag : null}
            style={{
                background: fill,
                opacity: isDragging ? 0.5 : 1,
                cursor: props.mode === 3 ? 'move' : '',
            }}
            onClick={() => clickFunct(props)}    
            >
            { name }
        </button>
    )
}