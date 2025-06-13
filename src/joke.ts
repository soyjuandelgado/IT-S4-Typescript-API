interface Joke {
    joke: string;
    score: number;
    date: string; //ISO Date
}

interface JokeRequest {
    url: string;
    conf: {};
    field: string;
}

let reportJokes: Joke[] = [];
let lastJokeText: string;
const requests: JokeRequest[] = [
    {
        url: "https://api.chucknorris.io/jokes/random",
        conf: {},
        field: "value",
    },
    {
        url: "https://icanhazdadjoke.com/",
        conf: {
            method: "GET",
            headers: {
                Accept: "application/json",
                "User-Agent":
                    "IT API (https://github.com/soyjuandelgado/IT-S4-Typescript-API)",
            },
        },
        field: "joke",
    },
];

export const getJokeText = (): Promise<string> => {
    return getJoke()
        .then((response) => {
            lastJokeText = response;
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

const getJoke = (): Promise<string> =>
    getJokeAPI(requests[Math.floor(Math.random() * requests.length)]);

const getJokeAPI = ({ url, conf, field }: JokeRequest): Promise<string> => {
    let result = fetch(url, conf)
        .then((res) => {
            if (res.ok) return res.json();
            else throw new Error(String(res.status));
        })
        .then((response) => response[field])
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
