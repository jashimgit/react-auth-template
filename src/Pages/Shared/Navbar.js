import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../Auth/Auth";

const Navbar = () => {
  const auth = useAuth();
  const history = useHistory();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            
            {auth.user.name ? (
              <li className="nav-item">
                <Link  className="nav-link"  to="/dashboard">Dashboard</Link>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => auth.signout(() => history.push("/"))}
                >
                  Log Out
                </button>
                
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
