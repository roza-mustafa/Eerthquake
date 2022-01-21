import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav>
        <div className={styles.brand}>
          <NavLink to="/events">Earthquake Website </NavLink>
        </div>
        <ul className={styles["nav-list"]}>
          <li className={styles["nav-item"]}>
            <NavLink to="/events">Home Page</NavLink>
          </li>
          
          
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
