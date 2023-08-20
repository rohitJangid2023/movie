import React from 'react';
import Card from './navbar/MovieCard';
import Caraousel from './Caraousel';
import { Helmet } from 'react-helmet';

const api_key = "d8d56359455a8c1f58621b1cc4c24eef"




function Home() {

  return (
    <div >
      <Helmet>
        <title>{`Home`}</title>
      </Helmet>
      <Caraousel type={`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&&with_original_language=en&with_keywords=hindi`} />
      <div className='px-3'>

        <Card key="upcoming" apiUrl={{ url: "https://api.themoviedb.org/3/movie/upcoming?api_key=d8d56359455a8c1f58621b1cc4c24eef&page=3", head: "Upcoming" }} />
        <Card key="popular" apiUrl={{ url: "https://api.themoviedb.org/3/movie/popular?api_key=d8d56359455a8c1f58621b1cc4c24eef", head: "Popular" }} />
        <Card key="tv" apiUrl={{ url: "https://api.themoviedb.org/3/discover/tv?api_key=d8d56359455a8c1f58621b1cc4c24eef", head: " TV " }} />
      </div>

    </div>
  )
}

export default Home

