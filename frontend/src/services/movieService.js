const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


// NOW PLAYING MOVIES. {working}

export const fetchNowPlayingMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();
  return data.results;
};

// POPULAR MOVIES latest

export const fetchPopularMovieslatest = async () => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&primary_release_date.lte=2026-02-31&primary_release_date.gte=2024-01-01&sort_by=popularity.desc`
  );
  const data = await res.json();
  return (data.results || []).slice(0, 10);
};

// DISOCOVER MOVIES
export const fetchDiscoverMovies = async () => {
    const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&release_date.gte=2023-01-01` 
    );;
    const data = await res.json();
    return data.results;
}

export const getMoviePoster = (path) => {
  return path
    ? `${IMAGE_BASE_URL}${path}`
    : "https://via.placeholder.com/300x450?text=No+Image";
};

export const upcomingMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&with_original_language=hi&release_date.gte=2026-02-01`
  );
  const data = await res.json();
  return (data.results || []).slice(0, 8);
};


// FETCH SINGLE MOVIE DETAILS (for MovieDetails page)

export const fetchMovieDetails = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await res.json();
  return data;
};