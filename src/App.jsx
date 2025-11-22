import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/Pages/Home.jsx';
import EditPage from '../src/Pages/EditPage.jsx';
import NavBar from '../src/components/Layout/NavBar.jsx';
import { useState } from 'react'
import RecetteDetailPage from '../src/Pages/RecetteDetailPage.jsx';


function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (

    <Router>
      <NavBar  searchTerm ={searchTerm} setSearchTerm ={setSearchTerm} setActiveCategory={setActiveCategory} />

      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>}/>
         <Route path="/add" element={<EditPage />}/>
        <Route path='/:id' element={<RecetteDetailPage />}/>

      </Routes>
    </Router>



  
  )
}
export default App;