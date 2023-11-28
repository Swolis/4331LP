import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DraggableButton from './DraggableButton';
import GridSquare from './GridSquare';
import GroupMenu from './GroupMenu';
import GridContainer from './GridContainer';
import { useMode } from './ModeContext';
import { useOrderState, useOrderDispatch } from './OrderContext';
import sendRequest  from '../../../handlers/requestHandler';
import useInputModal from './useInputModal';


//////////////////////////////////////////////////////
//
//
// The active button console 
export default function ActiveArea() {

    const orderState = useOrderState();
    const orderDispatch = useOrderDispatch();
    const { mode, toggleMode } = useMode();

    useEffect(() => {
        console.log(mode);
    }, [])

    // State data for groups, subgroups, and buttons
    const [data, setData]=useState([]);

    // Get groups data
    const getData = () => {
        fetch('./tests/groups.json',
        {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response){
            return response.json();
        })
        .then(function(myJson){
            setData(myJson);
        })
    }
    console.log(mode);
    
    const [activeTab, setActiveTab] = useState('');
    const [activeSubTab, setActiveSubTab] = useState('');
    const [submenu, setActiveSubData] = useState([]);
    const [buttons, setButtons] = useState([]);
 //////////////////////////////////////////////////////////////////////////////////////
    const [status, setStatus] = useState(false);
    const [input, setInput] = useState('');
    const [button, setButton] = useState(null);
    const [dropTrigger, setDropTrigger] = useState(false);
    const [subTrigger, setSubTrigger] = useState(false);
    const [groupTrigger, setGroupTrigger] = useState(false);
    const [getUserInput, InputModal] = useInputModal('Enter label:', setInput);
  //////////////////////////////////////////////////////////////////////////////////////   
    const navigate = useNavigate();


    // Changes the Active tab and loads any modifier tabs
    function changeActiveTab(newTab) {
        // Set active tab
        setActiveTab(newTab);
        // Disable prev tab subtab if enabled
        changeActiveSubTab(activeSubTab);

        let activeGroup = null;

        if (data[0]) {
            activeGroup = data.find(object => object.group.name === newTab).group;
        }

        if (activeGroup !== null && "subgroups" in activeGroup) {
            setActiveSubData(activeGroup.subgroups);
        }
        else {
            setActiveSubData([]);
        }
    }

    // Changes the active modifier tab or deactivates the modifier
    function changeActiveSubTab(newTab) {
        if (newTab === activeSubTab) {
            setActiveSubTab('');
        }
        else {
            setActiveSubTab(newTab);
        }
    }

    function renderButton(button) {
        let currentTab = activeTab;
        if (activeSubTab === '') {
            let newButton = <DraggableButton key={button.id} mode={button.mode} id={button.id} group={currentTab} price={button.price} fill={button.fill} text={button.text} posX={button.x} posY={button.y}/>;
            return (newButton);
        } else {
            return (<DraggableButton key={button.id} mode={button.mode} id={button.id} group={activeSubTab} price={button.price} fill={button.fill} text={button.text} posX={button.x} posY={button.y}/>);
        }
    }

    // Handles drag item drop
    const handleDrop = (mode,x,y,item) => {
        console.log(item);
        let newItem = {
            mode: mode,
            x: x,
            y: y,
            text: item.text,
            price: item.price,
            id: item.id,
        }
        setButton(newItem);
        setDropTrigger(true);
    }

    // const addMenuItem = async () => {
    //     const status = await getUserInput();
    //     if (status) {
    //         setStatus(status);
    //         setGroupTrigger(true);
    //     } 
    // }

    // // Add sub menu
    // const addSubMenuItem = async () => {
    //     const status = await getUserInput();
    //     if (status) {
    //         setStatus(status);
    //         setSubTrigger(true);
    //     } 
    // }

    // Save layout
    function saveLayout() {
        let newData = data;
        let newButtons = [];
        for (let i = 0; i < buttons.length; i++) {
            newButtons.push({button:{
                id: buttons[i].props.id,
                group: activeTab,
                name: buttons[i].props.text,
                fill: buttons[i].props.fill,
                x: buttons[i].props.posX,
                y: buttons[i].props.posY,
                price: buttons[i].props.price
                }
            })
        }
        newData.find(object => object.group.name === activeTab).group.buttons = newButtons;
    }

    // function test() {
    //     let request = data;
    //     let result = sendRequest(request, 'https://jsonplaceholder.typicode.com/posts');
    //     console.log(result);
    // }
    console.log(mode);
    const grid = [];
    let count = 0;

    // Build droppable area grid
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 6; j++) {
            let newButton = null;

            if (buttons.length) {
                for (let k = 0; k < buttons.length; k++) {
                    if (
                        buttons[k].props.posX === i &&
                        buttons[k].props.posY === j &&
                        activeSubTab !== '' &&
                        buttons[k].props.group === activeSubTab
                    ) {
                        newButton = buttons[k];
                        break;
                    } else if (
                        buttons[k].props.posX === i &&
                        buttons[k].props.posY === j &&
                        buttons[k].props.group === activeTab
                    ) {
                        if (activeSubTab === '') {
                            newButton = buttons[k];
                            break;
                        }
                    } else {
                        newButton = null;
                    }
            }
        }

        grid.push(
            <GridSquare key={count} group={activeTab} mode={mode} x={i} y={j} onDrop={handleDrop}>
                {newButton}
            </GridSquare>
        );

        count = count + 1;
        }
    }

    useEffect (() => {
        getData();
    }, []);


    return (
        <div className='flex w-full justify-center'>
            {mode === 0 && <></>}
            
                <div className='flex flex-col justify-normal'>
                    <div className="flex flex-row">
                        <GroupMenu res={data} activeTab={activeTab} setActiveTab={changeActiveTab} />
                        {mode === 3 && (
                            <button className='bg-yellow-400 text-blue-900  text-lg font-bold justify-center pl-4 pr-4 ml-1 drop-shadow-2xl rounded' >+</button>
                        )}
                    </div>
                    <div className='flex'>
                        <div className='ActiveArea flex flex-row flex-wrap overflow-y-hidden -w-full'>{grid}</div>       
                        <div className="flex rotate-90 place-items-end w-12 h-12">
                            <GroupMenu res={submenu} 
                                    activeTab={activeSubTab} 
                                    setActiveTab={changeActiveSubTab} />
                            {mode === 3 && (
                                <div className="flex place-items-end w-12 h-12">
                                    <button className='bg-yellow-400 text-blue-900 text-lg font-bold place-items-end px-4 h-10 ml-1 drop-shadow-2xl rounded-lg' >+</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex '>
                            <button className='bg-yellow-400 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                            text-sm px-6 py-3 h-20 mr-2 mt-2 rounded shadow 
                                            hover:shadow-lg outline-none 
                                            focus:outline-none 
                                            ease-linear transition-all duration-150' onClick={() => toggleMode(0)}>Change User</button>
                    {mode === 2 && (
                        <div className='flex'>
                            <button className='bg-yellow-400 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                            text-sm px-6 py-3 h-20 mr-2 mt-2 rounded shadow 
                                            hover:shadow-lg outline-none 
                                            focus:outline-none 
                                            ease-linear transition-all duration-150' onClick={() => toggleMode(3)}>Edit</button>
                            <button className='bg-yellow-400 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                            text-sm px-6 py-3 h-20 mr-2 mt-2 rounded shadow 
                                            hover:shadow-lg outline-none 
                                            focus:outline-none 
                                            ease-linear transition-all duration-150' onClick={() => navigate('/clientDashboard')}>Settings</button>
                        </div>
                    )}
                    {mode === 3 && (
                        <div className='flex'>
                            <button className='bg-yellow-400 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                            text-sm px-6 py-3 h-20 mr-2 mt-2 rounded shadow 
                                            hover:shadow-lg outline-none 
                                            focus:outline-none 
                                            ease-linear transition-all duration-150' onClick={() => saveLayout()}>Save</button>
                            <button className='bg-yellow-400 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                            text-sm px-6 py-3 h-20 mr-2 mt-2 rounded shadow 
                                            hover:shadow-lg outline-none 
                                            focus:outline-none 
                                            ease-linear transition-all duration-150' onClick={() => toggleMode(2)}>Finish</button>
                            <button className='bg-yellow-400 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                            text-sm px-6 py-3 h-20 mr-2 mt-2 rounded shadow 
                                            hover:shadow-lg outline-none 
                                            focus:outline-none 
                                            ease-linear transition-all duration-150' onClick={() => test()}>test</button>
                        </div>
                    )}
                    </div>
                </div>
 
            <InputModal active={true}/>
        </div>
    )
}
