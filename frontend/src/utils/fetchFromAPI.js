const API_KEY = `9496cf73fa27b7ee8376e145cb4f69dc`;
const URL_PREFIX = `https://api.themoviedb.org/3`
export const fetchMoviesByCategory = (category, page) => {
  const url = `${URL_PREFIX}/movie/${category}?api_key=${API_KEY}&page=${page}`;

  return fetch(url).then((resp) => {
    return resp.json();
  });
};



export const fetchMoviesDetailByID = (movie_id) => {
  // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  const url = `${URL_PREFIX}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`;

  return fetch(url).then((resp) => {
    return resp.json();
  });
};

export const getRequestToken = () => {
  // https://api.themoviedb.org/3/authentication/token/new?api_key=<<api_key>>
  const url = `${URL_PREFIX}/authentication/token/new?api_key=${API_KEY}`;
  return fetch(url).then((resp) => {
    return resp.json();
  });
}

export const validateWithLogin = ( username, password, request_token ) => {
  // https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=<<api_key>>
  const url = `${URL_PREFIX}/authentication/token/validate_with_login?api_key=${API_KEY}`;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password,
      request_token: request_token,
    }),
  };  
  return fetch(url, requestOptions).then((resp) => {
    return resp.json();
  });
}

export const getSessionId = (request_token) => {
  // https://api.themoviedb.org/3/authentication/session/new?api_key=<<api_key>>
  const url = `${URL_PREFIX}/authentication/session/new?api_key=${API_KEY}`;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      request_token: request_token,
    }),
  };  
  return fetch(url, requestOptions).then((resp) => {
    return resp.json();
  });
}

export const getAccountDetail = (session_id) => {
  // https://api.themoviedb.org/3/account?api_key=<<api_key>>
  const url = `${URL_PREFIX}/account?api_key=${API_KEY}&session_id=${session_id}`;
  return fetch(url).then((resp) => {
    return resp.json();
  });
}

export const markFavoriteMovie = (movie_id,favorite,session_id,account_id) => {
  // https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=<<api_key>>
  const url = `${URL_PREFIX}/account/${account_id}/favorite?api_key=${API_KEY}&session_id=${session_id}`;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      media_type: "movie",
      media_id: movie_id,
      favorite: favorite
    }),
  };  
  return fetch(url, requestOptions).then((resp) => {
    return resp.json();
  });
}

export const getFavMovieList = (account_id,page,session_id) => {
  // https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=<<api_key>>&language=en-US&sort_by=created_at.asc&page=1
  const url = `${URL_PREFIX}/account/${account_id}//favorite/movies?api_key=${API_KEY}&session_id=${session_id}&sort_by=created_at.asc&page=${page}`
  return fetch(url).then((resp)=>{
    return resp.json();
  })
}

export const rateMovie = (movie_id, session_id,value) => {
  // https://api.themoviedb.org/3/movie/631842/rating?api_key=9496cf73fa27b7ee8376e145cb4f69dc&session_id=ca2ebf72861a9160540949a5380f348bec234499
  const url = `${URL_PREFIX}/movie/${movie_id}/rating?api_key=${API_KEY}&session_id=${session_id}`;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      value: value
    }),
  };  
  return fetch(url,requestOptions).then((resp) => {
    return resp.json();
  });
}

export const getRatedMovies = (account_id,session_id) => {
// https://api.themoviedb.org/3/account/{{accout_id}}/rated/movies?api_key={{api_key}}&language=en-US&session_id={{session_id}}&sort_by=created_at.asc&page=1
  const url = `${URL_PREFIX}/account/${account_id}/rated/movies?api_key=${API_KEY}&session_id=${session_id}`;
  return fetch(url).then((resp)=>{
    return resp.json();
  });

}