import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Tabs, Tab } from 'react-bootstrap';
import MovieCard from './navbar/MovieCard';
import { Link, useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Helmet } from 'react-helmet';



const Download = [
    {
        movieID: "569094",
        link: "https://drive.google.com/uc?id=1NpyAgb5jSeAIi6mQ07qG80n6KuQYAUu3"
    },
    {
        movieID: "890771",
        link: "https://sdmoviespoint.rest/the-flash-2023-full-movie-download-free/"
    }
]


function Movie() {
    const { id } = useParams()

    const movieData = `https://api.themoviedb.org/3/movie/${id}?api_key=d8d56359455a8c1f58621b1cc4c24eef`;
    const url2 = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d8d56359455a8c1f58621b1cc4c24eef`;
    const castData = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=d8d56359455a8c1f58621b1cc4c24eef`


    const [movieDetail, setMovie] = useState([]);
    const [trailer, setTrailer] = useState([])
    const [cast, setCast] = useState([])
    const [expanded, setExpanded] = useState(true);

    console.log(trailer)
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }






    const fatchMovie = async () => {
        try {
            const response = await axios.get(movieData);
            const detas = response.data
            setMovie(detas);

        } catch (error) {
            console.error('Error fetching data', error);
        }
    };



    const MovieTrailer = async () => {
        try {
            const response = await axios.get(url2);

            const trailer = response.data.results.find(
                (video) => video.type === "Trailer" && video.site === 'YouTube'
            )
            setTrailer(trailer.key)

        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    // cast 
    const MovieCast = async () => {
        try {
            const response = await axios.get(castData);
            const detas = response.data.cast;
            setCast(detas)
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        fatchMovie();
        MovieTrailer();
        MovieCast();
    }, []);


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 6

        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        }
    };
    // read more
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };
    // Download link 
    const dowloadLink = Download.find(movie => movie.movieID === id)

    return (


        <div>
            <Helmet>
                <title>{`movie/${movieDetail.title}`}</title>
            </Helmet>
            <Card className='min-h-[100vh] max-h-screen bg-black relative ' >
                <Card.Img className='max-h-screen !rounded-none object-cover h-screen' src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`} />
                <div className='absolute top-0 left-0 w-full h-full opacity-100 bg-gradient-to-r from-black from-88% to-transparent' ></div>

                <Card.ImgOverlay className='!top-[unset] text-white max-w-1/2' >

                    <Container className="anim">

                        <Card.Title className='max-w-[80%]'>
                            <h1 >{movieDetail.title}</h1>
                            <h6>{movieDetail.tagline}</h6>
                        </Card.Title>
                        <Card.Body className='!px-0 '>
                            <pre className='text-yellow-600' >Orignal Language | {movieDetail.original_language} </pre>
                            <Card.Text className='max-w-2xl'>
                                <p> {expanded ? movieDetail.overview : `${movieDetail.overview.slice(0, 200)}`}
                                    <button className='backdrop-blur-sm bg-white/10 rounded-md' onClick={toggleExpanded}>
                                        {expanded ? 'Read Less' : 'Read More'}
                                    </button></p>
                            </Card.Text>
                            <pre className='backdrop-blur-sm text-white/70 rounded-md text-lg block w-fit' >IMDB {movieDetail.vote_average} 2h 22min 2023</pre>
                            <div className='flex space-x-4 text-sm underline font-bold sm:text-lg md:text-lg xl:text-lg 2xl:text-lg max-w-sm' >
                                {
                                    movieDetail.genres?.map((gener) => {

                                        return (
                                            <p key={gener.id} >{gener.name}</p>
                                        )
                                    })
                                }

                            </div>
                            <div>
                                <h5>Download Now </h5>
                                <div className='float-right'>


                                    <Link to={dowloadLink ? (dowloadLink.link) : ("")} >
                                        <Button className='bg-red-600 animate-bounce !rounded-full w-10 h-10 min-w-fit p-2 '>
                                            <FontAwesomeIcon icon={faDownload} />
                                        </Button>
                                    </Link>



                                </div>
                            </div>




                            <Modal className='' show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                                <Modal.Header closeButton>

                                </Modal.Header>
                                <Modal.Body>
                                    <iframe className='w-full h-full object-cover' src={`https://www.youtube.com/embed/${trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                                </Modal.Body>
                            </Modal>

                            <button variant="primary" onClick={() => setShow(true)} className='absolute top-28 left-[50%] red flex align-middle 2xl:left-[70%] xl:left-[70%] lg:left-[70%] sm:left-[70%]'>
                                <div className=''  >
                                    <svg id="Vector" className='h-20 w-20' width="150" height="150" viewBox="0 0 408 408" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filter0_d_2_8)">
                                            <path d="M151.25 63.4144L312.152 200.505L151.25 338.392V91H146.25V339.479C146.25 343.324 150.759 345.398 153.678 342.896L315.85 203.921C317.949 202.122 317.945 198.872 315.84 197.079L153.668 58.9062C150.747 56.4169 146.25 58.4932 146.25 62.3315V73H151.25V63.4144ZM401.5 200C401.5 309.076 313.076 397.5 204 397.5C94.9238 397.5 6.5 309.076 6.5 200C6.5 90.9238 94.9238 2.5 204 2.5C313.076 2.5 401.5 90.9238 401.5 200Z" stroke="#FF0000" stroke-width="5" shape-rendering="crispEdges" stroke-dasharray="0,0,0,2645.443603515625"><animate attributeType="XML" attributeName="stroke-dasharray" repeatCount="1" dur="4.166666666666667s" values="0,0,0,2645.443603515625; 
           0,1322.7218017578125,1322.7218017578125,0; 
          2645.443603515625,0,0,0" keyTimes="0; 0.6; 1" fill="freeze"></animate></path>
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_2_8" x="0" y="0" width="408" height="408" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                                <feOffset dy="4"></feOffset>
                                                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                                <feComposite in2="hardAlpha" operator="out"></feComposite>
                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_8"></feBlend>
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_8" result="shape"></feBlend>
                                            </filter>
                                        </defs>
                                        <setting >{`"type":"direct","speed":12,"random":1,"shift":1,"size":1,"rupture":50`}</setting></svg>

                                </div>
                                <div className='text-2xl mt-7 ms-2 text-white' >Trailer</div>
                            </button>
                        </Card.Body>
                    </Container>

                </Card.ImgOverlay>

            </Card>
            <Container>
                <div  >
                    <p className='my-3 text-white text-xl'>Cast</p>
                    <Carousel responsive={responsive} className='my-3' >
                        {
                            cast.map((item, i) => {
                                return (<>
                                    <div key={i} className='relative w-full h-full rounded-md overflow-hidden ' >

                                        <div className='text-white '  >

                                            <img className='rounded-md shadow-2xl shadow-red-600' src={`https://image.tmdb.org/t/p/w200/${item.profile_path}`} alt={item.name} />
                                            <div className='absolute bottom-0 left-2 text-sm'>
                                                <h6  >{item.name}</h6>
                                                <div>{item.character}</div>
                                            </div>



                                        </div>



                                    </div>

                                </>

                                )
                            })
                        }

                    </Carousel>
                </div>



                <Tabs
                    defaultActiveKey="Related"
                    className='mb-3 justify-center '
                >
                    <Tab id='tab1' eventKey="Related" title="Related" >

                        <MovieCard
                            apiUrl={{
                                url: `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=d8d56359455a8c1f58621b1cc4c24eef`,
                                head: "Related Movies"
                            }}
                        />

                    </Tab>

                    <Tab id='tab2' eventKey="Details" title="More Details" >
                        <ul className='text-white'>
                            <li>
                                <h5>Release Date </h5>
                                <p>{movieDetail.release_date}</p>
                            </li>
                            <li >
                                <h5>Status</h5>
                                <p> {movieDetail.status}</p>
                            </li>

                            <li>
                                <h5>Production Countries</h5>
                                <p className='flex'>
                                    {movieDetail?.production_countries?.map((county) => {
                                        return (
                                            (<div>{county.name}, </div>)
                                        )
                                    })}

                                </p>
                            </li>
                            <li>
                                <h5>Spoken Languages</h5>
                                <p>{movieDetail?.spoken_languages?.map((audio) => (<div>{audio.english_name}</div>))}</p>
                            </li>
                            <li>
                                <h5>Rvenue</h5>
                                <p>{movieDetail.revenue}</p>
                            </li>
                            <li>
                                <h5>Budget</h5>
                                <p>{movieDetail.budget}</p>
                            </li>
                        </ul>


                    </Tab>

                </Tabs>


            </Container>
        </div>
    )



}

export default Movie