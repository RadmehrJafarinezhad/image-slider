import { pics } from "../app.js"


function createSlider() {

    const root = document.getElementById("img-container");
    let count = 0;
    let imageIDs = new Array;
    let interval = null

    if (!root) throw new Error("Forbidden: \nimg-container not found.");

    return {

        createImgs() {



            root.innerHTML = "";

            for (let i = 0; i < pics.length; i++) {

                const newImage = document.createElement("img");
                newImage.src = pics[i];
                newImage.setAttribute("id", `img${i}`);
                newImage.classList.add(
                    "absolute",
                    "top-0",
                    "left-0",
                    "opacity-0",
                    "w-[300px]",
                    "h-[200px]",
                    "sm:w-[500px]",
                    "sm:h-[300px]",
                    "rounded-xl",
                    "object-cover",
                    "transition-opacity",
                    "duration-1000",
                    "ease-in-out",
                )

                root.appendChild(newImage);

                imageIDs.push(newImage.id);
                console.log(imageIDs)

            }

            document.getElementById(imageIDs[0]).classList.remove("opacity-0");
        },
        createDots() {

            const dotContainer = document.getElementById("dot-container");

            dotContainer.innerHTML = "";

            for (let i = 0; i < pics.length; i++) {
                const dot = document.createElement("button");

                let dot_ID = `dot${i}`;
                dot.addEventListener("click", () => {
                    slider(i)
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
                dotContainer.appendChild(dot)
                console.log(dot)
            }
            document.getElementById("dot0").classList.add("scale-125");
        },

        goNext() {

            const current = document.getElementById(imageIDs[count]);
            current.classList.add("opacity-0");

            if (count < imageIDs.length - 1) {

                count++

            } else {
                count = 0;
            }


            document.getElementById(imageIDs[count]).classList.remove("opacity-0");

            this.updateDots();

        },

        goPrev() {
            const current = document.getElementById(imageIDs[count]);
            current.classList.add("opacity-0");

            if (count > 0) {
                count--
            } else {
                count = imageIDs.length - 1;
            }



            document.getElementById(imageIDs[count]).classList.remove("opacity-0");

            this.updateDots();

        },

        sliderKeyboardControl(event) {

            if (event.key == "ArrowRight") {
                this.goNext();
            }

            else if (event.key == "ArrowLeft") {
                this.goPrev();
            }

        },
        autoPlay() {
            if (interval) return;

            interval = setInterval(() => this.goNext(), 4000)
        },

        startAutoPlay() {
            clearInterval(interval);

            interval = setInterval(() => this.goNext(), 2000);
        },

        stopAutoPlay() {
            clearInterval(interval);
        },

        updateDots() {
            let prevActiveDot = document.querySelector(".dot.scale-125");
            if (prevActiveDot) prevActiveDot.classList.remove("scale-125");
            document.getElementById(`dot${count}`).classList.add("scale-125")

        }
    }
}

export default createSlider;