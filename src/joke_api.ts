export interface JokeRequest {
    url: string;
    conf: {};
    field: string;
}

export const requests: JokeRequest[] = [
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

export const getJoke = (): Promise<string> =>
    getJokeAPI(requests[Math.floor(Math.random() * requests.length)]);

export const getJokeAPI = ({ url, conf, field }: JokeRequest): Promise<string> => {
    let result = fetch(url, conf)
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            return res.json();
        })
        .then((response) => response[field])
    return result;
};