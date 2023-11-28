import React, {useEffect} from 'react';
import { useDrop } from 'react-dnd';
import Square from './Square';
import { ItemTypes } from './Constants';

export default function GridSquare({mode, x, y, onDrop, children}) {
    const posX = x;
    const posY = y;
    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: ItemTypes.BUTTON,
        drop: (item) => {onDrop(mode,posX,posY,item.props)},
            collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
          })
        }));

    return (
        <div
            ref={drop}
            key={x+y}
            style={{
                position: 'relative',
                padding: '2px',
                width: '100px',
                height: '100px',
            }}
            >
            <Square>
                {children}
            </Square>
            {isOver && (
                <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                }}
                />
            )}
        </div>
    )
}