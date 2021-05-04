import React from "react";
import { ThemeConsumer } from "../contexts/theme.js";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "rgb(187, 46, 31",
};

export default class Nav extends React.Component {
  render() {
    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => {
          return (
            <nav className="row space-between">
              <ul className="row nav">
                <li>
                  <NavLink
                    to="/"
                    className={`nav-link`}
                    exact
                    activeStyle={activeStyle}
                  >
                    Popular
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/battle"
                    className={`nav-link`}
                    activeStyle={activeStyle}
                  >
                    Battle
                  </NavLink>
                </li>
              </ul>
              <button
                style={{ fontSize: 30 }}
                className="btn-clear"
                onClick={toggleTheme}
              >
                {theme === "light" ? "🌕" : "🌞"}
              </button>
            </nav>
          );
        }}
      </ThemeConsumer>
    );
  }
}
