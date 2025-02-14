import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

  const fetchUserName = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserName(data.name);
          setShowWelcome(false);
          setTimeout(() => setShowWelcome(true), 500); // Show welcome message after 0.5s
        } else {
          console.error("Error fetching user:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      fetchUserName();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName("");
    setShowWelcome(false);
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

  // Logout when user presses the back button
  useEffect(() => {
    const handleBackButton = () => {
      localStorage.removeItem("token"); // Remove token
      setUserName(""); // Clear username
      setShowWelcome(false); // Hide welcome message
      navigate("/login"); // Redirect to login page
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]); // Only depends on navigate

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
          <Link className="navbar-brand text-bold" to="/" onClick={() => navigate("/")}>NoteIt</Link>
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
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/" onClick={closeNavbar}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about" onClick={closeNavbar}>About</Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link className="btn btn-primary mx-1" to="/login" role="button" onClick={closeNavbar}>Login</Link>
                <Link className="btn btn-success mx-1" to="/signup" role="button" onClick={closeNavbar}>Signup</Link>
              </form>
            ) : (
              <div className="d-flex align-items-center">
                <span 
                  className={`text-white me-3 welcome-message ${showWelcome ? "fade-in" : "opacity-0"}`}
                >
                  Welcome, {userName}
                </span>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div style={{ paddingTop: "56px" }}></div>

      <style>
        {`
          .fade-in {
            opacity: 1;
            transition: opacity 0.8s ease-in-out;
          }
          .opacity-0 {
            opacity: 0;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
