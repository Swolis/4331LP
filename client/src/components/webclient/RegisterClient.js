import React, { useState } from 'react';
import ActiveArea from './ActiveArea';
import ActionArea from './ActionArea';
import PinPad from './PinPad';
import '../../styles/tailwind.css';
import '../../styles/webclient.css';
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default function RegisterClient() {
    const [mode, setMode] = useState(0);
    let backend = HTML5Backend;

    function changeMode(newMode) {
        setMode(newMode);
    }

    // if(window.matchMedia("(pointer: coarse)").matches) {
    //     backend = TouchBackend;
    // }

    return (
        <DndProvider backend={backend}>
            <div className='bg-slate-800 min-h-screen flex'>
                <PinPad mode={mode} setMode={changeMode}/>
                <ActionArea mode={mode}/>
                <ActiveArea mode={mode}/> 
            </div>
        </DndProvider>
    );
}

