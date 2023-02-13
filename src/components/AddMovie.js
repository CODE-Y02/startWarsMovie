import { useRef } from "react";
import classes from "./AddMovie.module.css";

const AddMovie = () => {
  const inputMovieTitle = useRef("");
  const inputMovieOpeningText = useRef("");
  const inputMovieReleaseDate = useRef("");
  const submitHandler = (e) => {
    e.preventDefault();

    let title = inputMovieTitle.current.value;
    let openingText = inputMovieOpeningText.current.value;
    let releaseDate = inputMovieReleaseDate.current.value;

    if (!title && !releaseDate.length) {
      alert("Provide title and release date");
      return;
    }

    const newMovieObj = {
      title,
      openingText,
      releaseDate,
    };

    console.log(newMovieObj);
    alert("submitted");

    // cleanup
    inputMovieTitle.current.value = "";
    inputMovieOpeningText.current.value = "";
    inputMovieReleaseDate.current.value = "";
  };

  return (
    <form className={classes.wrapper} onSubmit={submitHandler}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" ref={inputMovieTitle} />
      <label htmlFor="Opening">Opening Text</label>
      <textarea id="Opening" rows="5" ref={inputMovieOpeningText}></textarea>

      <label htmlFor="ReleaseDate">Release Date</label>
      <input type="date" id="ReleaseDate" ref={inputMovieReleaseDate} />
      <button>Add Movie</button>
    </form>
  );
};
export default AddMovie;
