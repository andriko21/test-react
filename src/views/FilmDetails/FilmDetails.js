import React, { Fragment, useEffect, useState, lazy, Suspense } from "react";
import {
  NavLink,
  Route,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { fetchMovieDetails } from "../../helpers/api";
import style from "./FilmDetails.module.css";
// import ActorsView from "../ActorView/ActorsView";
// import Reviews from "../Reviews/Reviews";
const ActorsView = lazy(() =>
  import(`../FilmActorsView/FilmActorsView` /*webpackChunkName: "ActorsView"*/)
);

const Reviews = lazy(() =>
  import(`../Reviews/Reviews` /*webpackChunkName: "CastView "*/)
);

const BookDeatils = () => {
  const { movieId } = useParams();
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  // console.log('history',history)
  // console.log('location',location)
  const [state, setState] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const fetch = await fetchMovieDetails(movieId);
        console.log(fetch);
        setState(fetch.data);
      } catch (error) {
        alert('Фільм не загрузився')
        console.log("error");
      }
    })();
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? "/");
  };
  return (
    <Fragment>
      {location.pathname !== "/" && <button onClick={onGoBack}>back</button>}
      {state && (
        <div className={style.CardContainer}>
          <div className={style.CardView}>
            <img
              className={style.CardImg}
              src={`https://image.tmdb.org/t/p/w500/${state.poster_path}`}
              alt={state.title && state.original_title}
            ></img>

            <div className={style.description}>
              <h1 className={style.title}>
                {state.title && state.original_title}
              </h1>
              <p className={style.score}>Score {state.vote_average}</p>
              <p className={style.overview}>Overview {state.overview}</p>
              <ul className={style.genreList}>
                {state.genres.map(({ name, id }) => (
                  <li className={style.genreItem} key={id}>
                    {name}
                  </li>
                ))}
              </ul>
                        <div>
            <h2 className={style.title}>Aditional Information</h2>
            <ul className={style.aditional_list}>
              <li className={style.aditional_Item}>
                <NavLink
                  to={`${url}/review`}
                  exact
                  className={style.aditional_navLink}
                >
                  <span className={style.dataAditional}>Reviews</span>
                </NavLink>
              </li>
              <li className={style.aditional_Item}>
                <NavLink
                  to={`${url}/cast`}
                  exact
                  className={style.aditional_navLink}
                >
                  <span className={style.dataAditional}>Cast</span>
                </NavLink>
              </li>
            </ul>
          </div>
            </div>
          </div>

        </div>
      )}
      <Suspense fallback={<h1>Загружаємо</h1>}>
        <Route path={`${path}/cast`}>
          <ActorsView />
        </Route>
        <Route path={`${path}/review`}>
          <Reviews />
        </Route>
      </Suspense>
    </Fragment>
  );
};
export default BookDeatils;
