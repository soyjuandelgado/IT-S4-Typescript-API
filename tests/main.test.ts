/**
 * @jest-environment jsdom
 */

import { nextJoke, changeBackground, showWeather } from "../src/main";
import * as jokeModule from "../src/joke";
import * as weatherModule from "../src/weather";

describe("Change DOM, nextJoke function", () => {
    beforeEach(() => {
        document.body.innerHTML = `<div id="joke-text"></div>`;
    });

    it("should be declared", () => {
        expect(typeof nextJoke).toBe("function");
    });

    it("should show next joke text", async () => {
        const mockJoke = "Fake joke";
        jest.spyOn(jokeModule, "getJokeText").mockResolvedValue(mockJoke);

        await nextJoke();

        const jokeDiv = document.getElementById("joke-text")!;
        expect(jokeDiv.textContent).toBe(mockJoke);
    });

    it("should show an error", async () => {
        jest.spyOn(jokeModule, "getJokeText").mockRejectedValue("Error");

        await nextJoke();

        const jokeDiv = document.getElementById("joke-text");
        expect(jokeDiv?.textContent).toBe("Something got wrong");
    });
});

describe("Change DOM, changeBackground function", () => {
    beforeEach(() => {
        document.body.innerHTML = `<div id="back-image"></div>`;
    });

    it("should be declared", () => {
        expect(typeof changeBackground).toBe("function");
    });

    it("should change class to blob", () => {
        jest.spyOn(Math, "random").mockReturnValue(0.1);
        const img = document.getElementById("back-image")!;
        changeBackground();
        expect(img.classList.contains("blob1")).toBe(true);
    });
});

describe("Change DOM, showWeather function", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <p id="weather-info-text"></p>
            <img id="weather-icon-sky"></img>
        `;
    });

    it("should be declared", () => {
        expect(typeof showWeather).toBe("function");
    });

    it("should show weather information", async () =>{
        const temp = document.getElementById("weather-info-text")!;
        const sky = document.getElementById("weather-icon-sky")! as HTMLImageElement;

        const mockWeather = {
                temp: "20",
                sky: "Despejado",
                skyCode: "11",
            };
        jest.spyOn(weatherModule, "getWeather").mockResolvedValue(mockWeather);
        
        await showWeather();

        expect(temp.textContent).toBe(mockWeather.temp);
        expect(sky.alt).toBe(mockWeather.sky);
        expect(sky.title).toBe(mockWeather.sky);
        expect(sky.src.includes(mockWeather.skyCode)).toBe(true);
    })

    it("should show error weather information", async () =>{
        const temp = document.getElementById("weather-info-text")!;

        jest.spyOn(weatherModule, "getWeather").mockRejectedValue("Error");
        
        await showWeather();

        expect(temp.textContent).toBe("--");
    })
});
