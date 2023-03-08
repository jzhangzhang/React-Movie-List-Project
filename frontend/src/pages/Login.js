import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getAccountDetail, getRequestToken, getSessionId, validateWithLogin } from "../utils/fetchFromAPI";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoding, setIsLoding] = useState(false);
    const [successLoggedIn, setSuccessLoggedIn] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        setIsLoding(true);
        getRequestToken().then((data) => {
            const requestToken = data.request_token;
            validateWithLogin(username, password, requestToken).then((data) => {
                if (data.success) {
                    getSessionId(requestToken).then((data) => {
                        if (data.success) {
                            const sessionId = data.session_id;
                            getAccountDetail(sessionId).then((data) => {
                                localStorage.setItem('user', JSON.stringify({
                                    username,
                                    accoutId: data.id,
                                    sessionId: sessionId,
                                    requestToken: requestToken
                                }));
                                setSuccessLoggedIn(true);
                            });
                        }
                    });
                }
            });
        });
        setIsLoding(false);
    }


    return (
        <>
            {successLoggedIn && (
                <Navigate to="/" replace={true} />
            )}

            <Grid2 container spacing={2} justifyContent="center">
                <Grid2 xs={9} container justifyContent="center">
                    <Grid2>
                        <Typography variant="h3">Login</Typography>
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            style={{ width: "100%" }}
                            label="Username"
                            variant="standard"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TextField
                            style={{ width: "100%" }}
                            label="Password"
                            variant="standard"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </Grid2>
                    <Grid2 xs={12}>
                        {isLoding ?
                            <CircularProgress />
                            :
                            <Button
                                style={{ width: "100%" }}
                                variant="contained"
                                onClick={handleSubmit}>
                                Submit
                            </Button>
                        }
                    </Grid2>
                </Grid2>

            </Grid2>
        </>

    );
}