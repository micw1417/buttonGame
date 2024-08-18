import axios from "axios";

export declare interface HighscoreObject {
    sessionId: string,
    score: number,
    name: string,
    time?: string
}

export async function getHighscores(): Promise<HighscoreObject[]> {
    return (await axios.get("http://localhost:8080/api/highscores/top10")).data;
}

export async function getSessionId(): Promise<string> {
    return (await axios.get("http://localhost:8080/api/highscores/sessionId")).data;
}
export async function postHighscores(sessionId: string, score: number, name: string) {
    const highscore: HighscoreObject = {sessionId, score, name}
    await axios.post("http://localhost:8080/api/highscores/createOrUpdate", highscore); 
    console.log("Posted!", "With a score of " + score + " and name of " + name);
}