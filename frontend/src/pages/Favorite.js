import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import MovieCardList from "../components/MovieCardList";
import { getFavMovieList, markFavoriteMovie } from "../utils/fetchFromAPI";

export default function Favorite() {
    const [likedList, setLikedList] = useState([]);
    const [likedMoviesMap, setLikedMoviesMap] = useState({});
    const [user, setUser] = useState({});

    useEffect(() =>{
        const userFromStorage = JSON.parse(localStorage.getItem('user'));
        if (userFromStorage) {
            setUser(userFromStorage);
        }
    },[]);

    useEffect(() => {
        if(user?.accoutId){
            getFavMovieList(user.accoutId, 1, user.sessionId).then((data) => {
                setLikedList(data.results);
            });
        }

    }, [user]);

    useEffect(() => {
        if (likedList) {
            setLikedMoviesMap(likedList.reduce((acc, likedMovie) => {
                acc[likedMovie.id] = likedMovie;
                return acc;
            }, {}));
        }
    }, [likedList]);

    const handleToggleLike = (movie) => {
        if (user?.accoutId) {
            const hasLiked = Boolean(likedMoviesMap[movie.id]);
            markFavoriteMovie(movie.id, !hasLiked, user.sessionId, user.accoutId);

            getFavMovieList(user.accoutId, 1, user.sessionId).then((data) => {
                setLikedList(data.results);
            });
        }
    };


    return (<div>
        <Grid2 container>
            <Grid2 container xs={12} justifyContent="center" alignItems="center">
                <Grid2>
                    <Typography variant="h3">Favorite Movies</Typography>
                </Grid2>
            </Grid2>

            <Grid2 xs={12}>
                <MovieCardList movies={likedList} likedMoviesMap={likedMoviesMap} onToggleLike={handleToggleLike} />
            </Grid2>
        </Grid2>
    </div>);
}