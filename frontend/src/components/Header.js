import { Button, Grid, Popover, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userItem = localStorage.getItem('user');
        if (userItem) {
            // console.log("user", userItem);
            setUser(JSON.parse(userItem));
        }
    }, [])

    const handleClickName = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setUser(null);
        setAnchorEl(null);
        localStorage.removeItem('user');
    }

    return (
        <Grid2 container style={{
            color: "white",
            backgroundColor: "#3f51b5",
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: "5px",
            marginBottom: "10px",
        }}>
            <Grid2 container style={{
                alignItems: 'center',
            }}>
                <Grid2>
                    <img
                        alt="Movie DB Logo"
                        src={`https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg`}
                        width="100px"
                    />
                </Grid2>
                <Grid>
                    <Button component={Link} to="/">Home</Button>
                    <Button component={Link} to="/favorite">FAVORITE</Button>
                    <Button component={Link} to="/rated">RATED</Button>
                </Grid>
            </Grid2>

            <Grid2 >
                {
                    user ?
                        <>
                            <Button onClick={handleClickName}><Typography variant="h6">{user.username}</Typography></Button>
                            <Popover
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Button onClick={handleLogout}>
                                    <Typography sx={{ p: 2 }}>Logout</Typography>
                                </Button>
                            </Popover>
                        </>
                        :
                        <Button component={Link} to="/login">Login</Button>
                }
            </Grid2>
        </Grid2>
    );
}