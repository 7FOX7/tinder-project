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

    const keenSliderImageContainer = document.querySelector('.js-keen-slider-container');
    const stampArr = document.querySelectorAll('.js-stamp'); 

    const initialPosition = {
        positionX: keenSliderImageContainer.getBoundingClientRect().x, 
        positionY: keenSliderImageContainer.getBoundingClientRect().y         
    }; 


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
        // if(keenSliderImageContainer.style.left >= "25") {
        //     console.log('you are on the right'); 
        // }
        // else if(keenSliderImageContainer.getBoundingClientRect().left >= 1470) {
            // likeAnim().finished; 
        //}
        // else if(keenSliderImageContainer.getBoundingClientRect().left <= 200) {
            // calcelAnim(); 
        //}
        // else if(keenSliderImageContainer.getBoundingClientRect().top >= 705) {
            // putInPlaceAnim(); 
        //}
    });

    function move(e) {
        /*
            if there is prioritize for the swiping to the right/left/top/down , then play that animation:

            targetX > 0 ? startSwipeRightAnim() : startSwipeLeftAnim()

            function rotateHorizontal() {
                increase the degrees in rotation as long as the targetX is increasing: 
                let rotationStrength = targetX; 
                keenSliderImageContainer.style.transform = `scale(${rotationStrength}deg)`;
            }

            function increaseBy(increasedNum) {
                const rotateTheCard = {
                    transform: rotate(${increasedNum}deg)
                } 
                
                keenSliderImageContainer.animate(rotateTheCard)
            }
        */
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
    console.log(keenSliderImageContainer.getBoundingClientRect()); 
    function rotateCard() {
        keenSliderImageContainer.style.transform = `rotate(${getCustomRotateValue()}deg)`; 
        console.log(getCustomRotateValue()); 
    }

    function getCustomRotateValue() {
        const maxAngleForContainer = 27; 
        return Math.floor(targetX / maxAngleForContainer); 
    }

    function displayStamp() {
        if(targetY < 0 && (targetX <=90 && targetX >= -90 || targetX === 0)) {
            animateStamp(stampArr[2]); 
        }
        else if(targetX < 0 && (targetY >= -20 || targetY <= 20)) {
            animateStamp(stampArr[0]) 
        }
        else if(targetX > 0 && (targetY >= -20 || targetY <= 20)) {
            animateStamp(stampArr[1]);
        }  
    }

    
    function animateStamp(stamp) {
        stampArr.forEach((value) => {
            value === stamp ? value.style.opacity = `0.${Math.abs(targetX) * 1.5}` : value.style.opacity = "0" ;  
        }); 
    }
    
    /*
        function displayAction() {
            if(isMoved) {        
                const rejectStamp = keenSliderImageContainer.querySelector('.js-reject-stamp'); 
                const likeStamp = keenSliderImageContainer.querySelector('.js-like-stamp'); 
                const superLikeStamp = keenSliderImageContainer.querySelector('.js-super-like-stamp'); 


                targetY > 0 ? superLikeStamp.style.display = "inline" : superLikeStamp.style.display = "none"; 
                targetX < 0 ? rejectStamp.style.display = "inline" : acceptStamp.style.display = "inline";
            } 
        }



        function showOneStamp() {
            if
        } 
    */
}); 