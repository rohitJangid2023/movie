import React, { useState, useEffect } from 'react';
import './Style.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

const totalPages = 3


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items:3    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3
    }
};


function MovieCard({ apiUrl }) {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const fetchPromises = [];
            for (let page = 1; page <= totalPages; page++) {
                fetchPromises.push(fetch(`${apiUrl.url}&page=${page}`));
            }
            const responses = await Promise.all(fetchPromises);
            const jsonData = await Promise.all(responses.map((response) => response.json()));
            const accumulatedData = jsonData.reduce((acc, curr) => acc.concat(curr.results), []);
            setData(accumulatedData);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        fetchData();
    });
    
    const scroll = () => {
          window.scrollY({top: 0})
    }
    return (

        <div className='my-2' id='card' >
            <h5 className='text-white mt-5 uppercase ' >{apiUrl.head}</h5>
            <hr className='red' />
            <Carousel responsive={responsive} >
                {
                    data.map((item, i) => {
                        return (<>
                            <Link onClick={scroll} key={i} to={`/movie/${item.id}`}>
                                <div  className="hover hover-2 text-white rounded mx-1">
                                    <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
                                    <div className="hover-overlay"></div>
                                    <div className="hover-2-content px-5 py-4">
                                        <p className="hover-2-description text-uppercase mb-0">{!item.title ? item.name : item.title }<br /> {item.vote_average}&#9733;</p>
                                    </div>
                                </div>
                            </Link>
                        </>

                        )
                    })
                }

            </Carousel>
        </div>
    )
}

export default MovieCard