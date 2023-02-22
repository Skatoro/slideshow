"use strict"

runSlide();

function runSlide(){
    let delay = 1000;
    let currentImage = 0;

    const shoesWrapper = document.querySelector(".shoes-wrapper");
    const shoes = document.querySelectorAll(".container > *");
    const imageAmount = shoes.length - 1;

    shoes[currentImage].style.opacity = "1";

    setTimeout(function run() {

        shoes[currentImage].style.opacity = "0";

        if (currentImage === imageAmount) {
            currentImage = 0;
        } else {
            currentImage++;
        }
        shoes[currentImage].style.opacity = "1";

        setTimeout(run, delay);
    }, delay);
}
