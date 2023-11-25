import React, { useState } from 'react';
import ActiveArea from './ActiveArea';
import ActionArea from './ActionArea';
import PinPad from './PinPad';
import '../../styles/tailwind.css';
import '../../styles/webclient.css';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default function RegisterClient() {
    const [mode, setMode] = useState(0);
    let backend = HTML5Backend;

    function changeMode(newMode) {
        setMode(newMode);
    }

    return (
        
        <DndProvider backend={backend}>
            <div className='bg-slate-800 min-h-screen flex' style={{paddingTop: 'env(safe-area-inset-top)'}}>
                <PinPad mode={mode} setMode={changeMode}/>
                <ActionArea mode={mode}/>
                <ActiveArea mode={mode} setMode={changeMode}/> 
            </div>
        </DndProvider>
    );
}

