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
                    className={activeTab === res[item].group.name ? 'active' : ''}
                    onClick={() => setActiveTab(res[item].group.name)}>
                    {res[item].group.name}
                </button>);
}

return (
    <div className="GroupMenu flex justify-center">
        {items}
    </div>
)
}