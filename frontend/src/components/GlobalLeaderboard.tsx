import axios from 'axios'
import React from 'react'

export interface LeaderboardEntry {
    name: string,
    score: number
}

const GlobalLeaderboard = () => {
    const [leaderboard, setLeaderboard] = React.useState<LeaderboardEntry[]>([]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            axios.get("/api/leaderboard").then((response) => {
                console.log(response.data);
                setLeaderboard(response.data);
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

  return (
    <div>
      {leaderboard.map((entry) => (
        <div key={entry.name}>
          {entry.name}: {entry.score}
        </div>
      ))}
    </div>
  )
}

export default GlobalLeaderboard