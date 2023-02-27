"use strict"


window.addEventListener('DOMContentLoaded', () => {
    run();
});

function run(){
    let delay = 3000;
    let currentImage = 0;

    const shoes = document.querySelectorAll(".container > *");
    const imageAmount = shoes.length - 1;

    const counter = document.querySelector(".counter")

    const nextButton = document.querySelector(".btn-next");
    const prevButton = document.querySelector(".btn-prev");

    nextButton.addEventListener("click", nextPress)
    prevButton.addEventListener("click", prevPress)

    counter.innerHTML = (currentImage+1).toString()
    shoes[currentImage].style.opacity = "1";

    let timer = setTimeout(runSlide, delay);
    function runSlide() {
        timer = setTimeout(runSlide, delay)

        nextSlide();

        counter.innerHTML = (currentImage+1).toString()
    }
    function nextPress() {
        clearTimeout(timer);

        nextSlide();

        counter.innerHTML = (currentImage+1).toString()
        timer = setTimeout(runSlide, delay)
    }
    function prevPress() {
        clearTimeout(timer);

        prevSlide();

        counter.innerHTML = (currentImage+1).toString()
        timer = setTimeout(runSlide, delay)
    }
    function nextSlide() {
        shoes[currentImage].style.opacity = "0";
        if (currentImage === imageAmount) {
            currentImage = 0;
        } else {
            currentImage++;
        }
        shoes[currentImage].style.opacity = "1";
    }
    function prevSlide() {
        shoes[currentImage].style.opacity = "0";
        if (currentImage === 0) {
            currentImage = imageAmount;
        } else {
            currentImage--;
        }shoes[currentImage].style.opacity = "1";
    }
}
