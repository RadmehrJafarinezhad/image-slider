"use strict"

import Slider from "./sliderFiles/slider.js"


const dotContainer = document.getElementById('dot-container');


if (!dotContainer) console.error("Forbidden: dot-container ID its forbidden.");

else {

    const pics = await getDatasFromJSON("sliderImages");

    const slider1 = new Slider({
        rootID: "img-container",
        pics: pics,
        dotContainerID: "dot-container",
        pTagID: "count",
        rightButtonID: "right-slider-btn",
        leftButtonID: "left-slider-btn",
        delay: 3000,
    });

}




async function getDatasFromJSON(key) {

    let response = await fetch("data.json");

    if (!response.ok) {
        throw new Error("Forbidden:\ndata.json doesn't exist")
    }

    let data = await response.json();

    return data[key];
}
