import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/NavBar';
import Home from './components/Home';
import './App.css'
import Room from './components/Karaoke/Room/Room';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/karaoke" element={<Room/>}/>
      </Routes>
      
      </>

    </Router>
    
  )
}

export default App
