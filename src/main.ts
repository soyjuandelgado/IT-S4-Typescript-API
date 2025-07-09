import { getJokeText, scoreJoke } from "./joke";
import { getWeather } from "./weather";

document.addEventListener("DOMContentLoaded", () => {
    const btnNext = document.getElementById("next");
    btnNext?.addEventListener("click", nextJoke);

    [1, 2, 3].forEach((score) => {
        const btn = document.getElementById(`joke-val-${score}`);
        btn?.addEventListener("click", () => valJoke(score));
    });

    nextJoke();
    showWeather();
});

const valJoke = (value: number) => {
    scoreJoke(value);
};

export const nextJoke = async () => {
    const joke = document.getElementById("joke-text");
    if (!joke) return;

    changeBackground();
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

export const changeBackground = () => {
    const back = document.getElementById("back-image");
    if (!back) return;
    back.classList = "overlay";
    back.classList.add(`blob${Math.floor(Math.random() * 10)}`);
};

export const showWeather = async () => {
    const path = "./assets/img/weather/";
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
