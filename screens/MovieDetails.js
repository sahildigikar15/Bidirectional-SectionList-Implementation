import React, { useEffect, useState } from 'react';
import { GETMOVIEDETAILS } from '../utils/constants';
import MovieInfo from '../components/MovieInfo';
import { API_KEY } from 'react-native-dotenv'

const MovieDetails= ({route}) => {
    const { movieId } = route.params;
    const [loading , setLoading] = useState(false);
    const [movieDetails, setMovieDetails] = useState({});

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async () => {
        try {
            setLoading(true);
            console.log(GETMOVIEDETAILS + `${movieId}?api_key=${API_KEY}`);
            let movieInfo = await fetch(GETMOVIEDETAILS + `${movieId}?api_key=${API_KEY}`);
            let movieData = await movieInfo.json();
            setMovieDetails(movieData);
        } catch(e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }
    return (
      <>
        <MovieInfo movieDetails={movieDetails} movieId={movieId} />
      </>
    );
};

export default MovieDetails;
