import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className={style.link}
        activeClassName={style.activeLink}
      >
        Home
      </NavLink>
      <NavLink
        to="/movie"
        className={style.link}
        activeClassName={style.activeLink}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
