// SearchComponent.js
import React, { useEffect, useState } from 'react';
import DraggableButton from './ProductButton'; // Assuming ProductButton.js is renamed

const SearchComponent = ({ onAddToOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    let searchResults = [];
    
    // Get groups data
    fetch('./tests/recipes.json',
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
        searchResults = myJson
    })


    // Display search results as draggable buttons
    const draggableButtons = searchResults.map((product) => (
      <DraggableButton key={product.id} product={product} onAddToOrder={onAddToOrder} />
    ));

    return (
      <div>
        <h2>Search Results</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{draggableButtons}</div>
      </div>
    );
  };

  useEffect(() => {
    handleSearch()
  }, [searchTerm])

  return (
    <div>
      <input className="mx-auto w-full rounded-xl border border-solid border-slate-300 shadow-inner p-1 px-4" placeholder="Search" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
};

export default SearchComponent;
