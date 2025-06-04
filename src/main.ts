document.addEventListener("DOMContentLoaded", () =>{
    const button = document.getElementById("next");
    if (button)
        button.addEventListener("click", nextJoke);
});

const nextJoke = () => {
    const joke = document.getElementById("joke");
    if (joke)
        joke.innerHTML = "Chiste";
}