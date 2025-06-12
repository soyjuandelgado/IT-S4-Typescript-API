interface Joke {
    joke: string;
    score: number;
    date: string; //ISO Date
}

let reportJokes: Joke[] = [];
let lastJokeText: string;

export const getJokeText = (): Promise<string> => {
    return getJokeAPI()
        .then((response) => {
            lastJokeText = response;
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

const getJokeAPI = (): Promise<string> => {
    const conf = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "User-Agent":
                "IT API (https://github.com/soyjuandelgado/IT-S4-Typescript-API)",
        },
    };

    let result = fetch("https://icanhazdadjoke.com/", conf)
        .then((res) => {
            if (res.ok) return res.json();
            else throw new Error(String(res.status));
        })
        .then((response) => response.joke)
        .catch((error: Error) => {
            throw error;
        });

    return result;
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
