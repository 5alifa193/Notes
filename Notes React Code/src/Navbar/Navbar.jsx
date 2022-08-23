import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Navbar() {
  let location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  function setName() {
    let userToken = localStorage.getItem("user");

    if (userToken !== null) {
      let userName = jwtDecode(userToken);
      setFirstName(userName.first_name);
      setlastName(userName.last_name);
    }
  }

  useEffect(() => {
    setName();
  }, []);

  function signOut() {
    localStorage.clear();
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-sm navbar-control navbar-dark shadow-lg">
          <div className="m-auto d-flex">
            {location.pathname === "/" ? (
              <div>
                {firstName} {lastName}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="container">
            <a className="navbar-brand" href="#">
              <i className="fa-solid fa-note-sticky"></i> Notes
            </a>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="dropdownId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Login
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownId">
                    {location.pathname === "/" ? (
                      <Link
                        to="/login"
                        className="dropdown-item"
                        href="#"
                        id="logout"
                        onClick={() => {
                          signOut();
                        }}
                      >
                        Log out
                      </Link>
                    ) : (
                      <div>
                        <Link to="/signup" className="dropdown-item" href="#">
                          Register
                        </Link>
                        <Link to="/login" className="dropdown-item" href="#">
                          Log in
                        </Link>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
