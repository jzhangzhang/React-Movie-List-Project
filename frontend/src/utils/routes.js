import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Favorite from "../pages/Favorite";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MovieDetail from "../pages/MovieDetail";
import Rated from "../pages/Rated";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path:"/favorite", element:<Favorite/>},
            { path: "/login", element: <Login /> },
            { path: "/movie/:movieID", element: <MovieDetail /> },
            { path: "/rated", element: <Rated /> },

        ]
    },

]);