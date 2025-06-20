import {
    getJokeText,
    scoreJoke,
    setLastJokeText,
    getLastJokeText,
    getReportJokes,
    resetReportJokes,
} from "../src/joke";
//import * as jokeModule from "../src/joke";
import * as jokeAPIModule from "../src/joke_api";

describe("Function getJokeText", () => {
    it("should be declared", () => {
        expect(typeof getJokeText).toBe("function");
    });

    it("should return a string and update lastJokeText", async () => {
        const mockJoke = "Test joke";
        jest.spyOn(jokeAPIModule, "getJoke").mockResolvedValue(mockJoke);

        const result = await getJokeText();
        expect(typeof result).toBe("string");
        expect(result).toBe(mockJoke);
        expect(getLastJokeText()).toBe(mockJoke);
    });
});

describe("Function scoreJoke", () => {
    beforeEach(() => resetReportJokes());

    it("should be declared", () => {
        expect(typeof scoreJoke).toBe("function");
    });

    it("should add joke score in reportJokes", () => {
        const mockJoke = "Test joke";
        const value = 1;
        setLastJokeText(mockJoke);

        scoreJoke(value);

        const reportJokes = getReportJokes();
        expect(reportJokes.length).toBe(1);
        expect(reportJokes[0].joke).toBe(mockJoke);
        expect(reportJokes[0].score).toBe(value);
    });

    it("should update joke score in reportJokes", () => {
        const mockJoke = "Test joke";
        const value = 1;
        const value2 = 2;
        setLastJokeText(mockJoke);

        scoreJoke(value);
        scoreJoke(value2);

        const reportJokes = getReportJokes();
        expect(reportJokes.length).toBe(1);
        expect(reportJokes[0].joke).toBe(mockJoke);
        expect(reportJokes[0].score).toBe(value2);
    });
});
