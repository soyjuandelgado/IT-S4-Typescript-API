interface Joke {
    joke: string;
    score: number;
    date: string; //ISO Date
}

let reportJokes: Joke[] = [];
let lastJokeText: string;

/* MODIFICAR:
    [x] Devolver solo el texto de la broma en getJoke
    [x] Gestion de errores en GetJokeAPI
    [x] Solo añadir en reportJokes cuando se valora
    [x] Buscar si existe en reportJokes
    [] ¿Utilizar clases con metodos?: clase joke que se extendera por api
 */

export const getJokeText = (): Promise<string> => {
    return getJokeAPI()
        .then((response) => {
            console.log(`getJokeText response: ${response}`);
            lastJokeText = response;
            return response;
        })
        .catch((error) => {
            console.log("getJokeText - Error: " + error.message);
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
            console.log("getJokeAPI - Communication error: " + error.message);
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
    let jokeIndex = reportJokes.findIndex(({ joke }) => joke === lastJokeText); //findLastIndex() hay que cambiar a ES2023
    if (jokeIndex !== -1) {
        reportJokes[jokeIndex] = jokeScored;
    } else {
        reportJokes.push(jokeScored);
    }
    console.log(reportJokes);
};
