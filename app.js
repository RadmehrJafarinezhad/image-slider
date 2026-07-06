"use strict"

import Slider from "./js/slider.js"


const dotContainer = document.getElementById('dot-container');

export let pics = new Array;

if(!dotContainer) console.error("Forbidden: dot-container ID its forbidden.");

else{
    sliderOneSettings()
}


async function sliderOneSettings() {

    pics = await getDatasFromJSON("sliderImages");

    let slider1 = new Slider("img-container",pics,"dot-container","wipe")

    document.addEventListener("keydown", slider1.sliderKeyboardControl);

    const sliderContainer = document.getElementById("slider-container");

    const right_slider_btn = document.getElementById('right-slider-btn');

    if(!right_slider_btn) throw new Error("Forbidden:\nright-slider-btn ID its forbidden.");
    else right_slider_btn.addEventListener("click",() => {
        slider1.goNext();
    });

    const left_slider_btn = document.getElementById('left-slider-btn')

    if(!left_slider_btn) throw new Error("Forbidden:\nright-slider-btn ID its forbidden.");
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
            throw new Error("Forbidden:\ndata.json doesn't exist")
        }

        let data = await response.json();

        return data[key];

    } catch (error) {

        throw new Error(error);

    }
}
