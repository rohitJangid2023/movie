import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
  import "./App.css";
  
import TopNav from './Movie/navbar/TopNav';
import Home from './Movie/Home';
import Footer from './footer/Footer';

import Movie from './Movie/Movie';

import Icon from './Icon';
import Card from './Movie/Card/Card';
import Tv from './Movie/Tv';
import South from './Movie/South';
import Holywood from './Movie/Holywood';
import Bolywood from './Movie/Bolywood';

function App() 


{
  return (
    <BrowserRouter>
   <TopNav/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/footer" element={<Footer/>}></Route>
        <Route path="/icon" element={<Icon/>}></Route>
        <Route path="/card" element={<Card/>}></Route>

        
        <Route path="/tv" element={<Tv/>}></Route>
        <Route path="/south_indian_movies" element={<South/>}></Route>
        <Route path="/holywood" element={<Holywood/>}></Route>
        <Route path="/bolywood" element={<Bolywood/>}></Route>
        


      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App