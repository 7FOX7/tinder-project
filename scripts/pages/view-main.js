import { profiles } from "./profiles/profiles.js";
document.addEventListener('DOMContentLoaded', () => {
    const pageMaxWidth = document.querySelector('.js-main').clientWidth; 
    const pageMinWidth = Math.floor(pageMaxWidth/4); 
    const pageMaxWidth_format = Number((pageMaxWidth/1000).toFixed(3)); 
    const pageMinWidth_format = Number((pageMinWidth/1000).toFixed(3)); 
    const profileRotateOnReject = -185; 
    const profileRotateOnLike = 185; 

    const pageMaxHeight = document.querySelector('.js-main').clientHeight; 
    const pageMinHeight = Math.floor(pageMaxHeight/5);  
    const pageMaxHeight_format = Number((pageMaxHeight/1000).toFixed(3)); 
    const pageMinHeight_format = Number((pageMinHeight/1000).toFixed(3));

    const interactiveBtns = document.querySelectorAll(`.js-interactive-button`); 
    interactiveBtns.forEach((button) => {
        const interactionIcon = button.querySelector('.js-interaction-icon');
        interactionIcon.style.transition = "0.3s"; 
        button.addEventListener('mouseenter', () => { 
            interactionIcon.style.transform = "scale(1.2)"; 
        });
        button.addEventListener('mouseleave', () => {
            interactionIcon.style.transform = "none"; 
        }); 
    });

    const profiles = Array.from(document.querySelectorAll('.js-profile-container')); 
    const superLikeAction_Arr = document.querySelectorAll(`[data-action-type="superLike"]`); 
    const rejectAction_Arr = document.querySelectorAll(`[data-action-type="reject"]`); 
    const likeAction_Arr = document.querySelectorAll(`[data-action-type="like"]`); 
    const action_Arr = [superLikeAction_Arr, rejectAction_Arr, likeAction_Arr];
    const rejectBtn = document.querySelector('button[data-action-type="reject"]'); 
    const likeBtn = document.querySelector('button[data-action-type="like"]'); 
    const superLikeBtn = document.querySelector('button[data-action-type="superLike"]'); 

    let targetX = 0; 
    let targetY = 0; 
    let fadeValue = 0;
    let fadeValueFor_X = 0;  
    let fadeValueFor_Y = 0;  

    function renderProfileCards() {
        let sliderPosition = 0;
        let isDragging = false; 
        let previousMouseX = 0; 
        let previousMouseY = 0;
        console.log(`renderProfileCards func has just been called. sliderPosition: ${sliderPosition}`);  

        const currentProfile = getCurrentFrom(profiles); 
        currentProfile.style.zIndex = "10"; 
        const nextProfile = getNextFrom(profiles); 
        nextProfile.style.zIndex = "8";  
        const data = currentProfile.dataset.type;

        const profileContainer = document.querySelector(`[data-type="${data}"]`); 
        const dotContainer = document.querySelector(`[data-type=${data}] .js-slide-dot-container`)
        const stampArr = document.querySelectorAll(`[data-type="${data}"] .js-stamp`); 
        const keenSliderContainer = document.querySelector(`[data-type="${data}"] .js-keen-slider-button-container`); 
        const nextSlide_Button = document.querySelector(`[data-type="${data}"] .js-next-slider-button`);
        const previousSlide_Button = document.querySelector(`[data-type="${data}"] .js-previous-slider-button`); 
        const images = document.querySelectorAll(`[data-type="${data}"] .js-keen-slider-item`); 
        const sliderImageArr = [];
        const sliderDotArr = []; 

        images.forEach((image) => {
            const dot = document.createElement('button'); 
            sliderDotArr.push(dot); 
            sliderImageArr.push(image);
        }); 

        function setDefault() { 
            showSliderButtons(); 
            updateSlide(); 
            stampArr.forEach((stamp) => {
                stamp.style.display = "none"; 
            })
        }

        setDefault(); 

        document.addEventListener('keydown', onKeyDown);
        profileContainer.addEventListener('mouseenter', onMouseEnter); 
        profileContainer.addEventListener('mouseleave', onMouseLeave); 
        profileContainer.addEventListener('mousedown', onMouseDown);        
        profileContainer.addEventListener('mouseup', onMouseUp); 

        function onKeyDown(e) {
            if(e.repeat) return;
            (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Enter") ? showNextProfile(e) : console.log(`${e.key} key is not acceptable`); 
        }

        function onMouseEnter() {
            const animationPromise = keenSliderContainer.animate(makeSmoothAppearance, keenSliderContainer_timing).finished; 
            animationPromise.then(() => {
                keenSliderContainer.classList.add('active');
            })
        }

        function onMouseLeave() {
            const animationPromise = keenSliderContainer.animate(makeSmoothDisappearance, keenSliderContainer_timing).finished; 
            animationPromise.then(() => {
                keenSliderContainer.classList.remove('active');
            }); 
        }

        function onMouseDown(e) {
            isDragging = true; 
            stampArr.forEach((stamp) => {
                stamp.style.display = "inline"; 
            });
            previousMouseX = e.clientX; 
            previousMouseY = e.clientY; 
            profileContainer.addEventListener('mousemove', move); 
        }

        function onMouseUp(e) {
            isDragging = false;
            profileContainer.removeEventListener('mousemove', move); 
            if(inBetween(Number(fadeValueFor_X), pageMinWidth_format, pageMaxWidth_format) || inBetween(Number(fadeValueFor_Y), pageMinHeight_format, pageMaxHeight_format)) { 
                removeEventListeners(); 
                showNextProfile(e); 
                handleImageCardAnimation(profileContainer).then(() => {
                    onCardReplacement(); 
                }); 
            }
            else setToDefaultPos(profileContainer);
        }

        

        function showNextProfile(e) {
            removeEventListeners(); 
            if (e.currentTarget === rejectBtn || e.key === "ArrowLeft") {
                stampArr[0].style.display = "inline"; 
                stampArr[0].animate(makeSmoothAppearance, 300).finished.then(() => {
                    profileContainer.animate(
                        {
                            left: [`${targetX}px`, `-${pageMaxWidth}px`], 
                            transform: `rotate(${getCustomRotateValue(profileRotateOnReject)}deg)`
                        }, 400
                    ).finished.then(() => {
                        onCardReplacement();
                    }); 
                })
            }
            else if (e.currentTarget === likeBtn || e.key === "ArrowRight") {
                stampArr[1].style.display = "inline"; 
                stampArr[1].animate(makeSmoothAppearance, 300).finished.then(() => {
                    profileContainer.animate(
                        {
                            left: [`${targetX}px`, `${pageMaxWidth}px`], 
                            transform: `rotate(${getCustomRotateValue(profileRotateOnLike)}deg)`
                        }, 400
                    ).finished.then(() => {
                        onCardReplacement(); 
                    }); 
                }); 
            }
            else if (e.currentTarget === superLikeBtn || e.key === "Enter") {
                stampArr[2].style.display = "inline"; 
                stampArr[2].animate(makeSmoothAppearance, 300).finished.then(() => {
                    profileContainer.animate(
                        {
                            top: [`${targetY}px`, `-${pageMaxHeight}px`]
                        }, 300
                    ).finished.then(() => {
                        onCardReplacement(); 
                    })
                })
            }
        }

        function onCardReplacement() {
            profiles.shift(); 
            profileContainer.style.zIndex = "0"; 
            nextProfile.style.zIndex = "0";  
            while(dotContainer.firstChild) {
                dotContainer.removeChild(dotContainer.lastChild); 
            }
            sliderPosition = 0; 
            showSliderButtons(); 
            updateSlide(); 
            setToDefaultPos(profileContainer);
            profiles.push(currentProfile);  
            renderProfileCards(); 
        }

        function handleImageCardAnimation(profileContainer) {
            return new Promise((resolve) => {
                inBetween(Math.abs(targetY), pageMinHeight, pageMaxHeight) ? profileContainer.animate(
                    {
                         top: [`${targetY}px`, `${targetY * 3}px`]
                    }, 
                    300
                 ).finished.then(resolve)
                 : profileContainer.animate(
                     {
                         left: [`${targetX}px`, `${targetX * 3.5}px`], 
                         transform: [`rotate(${getCustomRotateValue(targetX)}deg)`]
                     }, 
                     300
                 ).finished.then(resolve) 
            })
        }
        
        sliderDotArr.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // const currentDot = e.currentTarget;   
                // for(let i = 0; i < arr.length; i++) {
                //     arr[i] === currentDot ? (arr[i].classList.add('active'), sliderPosition = i) : arr[i].classList.remove('active'); 
                // }
                // console.log('you clicked on the dot!'); 
                sliderPosition = index; 
                showSliderButtons(); 
                updateSlide(); 
            });
            // dotContainer.childElementCount !== (sliderDotArr.length) ? dotContainer.append(dot) : 0; 
            dotContainer.append(dot); 
        }); 

        
        
        rejectBtn.addEventListener('click', showNextProfile); 
        likeBtn.addEventListener('click', showNextProfile); 
        superLikeBtn.addEventListener('click', showNextProfile); 
        nextSlide_Button.addEventListener('click', onNextSlideButton)
        previousSlide_Button.addEventListener('click', onPreviousSlideButton); 

        function onNextSlideButton() {
            sliderPosition++; 
            showSliderButtons(); 
            updateSlide(); 
        }

        function onPreviousSlideButton() {
            sliderPosition--; 
            showSliderButtons(); 
            updateSlide(); 
        }

        function updateSlide() {
            sliderImageArr.forEach((image, index) => {
                updateSlideImage(image, index); 
                updateDots(index); 
            })

            /*
                sliderImageArr.forEach(image, index) => {
                    updateSlideImage(image, index); 
                }
                sliderDotArr.find(() => {
                    const progressButton = sliderDotArr[sliderPosition]; 
                    progressButton.classList.add('active');     
                }); 

                selectedDot() {
                    const progressButton = sliderDotArr[sliderPosition]; 
                    progressButton.classList.add('active'); 
                }
            */
        } 

        function showSliderButtons() {
            if(sliderPosition === 0) {
                nextSlide_Button.style.visibility = "visible"; 
                previousSlide_Button.style.visibility = "hidden"; 
            }
            else if(sliderPosition === sliderImageArr.length -1) {
                nextSlide_Button.style.visibility = "hidden"; 
                previousSlide_Button.style.visibility = "visible"; 
            }
            else {
                nextSlide_Button.style.visibility = "visible"; 
                previousSlide_Button.style.visibility = "visible"; 
            }
        }
    
        function updateSlideImage(image, index) {
            index === sliderPosition ? image.style.display = "block" : image.style.display = "none"; 
        }

        function updateDots(index) {
            const progressButton = sliderDotArr[index]; 
            index === sliderPosition ? progressButton.classList.add('active') : progressButton.classList.remove('active'); 
        }
    
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
                profileContainer.style.left = `${targetX}px`; 
                profileContainer.style.top = `${targetY}px`;
                console.log(`targetY: ${targetY}, targetX: ${targetX}`);
                
                rotateCard(profileContainer); 
                displayStamp(); 
            }
        }

        function rotateCard(profileContainer) {
            profileContainer.style.transform = `rotate(${getCustomRotateValue(targetX)}deg)`; 
        }
    
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

        function handleStamp(stamp, coord, min_format, max_format) {  
            fadeValue = getCustomFadeValue(coord);
            coord === targetX ? fadeValueFor_X = fadeValue : fadeValueFor_Y = fadeValue;  
            if(inBetween(fadeValue, min_format, max_format)) {
                stopFading = true; 
                stamp.style.opacity = "1"; 
            }
            else {        
                stopFading = false; 
                stamp.style.opacity = `${fadeValue * 5}`; 
            }
        }
    
        function fadeActionBtn(actionArr, coord) {
            action_Arr.forEach((action) => {
                action[0].classList.remove('outline-hidden');
                action[1].style.display = "inline";
                action[2].style.display = "none"; 
                action[3].style.opacity = "0"; 
            })
            fadeValue = getCustomFadeValue(coord); 
            const scaleVal = coord === targetX ? 3 : 5.2; 
            stopFading ? (actionArr[0].classList.remove('outline-hidden'), actionArr[1].style.display = "inline", actionArr[2].style.display = "none", actionArr[3].style.opacity = "0")
                       : (actionArr[0].classList.add('outline-hidden'), actionArr[1].style.display = "none", actionArr[2].style.display = "inline", actionArr[3].style.opacity = `${fadeValue * 5}`, actionArr[3].style.transform = `scale(${fadeValue * scaleVal})`); 
        }
    
        function setToDefaultPos(profileContainer) {
            targetX = 0; 
            targetY = 0; 
            fadeValueFor_X = 0; 
            fadeValueFor_Y = 0; 
            profileContainer.style.left = 0; 
            profileContainer.style.top = 0; 
            profileContainer.style.transform = "rotate(0)"; 
            stampArr.forEach((stamp) => {
                stamp.style.opacity = "0"; 
            }); 
            action_Arr.forEach((action) => {
                action[0].classList.remove('outline-hidden'); 
                action[1].style.display = "inline";
                action[2].style.display = "none"; 
                action[3].style.opacity = "0";  
            })
        }

        function removeEventListeners() {
            document.removeEventListener('keydown', onKeyDown); 
            profileContainer.removeEventListener('mouseup', onMouseUp); 
            profileContainer.removeEventListener('mousedown', onMouseDown); 
            profileContainer.removeEventListener('mouseenter', onMouseEnter); 
            profileContainer.removeEventListener('mouseleave', onMouseLeave); 
            rejectBtn.removeEventListener('click', showNextProfile); 
            likeBtn.removeEventListener('click', showNextProfile); 
            superLikeBtn.removeEventListener('click', showNextProfile);
            nextSlide_Button.removeEventListener('click', onNextSlideButton); 
            previousSlide_Button.removeEventListener('click', onPreviousSlideButton)
        }
    }

    renderProfileCards()

    function getCurrentFrom(profiles) {
        if(profiles.length !== 0) return profiles[0];
        return;  
    }

    function getNextFrom(profiles) {
        if(profiles.length !== 0) return profiles[1]; 
        return; 
    }

    const makeSmoothAppearance = [
        {opacity: "0"},
        {opacity: "1"}
    ];

    const makeSmoothDisappearance = [
        {opacity: "1"},
        {opacity: "0"} 
    ];

    const keenSliderContainer_timing = {
        duration: 200
    };
    
    function inBetween(val, min, max) {
        return val > min && val < max; 
    }
    
    function getCustomFadeValue(coord) {
        return Math.abs(coord/1000).toFixed(3); 
    }
        
    function getCustomRotateValue(coord) {
        const maxAngleForContainer = 27; 
        return Math.floor(coord / maxAngleForContainer); 
    }
}); 



    // the problem: the nextSlide_button and previousSlider_button select all the elements from the document. 
    // we need to limit it to only one HTML element
    

    // the problem: we have common arrays which store values that are common for each item. we need to somehow make the arrays store the values for one specific item, by comparing the data of the profile container with the data of the images, and, if they match, fill the 
    // array with those images
    // sample usage: 
    // 
    // profileContainer.getAttribute('data') === sliderImageArr
    



    // the problem: the sliderImageArr will be overriden 5 times (per each profile-container, so, only the last elements will be considered). we need to probably create another array that would store objects inside of which the will be the profile container 
    // and its specific sliderImageArr, and then access it

    // sample: imageAndProfileContainer = image.dataset.type === profileContainer.dataset.type ? imageAndProfileContainer.push({"profile": profileContainer, "image": image}); 


    
    // the problem: assuming we have got the array which contains the objects, inside of which there are two keys: 
    // 1st - profileContainer, 2nd - corresponding image array. 
    // so we have got something like:



    /* 
    const profileImageArr = []; 
    function matchImagesWithProfile(profile) {
        images.forEach((image) => {
            image.dataset.type === profile.dataset.type ?        
        })
    }


    profileContainers.forEach(profile); 


    const profileImageArr = [
        {profile: "profileContainer1", 
        image: images1.join(",")
        }, 
        {profile: "profileContainer2", 
        image: images2.join(",")
        }, 
        {profile: "profileContainer3", 
        image: images3.join(",")
        }
    ]
    */

    // function matchImagesWithProfile(profile) {
    //     const updatedImages = []; 
    //     images.forEach((image) => {
    //         image.dataset.type === profile.dataset.type ? updatedImages.push(image) : 0; 
    //     })
    //     profiles.push({"profile": profile, "image": updatedImages}); 
    // }


    // what we want: to have a card which has a dot container which does not 
    // interact with the dots from another card in anyway, but uses the same logic and functionality: 

    // 



    

    /////////////////////////////////////////////////////////////////////////////////////
    // make the slider buttons appear/disappear on hover:
    

    // keenSliderImageContainer.addEventListener('mouseenter', () => {
    //     const animationPromise = keenSliderContainer.animate(makeSmoothButtonAppearance, keenSliderContainer_timing).finished; 
    //         animationPromise.then(() => {
    //             keenSliderContainer.classList.add('active');
    //             console.log('you are inside the keen slider'); 
    //     })
    // }); 

    // keenSliderImageContainer.addEventListener('mouseleave', () => {
    //     const animationPromise = keenSliderContainer.animate(makeSmoothButtonDisappearance, keenSliderContainer_timing).finished; 
    //     animationPromise.then(() => {
    //         keenSliderContainer.classList.remove('active');
    //     })
    // });

    

    /////////////////////////////////////////////////////////////////////////////
    // make the slider buttons interactive and handle the dots: 

    

    /////////////////////////////////////////////////////////////////////////////
    // make the image container draggable and show the stamp: 



    // keenSliderImageContainer.addEventListener('mousedown', e => {
    //     isDragging = true; 
    //     previousMouseX = e.clientX; 
    //     previousMouseY = e.clientY; 
    //     keenSliderImageContainer.addEventListener('mousemove', move); 
    // });


    // keenSliderImageContainer.addEventListener('mouseup', () => {
    //     inBetween(Number(fadeValueFor_X), pageMinWidth_format, pageMaxWidth_format) || inBetween(Number(fadeValueFor_Y), pageMinHeight_format, pageMaxHeight_format) ? keenSliderImageContainer.remove() : (setToDefaultPos()); 
    //     isDragging = false; 
    //     keenSliderImageContainer.removeEventListener('mousemove', move);
    // });

    // function move(e) {
    //     if(isDragging) {
    //         const deltaCoordinate = {
    //             x: e.clientX - previousMouseX, 
    //             y: e.clientY - previousMouseY
    //         }
    //         targetX += deltaCoordinate.x; 
    //         targetY += deltaCoordinate.y; 

    //         previousMouseX = e.clientX; 
    //         previousMouseY = e.clientY; 
    //         profileImageContainer.style.left = `${targetX}px`; 
    //         profileImageContainer.style.top = `${targetY}px`;
    //         console.log(`targetY: ${targetY}, targetX: ${targetX}`);
            
    //         rotateCard(); 
    //         displayStamp(); 
    //     }
    // }

    /////////////////////////////////////////////////////////////////////////////
    // make the image container rotate when swiping left / right:  
    

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
    
    // const arr = superLikeActionArr,  

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