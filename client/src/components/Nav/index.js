import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import FormData from "form-data";
import axios from "axios";
import logo from "../../assets/untitled.png";

var data = new FormData();

var config = {
  method: "get",
  url: "https://wger.de/api/v2/exercise/",
  data: data,
};

axios
  .get("https://wger.de/api/v2/exerciseinfo/?limit=1000")
  .then((response) => {
    const results = response.data.results.filter((item) => {
      return (
        item.videos[0] &&
        item.language.short_name == "en" &&
        item.description != []
      );
    });
    // Return only items that meet certain criteria
    console.log(results);
  })
  .catch(function (error) {
    console.log(error);
  });

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className="flex-row">
          <Link to="/orderHistory">My Profile</Link>

          {/* this is not using the Link component to logout or user and then refresh the application to the start */}
          <a href="/" onClick={() => Auth.logout()}>
            Logout
          </a>
        </div>
      );
    } else {
      return (
        <div class="flex-row">
          <li class="navlink">
            <Link to="/signup">Signup</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  return (
    <header className="flex-row px-1 justify-content-space-between">
      {/* Add logo on the left */}
      <div
        className="center f
lex-row align-items-center "
      >
        <h1>
          <Link to="/">
            {/* <img src={logo} alt="logo" className="logo" /> */}
            BUILT
          </Link>
        </h1>
      </div>
      <div className="navigation flex-row align-items-center justify-content-around w-50">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/about">About Us</Link>
        <Link to="/support">Support</Link>
        {showNavigation()}
      </div>
    </header>
  );
}

export default Nav;
