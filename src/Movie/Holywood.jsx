import React from 'react';
import { Container } from 'react-bootstrap';
import Card from './navbar/MovieCard';
import Caraousel from './Caraousel';

const api_key = "d8d56359455a8c1f58621b1cc4c24eef"




function Holywood() {



  return (
    <div >

<Caraousel type={`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&&with_original_language=en&with_keywords=hindi`} />
      <Container fluid className='px-5'>
        
      <Card apiUrl={{url:`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=3`, head:"Popular"}} />
      <Card apiUrl={{url:`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`, head:"Upcoming"}} />
        <Card apiUrl={{url:`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=27`, head:"Horror"}} />  
        <Card apiUrl={{url:`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US`, head:"Top Rated"}} />  
      </Container>

    </div>
  )
}

export default Holywood