"use strict"


window.addEventListener('DOMContentLoaded', () => {
    run();
});

function run(){
    let delay = 5000;
    let currentImage = 0;
    let isStopped = false;
    let firstActiveImage = 0;

    const shoes = document.querySelectorAll(".container > *");
    const imageAmount = shoes.length - 1;
    setInvisible()

    addPagers();
    const pager = document.querySelectorAll(".pager-container > *");

    const nextButton = document.querySelector(".btn-next");
    const prevButton = document.querySelector(".btn-prev");
    const startButton = document.querySelector(".btn-start");
    const stopButton = document.querySelector(".btn-stop");

    nextButton.addEventListener("click", nextPress);
    prevButton.addEventListener("click", prevPress);
    startButton.addEventListener("click", runSlide);
    stopButton.addEventListener("click", stopSlide);
    for (let i = 0; i <= imageAmount; i++) {
        pager[i].onclick = function() {
            pagerPress(this.dataset.number);
        };
    }

    let timer = setTimeout(runSlide, delay);

    function setInvisible() {
        for (let i = 0; i <= imageAmount; i++) {
            shoes[i].classList.add("invisible");
        }
        shoes[firstActiveImage].classList.remove("invisible");
    }
    function runSlide() {
        timer = setTimeout(runSlide, delay);

        changeSlide("next");
        isStopped = false;
    }
    function stopSlide() {
        clearTimeout(timer);
        isStopped = true;
    }
    function nextPress() {
        clearTimeout(timer);

        changeSlide("next");
        if (!isStopped) {
            timer = setTimeout(runSlide, delay);
        }
    }
    function prevPress() {
        clearTimeout(timer);

        changeSlide("prev");
        if (!isStopped) {
            timer = setTimeout(runSlide, delay);
        }
    }
    function pagerPress(datasetNumber) {
        clearTimeout(timer);

        changeSlide(Number(datasetNumber));
        if (!isStopped) {
            timer = setTimeout(runSlide, delay);
        }
    }
    function changeSlide(pointer) {
        pager[currentImage].classList.remove("pager-active");
        shoes[currentImage].classList.add("invisible");
        shoes[currentImage].classList.remove("fade-in");
        shoes[currentImage].classList.add("fade-out");
        if (pointer === "next") {
            currentImage === imageAmount ? currentImage = 0 : currentImage++;
        }
        else if (pointer === "prev") {
            currentImage === 0 ? currentImage = imageAmount : currentImage--;
        } else if (!isNaN(pointer)) {
            currentImage = pointer;
        }
        pager[currentImage].classList.add("pager-active");
        shoes[currentImage].classList.remove("invisible");
        shoes[currentImage].classList.remove("fade-out");
        shoes[currentImage].classList.add("fade-in");

    }
    function addPagers() {
        for (let i = 0; i <= imageAmount; i++) {
            const parent = document.querySelector(".pager-container");
            const child = document.createElement("div");
            child.classList.add("pager-unit");
            child.dataset.number = `${i}`;
            parent.appendChild(child)
            if (i === firstActiveImage) {
                child.classList.add("pager-active");
            }
        }
    }
}
