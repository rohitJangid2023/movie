import React, { useState, useEffect } from 'react';
import { Button, Carousel, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Caraousel({ apiUrl }) {

  const [deta, setData] = useState([]);
  const [expanded, setExpanded] = useState(true);

  const getMovieData = async () => {
    try {
      const datas = await axios.get(apiUrl);
      const resultedData = datas.data.results;
      setData(resultedData);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovieData();
  },[])


  // read more
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };


  return (
    <header className='relative top-0 z-0 w-full '>
      <Carousel fade className=''>
        {
          deta.map((movie) => (
            <Carousel.Item className='max-h-[100vh] h-[100vh] '>
              <div className="gradient-overlay"></div>
              <img
                className="object-cover w-full h-screen image"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt="First slide"
              />

              <Carousel.Caption className='w-full !left-0 anim2' >
                <Container className='text-left '>
                  <div className='max-w-xl' >
                    <h1 className='me-auto'>{!movie.title ? movie.name : movie.title }</h1>
                    <p className='flex text-yellow-600' >{movie.original_language + movie.media_type}

                    </p>
                    <p id='rating' >{Math.trunc(movie.vote_average)}
                      <FontAwesomeIcon icon={faStar} /><span className='p-1 mx-3 font-black text-black bg-yellow-400 rounded-lg' >IMDb</span></p>
                    <p>{movie.status}</p>
                    <p> {expanded ? `${movie.overview.slice(0, 200)}...` : movie.overview}
                      <button className='px-2 rounded-md backdrop-blur-sm bg-white/10 ms-2' onClick={toggleExpanded}>
                        {expanded ? 'Read More' : 'Read less'}
                      </button></p>
                    <p>{movie.release_date}</p>
                  </div>
                  <div className='grid max-w-xl grid-cols-3 gap-2 mb-3'>
                    <Link to={`/${movie.media_type}/${movie.id}`}>
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