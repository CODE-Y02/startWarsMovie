import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

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

  const fetchMoviesHandler = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://swapi.dev/api/films");
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

      // console.log(moviesArr);

      setMovies(moviesArr);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <h3>Loading ....</h3>}
        {!isLoading && movies.length && <MoviesList movies={movies} />}

        {!isLoading && !movies.length && <p>NO Movies Found</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
