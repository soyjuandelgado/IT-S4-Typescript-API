import { getJoke, getJokeAPI } from "../src/joke_api";
//const { getJoke, getJokeAPI } = require("../src/joke_api");

describe('Function "getJoke"', () => {
    it("should be declared", () => {
        expect(typeof getJoke).toBe("function");
    });
});
