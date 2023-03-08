import { Button, Chip, MenuItem, Select, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { fetchMoviesDetailByID, getRatedMovies, rateMovie } from "../utils/fetchFromAPI";
import { getImgFullUrl } from "../utils/helpers";
import StarIcon from '@mui/icons-material/Star';
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";


export function ProductionCompany({ name, logo_path }) {
    return (
        <Grid2>
            <Typography variant="body1">{name}</Typography>
            <img alt={name} style={{ height: '30px' }} src={getImgFullUrl(logo_path)} />
        </Grid2>

    );
}

export function RateSelector({movieID}) {
    const rateSelections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [rate, setRate] = useState(1);

    const handleChange = (e) => {
        setRate(e.target.value);
    }

    const handleRateClick = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.sessionId) {
            rateMovie(movieID, user.sessionId, rate);
        }
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <Select
                id="demo-simple-select"
                value={rate}
                onChange={handleChange}
            >
                {rateSelections.map((rate) => <MenuItem key={rate} value={rate}>{rate}</MenuItem>)}
            </Select>
            <Button variant="outlined" onClick={handleRateClick}>RATE IT</Button>
        </Box>
    );
}


export default function MovieDetail() {
    const [movieData, setMoviesData] = useState({});
    const { movieID } = useParams();

    useEffect(() => {
        fetchMoviesDetailByID(movieID).then((data) => {
            setMoviesData(data);
        })
    }, [movieID]);

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
        <Grid2 container spacing={2} justifyContent="center">
            <Grid2 xs={9} container>
                <Grid2 xs={6}>
                    <img alt={movieData.title} style={{ width: "100%" }} src={getImgFullUrl(movieData.poster_path)} />
                </Grid2>
                <Grid2 container xs={6}>
                    <Grid2 xs={12}>
                        <Typography variant="h3">{movieData.title}</Typography>
                        <Typography variant="h6">Release Date:</Typography>
                        <Typography variant="body1">{movieData.release_date}</Typography>
                        <Typography variant="h6">Overview:</Typography>
                        <Typography variant="body1">{movieData.overview}</Typography>
                        <Typography variant="h6">Genres:</Typography>
                        <Grid2 container>
                            {movieData.genres?.map((genre) => {
                                return (
                                    <Grid2 key={genre.id}>
                                        <Chip color="primary" label={genre.name} />
                                    </Grid2>
                                )
                            })}
                        </Grid2>
                        <Typography variant="h6">Average Rating:</Typography>
                        <Grid2 container>
                            <Grid2><StarIcon style={{ color: "#F5C518" }} /></Grid2>
                            <Grid2><Typography variant="body1">{movieData.vote_average}</Typography></Grid2>
                        </Grid2>
                        <Typography variant="h6">Your Rating:</Typography>
                        <Typography variant="body1">{ratedMoviesMap[movieID] ? ratedMoviesMap[movieID].rating : "Not Yet"}</Typography>
                        <RateSelector movieID={movieID}/>

                        <Typography variant="h6">Production Companies:</Typography>
                        <Grid2 container>
                            {movieData.production_companies?.map((company) => {
                                return <ProductionCompany key={company.id} name={company.name} logo_path={company.logo_path} />
                            })}
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>

        </Grid2>
    )
}