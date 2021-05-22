import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api.js";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";
import Card from "./Card.js";
import Loading from "./Loading.js";
import Tooltip from "./Tooltip.js";
import { render } from "react-dom";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="flex-center">
      {languages.map((lang) => {
        return (
          <li key={lang}>
            <button
              className="btn-clear nav-link"
              onClick={() => onUpdateLanguage(lang)}
              style={lang === selected ? { color: "red" } : null}
            >
              {lang}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const { owner, html_url, stargazers_count, forks, open_issues } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              html={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github Username">
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

const popularReducer = (state, action) => {
  if (action.type === "success") {
    return {
      ...state,
      [action.selectedLanguage]: action.repos,
      error: null,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.error.message,
    };
  } else {
    throw new Error("That action type isn't supported");
  }
};

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("All");
  const [state, dispatch] = React.useReducer(popularReducer, { error: null });

  const fetchedLanguages = React.useRef([]);

  React.useEffect(() => {
    if (!fetchedLanguages.current.includes(selectedLanguage)) {
      fetchedLanguages.current.push(selectedLanguage);
      fetchPopularRepos(selectedLanguage)
        .then((repos) => dispatch({ type: "success", repos, selectedLanguage }))
        .catch((error) => dispatch({ type: "error", error }));
    }
  }, [fetchedLanguages, selectedLanguage]);

  const updateLanguage = (language) => setSelectedLanguage(language);

  const isLoading = () => !state[selectedLanguage] && state.error === null;

  return (
    <React.Fragment>
      <LanguagesNav
        selected={selectedLanguage}
        onUpdateLanguage={updateLanguage}
      />

      {isLoading() && <Loading text="Fetching Repositories" />}

      {state.error && <p className="center-text error">{state.error}</p>}

      {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
    </React.Fragment>
  );
}
