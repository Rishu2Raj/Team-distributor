import React, { useState } from "react";

const allPlayers = {
  alpha: ["Rishu", "Piyush", "Raushan", "Bishu", "Ayush", "Nitish", "Bholu", "Vicky"],
  bravo: ["Rahul", "Butta", "Abhishek"],
  charlie: ["Golu", "Lotta", "Manish", "Anshu", "Vikram", "Neta", "Heera"],
  special: ["Amit", "Sushil"],
};

function divideTeams(presentPlayers) {
  let team1 = [];
  let team2 = [];
  
  Object.keys(presentPlayers).forEach(category => {
      let players = [...presentPlayers[category]];
      players.sort(() => Math.random() - 0.5); // Shuffle players
      
      for (let i = 0; i < players.length; i++) {
          if (team1.length <= team2.length) {
              team1.push(players[i]);
          } else {
              team2.push(players[i]);
          }
      }
  });
  
  return { team1, team2 };
}

export default function PlayerSelector() {
  const [presentPlayers, setPresentPlayers] = useState({
      alpha: [...allPlayers.alpha],
      bravo: [...allPlayers.bravo],
      charlie: [...allPlayers.charlie],
      special: [...allPlayers.special],
  });

  function togglePlayer(category, player) {
      setPresentPlayers((prev) => {
          const updatedCategory = prev[category].includes(player)
              ? prev[category].filter((p) => p !== player)
              : [...prev[category], player];
          return { ...prev, [category]: updatedCategory };
      });
  }

  const { team1, team2 } = divideTeams(presentPlayers);

  return (
      <div className="container">
          <h2 className="title">Volleyball Team</h2>
          <h2 className="title">Select Present Players</h2>
          {Object.entries(allPlayers).map(([category, players]) => (
              <div key={category} className="category-section">
                  <h3 className="category-title">{category.toUpperCase()}</h3>
                  {players.map((player) => (
                      <label key={player} className="player-label">
                          <input
                              type="checkbox"
                              checked={presentPlayers[category].includes(player)}
                              onChange={() => togglePlayer(category, player)}
                              className="checkbox"
                          />
                          {player}
                      </label>
                  ))}
              </div>
          ))}

          <div className="teams-container">
              <h2 className="title">Teams</h2>
              <div className="teams-grid">
                  <div className="team">
                      <h3 className="team-title">Team 1</h3>
                      <ul className="team-list">
                          {team1.map((player) => (
                              <li key={player} className="player-name">{player}</li>
                          ))}
                      </ul>
                  </div>
                  <div className="team">
                      <h3 className="team-title">Team 2</h3>
                      <ul className="team-list">
                          {team2.map((player) => (
                              <li key={player} className="player-name">{player}</li>
                          ))}
                      </ul>
                  </div>
              </div>
          </div>
      </div>
  );
}