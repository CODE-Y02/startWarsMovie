import classes from "./Movie.module.css";

const Movie = (props) => {
  const deleteMovieHandler = async (id) => {
    console.log(id);

    // console.log(
    //   `${process.env.REACT_APP_FIREBASE_DB_URL}/${process.env.REACT_APP_DB_NAME}/${id}`
    // );
    try {
      const res = await fetch(
        `https://starwarsmovie-88152-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${id}.json`,
        { method: "DELETE" }
      );
      console.log(res);

      if (!res.ok)
        throw new Error(
          "Something went Wrong' to 'Something went wrong ....Retrying"
        );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={() => deleteMovieHandler(props.movieID)}>Delete</button>
    </li>
  );
};

export default Movie;
