import React from 'react';
import { Container } from 'react-bootstrap';
import Card from './navbar/MovieCard';
import Caraousel from './Caraousel';

const api_key = "d8d56359455a8c1f58621b1cc4c24eef"




function South() {



  return (
    <div >

      <Caraousel typeApi={`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=South Indian Movie`} />
      <Container fluid className='px-5'>
        
      <Card apiUrl={{url:`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&page=3`, head:"Hindi"}} />
      <Card apiUrl={{url:`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`, head:"english"}} />
        <Card apiUrl={{url:`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}`, head:"Hindi"}} />  
      </Container>

    </div>
  )
}

export default South