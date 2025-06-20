import { getJoke, getJokeAPI, JokeRequest } from "../src/joke_api";

describe('Function "getJoke"', () => {
    it("should be declared", () => {
        expect(typeof getJoke).toBe("function");
    });

    it("should return a string", async () => {
        const data = await getJoke();
        expect(typeof data).toBe("string");
    });
});

describe('Function "getJokeAPI"', () => {
    it("should be declared", () => {
        expect(typeof getJokeAPI).toBe("function");
    });

    it("should throw an error because an invalid request", async () => {
        const req: JokeRequest = {
            url: "",
            conf: {},
            field: "",
        };
        expect(getJokeAPI(req)).rejects.toThrow();
    });

    it("should throw an HTTP error", async () => {
        const req: JokeRequest = {
            url: "https://icanhazdadjoke.com/",
            conf: {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
            },
            field: "joke",
        };
        expect(getJokeAPI(req)).rejects.toThrow();
    });

    it("should return a string", async () => {
        const req: JokeRequest = {
            url: "https://api.chucknorris.io/jokes/random",
            conf: {}, 
            field: "value",
        };
        const data = await getJokeAPI(req);
        expect(typeof data).toBe("string");
    }); 
});
