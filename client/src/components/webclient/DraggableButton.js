import React from 'react';
import { useDrag } from 'react-dnd';
import { useMode } from './ModeContext';
import { ItemTypes } from './Constants';

export default function DraggableButton( props ) {
    const { id, fill, name, funct } = props;
    const { mode } = useMode(); 

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.BUTTON,
        item: {props},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    const handleClick = () => {
        if (funct) {
          funct(props);
        }
      };

    return (
        <button key={id} className='DButton bg-neutral-400 border-neutral-900 text-gray-950 border p-3 mr-2 mt-2 flex content-center items-center justify-content-center text-center shadow-md align-middle' 
            ref={mode === 3 ? drag : null}
            style={{
                background: fill,
                opacity: isDragging ? 0.5 : 1,
                cursor: mode === 3 ? 'grab' : '',
            }}
            onClick={handleClick}    
            >
            { name }
        </button>
    )
}