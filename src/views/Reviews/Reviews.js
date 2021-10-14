import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieByReviews } from "../../helpers/api";
import style from "./Reviews.module.css";

const Reviews = () => {
  const [state, setState] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const fetch = await fetchMovieByReviews(movieId);
        setState(fetch.data.results);
      } catch (error) {
        console.log("error");
      }
    })();
  }, [movieId]);

  return (
    state && (
      <div className={style.Actors_container}>

        <ul className={style.reviews_list}>
          {state.map(({ author, content, id }) => (
            <li className={style.reviews_item} key={id}>
              <h3 className={style.reviews_author}>{author}</h3>
              <p className={style.reviews_content}>{content}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Reviews;
