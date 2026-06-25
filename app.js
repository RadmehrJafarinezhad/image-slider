"use strict"

import createSlider from "./js/slider.js"


const dotContainer = document.getElementById('dot-container');

export let pics = new Array;

if(!dotContainer) console.error("Forbidden: dot-container ID its forbidden.");

else{
    sliderOneSettings()
}


async function sliderOneSettings() {

    pics = await getDatasFromJSON("sliderImages");

    const slider1 = createSlider();
    slider1.createImgs();

    document.addEventListener("keydown", slider1.sliderKeyboardControl);

    const sliderContainer = document.getElementById("slider-container");

    const right_slider_btn = document.getElementById('right-slider-btn');

    if(!right_slider_btn) console.error("Forbidden: right-slider-btn ID its forbidden.");
    else right_slider_btn.addEventListener("click",() => {
        slider1.goNext();
        slider1.startAutoPlay();
    });

    const left_slider_btn = document.getElementById('left-slider-btn')

    if(!left_slider_btn) console.error("Forbidden: right-slider-btn ID its forbidden.");
    else left_slider_btn.addEventListener("click",() => {
        slider1.goPrev();
        slider1.startAutoPlay();
    });

    slider1.createDots();
    slider1.autoPlay();
}


async function getDatasFromJSON(key) {
    try {

        let response = await fetch("data.json" );

        if(!response.ok){
            throw new Error("Forbidden : data.json doesn't exist")
        }

        let data = await response.json();

        return data[key];

    } catch (error) {

        throw new Error(error);

    }
}



mobileNavInit()
