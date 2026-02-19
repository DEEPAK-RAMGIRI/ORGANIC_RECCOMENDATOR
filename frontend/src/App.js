import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Recommend from './components/Recommend'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommend" element={<Recommend />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;