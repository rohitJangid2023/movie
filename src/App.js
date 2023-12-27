import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import TopNav from "./Movie/navbar/TopNav";
import Home from "./Movie/Home";
import Footer from "./footer/Footer";
import Movie from "./Movie/Movie";
import Tv from "./Movie/Tv";
function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:catagory/:id" element={<Movie />} />
        <Route path="/:type" element={<Tv/>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
