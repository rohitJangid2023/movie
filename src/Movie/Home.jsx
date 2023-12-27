import React from 'react';
import Card from './navbar/MovieCard';
import Caraousel from './Caraousel';
import { Helmet } from 'react-helmet';

const api_key = "d8d56359455a8c1f58621b1cc4c24eef"




function Home({type}) {

  return (
    <div >
      <Helmet>
        <title>{type || "all movies and shows"}</title>
      </Helmet>
      <Caraousel apiUrl={`https://api.themoviedb.org/3/trending/${type || "all"}/day?api_key=${api_key}`} />
      <div className='px-3'>

        <Card key="trnding" apiUrl={{ url: `https://api.themoviedb.org/3/trending/${type || "all"}/day?api_key=${api_key}`, head: "Trending Today" }} />
        <Card key="trnding" catagory={type} apiUrl={{ url: `https://api.themoviedb.org/3/trending/${type || "all"}/week?api_key=${api_key}`, head: "Trending in Weak" }} />
        <Card key="top_rated" catagory={type} apiUrl={{ url: `https://api.themoviedb.org/3/${type || "tv"}/top_rated?api_key=${api_key}`, head: `Top Rated ${type || "tv shows"}` }} />
        <Card key="popular" catagory={type} apiUrl={{ url: `https://api.themoviedb.org/3/${type || "movie"}/popular?api_key=${api_key}`, head: `Popular ${type || "movies"}` }} />
      </div>

    </div>
  )
}

export default Home

