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
    // make the image container draggable and show the stamp: 
    let isDragging = false; 
    let targetX = 0; 
    let targetY = 0; 
    let previousMouseX = 0; 
    let previousMouseY = 0; 
    const pageMaxWidth = document.querySelector('.js-main').clientWidth; 
    const pageMinWidth = Math.floor(pageMaxWidth/4); 
    const pageMaxWidth_format = Number((pageMaxWidth/1000).toFixed(3)); 
    const pageMinWidth_format = Number((pageMinWidth/1000).toFixed(3)); 
    console.log(pageMinWidth_format); 

    const pageMaxHeight = document.querySelector('.js-main').clientHeight; 
    const pageMinHeight = Math.floor(pageMaxHeight/5);  
    const pageMaxHeight_format = Number((pageMaxHeight/1000).toFixed(3)); 
    const pageMinHeight_format = Number((pageMinHeight/1000).toFixed(3));
    console.log(pageMinHeight_format); 

    const keenSliderImageContainer = document.querySelector('.js-keen-slider-container');
    const stampArr = document.querySelectorAll('.js-stamp'); 


    keenSliderImageContainer.addEventListener('mousedown', e => {
        isDragging = true; 
        previousMouseX = e.clientX; 
        previousMouseY = e.clientY; 
        keenSliderImageContainer.addEventListener('mousemove', move); 
    });


    keenSliderImageContainer.addEventListener('mouseup', () => {
        console.log('image was removed'); 
        isDragging = false; 
        keenSliderImageContainer.removeEventListener('mousemove', move);
    });

    function move(e) {
        if(isDragging) {
            const deltaCoordinate = {
                x: e.clientX - previousMouseX, 
                y: e.clientY - previousMouseY
            }
            targetX += deltaCoordinate.x; 
            targetY += deltaCoordinate.y; 

            previousMouseX = e.clientX; 
            previousMouseY = e.clientY; 
            keenSliderImageContainer.style.left = `${targetX}px`; 
            keenSliderImageContainer.style.top = `${targetY}px`;
            console.log(`targetY: ${targetY}, targetX: ${targetX}`);
            
            rotateCard(); 
            displayStamp(); 
        }
    }

    /////////////////////////////////////////////////////////////////////////////
    // make the image container rotate when swiping left / right:  
    function rotateCard() {
        keenSliderImageContainer.style.transform = `rotate(${getCustomRotateValue()}deg)`; 
        console.log(getCustomRotateValue()); 
    }

    function getCustomRotateValue() {
        const maxAngleForContainer = 27; 
        return Math.floor(targetX / maxAngleForContainer); 
    }

    function displayStamp() {
        stampArr.forEach((stamp) => {
            stamp.style.opacity = "0"; 
        }); 
        if(targetY < -5 && inBetween(targetX, -110, 110)) {
            handleStampY(stampArr[2]); 
        }
        else if(targetX < 0 && inBetween(targetY, -200, 200)) {
            handleStampX(stampArr[0], targetX) 
        }
        else if(targetX > 0 && inBetween(targetY, -200, 200)) {
            handleStampX(stampArr[1], targetX);
        }  
    }
    
    function handleStampX(stamp) { 
        let fadeValue = Math.abs(targetX/1000).toFixed(3);
        console.log(fadeValue); 
        inBetween(fadeValue, pageMinWidth_format, pageMaxWidth_format) ? stamp.style.opacity = "1" : stamp.style.opacity = `${fadeValue * 2}`; 
    }

    function handleStampY(stamp) { 
        let fadeValue = Math.abs(targetY/1000).toFixed(3);
        inBetween(fadeValue, pageMinHeight_format, pageMaxHeight_format) ? stamp.style.opacity = "1" : stamp.style.opacity = `${fadeValue * 5}`;  
    }

    function inBetween(val, min, max) {
        return val > min && val < max; 
    }
    /*  

        stamp[2] ? inBetween(fadeValue, pageHeightMin, pageHeightMax) : inBetween(fadeValue, ) 
        fadeValue = Math.floor(Math.abs(coord) * 1.5); 
        inBetween(fadeValue, pageSizeMin, pageSizeMax) ? stamp.style.opacity = "1" : stamp.style.opacity = fadeValue; 



        
        setToOne ? stamp.style.opacity = "1" : stamp.style.opacity = fadevalue; 
        overlaps(fadeValue) ? setOpacityToOne() : setOpacityToDifferent()


        function setOpacityToOne() {
            fadeValue = "1"; 
            setToOne = true; 
        }

        function setOpacityToDifferent() {
            fadeValue = `0.${Math.floor(Math.abs(coord) * 1.5)}`; 
        }



        let wasChanged = false; 
        
        if(overlaps(fadeValue)) {
            fadeValue = "1"; 
            wasChanged = true; 
        }
        if(!wasChanged) {
            fadeValue = 0.math.floor(...); 
        }



        overlaps(fadeValue) ? isOverlapped = true : isOverlaped = false; 
        isOverlapped ? fadeValue = "1" : fadeValue = 0.Math.floor(..l.)
    */
}); 