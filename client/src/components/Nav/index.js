import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import FormData from "form-data";
import axios from "axios";

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
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">
            🏋️
          </span>
          BuiltRight
        </Link>
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
