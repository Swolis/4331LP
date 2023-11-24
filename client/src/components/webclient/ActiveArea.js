import React, {useState} from 'react';
import Square from './Square';
import { ItemTypes } from './Constants';
import { useDrop } from 'react-dnd';
import DButton from './DButton';

// Test data
const res = [{group:{
                name:'test1',
                buttons: [{button:
                            {
                                id: "1",
                                name: "Recipe 1",
                                x: '0',
                                y: '0'
                            }}, 
                            {button:
                            {
                                id: "2",
                                name: "Recipe 2",
                                x: '4',
                                y: '4'
                            }}],
                subgroup: [{group:
                            {
                                name: 'modifier 1',
                                buttons: [
                                    {button:
                                    {
                                        id: "3",
                                        name: "Mod 1",
                                        x: '0',
                                        y: '0'
                                    }}, 
                                    {button:
                                    {
                                        id: "4",
                                        name: "Mod 2",
                                        x: '1',
                                        y: '0'
                                    }}]
                            }}]
                }
            },
            {group:{
                name:'test2',
                }
            },
            {group:{
                name:'test3',
                }
            }];

// Creates the group menu from json data
function GroupMenu({ 
        res,
        activeTab, 
        setActiveTab
    }) {
    
    const items = [];

    for (let item in res) {
        items.push(<button 
                        key={res[item].group.name}
                        className={activeTab === res[item].group.name ? 'active' : ''}
                        onClick={() => setActiveTab(res[item].group.name)}>
                        {res[item].group.name}
                    </button>);
    }
    
    return (
        <div className="GroupMenu flex flex-wrap justify-center">
            {items}
        </div>
    )
}

function renderButton(x, y, button) {
    if (x === button.x && y === button.y) {
        return <DButton color={button.color} text={button.name} posX={button.x} posY={button.y} />
    }
}

function GridSquare({x, y, children}) {
    const [{ isOver }, drop] = useDrop(
        () => ({
          accept: ItemTypes.BUTTON,
        //   drop: () => moveKnight(x, y),
          collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
          })
        }),
        [x, y]
      )

        return (
            <div
                ref={drop}
                style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                }}
                >
                <Square>{children}</Square>
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

// The active button console 
export default function ActiveArea({mode}) {
    const [activeTab, setActiveTab] = useState(res[0].group.name);
    const [activeSubTab, setActiveSubTab] = useState('');

    const { innerWidth: width, innerHeight: height } = window;

    var submenu = res.find(object => object.group.name === activeTab).group.subgroup;

    function changeActiveTab(newTab) {
        setActiveTab(newTab);
    }

    function changeActiveSubTab(newTab) {
        if (newTab == activeSubTab) {
            setActiveSubTab('');
        }
        else {
            setActiveSubTab(newTab);
        }
    }

    const grid = [];
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            grid.push(<GridSquare x={i} y={j}></GridSquare>);
        }
    }

    return (
        <div className='flex w-full justify-center'>
            {mode === 0 && <div></div>}
            {mode > 0 && (
                <div className='flex flex-col justify-normal'>
                    <div className="flex flex-row">
                        <GroupMenu res={res} activeTab={activeTab} setActiveTab={changeActiveTab} />
                    </div>
                    <div className='flex'>
                        <div className='ActiveArea flex flex-row flex-wrap w-full'>{grid}</div>       
                        <div className="SubMenu flex rotate-90 w-20 h-20">
                            <GroupMenu res={submenu} 
                                    activeTab={activeSubTab} 
                                    setActiveTab={changeActiveSubTab} />
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}
