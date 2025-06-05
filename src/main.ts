import { getJoke } from "./joke";

document.addEventListener("DOMContentLoaded", () =>{
    const button = document.getElementById("next");
    if (button)
        button.addEventListener("click", nextJoke);
    
    nextJoke();
});

const nextJoke = async () => {
    const joke = document.getElementById("joke");
    if (joke){
        const jokeObj = await getJoke();
        console.log(jokeObj);
        joke.textContent = jokeObj.status == 200 ? jokeObj.joke : jokeObj.status;
        //getJoke().then( text => joke.textContent = text.joke);
    }
}