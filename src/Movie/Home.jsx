import React from 'react';
import { Container } from 'react-bootstrap';
import Card from './navbar/MovieCard';
import Caraousel from './Caraousel';

const api_key = "d8d56359455a8c1f58621b1cc4c24eef"




function Home() {



  return (
    <div >

      <Caraousel typeApi={`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&&with_original_language=en&with_keywords=hindi`} />
      <Container fluid className='px-5'>
        
      <Card apiUrl={{url:"https://api.themoviedb.org/3/movie/upcoming?api_key=d8d56359455a8c1f58621b1cc4c24eef&page=3", head:"Hindi"}} />
      <Card apiUrl={{url:"https://api.themoviedb.org/3/movie/popular?api_key=d8d56359455a8c1f58621b1cc4c24eef", head:"english"}} />
        <Card apiUrl={{url:"https://api.themoviedb.org/3/discover/tv?api_key=d8d56359455a8c1f58621b1cc4c24eef", head:"Hindi"}} />  
      </Container>

    </div>
  )
}

export default Home