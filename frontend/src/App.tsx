import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import ListOfProperties from './ListOfProperties/ListOfProperties';
import PropertyDetailsPage from './PropertyDetailsPage/PropertyDetailsPage';

function App() {
  return (
    <div className="App">
      <Router>
        <ListOfProperties path="/"/>
        {/* Someone is trying to modify existing property */}
        <PropertyDetailsPage path="/properties/:propertyId" />
        {/* Someone is trying to add a new property to a list */}
        <PropertyDetailsPage path="/properties/new" /> 
      </Router>
    </div>  
  );
}

export default App;
