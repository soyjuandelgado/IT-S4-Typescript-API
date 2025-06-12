import { getJokeText, scoreJoke } from "./joke";
import { getWeather } from "./weather";

document.addEventListener("DOMContentLoaded", () => {
    const btnNext = document.getElementById("next");
    if (btnNext) btnNext.addEventListener("click", nextJoke);

    const btnValJoke1 = document.getElementById("joke-val-1");
    const btnValJoke2 = document.getElementById("joke-val-2");
    const btnValJoke3 = document.getElementById("joke-val-3");
    if (btnValJoke1)
        btnValJoke1.addEventListener("click", valJoke.bind(null, 1));
    if (btnValJoke2) btnValJoke2.addEventListener("click", () => valJoke(2));
    if (btnValJoke3) btnValJoke3.addEventListener("click", () => valJoke(3));

    nextJoke();
    showWeather();
});

const nextJoke = async () => {
    const joke = document.getElementById("joke-text");
    if (!joke) return;

    try {
        const jokeText = await getJokeText();
        console.log(jokeText);
        joke.textContent = jokeText;
    } catch (error) {
        console.log(`nextJoke: ${error}`);
        joke.textContent = "Something got wrong";
    }
};

const valJoke = (value: number) => {
    scoreJoke(value);
};

const showWeather = async () => {
    const weather = document.getElementById("weather-info");
    if (!weather) return;
    try {
        let w = await getWeather();
        weather.textContent = `${w.temp}º - ${w.sky}`;
        console.log(w);
    } catch (error) {
        weather.textContent = "Tiempo no disponible";
        console.log(error);
    }
};
