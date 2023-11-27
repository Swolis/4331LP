import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DButton from './DButton';
import GridSquare from './GridSquare';
import GroupMenu from './GroupMenu';
import sendRequest  from '../../handlers/requestHandler';
import useInputModal from './useInputModal';


//////////////////////////////////////////////////////
//
//
// The active button console 
export default function ActiveArea({mode, setMode, order, onAddItem, onAddModifier}) {
    const currentMode = mode;
    // State data for groups, subgroups, and buttons
    const [data, setData]=useState([]);

    useEffect(() => {
        
    }, [order])

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

    
    const [activeTab, setActiveTab] = useState('');
    const [activeSubTab, setActiveSubTab] = useState('');
    const [submenu, setActiveSubData] = useState([]);
    const [buttons, setButtons] = useState([]);
    const [status, setStatus] = useState(false);
    const [input, setInput] = useState('');
    const [button, setButton] = useState(null);
    const [dropTrigger, setDropTrigger] = useState(false);
    const [subTrigger, setSubTrigger] = useState(false);
    const [groupTrigger, setGroupTrigger] = useState(false);
    const [getUserInput, InputModal] = useInputModal('Enter label:', setInput);
    
    const navigate = useNavigate();

    const addToOrder = (item) => onAddItem(item);
    const modifyOrder = (item) => onAddModifier(item);

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
            let newButton = <DButton key={button.id} mode={button.mode} id={button.id} group={currentTab} price={button.price} fill={button.fill} text={button.text} posX={button.x} posY={button.y} funct={addToOrder}/>;
            return (newButton);
        } else {
            return (<DButton key={button.id} mode={button.mode} id={button.id} group={activeSubTab} price={button.price} fill={button.fill} text={button.text} posX={button.x} posY={button.y} funct={modifyOrder}/>);
        }
    }

    // Handles drag item drop
    const handleDrop = (mode,x,y,item) => {
        let newItem = {
            mode: item.item.mode,
            x: x,
            y: y,
            fill: item.item.fill,
            text: item.item.text,
            price: item.item.price,
            id: item.item.id,
        }
        setButton(newItem);
        setDropTrigger(true);
    }

    const addMenuItem = async () => {
        const status = await getUserInput();
        if (status) {
            setStatus(status);
            setGroupTrigger(true);
        } 
    }

    // Add sub menu
    const addSubMenuItem = async () => {
        const status = await getUserInput();
        if (status) {
            setStatus(status);
            setSubTrigger(true);
        } 
    }

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

    function test() {
        let request = data;
        let result = sendRequest(request, 'https://jsonplaceholder.typicode.com/posts');
        console.log(result);
    }

    const grid = [];
    let count = 0;
    let newButton = null;
    // Build droppable area grid
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 6; j++) {
            if (buttons.length) {
                for (let k = 0; k < buttons.length; k++) {
                    if (buttons[k].props.posX === i && buttons[k].props.posY === j && activeSubTab !== '' && buttons[k].props.group === activeSubTab) {
                        newButton = buttons[k];
                        break;
                    }
                    else if(buttons[k].props.posX === i && buttons[k].props.posY === j && buttons[k].props.group === activeTab) {
                        if (activeSubTab === ''){
                            newButton = buttons[k];
                            break;
                        }
                    }
                    else {
                        newButton = null;
                    }
                }
            }
            grid.push(<GridSquare key={count} group={activeTab} mode={mode} x={i} y={j} onDrop={handleDrop}>
                {newButton}
            </GridSquare>);
            count = count + 1;
        }
    }

    // Rerenders on drop adding a button
    useEffect(() => {
        if (button) {
            let newButton = renderButton(button);
            setButtons([...buttons, newButton]);
        }
        setDropTrigger(false);
    }, [dropTrigger,button]);
    
    useEffect(() => {

    }, [currentMode]);

    useEffect(() => {
        const newData = data;
        if (newData.length) {
            newData.find((object) => object.group.name === activeTab).group.subgroups = submenu;
        }
        setData(newData);
    }, [submenu])

    useEffect(() => {
        if(status && subTrigger) {
            setActiveSubData([...submenu, {group:{
                name:input,
            }}])
            setStatus(false);
            setSubTrigger(false);
        }
        else if(status && groupTrigger) {
            setData([...data, {group:{name: input}}])
            setStatus(false);
            setGroupTrigger(false);
        }
    }, [status,input,subTrigger, groupTrigger])
    
    useEffect(() => {
        if (!data.length) {
            getData();
        }
        if (data[0] !== undefined && "group" in data[0]) {
            changeActiveTab(data[0].group.name);
        }
    },[data]);


    return (
        <div className='flex w-full justify-center'>
            {mode === 0 && <div></div>}
            {mode > 0 && (
                <div className='flex flex-col justify-normal'>
                    <div className="flex flex-row">
                        <GroupMenu res={data} activeTab={activeTab} setActiveTab={changeActiveTab} />
                        {mode === 3 && (
                            <button className='bg-yellow-500 text-blue-900  text-lg font-bold justify-center pl-4 pr-4 ml-1 drop-shadow-2xl rounded' onClick={() => addMenuItem()}>+</button>
                        )}
                    </div>
                    <div className='flex'>
                        <div className='ActiveArea flex flex-row flex-wrap w-full'>{grid}</div>       
                        <div className="SubMenu flex rotate-90 w-16 h-16">
                            <GroupMenu res={submenu} 
                                    activeTab={activeSubTab} 
                                    setActiveTab={changeActiveSubTab} />
                            {mode === 3 && (
                                <button className='bg-yellow-500 text-blue-900  text-lg font-bold justify-center p-5 ml-1 drop-shadow-2xl rounded-lg' onClick={() => addSubMenuItem()}>+</button>
                            )}
                        </div>
                    </div>
                    <div className='flex '>
                            <button className='bg-yellow-500 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                            text-sm px-6 py-3 h-20 mr-2 mt-2 rounded shadow 
                                            hover:shadow-lg outline-none 
                                            focus:outline-none 
                                            ease-linear transition-all duration-150' onClick={() => setMode(0)}>Change User</button>
                    {mode === 2 && (
                        <div className='flex'>
                            <button className='bg-yellow-500 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                            text-sm px-6 py-3 h-20 mr-2 mt-2 rounded shadow 
                                            hover:shadow-lg outline-none 
                                            focus:outline-none 
                                            ease-linear transition-all duration-150' onClick={() => setMode(3)}>Edit</button>
                            <button className='bg-yellow-500 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                            text-sm px-6 py-3 h-20 mr-2 mt-2 rounded shadow 
                                            hover:shadow-lg outline-none 
                                            focus:outline-none 
                                            ease-linear transition-all duration-150' onClick={() => navigate('/clientDashboard')}>Settings</button>
                        </div>
                    )}
                    {mode === 3 && (
                        <div className='flex'>
                            <button className='bg-yellow-500 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                            text-sm px-6 py-3 h-20 mr-2 mt-2 rounded shadow 
                                            hover:shadow-lg outline-none 
                                            focus:outline-none 
                                            ease-linear transition-all duration-150' onClick={() => saveLayout()}>Save</button>
                            <button className='bg-yellow-500 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                            text-sm px-6 py-3 h-20 mr-2 mt-2 rounded shadow 
                                            hover:shadow-lg outline-none 
                                            focus:outline-none 
                                            ease-linear transition-all duration-150' onClick={() => setMode(2)}>Finish</button>
                            <button className='bg-yellow-500 text-slate-900 active:bg-amber-600 font-bold uppercase 
                                            text-sm px-6 py-3 h-20 mr-2 mt-2 rounded shadow 
                                            hover:shadow-lg outline-none 
                                            focus:outline-none 
                                            ease-linear transition-all duration-150' onClick={() => test()}>test</button>
                        </div>
                    )}
                    </div>
                </div>
            )}
            <InputModal active={true}/>
        </div>
    )
}
