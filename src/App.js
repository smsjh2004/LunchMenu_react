import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './MainPage';
import { BestRestaurant } from './pages/BestRestaurant/BestRestaurant';
import { SimpleLunch } from './pages/SimpleLunch/SimpleLunch';
import { NearRestaurant } from './pages/NearRestaurant/NearRestaurant';
import { ChatBot } from './pages/ChatBot/ChatBot';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  console.log('개병신 신민성');
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/Lunch" element={<MainPage />} />
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
