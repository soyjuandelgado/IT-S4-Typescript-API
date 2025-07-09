import { getJoke } from "./joke_api";

interface Joke {
    joke: string;
    score: number;
    date: string; //ISO Date
}

let reportJokes: Joke[] = [];
let lastJokeText: string;

export const getReportJokes = () => [...reportJokes];
export const resetReportJokes = () => (reportJokes.length = 0);
export const getLastJokeText = () => lastJokeText;
export const setLastJokeText = (text: string) => (lastJokeText = text);

export const getJokeText = (): Promise<string> => {
    return getJoke().then((response) => {
        lastJokeText = response;
        return response;
    });
};

export const scoreJoke = (value: number) => {
    const jokeScored: Joke = {
        joke: lastJokeText,
        score: value,
        date: new Date().toISOString(),
    };
    let jokeIndex = reportJokes.findIndex(({ joke }) => joke === lastJokeText);
    if (jokeIndex !== -1) {
        reportJokes[jokeIndex] = jokeScored;
    } else {
        reportJokes.push(jokeScored);
    }
    console.log(reportJokes);
};
