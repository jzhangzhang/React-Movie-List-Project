import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react"
import { getRatedMovies } from "../utils/fetchFromAPI";
import MovieCard from "./MovieCard";

export default function MovieCardList({ movies, likedMoviesMap, onToggleLike }) {
    const [ratedMovies, setRatedMovies] = useState();
    const [ratedMoviesMap, setRatedMoviesMap] = useState({});
    const [user, setUser] = useState({});

    useEffect(() =>{
        const userFromStorage = JSON.parse(localStorage.getItem('user'));
        if (userFromStorage) {
            setUser(userFromStorage);
        }
    },[]);

    useEffect(() => {
        if(user?.accoutId){
            getRatedMovies(user.accoutId, user.sessionId).then((data) => {
                setRatedMovies(data.results);
            });
        }

    }, [user]);

    useEffect(() => {
        if (ratedMovies) {
            setRatedMoviesMap(ratedMovies.reduce((acc, ratedMovie) => {
                acc[ratedMovie.id] = ratedMovie;
                return acc;
            }, {}));
        }
    }, [ratedMovies]);

    return (
        <Grid2 container spacing={3}>
            {movies?.map(movie => {
                const isLiked = likedMoviesMap[movie.id];
                const ratedMoive = ratedMoviesMap[movie.id];
                return (<Grid2 xs={3} key={movie.id}><MovieCard movie={movie} isLiked={isLiked} onToggleLike={onToggleLike} ratedMoive={ratedMoive}/></Grid2>)
            })}
        </Grid2>

    );
}