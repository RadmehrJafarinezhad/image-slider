"use strict"

class Slider {

    root = null
    count = 0;
    imageIDs = [];
    interval = null;
    #lastTransition = null;
    #imgCount = null;

    constructor(rootID, pics, dotContainerID, transition) {
        this.rootID = rootID
        this.pics = pics
        this.dotContainerID = dotContainerID

        this.root = document.getElementById(this.rootID);
        this.dotContainer = document.getElementById(this.dotContainerID);

        this.transition = transition;

        if (this.transition == "fade") {

            this.class = ["opacity-0", "transition-opacity"];

        } else if (this.transition == "wipe") {

            this.class = "translate-x-full";
            this.#lastTransition = "translate-x-full";

        }

        this.createImgs();
        this.createDots();
    }

    createImgs() {

        this.root.innerHTML = "";

        for (let i = 0; i < this.pics.length; i++) {


            const newImage = document.createElement("img");
            newImage.src = this.pics[i];
            newImage.setAttribute("id", `img${i}`);


            let imgClasses = [
                "absolute",
                "top-0",
                "left-0",
                "w-[300px]",
                "h-[200px]",
                "sm:w-[500px]",
                "sm:h-[300px]",

                "object-cover",
                "duration-1000",
                "ease-in-out",
                this.class
            ].flat();

            newImage.classList.add(...imgClasses);

            this.root.appendChild(newImage);

            this.imageIDs.push(newImage.id);
            console.log(this.imageIDs);


        }

        this.#imgCount = this.imageIDs[this.count];

        switch (this.transition) {

            case "fade":
                document.getElementById(this.#imgCount).classList.remove("opacity-0");
                break;

            case "wipe":
                document.getElementById(this.#imgCount).classList.replace("translate-x-full", "translate-x-0");
                break;

        }
    }
    createDots() {

        this.dotContainer.innerHTML = "";

        for (let i = 0; i < this.pics.length; i++) {
            const dot = document.createElement("button");

            let dot_ID = `dot${i}`;
            dot.addEventListener("click", () => {
                this.goToID(i)
            });
            dot.classList.add(
                "dot",
                "h-3",
                "w-3",
                "sm:w-4",
                "sm:h-4",
                "m-2",
                "bg-white",
                "rounded-[100%]",
                "shadow",
                "shadow-black",
                "shadow-lg",
                "border-gray-200",
                "border-[1px]",
                "hover:scale-125",
                "transition-transform",
                "duration-100"
            );

            dot.setAttribute("id", dot_ID)
            this.dotContainer.appendChild(dot)
            console.log(dot)
        }
        document.getElementById("dot0").classList.add("scale-125");
    }

    goToID(value) {

        this.count = value;

        this.slideConfig()

        this.startAutoPlay();
    }
    goNext() {

        this.currentTransition(this.transition,"hide","next")

        if (this.count < this.imageIDs.length - 1) {

            this.count++

        } else {
            this.count = 0;
        }

        this.currentTransition(this.transition,"show","next")
        this.slideConfig()
    }

    goPrev() {

        this.currentTransition(this.transition,"hide","prev");

        if (this.count > 0) {
            this.count--
        } else {
            this.count = this.imageIDs.length - 1;
        }

        this.currentTransition(this.transition,"show","prev");
        this.slideConfig()

    }

    sliderKeyboardControl(event) {

        if (event.key == "ArrowRight") {
            this.goNext();
        }

        else if (event.key == "ArrowLeft") {
            this.goPrev();
        }

    }
    autoPlay() {
        if (this.interval) return;

        this.interval = setInterval(() => this.goNext(false), 4000)
    }

    startAutoPlay() {
        clearInterval(this.interval);

        this.interval = setInterval(() => this.goNext(), 2000);
    }

    stopAutoPlay() {
        clearInterval(this.interval);
    }

    updateDots() {
        let prevActiveDot = document.querySelector(".dot.scale-125");
        if (prevActiveDot) prevActiveDot.classList.remove("scale-125");
        document.getElementById(`dot${this.count}`).classList.add("scale-125")

    }
    slideConfig() {

        this.updateDots();

        this.startAutoPlay();
    }
    currentTransition(value, action,arrow) {

        this.#imgCount = this.imageIDs[this.count];

        if (value == "fade") {

            if (action == "hide") {

                document.getElementById(this.#imgCount).classList.add("opacity-0");

            }

            if (action == "show") {

                document.getElementById(this.#imgCount).classList.remove("opacity-0");

            }

        } else if (value == "wipe") {

            this.#imgCount = this.imageIDs[this.count];

            switch(action) {

                case "hide":
                    switch(arrow){

                        case "prev":
                            document.getElementById(this.#imgCount).classList.replace("translate-x-0","-translate-x-full");
                            this.#lastTransition = "-translate-x-full";
                            break;

                        case "next":
                            document.getElementById(this.#imgCount).classList.replace("translate-x-0","translate-x-full");
                            this.#lastTransition = "translate-x-full";
                            break;

                    }
                    break;

                case "show":

                    const img = document.getElementById(this.#imgCount);

                    document.getElementById(this.#imgCount).classList.remove("-translate-x-full","translate-x-full")

                    document.getElementById(this.#imgCount).classList.add( "translate-x-0");
                    break;
            }
        }
    }
}
export default Slider;