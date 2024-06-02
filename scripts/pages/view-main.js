///////////////////////////////////////////////////////////////////////////////////////
// make the buttons increase/decrease the size on hover:
const interactiveBtns = document.querySelectorAll('.js-interactive-button'); 

interactiveBtns.forEach((button) => {
    const interactionIcon = button.querySelector('.js-interaction-icon');
    interactionIcon.style.transition = "0.3s"; 
    button.addEventListener('mouseenter', () => { 
        interactionIcon.style.transform = "scale(1.2)"; 
    });
    button.addEventListener('mouseleave', () => {
        interactionIcon.style.transform = "none"; 
    }); 
})

/////////////////////////////////////////////////////////////////////////////////////
// make the slider buttons appear/disappear on hover:
const keenSlider = document.querySelector('.js-keen-slider'); 
const keenSliderContainer = document.querySelector('.js-keen-slider-button-container'); 

keenSlider.addEventListener('mouseenter', () => {
    const animationPromise = keenSliderContainer.animate(makeSmoothButtonAppearance, keenSliderContainer_timing).finished; 
    animationPromise.then(() => {
        keenSliderContainer.classList.add('active');
    })
}); 

keenSlider.addEventListener('mouseleave', () => {
    const animationPromise = keenSliderContainer.animate(makeSmoothButtonDisappearance, keenSliderContainer_timing).finished; 
    animationPromise.then(() => {
        keenSliderContainer.classList.remove('active');
    })
});

const makeSmoothButtonAppearance = [
    {opacity: "0"},
    {opacity: "0.5"},
    {opacity: "1"}
];
const makeSmoothButtonDisappearance = [
    {opacity: "1"},
    {opacity: "0.5"},
    {opacity: "0"} 
];

const keenSliderContainer_timing = {
    duration: 200
};

/////////////////////////////////////////////////////////////////////////////
// make the slider buttons interactive: 
document.addEventListener('DOMContentLoaded', () => {
    let sliderPosition = 0; 
    const sliderImageArr = [];
    const nextSlide_Button = document.querySelector('.js-next-slider-button');
    const previousSlide_Button = document.querySelector('.js-previous-slider-button'); 

    function setDefault() {
        nextSlide_Button.style.visibility = "visible"; 
        previousSlide_Button.style.visibility = "hidden"; 
    }

    setDefault(); 
    const images = document.querySelectorAll('.js-keen-slider-item'); 

    images.forEach((image) => {
        sliderImageArr.push(image)
    }); 

    console.log(sliderImageArr.length); 

    

    nextSlide_Button.addEventListener('click', () => {
        previousSlide_Button.style.visibility = "visible";  
        sliderPosition++; 
        updateSlide(); 
        if(sliderPosition === sliderImageArr.length -1) {
            nextSlide_Button.style.visibility = "hidden"; 
        }
    })

    previousSlide_Button.addEventListener('click', () => {
        nextSlide_Button.style.visibility = "visible"; 
        sliderPosition --; 
        updateSlide(); 
        if(sliderPosition === 0) {
            previousSlide_Button.style.visibility = "hidden"; 
        }
    }); 

    function updateSlide() {
        sliderImageArr.forEach((image) => {
            const index = sliderImageArr.indexOf(image); 
            if(index !== sliderPosition) {
                image.style.display = "none"; 
            }
            else {
                image.style.display = "block"; 
            }
        })
    }
    /*
    let slidePosition = 0; 
    const imgArr = []; 
    const images = document.querySelectorAll(images)
    images.forEach((image) => {
        imgArr.push(image)
    });

    const nextButton = document.querySelector('.js-next-button')
        .addEventListener('click', () => {
            if(sliderPosition === imgArr.length) {
                nextButton.style.display = "none"; 
            }
            else {
                sliderPosition++; 
                updateSlide(); 
            } 
        }); 

    function updateSlide() {
        imgArr.forEach((image) => {
            const index = imgArr.indexOf(image); 
            if(index !== slidePosition) {
                image[index].style.display = "none"; 
            }
            else {
                image[index].style.display = "flex"; 
            }
        })
    }

    const previousButton = document.querySelector('.js-previous-button')
        .addEventListener('click', () => {
            if(sliderPosition === 0) {
                previousButton.style.display = "none"; 
            }
            else {
                sliderPosition --; 
                updateSlide();  
            }
        })
    */
});
