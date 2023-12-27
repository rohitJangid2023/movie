import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Container } from 'react-bootstrap';
import './Search.css'
import { Link } from 'react-router-dom';
import icon from '../../Assets/img/iconMovie.png'
import axios from 'axios';





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


  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== '') {
      fetchSuggestions(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`)
      const data = res.data.results;
      if (data.length > 0) {
        setSuggestions(data.slice(0, 5));
      } else if (data.length < 0) {
        setSuggestions("No Movie or show match")
      }
    } catch (error) {
      console.log("Please Try after some time")
    }
  };

  const renderSuggestions = () => {
    if (suggestions.length > 0) {
      return (

        suggestions.map((item, i) => {
          return (
            <Link className='block text-white' key={i} to={`/${item.media_type}/${item.id || item.show_id}`}>{item.title || item.name} </Link>

          )
        })

      );
    }
    else {
      return null
    }

  };

  return (
    <>

      <>
        <nav className={`mb-3 !bg-black red block position-fixed top-0 w-full z-50 py-2 ${!scrolled && "bg-transparent !shadow-none"}`}>

          <Container className='flex items-center justify-between' >

            <div className='flex items-center'>

              <Link className='' to={'/'} >
                <Navbar.Brand className="cursor-pointer red" >
                  <img className='w-10 h-10' src={icon} alt="" />
                </Navbar.Brand>
              </Link>

              <Link onClick={setTimeout({}, 100)} className='hidden px-2 font-semibold text-red-600 rounded-md sm:block lg:block 2xl:block md:block xl:block ms-3 hover:bg-red-600 hover:text-black' to={'/tv'} >TV Shows</Link>
              <Link onClick={setTimeout({}, 100)} className='hidden px-2 font-semibold text-red-600 rounded-md sm:block lg:block 2xl:block md:block xl:blockpx-2 ms-3 hover:bg-red-600 hover:text-black' to={'/movie'} >Movies</Link>

            </div>


            <div>
              <form id='movieSearch' className='relative' >
                <div>
                  <input type="search"
                    value={query}
                    placeholder='Search Movie and shows....'
                    onChange={handleInputChange}
                    className='px-2 text-white bg-gradient-to-r from-red-600 to-transparent bg-transparent rounded-sm
                w-[20rem] max-w-[9.5rem] sm:max-w-[20rem] md:max-w-[20rem] xl:max-w-[20rem] 2xl:max-w-[20rem]'
                  />
                  <FontAwesomeIcon className='ms-2' icon={faMagnifyingGlass} />

                </div>

                <div className='absolute'>{renderSuggestions()}</div>
              </form>
            </div>
          </Container>
          <Container className='mt-3 sm:hidden lg:hidden 2xl:hidden md:hidden xl:hidden '>
            <Link onClick={setTimeout({}, 100)} className='px-2 font-semibold text-red-600 rounded-md hover:bg-red-600 hover:text-black' to={'/tv'} >TV Shows</Link>
            <Link onClick={setTimeout({}, 100)} className='px-2 font-semibold text-red-600 rounded-md ms-3 hover:bg-red-600 hover:text-black' to={'/'} >Movies</Link>

          </Container>

        </nav>

      </>

    </>
  )
}

export default TopNav