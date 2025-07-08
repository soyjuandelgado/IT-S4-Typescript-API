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

const getJokeAPI = ({ url, conf, field }: JokeRequest): Promise<string> => {
    let result = fetch(url, conf)
        .then((res) => {
            if (res.ok) return res.json();
            else throw new Error(String(res.status));
        })
        .then((response) => response[field])


    return result;
};