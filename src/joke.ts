interface Joke {
    joke: string;
    score: number;
    date: string; //ISO Date
}

let reportJokes: Joke[] = [];

/* MODIFICAR:
    - Devolver solo el texto de la broma en getJoke
    - Gestion de errores en GetJokeAPI
    - Solo añadir en reportJokes cuando se valora
    - Buscar si existe en reportJokes
    - ¿Utilizar clases con metodos?: clase joke que se extendera por api
 */

export const getJoke = (): Promise<any> => {
    return getJokeAPI().then((response) => {
        if (response.status == 200) {
            reportJokes.push({
                joke: response.joke,
                score: 0,
                date: new Date().toISOString(),
            });
        }else{
            throw Error(response.statusText)
        }
        return response;
    });
};

const getJokeAPI = (): Promise<any> => {
    const conf = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "User-Agent":
                "IT API (https://github.com/soyjuandelgado/IT-S4-Typescript-API)",
        },
    };
    return fetch("https://icanhazdadjoke.com/", conf)
        .then((res) => (res.ok ? res.json() : res))
        .then((response) => response);
};

export const scoreJoke = (value: number) => {
    let lastJoke = reportJokes[reportJokes.length - 1];
    lastJoke.score = value;
    lastJoke.date = new Date().toISOString();
    console.log(reportJokes);
};
