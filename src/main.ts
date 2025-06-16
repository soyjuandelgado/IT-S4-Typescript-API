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
    const path ="./assets/img/weather/";
    const temp = document.getElementById("weather-info-text");
    const sky = document.getElementById("weather-icon-sky") as HTMLImageElement;
    if (!temp) return;
    if (!sky) return;
    try {
        let w = await getWeather();
        temp.textContent = w.temp;
        sky.alt = w.sky;
        sky.title = w.sky;
        sky.src = `${path}${w.skyCode}.svg`;
        console.log(w);
    } catch (error) {
        temp.textContent = "--";
        console.log(error);
    }
};
