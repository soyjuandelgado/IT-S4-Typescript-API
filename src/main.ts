import { getJoke } from "./joke";

document.addEventListener("DOMContentLoaded", () =>{
    const button = document.getElementById("next");
    if (button)
        button.addEventListener("click", nextJoke);
    
    nextJoke();
});

const nextJoke = () => {
    const joke = document.getElementById("joke");
    if (joke){
        getJoke().then( text => joke.innerHTML = text.joke);
    }
}

// Para hacerlo sin innerHTML
// const textNode = document.createTextNode(text);
// if(joke.firstChild){
//     joke.replaceChild(joke.firstChild, textNode);
// }else{
//     joke.appendChild(textNode);
// }