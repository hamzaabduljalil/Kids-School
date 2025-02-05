import { NavLink, useNavigate, Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../imgs/logo.png";
const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/home">
            <img src={logo}></img>
          </Link>
        </div>
        <ul className={styles.nav}>
          <li>
            <NavLink
              to="/Home"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chooseCard"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              ChooseCard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Letters"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Letters
            </NavLink>
          </li>

          <li>
            <NavLink
              to="Number"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Number
            </NavLink>
          </li>
          {/*  */}

          <li>
            <NavLink
              to="animals"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Animals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="video"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Video
            </NavLink>
          </li>
          <li>
            <button className={styles.signOut} onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
