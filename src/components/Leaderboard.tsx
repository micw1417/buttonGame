import React from 'react';
import { HighscoreObject } from '../service/service';
interface Props {
  children: String;
  highscores: HighscoreObject[] | undefined;
}

const Leaderboard = ({highscores} : Props) => {
  return (
    <div className='leaderboard'>
      <h2>
        Leaderboard
      </h2>

      {highscores === undefined || highscores.length === 0 ? (
        <p>No scores found</p>
      ) : (
        <ul>
          {highscores.map((highscore, index) => (
            
            <li key={index}>
              
              {index+1}th | {highscore.name}: {highscore.score} clicks
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Leaderboard