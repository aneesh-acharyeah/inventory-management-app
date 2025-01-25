import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import React from 'react';
import InventoryApp from './components/InventoryApp';

function App() {
  return (
    <div className="App">
        <React.StrictMode>
          <InventoryApp/>
        </React.StrictMode>
    </div>
  );
}

export default App;
