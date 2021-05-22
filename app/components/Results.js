import React from "react";
import { battle } from "../utils/api.js";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser,
} from "react-icons/fa";
import Card from "./Card.js";
import PropTypes from "prop-types";
import Loading from "./Loading.js";
import Tooltip from "./Tooltip.js";
import queryString from "query-string";
import { Link } from "react-router-dom";

function ProfileList({ profile }) {
  const { name, location, company, followers, following } = profile;

  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgba(239, 115, 115)" size={22} />
        {name}
      </li>
      {location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {location}
          </Tooltip>
        </li>
      )}
      {company && (
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color="#795548" size={22} />
            {company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgba(129, 195, 245)" size={22} />
        {followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgba(64, 183, 95)" size={22} />
        {following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

const resultsReducer = (state, action) => {
  if (action.type === "success") {
    return {
      ...state,
      winner: action.winner,
      loser: action.loser,
      loading: false,
      error: null,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      loading: false,
      error: action.error.message,
    };
  } else {
    throw new Error("Error fetching Results");
  }
};

export default function Results({ location }) {
  const [state, dispatch] = React.useReducer(resultsReducer, {
    error: null,
    loading: true,
  });
  const { playerOne, playerTwo } = queryString.parse(location.search);

  React.useEffect(() => {
    battle([playerOne, playerTwo])
      .then((players) =>
        dispatch({ type: "success", winner: players[0], loser: players[1] })
      )
      .catch((error) => dispatch({ type: "error", error }));
  }, [playerOne, playerTwo]);

  if (state.loading) {
    return <Loading text="Battling" />;
  }

  if (state.error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <React.Fragment>
      <div className="grid space-around container-sm">
        <Card
          header={state.winner.score === state.loser.score ? "Tie" : "Winner"}
          subheader={`Score: ${state.winner.score.toLocaleString()}`}
          avatar={state.winner.profile.avatar_url}
          name={state.winner.profile.login}
          href={state.winner.profile.html_url}
        >
          <ProfileList profile={state.winner.profile} />
        </Card>

        <Card
          header={state.winner.score === state.loser.score ? "Tie" : "Loser"}
          subheader={`Score: ${state.loser.score.toLocaleString()}`}
          avatar={state.loser.profile.avatar_url}
          name={state.loser.profile.login}
          href={state.loser.profile.html_url}
        >
          <ProfileList profile={state.loser.profile} />
        </Card>
      </div>
      <Link className="btn btn-dark btn-space" to="/battle">
        Reset
      </Link>
    </React.Fragment>
  );
}

Results.propTypes = {
  location: PropTypes.object.isRequired,
};
