// GridContainer.js
import React, { useState } from 'react';
import { useMode } from './ModeContext';
import DraggableButton from './ProductButton'; // Adjust the import path

const GridButton = ({ button }) => (
  <button style={{ gridColumn: button.x, gridRow: button.y }}>
    {button.name}
  </button>
);

const GridGroup = ({ group, selectedSubgroup, onSelectSubgroup, mode }) => {
  const [draggedButton, setDraggedButton] = useState(null);

  const handleDragStart = (button) => {
    setDraggedButton(button);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (mode === 3 && draggedButton) {
      const newX = e.nativeEvent.offsetX;
      const newY = e.nativeEvent.offsetY;

      // Calculate the grid coordinates based on the drop position
      const gridColumn = Math.floor(newX / 100); // Assuming each column is 100px wide
      const gridRow = Math.floor(newY / 100); // Assuming each row is 100px tall

      // Update the button coordinates
      const updatedButton = {
        ...draggedButton,
        x: gridColumn,
        y: gridRow,
      };

      // Save the updated button or send it to the API
      console.log('Saving new button layout:', updatedButton);
    }

    setDraggedButton(null);
  };

  return (
    <div className={`grid-group ${mode === 3 ? 'draggable' : ''}`} onDragOver={handleDragOver} onDrop={handleDrop}>
      {group?.buttons.map((button) => (
        <GridButton key={button.id} button={button} />
      ))}
      {group?.subgroups && (
        <div className="subgroup-tabs">
          {group?.subgroups.map((subgroup) => (
            <button
              key={subgroup.group?.id}
              className={selectedSubgroup === subgroup?.group.id ? 'active' : ''}
              onClick={() => onSelectSubgroup(subgroup?.group.id)}
            >
              {subgroup.group.name}
            </button>
          ))}
        </div>
      )}
      {mode === 3 && (
        <div className="draggable-buttons">
          {group.buttons.map((button) => (
            <DraggableButton key={button.id} button={button} onDragStart={() => handleDragStart(button)} />
          ))}
        </div>
      )}
    </div>
  );
};

const GridContainer = ({ data }) => {
  const [selectedGroup, setSelectedGroup] = useState(data[0]?.group?.id);
  const [selectedSubgroup, setSelectedSubgroup] = useState('');
  const { mode } = useMode();
  
  const group = data.find((item) => item.group?.id === selectedGroup);
  const subgroup = group.subgroups ? group.subgroups.find((subgroup) => subgroup.group.id === selectedSubgroup) : null;

  const handleSelectGroup = (groupId) => {
    setSelectedGroup(groupId);
    setSelectedSubgroup('');
  };

  const handleSelectSubgroup = (subgroupId) => {
    setSelectedSubgroup(subgroupId);
  };

  return (
    <div className="grid-container">
      <div className="group-tabs">
        {data.map((item) => (
          <button
            key={item.group?.id}
            className={selectedGroup === item.group?.id ? 'active' : ''}
            onClick={() => handleSelectGroup(item.group?.id)}
          >
            {item.group?.name}
          </button>
        ))}
      </div>
      {group && (
        <GridGroup
            group={selectedSubgroup ? subgroup?.group : group?.group}
            selectedSubgroup={selectedSubgroup}
            onSelectSubgroup={handleSelectSubgroup}
            mode={mode}
        />
      )}
    </div>
  );
};

export default GridContainer;
