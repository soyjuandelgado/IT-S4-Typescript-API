export const getJoke = () : Promise<any> => {
    const conf = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "User-Agent": "IT API (https://github.com/soyjuandelgado/IT-S4-Typescript-API)"
        }
    }
    return fetch("https://icanhazdadjoke.com/", conf)
        .then(res => res.ok ? res.json() : res)
        .then(response => response);
}