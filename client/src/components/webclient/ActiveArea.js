import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DButton from './DButton';
import GridSquare from './GridSquare';
import GroupMenu from './GroupMenu';


function renderButton(mode, x, y, button) {
    console.log(button);
    return (<DButton mode={mode} id={button.id} fill={button.fill} text={button.text} posX={x} posY={y} funct={addToOrder}/>)
}

function addToOrder(item) {
    console.log(item);
    console.log(item.text);
    console.log(item.price);
}

// The active button console 
export default function ActiveArea({mode, setMode}) {
    const currentMode = mode;
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

    useEffect(() => {
        if (!data.length) {
            getData();
        }
        if (data[0] !== undefined && "group" in data[0]) {
            changeActiveTab(data[0].group.name);
        }
    },[data]);

    const [activeTab, setActiveTab] = useState('');
    const [activeSubTab, setActiveSubTab] = useState('');
    const [submenu, getActiveSubData] = useState([]);
    const [buttons, setButtons] = useState([]);

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
            getActiveSubData(activeGroup.subgroups);
        }
        else {
            getActiveSubData([]);
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

    // Handles drag item drop
    const handleDrop = (mode,x,y,item) => {
        const newButton = renderButton(mode,x,y,item.item);
        setButtons(buttons => [...buttons, newButton]);
    }

    const grid = [];
    let count = 0;
    let newButton = null;
    // Build droppable area grid
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 6; j++) {
            for (let k = 0; k < buttons.length; k++) {
                if (buttons[k].props.posX === i && buttons[k].props.posY === j) {
                    newButton = buttons[k];
                    break;
                }
                else {
                    newButton = null;
                }
            }
            grid.push(<GridSquare key={count} mode={mode} x={i} y={j} onDrop={handleDrop}>
                {newButton}
            </GridSquare>);
            count = count + 1;
        }
    }

    useEffect(() => {

    }, [buttons]);
    
    useEffect(() => {

    }, [currentMode]);

    function setEditMode(mode) {
        setMode(mode);
    }

    return (
        <div className='flex w-full justify-center'>
            {mode === 0 && <div></div>}
            {mode > 0 && (
                <div className='flex flex-col justify-normal'>
                    <div className="flex flex-row">
                        <GroupMenu res={data} activeTab={activeTab} setActiveTab={changeActiveTab} />
                    </div>
                    <div className='flex'>
                        <div className='ActiveArea flex flex-row flex-wrap w-full'>{grid}</div>       
                        <div className="SubMenu flex rotate-90 w-16 h-16">
                            <GroupMenu res={submenu} 
                                    activeTab={activeSubTab} 
                                    setActiveTab={changeActiveSubTab} />
                        </div>
                    </div>
                    <div className='flex '>
                            <button className='bg-yellow-500 text-blue-900  text-lg p-5 mt-10 mr-10 drop-shadow-2xl rounded' onClick={() => setEditMode(0)}>Change User</button>
                    {mode === 2 && (
                        <div className='flex'>
                            <button className='bg-yellow-500 text-blue-900 text-lg p-5 mt-10 mr-10 drop-shadow-2xl rounded' onClick={() => setEditMode(3)}>Edit</button>
                            <button className='bg-yellow-500 text-blue-900 text-lg p-5 mt-10 mr-10 drop-shadow-2xl rounded' onClick={() => navigate('/RecipePage')}>Add Recipe</button>
                            <button className='bg-yellow-500 text-blue-900 text-lg p-5 mt-10 mr-10 drop-shadow-2xl rounded' onClick={() => navigate('/ProductPage')}>Add Product</button>
                            <button className='bg-yellow-500 text-blue-900 text-lg p-5 mt-10 mr-10 drop-shadow-2xl rounded' onClick={() => navigate('/clientDashboard')}>Settings</button>
                        </div>
                    )}
                    {mode === 3 && (
                        <div className='flex'>
                            <button className='bg-yellow-500 text-blue-900 text-lg p-5 mt-10 mr-10 drop-shadow-2xl rounded' onClick={() => setEditMode(2)}>Save</button>
                        </div>
                    )}
                    </div>
                </div>
            )}
        </div>
    )
}
