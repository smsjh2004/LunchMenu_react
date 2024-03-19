import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect }  from 'react';
import { MainPage } from './MainPage';
import { SimpleLunch_add } from './pages/SimpleLunch/SimpleLunch_add';
import { BestRestaurant } from './pages/BestRestaurant/BestRestaurant';
import { SimpleLunch } from './pages/SimpleLunch/SimpleLunch';
import { NearRestaurant } from './pages/NearRestaurant/NearRestaurant';
import { ChatBot } from './pages/ChatBot/ChatBot';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

function App() {
  
  	// 서버에서 받은 데이터를 console로 찍어서 확인한다.
    useEffect(() => {
      axios.get('/api/test')
        .then(console.log("123"))
    })  

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/Lunch" element={<MainPage />} />
          <Route path="/Lunch/SimpleLunch_add" element={< SimpleLunch_add />} />
          <Route path="/Lunch/BestRestaurant" element={<BestRestaurant />} />
          <Route path="/Lunch/SimpleLunch" element={<SimpleLunch />} />
          <Route path="/Lunch/NearRestaurant" element={<NearRestaurant />} />
          <Route path="/Lunch/ChatBot" element={<ChatBot />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
