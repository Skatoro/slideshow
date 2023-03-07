"use strict"


window.addEventListener('DOMContentLoaded', () => {
    run();
});

function run(){
    let delay = 3000;
    let currentImage = 0;

    const shoes = document.querySelectorAll(".container > *");
    const imageAmount = shoes.length - 1;

    addPagers();
    const pager = document.querySelectorAll(".pager-container > *");

    const nextButton = document.querySelector(".btn-next");
    const prevButton = document.querySelector(".btn-prev");

    nextButton.addEventListener("click", nextPress);
    prevButton.addEventListener("click", prevPress);
    for (let i = 0; i <= imageAmount; i++) {
        pager[i].onclick = function() {
            pagerPress(this.id);
        };
    }

    shoes[currentImage].style.opacity = "1";

    let timer = setTimeout(runSlide, delay);

    function runSlide() {
        timer = setTimeout(runSlide, delay)

        changeSlide("next");
    }
    function nextPress() {
        clearTimeout(timer);

        changeSlide("next")
        timer = setTimeout(runSlide, delay)
    }
    function prevPress() {
        clearTimeout(timer);

        changeSlide("prev");
        timer = setTimeout(runSlide, delay)
    }
    function pagerPress(id) {
        clearTimeout(timer);

        changeSlide(Number(id));
        timer = setTimeout(runSlide, delay)
    }
    function changeSlide(pointer) {
        pager[currentImage].classList.remove("pager-active");
        shoes[currentImage].style.opacity = "0";
        if (pointer === "next") {
            currentImage === imageAmount ? currentImage = 0 : currentImage++;
        }
        else if (pointer === "prev") {
            currentImage === 0 ? currentImage = imageAmount : currentImage--;
        } else if (!isNaN(pointer)) {
            currentImage = pointer;
        }
        else {
            alert(`wrong pointer`);
        }
        pager[currentImage].classList.add("pager-active");
        shoes[currentImage].style.opacity = "1";
    }
    function addPagers() {
        for (let i = 0; i <= imageAmount; i++) {
            const parent = document.querySelector(".pager-container");
            const child = document.createElement("div");
            child.classList.add("pager-unit");
            child.setAttribute("id", `${i}`);
            parent.appendChild(child)
            if (i === 0) {
                child.classList.add("pager-active");
            }
        }
    }
} 
