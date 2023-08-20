import React, { useState, useEffect } from 'react';
import { Button, Carousel, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiKey = "d8d56359455a8c1f58621b1cc4c24eef";
const mUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&&with_original_language=en&with_keywords=hindi`;
const gUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
function Caraousel({type}) {

  const [deta, setData] = useState([]);
  const [gen, setGener] = useState([]);
  const [genIDs, setID] = useState([]);
  const [expanded, setExpanded] = useState(false);

  console.log(genIDs)


  const getMovieData = async () => {
    try {
      const datas = await axios.get(type);
      const resultedData = datas.data.results;
      setData(resultedData);


    } catch (error) {
      console.log(error)
    }
  }



  const getGeners = async () => {
    try {
      const gdatas = await axios.get(gUrl);
      const generData = gdatas.data.genres;
      setGener(generData);


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovieData();
    getGeners();
  }, [])

  // read more
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };


  return (
    <header className=' w-full top-0 relative z-0'>
      <Carousel fade className=''>
        {
          deta.map((movie) => (
            <Carousel.Item className='max-h-[100vh] h-[100vh] '>
              <div className="gradient-overlay"></div>
              <img
                className="h-screen object-cover w-full image"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt="First slide"
              />

              <Carousel.Caption className='w-full !left-0 anim2' >
                <Container className='text-left '>
                  <div className='max-w-xl' >
                    <h1 className='me-auto'>{movie.title}</h1>
                    <p className='text-yellow-600 flex' >{movie.original_language}

                    </p>
                    <p id='rating' >{movie.vote_average}
                      <FontAwesomeIcon icon={faStar} /><span className='bg-yellow-400 text-black font-black p-1 rounded-lg mx-3' >IMDb</span></p>
                    <p>{movie.status}</p>
                    <p> {expanded ? movie.overview : `${movie.overview.slice(0, 200)}...`}
                      <button className='backdrop-blur-sm bg-white/10 rounded-md' onClick={toggleExpanded}>
                        {expanded ? 'Read Less' : 'Read More'}
                      </button></p>
                    <p>{movie.release_date}</p>
                  </div>
                  <div className='grid gap-2 grid-cols-3 mb-3 max-w-xl'>
                    <Link to={`/movie/${movie.id}`}>
                      <button className='button'>
                        More Info
                      </button>
                    </Link>


                  </div>

                </Container>

              </Carousel.Caption>
            </Carousel.Item>
          ))
        }
      </Carousel>

    </header>
  )
}

export default Caraousel