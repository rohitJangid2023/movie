import React, { useState, useEffect } from 'react';
import './Style.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3
    }
};


function MovieCard({ apiUrl, catagory }) {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(apiUrl.url);
            const response = res.data.results;
            setData(response)
        } catch (error) {
            console.error('Error fetching data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const scroll = () => {
        window.scrollY({ top: 0 })
    }


    return (

        <div className='my-2' id='card' >
            <h5 className='mt-5 text-white uppercase ' >{apiUrl.head}</h5>
            <hr className='red' />
            <Carousel responsive={responsive} >
                {
                    data.map((item, i) => {
                        return (<>
                            <Link onClick={scroll} key={i} to={`/${!catagory ? item.media_type : catagory}/${item.id}`}>
                                <div className="mx-1 text-white rounded hover hover-2">
                                    <img src={`https://image.tmdb.org/t/p/original${item.poster_path}` } alt="" />
                                    <div className="hover-overlay"></div>
                                    <div className="px-5 py-4 hover-2-content">
                                        <p className="mb-0 hover-2-description text-uppercase">{!item.title ? item.name : item.title} <br /> {Math.round(item.vote_average)}&#9733;</p>
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