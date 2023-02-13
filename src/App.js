import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMoviesHandler = useCallback(async () => {
    console.log("fetching MOvies");
    try {
      setIsLoading(true);

      const res = await fetch("https://swapi.dev/api/films");
      if (!res.ok)
        throw new Error(
          "Something went Wrong' to 'Something went wrong ....Retrying"
        );
      setError("");
      const data = await res.json();

      const moviesArr = data.results.map((movie) => {
        const {
          opening_crawl: openingText,
          title,
          release_date: releaseDate,
          episode_id: id,
        } = movie;
        return {
          id: id || title + releaseDate,
          title,
          openingText,
          releaseDate,
        };
      });

      setMovies(moviesArr);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  useEffect(() => {
    if (error.length) {
      const id = setInterval(() => {
        fetchMoviesHandler();
      }, 5000);

      return () => {
        // console.log(id);
        clearInterval(id);
      };
    }
  }, [error, fetchMoviesHandler]);

  const retryCancleHandler = () => {
    setError("");
  };

  return (
    <React.Fragment>
      <AddMovie />
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {error.length > 0 && (
          <button onClick={retryCancleHandler}> Cancel retry</button>
        )}
      </section>
      <section>
        {!isLoading && movies.length > 0 && error.length === 0 && (
          <MoviesList movies={movies} />
        )}

        {isLoading && !error && <h3>Loading ....</h3>}
        {error && <h3>{error}</h3>}

        {!isLoading && movies.length === 0 && error.length === 0 && (
          <p>NO Movies Found</p>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
