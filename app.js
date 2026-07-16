"use strict"

import Slider from "./sliderFiles/slider.js"


const dotContainer = document.getElementById('dot-container');

let pics = new Array;

if(!dotContainer) console.error("Forbidden: dot-container ID its forbidden.");

else{

    pics = await getDatasFromJSON("sliderImages");

    let slider1 = new Slider("img-container",pics,"dot-container","fade")
}




async function getDatasFromJSON(key) {

        let response = await fetch("data.json" );

        if(!response.ok){
            throw new Error("Forbidden:\ndata.json doesn't exist")
        }

        let data = await response.json();

        return data[key];
}
