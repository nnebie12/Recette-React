import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router';
import Home from './Pages/Home.jsx';
import EditPage from './Pages/EditPage.jsx';
import NavBar from './components/Layout/NavBar.jsx';
import { useState } from 'react'

function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (

    <Router>
      <NavBar  searchTerm ={searchTerm} setSearchTerm ={setSearchTerm} setActiveCategory={setActiveCategory} />

      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>}/>
         <Route path="/add" element={<EditPage />}/>
      </Routes>
    </Router>



  
  )
}

export default App
