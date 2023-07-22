import React from 'react';
import { Container } from 'react-bootstrap';
import Card from './navbar/MovieCard';
import { useParams } from 'react-router-dom';





function Tn() {

const {type} = useParams()

console.log(type)
  return (
    <div >

      <Container fluid className='px-5'>
        
      <Card apiUrl={{url:"https://api.themoviedb.org/3/movie/upcoming?api_key=d8d56359455a8c1f58621b1cc4c24eef&page=3", head:"Hindi"}} />
      <Card apiUrl={{url:"https://api.themoviedb.org/3/movie/popular?api_key=d8d56359455a8c1f58621b1cc4c24eef", head:"english"}} />
        <Card apiUrl={{url:"https://api.themoviedb.org/3/discover/tv?api_key=d8d56359455a8c1f58621b1cc4c24eef", head:"Hindi"}} />  
      </Container>

    </div>
  )
}

export default Tn