"use strict"

class Slider {

    root = null
    count = 0;
    imageIDs = [];
    interval = null;
    #imagesClasses = ["absolute", "top-0", "left-0", "w-[300px]", "h-[200px]", "sm:w-[500px]", "sm:h-[300px]", "object-cover", "duration-1000", "ease-in-out", "opacity-0", "transition-opacity"];
    #dotsClass = ["dot", "h-3", "w-3", "sm:w-4", "sm:h-4", "m-2", "bg-white", "rounded-[100%]", "shadow", "shadow-black", "shadow-lg", "border-gray-200", "border-[1px]", "hover:scale-125", "transition-transform", "duration-100"]
    #imgCount = null;
    #delay = 3000;


    constructor({ rootID = "", pics = [], dotContainerID = "", pTagID = "", rightButtonID = "", leftButtonID = "", delay = 0 }) {

        this.rootID = rootID
        this.pics = pics
        this.dotContainerID = dotContainerID

        this.root = document.getElementById(this.rootID);

        this.dotContainer = document.getElementById(this.dotContainerID);

        this.#delay = delay;

        this.pCount = document.getElementById(pTagID);

        this.rightButton = document.getElementById(rightButtonID);
        this.leftButton = document.getElementById(leftButtonID);

        this.rightButton.addEventListener("click", () => this.nextSlide())
        this.leftButton.addEventListener("click", () => this.previousSlide())

        document.addEventListener("keydown", event => this.handleKeyboardNavigation(event));

        this.createImages();
        this.createDots();

        this.autoPlay();
    }

    createImages() {

        this.imageIDs = [];

        this.root.innerHTML = "";

        for (let i = 0; i < this.pics.length; i++) {


            const newImage = document.createElement("img");
            newImage.src = this.pics[i];
            newImage.setAttribute("id", `img${i}`);


            newImage.classList.add(...this.#imagesClasses);

            this.root.appendChild(newImage);

            this.imageIDs.push(newImage.id);


        }

        this.#imgCount = this.imageIDs[this.count];



        document.getElementById(this.#imgCount).classList.remove("opacity-0");
    }
    createDots() {

        this.dotContainer.innerHTML = "";

        for (let i = 0; i < this.pics.length; i++) {
            const dot = document.createElement("button");

            let dot_ID = `dot${i}`;
            dot.addEventListener("click", () => {
                this.goToSlide(i)
            });
            dot.classList.add(...this.#dotsClass);

            dot.setAttribute("id", dot_ID)
            this.dotContainer.appendChild(dot)
        }
        document.getElementById("dot0").classList.add("scale-125");
    }

    goToSlide(value) {


        if (value < this.count || value > this.count) {
            this.setSlideVisibility("hide")
        } else {
            this.startAutoPlay();
            return
        }

        this.count = value;


        this.setSlideVisibility("show")

        this.updateSliderState();
    }
    nextSlide() {

        this.setSlideVisibility("hide")

        if (this.count < this.imageIDs.length - 1) {

            this.count++

        } else {
            this.count = 0;
        }

        this.setSlideVisibility("show")
        this.updateSliderState()
    }

    previousSlide() {

        this.setSlideVisibility("hide");

        if (this.count > 0) {
            this.count--
        } else {
            this.count = this.imageIDs.length - 1;
        }

        this.setSlideVisibility("show");
        this.updateSliderState()


    }

    handleKeyboardNavigation(event) {

        if (event.key == "ArrowRight") {
            this.nextSlide();
        }

        else if (event.key == "ArrowLeft") {
            this.previousSlide();
        }

    }

    autoPlay() {

        if (this.interval) {
            return;
        }

        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.#delay);
    }

    startAutoPlay() {
        clearInterval(this.interval);

        this.interval = setInterval(() => this.nextSlide(), this.#delay);
    }

    updateDots() {
        let prevActiveDot = document.querySelector(".dot.scale-125");
        if (prevActiveDot) prevActiveDot.classList.remove("scale-125");
        document.getElementById(`dot${this.count}`).classList.add("scale-125")

    }
    updateSliderState() {

        this.updateDots();

        this.startAutoPlay();

        this.pCount.textContent = `${this.count + 1} / ${this.imageIDs.length}`
    }
    setSlideVisibility(action) {

        this.#imgCount = this.imageIDs[this.count];


        if (action == "hide") {

            document.getElementById(this.#imgCount).classList.add("opacity-0");

        }

        if (action == "show") {

            document.getElementById(this.#imgCount).classList.remove("opacity-0");

        }
    }
}
export default Slider;