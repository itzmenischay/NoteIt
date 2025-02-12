import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link
          className="navbar-brand text-bold"
          to="/"
          onClick={(e) => {
            if (!localStorage.getItem("token")) {
              e.preventDefault();
              navigate("/login");
            } else {
              navigate("/");
            }
          }}
        >
          NoteIt
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`} 
                to="/"
                onClick={(e) => {
                  if (!localStorage.getItem("token")) {
                    e.preventDefault();
                    navigate("/login");
                  } else {
                    navigate("/");
                  }
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                About
              </Link>
            </li>
            {/* {localStorage.getItem("token") && (
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/addnote" ? "active" : ""}`} to="/addnote">
                  Add Note
                </Link>
              </li>
            )} */}
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-success mx-1" to="/signup" role="button">
                Signup
              </Link>
            </form>
          ) : (
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
