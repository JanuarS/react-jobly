import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../auth/UserContext";

import "./style.css";

function NavBar() {
  const { currentUser } = useContext(UserContext);

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        Jobly
      </Link>
      <Link to="/companies">
        Companies
      </Link>
    </nav>
  );
}

export default NavBar;