import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchByActors } from "../../helpers/api";
import style from "./FilmActorsView.module.css";

const ActorsView = () => {
  const [state, setState] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const fetch = await fetchByActors(movieId);
        setState(fetch.data.cast);
      } catch (error) {
        console.log("error");
      }
    })();
  }, [movieId]);

  return (
    state && (
      <div className={style.Actors_container}>
        {console.log(state)}

        <ul className={style.actor_list}>
          {state.map(({ name, original_name, id, character, profile_path }) => (
            <li key={id} className={style.actor_item}>
              <img
                className={style.actor_img}
                src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                alt={name && original_name}
              ></img>

              <p className={style.actor_name}>{name && original_name}</p>
              <p className={style.actor_name}>{character}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default ActorsView;
