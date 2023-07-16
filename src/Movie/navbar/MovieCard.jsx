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
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


function MovieCard({ apiUrl }) {

    const [data, setData] = useState([])

    useEffect(() => {
        fetchData();
    },);

    const fetchData = async () => {
        try {
            for (let page = 1; page <= totalPages; page++){
                const response = await fetch(apiUrl.url);
                const jsonData = await response.json();
                setData(jsonData.results);
    
            }
           
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };
    const scroll = () => {
      
    }
    return (

        <div className='my-2' id='card' >
            <h5 className='text-white mt-5 uppercase ' >{apiUrl.head}</h5>
            <hr className='red' />
            <Carousel responsive={responsive} >
                {
                    data.map((item, i) => {
                        return (<>
                            <Link key={i} to={`/movie/${item.id}`}>
                                <div onClick={scroll} className="hover hover-2 text-white rounded mx-1"><img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
                                    <div className="hover-overlay"></div>
                                    <div className="hover-2-content px-5 py-4">
                                        <p className="hover-2-description text-uppercase mb-0">{item.title}b<br /> {item.vote_average}&#9733;</p>
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