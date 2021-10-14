import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import { NavLink } from "react-router-dom";
import { fetchByTrends } from "../../helpers/api";

const Home = () => {
  const [TrendsFilmsList, setTrendsFilmsList] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const objectTrendsFilmsList = await (
          await fetchByTrends()
        ).data.results;
        setTrendsFilmsList(objectTrendsFilmsList);
      } catch {
        console.log("error");
      }
    })();
  }, []);

  return (
    <>
      <h1 className={style.title}>Treending news</h1>
      <ul className={style.list}>
        {console.log(TrendsFilmsList)}
        {TrendsFilmsList &&
          TrendsFilmsList.map((film) => (
            <li className={style.item} key={film.id}>
              <NavLink to={`/movie/${film.id}`} className={style.link}>
                <img
                  className={style.FilmImg}
                  src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                  alt={film.title && film.original_title}
                ></img>
                <div className={style.short_info}>
                  <h3 className={style.span_content}>
                    {film.title ?? film.name}
                  </h3>
                 
                  
                  <span className={style.film_score}>Score: {film.vote_average}</span>
                  <span className={style.pin}> | </span>
                  <span className={style.film_score}>{film.first_air_date || film.release_date}</span>

                </div>
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
};
export default Home;
