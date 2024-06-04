import React, { useEffect, useState } from "react";
import { Link, Router, useNavigate } from "react-router-dom";
import ROUTES from "../navigations/Routes";

function Header() {
  const [user, setUser] = useState({ id: null });
  const navigate = useNavigate();

  useEffect(() => {
    let id = localStorage.getItem("id");
    if (id) setUser({ id: id });
  }, []);

  function Navbar() {
    if (user?.id) {
      return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          {/* <a  href="#">
            CSMANIA
          </a> */}
          <Link class="navbar-brand  text-primary" to={ROUTES.home.name}>
            CSMANIA
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item ">
                <a class="nav-link disabled" href="#">
                  Home <span class="sr-only ">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">
                  Pricing
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">
                  Disabled
                </a>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to={ROUTES.userRecords.name}>
                  User Records
                </Link>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              localStorage.clear();
              navigate(ROUTES.login.name);
            }}
          >
            LogOut
          </button>
        </nav>
      );
    } else {
      return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand  text-primary" href="#">
            CSMANIA
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item ">
                <a class="nav-link disabled" href="#">
                  Home <span class="sr-only ">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">
                  Pricing
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
          <button
            className="btn btn-primary wow"
            onClick={() => {
              localStorage.clear();
              navigate(ROUTES.login.name);
            }}
          >
            login
          </button>
        </nav>
      );
    }
  }
  return <div>{Navbar()}</div>;
}
export default Header;
