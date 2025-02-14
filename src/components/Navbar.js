import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/auth/getuser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token": token,
              },
            }
          );

          const data = await response.json();
          if (!response.ok) {
            console.error("Error fetching user:", data.error);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    closeNavbar();
  };

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarSupportedContent");
    if (navbar && navbar.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, {
        toggle: true,
      });
      bsCollapse.hide();
    }
  };

  useEffect(() => {
    closeNavbar();
  }, [location]);

  return (
    <>
      <nav
        id="navbar"
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{
          zIndex: 1050,
          position: "fixed",
          top: 0,
          width: "100%",
          overflow: "visible",
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand text-bold"
            to="/"
            onClick={() => navigate("/")}
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
                  onClick={closeNavbar}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                  to="/about"
                  onClick={closeNavbar}
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  role="button"
                  onClick={closeNavbar}
                >
                  Login
                </Link>
                <Link
                  className="btn btn-success mx-1"
                  to="/signup"
                  role="button"
                  onClick={closeNavbar}
                >
                  Signup
                </Link>
              </form>
            ) : (
              <button
                className="btn btn-danger mx-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Add padding to body to prevent overlap */}
      <div style={{ paddingTop: "56px" }}></div>
    </>
  );
};

export default Navbar;