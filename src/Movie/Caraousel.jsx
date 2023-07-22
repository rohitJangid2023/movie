import React, { useState, useEffect } from 'react';
import { Button, Carousel, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const apiKey =  "d8d56359455a8c1f58621b1cc4c24eef"
function Caraousel({typeApi}) {
    
  const [data, setData] = useState([]);
  const [genres, setGener] = useState([])
  const [expanded, setExpanded] = useState(false);

  console.log(data.genre_ids)

  
  const fetchData = async () => {
    try {
      const response = await fetch(typeApi);
      const jsonData = await response.json();
      setData(jsonData.results);

    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
 

  const getGeneres = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
      const jsonData = await response.json();
      setGener(jsonData.genres);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  // read more
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetchData();
    getGeneres();
    
  }, []);


  return (
    <header className=' w-full top-0 relative z-0'>
        <Carousel fade className=''>
          {
            data.map((movie) => (
              <Carousel.Item className='max-h-[100vh] h-[100vh] '>
                <div className="gradient-overlay"></div>
                <img
                  className="d-block w-100 max-h-[100vh] h-full image "
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt="First slide"
                />

                <Carousel.Caption className='w-full !left-0 anim2' >
                  <Container className='text-left '>
                    <div className='max-w-xl' >
                      <h1 className='me-auto'>{movie.title}</h1>
                      <p className='text-yellow-600 flex' >{movie.original_language} |
                        {movie.genre_ids.map((genreId) => {
                          const genre = genres.find((g) => g.id === genreId);
                          return <div className='mx-2' >{genre.name} </div>;
                        })}
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
                        <Button className='flex !rounded-md w-full min-w-fit !py-3 !text-lg !capitalize '>
                          More Info
                        </Button>
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