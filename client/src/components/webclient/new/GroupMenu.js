import React from 'react';

// Creates the group menu from json data
export default function GroupMenu({ 
    res,
    activeTab, 
    setActiveTab
}) {

const items = [];

for (let item in res) {
    items.push(<button 
                    key={res[item].group.name}
                    className={activeTab === res[item].group.name ? 'bg-neutral-300 uppercase whitespace-nowrap py-3 px-5 mr-0.5 w-fit h-fit rounded-t-xl active' : 'bg-neutral-400 px-2 py-3 px-5 mr-0.5 rounded-t-xl w-fit h-fit whitespace-nowrap uppercase'}
                    onClick={() => setActiveTab(res[item].group.name)}>
                    {res[item].group.name}
                </button>);
}

return (
    <div className="flex text-sm place-items-end font-bold">
        {items}
    </div>
)
}