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

/*
    1. assuming only the interactive buttons hava the data attribute: 
    interactiveBtns.forEach(interactiveBtn => {
        if(interactiveBtn.dataset.iconType === "star") {
            starIcon_Arr.push(interactiveBtn); 
        }    
        else if(interactiveBtn.dataset.iconType === "heart") {
            heartIcon_Arr.push(interactiveBtn); 
        }
        else if(interactiveBtn.dataset.icoonType === "rejection") {
            rejectionIcon_Arr.push(interactiveBtn); 
        }
    })
*/

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
    const superLikeAction_Arr = document.querySelectorAll('[data-action-type="superLike"]'); 
    const rejectAction_Arr = document.querySelectorAll('[data-action-type="reject"]'); 
    const likeAction_Arr = document.querySelectorAll('[data-action-type="like"]'); 
    const actionBtns = document.querySelectorAll('.js-fade-button'); 

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

    let fadeValue = 0; 
    let stopFading = false; 

    function displayStamp() {
        stampArr.forEach((stamp) => {
            stamp.style.opacity = "0"; 
        }); 
        if(targetY < -5 && inBetween(targetX, -110, 110)) {
            handleStamp(stampArr[2], targetY, pageMinHeight_format, pageMaxHeight_format); 
            fadeActionBtn(superLikeAction_Arr, targetY); 
        }
        else if(targetX < 0 && inBetween(targetY, -200, 200)) {
            handleStamp(stampArr[0], targetX, pageMinWidth_format, pageMaxWidth_format); 
            fadeActionBtn(rejectAction_Arr, targetX); 
        }
        else if(targetX > 0 && inBetween(targetY, -200, 200)) {
            handleStamp(stampArr[1], targetX, pageMinWidth_format, pageMaxWidth_format);
            fadeActionBtn(likeAction_Arr, targetX); 
        }  
    }
    // function 
    // function handleStamp(stamp) { 
    //     let fadeValue = Math.abs(targetX/1000).toFixed(3);
    //     inBetween(fadeValue, pageMinWidth_format, pageMaxWidth_format) ? stamp.style.opacity = "1" : stamp.style.opacity = `${fadeValue * 2}`; 
    // }
    // 
    /*
        
        function stopFadingForAllButtons() {
            document.
        }

        function handleStamp(stamp, min_format, max_format) {  
            stopFading = false;
            fadeValue = getCustomFadeValue(targetX); 
            if(inBetween(fadeValue, min_format, max_format)) {
                stamp.style.opacity = "1";
                stopFading = true;  
            }
            else {        
                stamp.style.opacity = `${fadeValue * 5}`
            }
        }

        function fadeActionBtn(actionArr) {
        fadeValue = getCustomFadeValue(targetY); 
        stopFading ? (actionArr[0].style.display = "inline", actionArr[1].style.display = "none", actionArr[2].style.opacity = "0")
                   : (actionArr[0].style.display = "none", actionArr[1].style.display = "inline", actionArr[2].style.opacity = `${fadeValue * 5}`); 
        }

        function getCustomFadeValue(coord) {
            return Math.abs(coord/1000).toFixed(3); 
        }
    */
    function handleStamp(stamp, coord, min_format, max_format) {  
        fadeValue = getCustomFadeValue(coord); 
        if(inBetween(fadeValue, min_format, max_format)) {
            stopFading = true; 
            stamp.style.opacity = "1"; 
        }
        else {        
            stopFading = false; 
            stamp.style.opacity = `${fadeValue * 5}`; 
            console.log(fadeValue)
        }
    }

    function inBetween(val, min, max) {
        return val > min && val < max; 
    }
    
    function getCustomFadeValue(coord) {
        return Math.abs(coord/1000).toFixed(3); 
    }

    function fadeActionBtn(actionArr, coord) {
        actionBtns.forEach((actionBtn) => {
            actionBtn.style.opacity = "0"; 
        })
        fadeValue = getCustomFadeValue(coord); 
        const scaleVal = coord === targetX ? 3 : 5.2; 
        stopFading ? (actionArr[0].classList.remove('outline-hidden'), actionArr[1].style.display = "inline", actionArr[2].style.display = "none", actionArr[3].style.opacity = "0")
                   : (actionArr[0].classList.add('outline-hidden'), actionArr[1].style.display = "none", actionArr[2].style.display = "inline", actionArr[3].style.opacity = `${fadeValue * 5}`, actionArr[3].style.transform = `scale(${fadeValue * scaleVal})`); 
    }
}); 
/*
    make stopFading value a true, each time, there is a switch to either direction; 

    actionButton.style.outlineColor = "none"; 
    actionButton.style.outlineColor = "(var)"

    1. What do we want to toggle? we want to toggle WHITE image whose display property is either inline or none
    2. When do we want to toggle it? we want to toggle in two stages. First stage: when it reaches the point where the stamp fully 
    reveals (its display should be none), or,  when it reaches the bottom 
    Second stage: while the image container is dragged and moving, the WHITE image should always be visible. 
    3. 

    function handleStampY(stamp) {

        let fadeValue = Math.abs(targetY/1000).toFixed(3);
        if(inBetween(fadeValue, pageMinHeight_format, pageMaxHeight_format)) {
            stamp.style.opacity = "1";
            fadeSuperLike_btn.style.opacity = "0"; 
            
        }
        else {        
            stamp.style.opacity = `${fadeValue * 5}`
            fadeSuperLike_btn.style.opacity = `${fadeValue * 5}`; 
            console.log(fadeValue); 
        }
    }

    function fadeActionBtn(actionArr) {
        actionArr[0].style.display = "inline"; 
        actionArr[1].style.display = "none"
        actionArr[2].style.opacity = "0"; 
    }


*/