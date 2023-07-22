import React, { Fragment, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import './Search.css'
import { Link } from 'react-router-dom';
import icon from '../../Assets/img/iconMovie.png'





const apiKey = "d8d56359455a8c1f58621b1cc4c24eef"


function TopNav() {


  // navbar scroll()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 50) {
        setScrolled(true)

      } else {
        setScrolled(false)
      }
    }
  })


  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [movieId, setMovieId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      searchMovie(query);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      fetchSuggestions(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = (query) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const movieSuggestions = data.results.slice(0, 5).map(movie => ({
            id: movie.id,
            title: movie.title
          }));
          setSuggestions(movieSuggestions);
        } else {
          setSuggestions([]);
        }
      })
      .catch(error => {
        console.log('Error:', error);
        setSuggestions([]);
      });
  };

  const searchMovie = (query) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const movieId = data.results[0].id;
          setMovieId(movieId);
        } else {
          setMovieId(null);
        }
        setSuggestions([]);
      })
      .catch(error => {
        console.log('Error:', error);
        setMovieId(null);
        setSuggestions([]);
      });
  };



  const renderSuggestions = () => {
    if (suggestions.length > 0) {
      return (
        <ul>
          {suggestions.map(movie => (
            <li>
              <Link className='text-white' key={movie.id} to={`/movie/${movie.id}`}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      );
    }
    else {
      return null
    }

  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg={scrolled ? "gray" : "transparent"} expand={expand} className={"mb-3 !bg-black red position-fixed top-0 w-full z-50"}>
          <Container >
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} >
              <FontAwesomeIcon className='red' icon={faBars} />
            </Navbar.Toggle>
            <Link className='me-auto' to={'/'} >
              <Navbar.Brand className=" red cursor-pointer" >
                <img className='h-10 w-10' src={icon} alt="" />
              </Navbar.Brand>
            </Link>
            <form id='movieSearch' className='relative' >
            <div>
              <input type="search"
                value={query}
                placeholder='Search Movie....'
                onChange={handleInputChange}
                className='px-2 text-white bg-gradient-to-r from-red-600 to-transparent bg-transparent rounded-sm
                w-[20rem] max-w-[9.5rem] sm:max-w-[20rem] md:max-w-[20rem] xl:max-w-[20rem] 2xl:max-w-[20rem]'
              />
            <FontAwesomeIcon className='ms-2' icon={faMagnifyingGlass} />

            </div>
             
              <div className='absolute ' >{renderSuggestions()}</div>
            </form>




            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              className="bg-black"

            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title >
                   
                  <Link to="/tv" className='block' >TV</Link>
              
                  <Link to="/bolywood" className='block' >Bolywood</Link>
                  <Link to="/holywood" className='block' >Holywood</Link>
                  <Link to="/south_indian_movies" className='block' >South Indian</Link>

                </Offcanvas.Title>
              </Offcanvas.Header>

            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}

export default TopNav