import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

export default function App() {
    return (
        <Grid2 container>
            <Grid2 xs={12}><Header /></Grid2>
            <Grid2 xs={12}>
                <Outlet />
            </Grid2>
        </Grid2>
    );
}