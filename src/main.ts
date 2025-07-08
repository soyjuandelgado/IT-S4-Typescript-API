import { getJokeText, scoreJoke } from "./joke";
import { getWeather } from "./weather";

document.addEventListener("DOMContentLoaded", () => {
    const btnNext = document.getElementById("next");
    if (btnNext) btnNext.addEventListener("click", nextJoke);

    [1,2,3].forEach((score) => {
        const btn = document.getElementById(`joke-val-${score}`);
        if(btn) btn.addEventListener("click", () => valJoke(score))
    })

    nextJoke();
    showWeather();
});

const nextJoke = async () => {
    const joke = document.getElementById("joke-text");
    if (!joke) return;

    joke.textContent = "Thinking... 🤔";

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
