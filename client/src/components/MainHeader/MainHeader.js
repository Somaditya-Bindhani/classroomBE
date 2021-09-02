import { NavLink } from "react-router-dom";
import styles from "./MainHeader.module.css";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

const MainHeader = () => {
  const authCtx = useContext(AuthContext);
  let userLoggedin = authCtx.isLoggedin;
  const studentId = authCtx.studentId;
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <header className={styles.header}>
      <NavLink className={styles.logo} to="/">
        CLASSROOM
      </NavLink>
      <nav className={styles.nav}>
        <ul>
          {!userLoggedin && (
            <li>
              <a href="#servicesmooth">Services</a>
            </li>
          )}
          {!userLoggedin && (
            <li>
              <NavLink activeClassName={styles.active} to="/login">
                Login
              </NavLink>
            </li>
          )}
          {userLoggedin && (
            <li>
              <NavLink
                activeClassName={styles.active}
                to={`/dashboard/${studentId}`}
              >
                Dashboard
              </NavLink>
            </li>
          )}
          {userLoggedin && (
            <li>
              <NavLink activeClassName={styles.active} to="/profile">
                Profile
              </NavLink>
            </li>
          )}
          {userLoggedin && (
            <li>
              <NavLink to="/" onClick={logoutHandler}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
