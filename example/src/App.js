import './App.css';

import { useState, useEffect } from "react";

import "./index.css";

// 1. Render list of the teams using TeamsCard component
// 2. Remove Team from the list of the Teams using onRemoveHander
// 3. Add logic for red cards counter, by pressing the "Add red card"
//    counter should be incremented
// Don't use:
// - if-else
// - loops (for, while, until)

//Team object example
/*
id: 1
abbreviation: "ATL"
city: "Atlanta"
conference: "East"
division: "Southeast"
full_name: "Atlanta Hawks"
name: "Hawks"
*/

const TeamCard = ({
  id,
  fullName,
  city,
  onRemove,
  redCards,
  onRedCardPress
}) => (
  <div>
    <h3>{fullName}</h3>
    <ul>
      <li>City - {city}</li>
      <li>Red Cards - {redCards}</li>
    </ul>
    <button onClick={onRemove.bind(null, id)}>Remove</button>
    <button onClick={onRedCardPress.bind(null, id)}>Add red card</button>
  </div>
);

export default function App() {
  const [teams, setTeams] = useState([]);
  console.log(teams);

  useEffect(() => {
    fetch("https://www.balldontlie.io/api/v1/teams")
      .then((response) => response.json())
      .then((response) =>
        setTeams(response.data.map((team) => ({ ...team, redCards: 0 })))
      );
  }, []);

  // Use this handler to remove team from the list
  const onRemoveHander = (id) => {
    const cards = teams.filter(elem => {
      return elem.id !== id ? elem : false;
    });
    setTeams(cards);
  };

  // Use this handler to increment team's red card counter
  const redCardHandler = (id) => {
    const cards = teams.map(team => {
      const newTeam = {...team};
      newTeam.redCards += 1
      return team.id === id ? newTeam : team 
    })
    setTeams(cards)
  };

  return (
    <div className="App">
      {teams.map((team) => {
        return (
          <TeamCard
            city={team.city}
            redCards={team.redCards}
            fullName={team.full_name}
            id={team.id}
            onRemove={onRemoveHander}
            onRedCardPress={redCardHandler}
          />
        );
      })}
    </div>
  );
}
