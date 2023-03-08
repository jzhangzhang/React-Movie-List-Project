import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import CategorySelector from "../components/CategorySelector";
import MovieCardList from "../components/MovieCardList";
import { CATEGORIES } from "../constants";
import { fetchMoviesByCategory, getFavMovieList, markFavoriteMovie } from "../utils/fetchFromAPI";

export default function Home() {
    const [moviesData, setMoviesData] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCategory, setCurrentCategory] = useState(CATEGORIES.NOW_PLAYING.value);
    const [likedList, setLikedList] = useState([]);
    const [likedMoviesMap, setLikedMoviesMap] = useState({});
    // const [user, setUser] = useState({});

    useEffect(() => {
        fetchMoviesByCategory(currentCategory, currentPage).then((data) => {
            setTotalPage(data.total_pages);
            setMoviesData(data.results);
        });
    }, [currentPage, currentCategory]);

    const handleCategoryChange = (category) => {
        console.log("category", category);
        setCurrentCategory(category);
        setCurrentPage(1);

    }

    const handlePrevPage = () => {
        if (currentPage === 1) {
            return;
        }
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        if (currentPage === totalPage) {
            return;
        }
        setCurrentPage(currentPage + 1);
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            getFavMovieList(user.accoutId, 1, user.sessionId).then((data) => {
                setLikedList(data.results);
            })
        }
    }, [localStorage.getItem('user')])

    useEffect(() => {
        console.log("likedList", likedList);
        if (likedList) {
            setLikedMoviesMap(likedList.reduce((acc, likedMovie) => {
                acc[likedMovie.id] = likedMovie;
                return acc;
            }, {}));
        }
    }, [likedList]);

    const handleToggleLike = (movie) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const hasLiked = Boolean(likedMoviesMap[movie.id]);
            markFavoriteMovie(movie.id, !hasLiked, user.sessionId, user.accoutId);

            getFavMovieList(user.accoutId, 1, user.sessionId).then((data) => {
                setLikedList(data.results);
            })
        }
    };


    return (<div>
        <Grid2 container>
            <Grid2 container xs={12} alignItems="center">
                <Grid2 xsOffset={4} xs={1}>
                    <Button variant="outlined" onClick={handlePrevPage}>Previous</Button>
                </Grid2>
                <Grid2 container xs={2} alignItems="center" justifyContent="center">
                    <Grid2><Typography>{currentPage}/{totalPage}</Typography></Grid2>
                </Grid2>
                <Grid2 xs={1}>
                    <Button variant="outlined" onClick={handleNextPage}>Next</Button>
                </Grid2>
                <Grid2 xsOffset={2} xs={2}>
                    <CategorySelector
                        category={currentCategory}
                        handleCategoryChange={handleCategoryChange}
                    />
                </Grid2>
            </Grid2>

            <Grid2 xs={12}>
                <MovieCardList movies={moviesData} likedMoviesMap={likedMoviesMap} onToggleLike={handleToggleLike} />
            </Grid2>
        </Grid2>
    </div>);
}