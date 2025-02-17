import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Import the CSS file

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const dropdownRef = useRef(null); // Reference to the navbar dropdown

  const fetchUserName = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("https://noteit-backend-m2h5.onrender.com/api/auth/getuser", {
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
          setTimeout(() => setShowWelcome(true), 500);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
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

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("sessionActive");
    setUserName("");
    setShowWelcome(false);
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    const handleBackForwardButton = () => {
      handleLogout();
    };

    window.addEventListener("popstate", handleBackForwardButton);

    return () => {
      window.removeEventListener("popstate", handleBackForwardButton);
    };
  }, [handleLogout]);

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
      handleLogout();
    };
  }, [handleLogout]);

  // Detect click outside the navbar to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const dropdown = document.getElementById('navbarSupportedContent');
        if (dropdown && dropdown.classList.contains('show')) {
          dropdown.classList.remove('show');
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand logo" to="/" onClick={() => navigate("/")}>NoteIt</Link>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={dropdownRef}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            {!isLoggedIn ? (
              <form className="d-flex">
                <Link className="btn btn-primary mx-1" to="/login" role="button">
                  Login
                </Link>
                <Link className="btn btn-success mx-1" to="/signup" role="button">
                  Signup
                </Link>
              </form>
            ) : (
              <div className="d-flex align-items-center">
                <span className={`text-white me-3 welcome-message ${showWelcome ? "fade-in" : "opacity-0"}`}>
                  Welcome, {userName}
                </span>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="navbar-placeholder"></div>
    </>
  );
};

export default Navbar;
