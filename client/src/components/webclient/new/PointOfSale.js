// PointOfSale.js
import React from 'react';
import { useMode } from './ModeContext';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import ActionArea from './ActionArea';
import ActiveArea from './ActiveArea';
import PinPad from './PinPad';

let jsonData = [{"group":{
    "id":"",
    "name":"",
    "buttons": [{"button": {}}],
    "subgroups": [{
        "group": {
        "id":"",
        "name":"",
        "buttons": [{"button": {}}],
        "subgroups": [],
    }}],
}}];

// Get data from API for Recipe/Products by search function
const getData = () => {
    fetch('./tests/recipes.json',
    {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(function(response){
        // console.log(response);
        return response.json();
    })
    .then(function(myJson){
        // console.log(myJson);

        jsonData = myJson;

    })
}

const PointOfSale = () => {

  const { mode, toggleMode } = useMode();

  let backend = HTML5Backend;

  React.useEffect(() => {
    getData();
    console.log(jsonData);
  }, [])

  React.useEffect(() => {
    getData();
  }, [mode]) 

  const handleChangeUser = () => {
    toggleMode(0); // Set mode back to 0 (disabled)
  };

  return (
    <DndProvider backend={backend}>
      <div className='bg-slate-800 min-h-screen flex flex-col'>
          {mode === 0 && (
            <PinPad />
          )} 
          { mode >= 1 && (
            <div>
              <div className='flex flex-row h-screen'>
                  <ActionArea />
                  <ActiveArea />
              </div>
            </div>
          )} 
      </div>
    </DndProvider>
  );
};

export default PointOfSale;
