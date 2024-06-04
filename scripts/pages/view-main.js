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


document.addEventListener('DOMContentLoaded', () => {

    /////////////////////////////////////////////////////////////////////////////
    // make the slider buttons interactive and handle the dots: 
    let sliderPosition = 0; 
    let dotPosition = -1; 
    const sliderImageArr = [];
    const sliderDotArr = []; 

    const nextSlide_Button = document.querySelector('.js-next-slider-button');
    const previousSlide_Button = document.querySelector('.js-previous-slider-button'); 

    function setDefault() {
        nextSlide_Button.style.visibility = "visible"; 
        previousSlide_Button.style.visibility = "hidden"; 
    }

    setDefault(); 
    const images = document.querySelectorAll('.js-keen-slider-item'); 


    images.forEach((image) => {
        dotPosition++; 
        const dot = document.createElement('button'); 
        dot.setAttribute('id', `${dotPosition}`);
        sliderDotArr.push(dot); 
        sliderImageArr.push(image);
    }); 

    sliderDotArr[0].classList.add('active'); 
    sliderDotArr.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = dot.getAttribute('id'); 
            sliderPosition = Number(index); 
            updateSlide(); 
        });
        document.querySelector('.js-slide-dot-container').append(dot); 
    }); 

    nextSlide_Button.addEventListener('click', () => {
        sliderPosition++; 
        updateSlide(); 
    })

    previousSlide_Button.addEventListener('click', () => {
        sliderPosition --; 
        updateSlide(); 
    }); 

    function updateSlide() {
        handleKeenSliderButtons(); 
        sliderImageArr.forEach((image) => {
            const index = sliderImageArr.indexOf(image); 
            updateSlideImage(index); 
            updateDots(index); 
        })
    } 

    function handleKeenSliderButtons() {
        if(sliderPosition === 0) {
            nextSlide_Button.style.visibility = "visible"; 
            previousSlide_Button.style.visibility = "hidden"; 
        }
        else if(sliderPosition === sliderImageArr.length -1) {
            nextSlide_Button.style.visibility = "hidden"; 
            previousSlide_Button.style.visibility = "visible"; 
        }
        else if(sliderPosition === 1) {
            nextSlide_Button.style.visibility = "visible"; 
            previousSlide_Button.style.visibility = "visible"; 
        }
    }

    function updateSlideImage(index) {
        const image = sliderImageArr[index]; 
        index === sliderPosition ? image.style.display = "block" : image.style.display = "none"; 
    }

    function updateDots(index) {
        const progressButton = sliderDotArr[index]; 
        index === sliderPosition ? progressButton.classList.add('active') : progressButton.classList.remove('active'); 
    }


    /////////////////////////////////////////////////////////////////////////////
    // make the image container draggable: 
    let isDragging = false; 
    let offsetX; 
    let offsetY;

    const keenSliderImageContainer = document.querySelector('.js-keen-slider-container');
    console.log(keenSliderImageContainer.getBoundingClientRect()); 
    keenSliderImageContainer.addEventListener('mousedown', e => {
        isDragging = true; 
        offsetX = e.clientX - keenSliderImageContainer.getBoundingClientRect().left; 
        offsetY = e.clientY - keenSliderImageContainer.getBoundingClientRect().top; 
        keenSliderImageContainer.addEventListener('mousemove', move); 
    });


    window.addEventListener('mouseup', () => {
        console.log('image was removed'); 
        isDragging = false; 
        keenSliderImageContainer.removeEventListener('mousemove', move);
    });

    function move(e) {
        if(isDragging) {
            keenSliderImageContainer.style.left = `${e.clientX - offsetX}px`; 
            keenSliderImageContainer.style.top = `${e.clientY - offsetY}px`;
        }
    }
}); 

/*
    let isDragged = false; 
    image.addEventListener('mousedown', (e) => { 
        isDragged = true; 
    });

    image.addEventListener('mousemove', (e) => {
        if(isDragged) {
            let x = e.offsetX; 
            let y = e.offsetY
            moveImage(image, x, y); 
        }
    });

    image.addEventListener('mouseup', (e) => {
        if(isDragged) {
            removeImage(image); 
            moveImage(directionX, directionY); 
            isDragged = false; 
        }
    })

    function moveImage(image, x, y) {
        image.style.transform = `translate(${x}, ${y})`; 
    }
*/
