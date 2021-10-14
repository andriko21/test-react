import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Form from "../../Components/Form/Form";
import { fetchByQuery } from "../../helpers/api";
import style from "./MoviesViev.module.css";

const MoviesViev = () => {
  const [qwery, setQwery] = useState("");
  const [films, setFilms] = useState(null);
  const onSubmit = (data) => {
    setQwery(data);
  };

  useEffect(() => {
    if (qwery.trim() === "") {
      return;
    }
    (async () => {
      try {
        const fetch = await fetchByQuery(qwery);
        setFilms(fetch.data.results);
      } catch (error) {
        console.log("error");
      }
    })();
  }, [qwery]);
  return (
    <>
      <Form onSubmit={onSubmit} />
      <ul className={style.film_list}>
        {films &&
          films.map(({ title, id, original_title }) => (
            <li key={id} className={style.film_item_data}>
              <NavLink to={`/movie/${id}`} className={style.film_item}>
                <span>{title && original_title}</span>
                
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
};
export default MoviesViev;
