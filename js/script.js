"use strict"


window.addEventListener('DOMContentLoaded', () => {
    run();
});

function run(){
    let delay = 5000;
    let isStopped = [false, false, false];
    let firstActiveImage = [0, 1, 2];
    let currentImage = firstActiveImage.slice();

    let galleries = document.querySelectorAll(".gallery-container");
    let galleriesAmount = galleries.length;
    setGalleryIndex();

    const imageArrays = fillImageArrays();
    const imageAmount = fillImageAmount();

    setInvisible();

    addPagers();
    const pagerArray = fillPagerArray();
    setPagerIndex();

    setButtonListeners();

    let timers = startTimers();

    function setInvisible() {
        for (let i = 0; i < galleriesAmount; i++) {
            let galleryImageAmount = imageAmount[i];
            for (let j = 0; j < galleryImageAmount; j++) {
                let currentImage = imageArrays[i][j];
                currentImage.classList.add("invisible");
            }
            let currentActiveImage = imageArrays[i][firstActiveImage[i]]
            currentActiveImage.classList.remove("invisible");
        }
    }
    function runSlide(galleryIndex) {
        timers[galleryIndex] = setTimeout(() => runSlide(galleryIndex), delay);

        changeSlide("next", galleryIndex);
    }
    function startSlide(galleryIndex) {
        if (isStopped[galleryIndex] === true) {
            runSlide(galleryIndex);
            isStopped[galleryIndex] = false;
        }
    }
    function stopSlide(galleryIndex) {
        clearTimeout(timers[galleryIndex]);
        isStopped[galleryIndex] = true;
    }
    function nextPress(galleryIndex) {
        clearTimeout(timers[galleryIndex]);

        changeSlide("next", galleryIndex);
        if (!isStopped[galleryIndex]) {
            timers[galleryIndex] = setTimeout(() => runSlide(galleryIndex), delay);
        }
    }
    function prevPress(galleryIndex) {
        clearTimeout(timers[galleryIndex]);

        changeSlide("prev", galleryIndex);
        if (!isStopped[galleryIndex]) {
            timers[galleryIndex] = setTimeout(() => runSlide(galleryIndex), delay);
        }
    }
    function pagerPress(datasetNumber, galleryIndex) {
        clearTimeout(timers[galleryIndex]);

        changeSlide(Number(datasetNumber), galleryIndex);
        if (!isStopped[galleryIndex]) {
            timers[galleryIndex] = setTimeout(() => runSlide(galleryIndex), delay);
        }
    }
    function changeSlide(pointer, galleryIndex) {
        let currentImg = currentImage[galleryIndex];

        pagerArray[galleryIndex][currentImg].classList.remove("pager-active");
        imageArrays[galleryIndex][currentImg].classList.add("invisible");
        imageArrays[galleryIndex][currentImg].classList.remove("fade-in");
        imageArrays[galleryIndex][currentImg].classList.add("fade-out");
        if (pointer === "next") {
            currentImage[galleryIndex] === imageAmount[galleryIndex] - 1 ?
                currentImage[galleryIndex] = 0 : currentImage[galleryIndex]++;
        }
        else if (pointer === "prev") {
            currentImage[galleryIndex] === 0 ?
                currentImage[galleryIndex] = imageAmount[galleryIndex] - 1 : currentImage[galleryIndex]--;
        } else if (!isNaN(pointer)) {
            currentImage[galleryIndex] = pointer;
        }
        currentImg = currentImage[galleryIndex];
        pagerArray[galleryIndex][currentImg].classList.add("pager-active");
        imageArrays[galleryIndex][currentImg].classList.remove("invisible");
        imageArrays[galleryIndex][currentImg].classList.remove("fade-out");
        imageArrays[galleryIndex][currentImg].classList.add("fade-in");

        clearExcessFade(galleryIndex);
    }
    function addPagers() {
        for (let i = 0; i < galleriesAmount; i++) {
            let galleryImageAmount = imageAmount[i]

            for (let j = 0; j < galleryImageAmount; j++) {
                const parent = galleries[i].querySelector(".pager-container");
                const child = document.createElement("div");
                child.classList.add("pager-unit");
                child.dataset.number = `${j}`;
                parent.appendChild(child);
                if (j === firstActiveImage[i]) {
                    child.classList.add("pager-active");
                }
            }
        }
    }
    function clearExcessFade(galleryIndex) {            // когда быстро меняешь слайд, появлялось много анимаций fadeOut
        let previousLeft = currentImage[galleryIndex] - 2;
        let previousRight = currentImage[galleryIndex] + 2;
        let currentImageAmount = imageAmount[galleryIndex];

        if (previousLeft < 0) {
            previousLeft += currentImageAmount;
        }
        if (previousRight > currentImageAmount - 1) {
            previousRight -= currentImageAmount;
        }
        imageArrays[galleryIndex][previousLeft].classList.remove("fade-out");
        imageArrays[galleryIndex][previousRight].classList.remove("fade-out");
    }
    function setGalleryIndex(){
        for (let i = 0; i < galleriesAmount; i++) {
            galleries[i].dataset.index = `${i}`;
        }
    }
    function fillImageArrays() {
        let imageArrays = [];
        for (let i = 0; i < galleriesAmount; i++) {
            imageArrays.push(galleries[i].querySelectorAll(".photo-container > *"));
        }
        return imageArrays;
    }
    function fillImageAmount() {
        let imageAmounts = [];
        for (let i = 0; i < imageArrays.length; i++) {
            imageAmounts.push(imageArrays[i].length);
        }
        return imageAmounts;
    }
    function fillPagerArray() {
        let pagerArray = [];
        for (let i = 0; i < galleriesAmount; i++) {
            pagerArray.push(galleries[i].querySelectorAll(".pager-container > *"));
        }
        return pagerArray;
    }
    function setPagerIndex() {
        for (let i = 0; i < galleriesAmount; i++) {
            let galleryImageAmount = imageAmount[i];
            let galleryIndex = galleries[i].dataset.index;

            for (let j = 0; j < galleryImageAmount; j++) {
                let currentPagerUnit = pagerArray[i][j];
                currentPagerUnit.onclick = function() {
                    pagerPress(this.dataset.number, galleryIndex);
                };
            }

        }
    }
    function setButtonListeners() {
        for (let i = 0; i < galleriesAmount; i++) {
            let currentGallery = galleries[i];
            let galleryIndex = galleries[i].dataset.index;

            const nextButton = currentGallery.querySelector(".btn-next");
            const prevButton = currentGallery.querySelector(".btn-prev");
            const startButton = currentGallery.querySelector(".btn-start");
            const stopButton = currentGallery.querySelector(".btn-stop");

            nextButton.addEventListener("click", () => nextPress(galleryIndex));
            prevButton.addEventListener("click", () => prevPress(galleryIndex));
            startButton.addEventListener("click", () => startSlide(galleryIndex));
            stopButton.addEventListener("click", () => stopSlide(galleryIndex));
        }
    }
    function startTimers() {
        let timers = [];

        for (let i = 0; i < galleriesAmount; i++) {
            let currentGallery = i;
            timers.push(setTimeout(() => runSlide(currentGallery), delay));
        }
        return timers;
    }
}
