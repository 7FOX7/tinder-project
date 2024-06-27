$(document).ready(function() {
    const inputFile = $('.js-file-input'); 
    $('.js-stretchbox').click(function() {
        inputFile.click(); 
    });

    $('.js-remove-image-button').css("display", "none");
    $('#createAccountContinueButton')
        .prop('disabled', true)
        .css({'background': 'rgba(0, 0, 0, 0.2)', 'cursor': 'default'}); 
    
    inputFile.on("change", (e) => {
        const imageUrl = URL.createObjectURL(e.target.files[0]); 
        if(!imageUrl) {
            return; 
        }
        else {
            $('.js-image-field').each(function() {
                if($(this).css('background-image') === 'none') {
                    $(this).css({"background-image" : `url(${imageUrl})`});
                    var addImageButton = $(this).closest('.js-stretchbox').find('.js-add-image-button');  
                    var removeImageButton = $(this).closest('.js-stretchbox').find('.js-remove-image-button'); 
                    toggleButton(addImageButton, removeImageButton); 
                    return false; 
                }
            })
        }
    }); 

    $('.js-remove-image-button').click(function() {
        var parent = $(this).closest('.js-stretchbox'); 
        var addImageButton = parent.find('.js-add-image-button'); 
        var removeImageButton = parent.find('.js-remove-image-button'); 
        var image = parent.find('.js-image-field'); 
        image.css("backgroundImage", "none");
        toggleButton(removeImageButton, addImageButton);  
    })
    
    const nameField = $('#firstName'); 
    const emailField = $('#emailAddress'); 
    const monthField = $('#monthOfBirth'); 
    const dayField = $('#dayOfBirth'); 
    const yearField = $('#yearOfBirth'); 

    handleInvalidName(nameField); 
    handleInvalidEmail(emailField); 
    handleMonth(monthField); 
    handleDay(dayField); 
    handleYear(yearField); 

    function handleInvalidName(nameField) {
        const errorMessage = $(nameField).closest('.js-input-section').find('.js-error-message'); 
        onFocus(nameField);
        $(nameField).on('focusout', function() {
            var stringValue = $(nameField).val(); 
            if(stringValue === "") {
                errorMessage.addClass('active'); 
                addRedBorder(nameField); 
            }
            else {
                stringValue = stringValue.replace(/\b[a-z]/, function(match) {
                    return match.toUpperCase(); 
                }); 
                $(nameField).val(stringValue); 
                errorMessage.removeClass('active'); 
                removeRedBorder(nameField); 
            }
            if(allFilled()) {
                $('#createAccountContinueButton')
                    .removeAttr('disabled')
                    .css({"background": "var(--main-color)", "cursor": "pointer"})
            }
            else {
                $('#createAccountContinueButton').prop('disabled', 'disabled'); 
            }
        })
    }

    function handleInvalidEmail(emailField) {
        const errorMessage = $(emailField).closest('.js-input-section').find('.js-error-message'); 
        const regex =  /^\S+@\S+\.\S+$/; 
        onFocus(emailField);
        $(emailField).on('focusout', function() {
            var stringValue = $(emailField).val(); 
            if(!regex.test(stringValue)) {
                errorMessage.addClass('active'); 
                $('#createAccountContinueButton').prop('disabled', 'disabled');
                addRedBorder(emailField); 
            }
            else {
                errorMessage.removeClass('active'); 
                $('#createAccountContinueButton').removeAttr('disabled'); 
                removeRedBorder(emailField); 
            }
            if(allFilled() && regex.test(stringValue)) {
                $('#createAccountContinueButton')
                    .removeAttr('disabled')
                    .css({"background": "var(--main-color)", "cursor": "pointer"}) 
            }
            else {
                $('#createAccountContinueButton').prop('disabled', 'disabled'); 
            }
        })
    }

    function handleMonth(month) {  
        const errorMessage = $(month).closest('.js-input-section').find('.js-error-message'); 
        const nextField = dayField; 
        // const regex = /\b(10|11|12)\b/g;
        var stringValue;
        const regex = /^(0[1-9]|[1-9]|1[0-2])$/; 
        onFocus(month);
        $(month).on('keyup', function() { 
            stringValue = $(month).val(); 
            if(regex.test(stringValue) && stringValue.length === 1) {
                errorMessage.removeClass('active'); 
            }
            else if(regex.test(stringValue) && stringValue.length === 2) {
                errorMessage.removeClass('active');  
                nextField.focus(); 
            }
            else {
                errorMessage.addClass('active'); 
            }
        }); 

        month.on('focusout', function() {
            if(regex.test(stringValue)) {
                errorMessage.removeClass('active'); 
                removeRedBorder(month); 
                if(stringValue.length === 1) {
                    $('#monthOfBirth:text').val(`0${stringValue}`);
                    nextField.focus(); 
                } 
            }
            else {
                errorMessage.addClass('active'); 
                addRedBorder(month);
            }

            if(allFilled()) {
                $('#createAccountContinueButton')
                    .removeAttr('disabled')
                    .css({"background": "var(--main-color)", "cursor": "pointer"}) 
            }
            else {
                $('#createAccountContinueButton').prop('disabled', 'disabled'); 
            }
        })   
    }

    function handleDay(day) {
        var errorMessage = $(day).closest('.js-input-section').find('.js-error-message'); 
        const nextField = yearOfBirth; 
        const regex = /^(0[1-9]|[1-9]|1[0-9]|2[0-9]|3[01])$/; 
        var stringValue; 
        onFocus(day);
        $(day).on('keyup', function(){
            stringValue = $(day).val();
            if(regex.test(stringValue) && stringValue.length === 1) {
                errorMessage.removeClass('active'); 
            }
            else if(regex.test(stringValue) && stringValue.length === 2) {
                errorMessage.removeClass('active'); 
                nextField.focus();
            }
            else {
                errorMessage.addClass('active');  
            }
        }); 

        $(day).on('focusout', function() {
            if(regex.test(stringValue)) {
                errorMessage.removeClass('active'); 
                removeRedBorder(day);
                if(stringValue.length === 1) {
                    $(`#dayOfBirth:text`).val('0' + `${stringValue}`); 
                    nextField.focus(); 
                }
            }
            else {
                errorMessage.addClass('active'); 
                addRedBorder(day); 
            }

            allFilled() ? $('#createAccountContinueButton')
                .removeAttr('disabled')
                .css({"background": "var(--main-color)", "cursor": "pointer"}) 
                : 
                $('#createAccountContinueButton').prop('disabled', 'disabled');
        }); 
    }

    function handleYear(year) {
        var errorMessage = $(year).closest('.js-input-section').find('.js-error-message');
        var stringValue; 
        const regex = /^(1[0-9][0-9][0-9]|2[0][0-2][0-9])$/; 

        onFocus(year); 
        $(year).on('keyup', function() {
            stringValue = $(year).val(); 
            if(!regex.test(stringValue)) {
                errorMessage.addClass('active');  
            }
            else {
                errorMessage.removeClass('active'); 
            }
        });
        $(year).on('focusout', function() {
            if(regex.test(stringValue)) {
                errorMessage.removeClass('active'); 
                removeRedBorder(year);
            }
            else {
                errorMessage.addClass('active'); 
                addRedBorder(year);
            }

            allFilled() ?  $('#createAccountContinueButton')
                .removeAttr('disabled')
                .css({"background": "var(--main-color)", "cursor": "pointer"})  
                :
                $('#createAccountContinueButton').prop('disabled', 'disabled')
        })
    }

    function allFilled() {
        var filled = true; 
        $('.js-required-field').each(function() {
            if($(this).val() === '') {
                filled = false; 
            }
        });
        return filled; 
    }

    function removeRedBorder(field) {
        $(field).css("border-color", "rgba(0, 0, 0, 0.4)"); 
    }

    function addRedBorder(field) {
        $(field).css("border-color", "red"); 
    }

    function onFocus(field) {
        $(field).on('focus', function() {
            removeRedBorder(field);
        }); 
    }

    function toggleButton(element1, element2) {
        element1.css("display", "none"); 
        element2.css("display", "flex"); 
    }
}); 

document.addEventListener('readystatechange', (e) => {
    if(e.target.readyState === "complete") {
        const reflectImg_Arr = []; 
        functionality_AddInterests(); 

        const leftSectionButtons_Gender = document.querySelectorAll('.js-left-section-button--gender'); 
        const leftSectionButtons_InterestGroup = document.querySelectorAll('.js-left-section-button--interest-group'); 
        
        const form = document.querySelector('form'); 
        form.addEventListener('submit', e => {
            e.preventDefault(); 
        }); 

        const saveButton_relationshipIntent = document.querySelector('.js-save-button--relationship-intent'); 

        const genderButtons = document.querySelectorAll('.js-button--gender'); 
        handleLeftSectionButtonClick(genderButtons, leftSectionButtons_Gender); 

        const interestGroupButtons = document.querySelectorAll('.js-button--interest-group');  
        handleLeftSectionButtonClick(interestGroupButtons, leftSectionButtons_InterestGroup); 

        const relationhipIntent_innerButtons = document.querySelectorAll('.js-inner-button--relationship-intent'); 
        const relationshipIntent_Arr = Array.from(relationhipIntent_innerButtons);

        const heartArrow_Reflection = createImage('../../images/relationship-intent-heart-arrow__reflection.png', 'heart arrow'); 
        heartArrow_Reflection.setAttribute('id', 'heartArrow');
         
        const heartEyes_Reflection = createImage('../../images/relationship-intent-heart-eyes__reflection.png', 'heart eyes'); 
        heartEyes_Reflection.setAttribute('id', 'heartEyes'); 

        const drinking_Reflection = createImage('../../images/relationship-intent-drinking__reflection.png', 'drinking');
        drinking_Reflection.setAttribute('id', 'drinking'); 

        const tada_Reflection = createImage('../../images/relationship-intent-tada__reflection.png', 'tada');
        tada_Reflection.setAttribute('id', 'tada'); 

        const thinkingFace_Reflection = createImage('../../images/relationship-intent-thinking-face__reflection.png', 'heart eyes');
        thinkingFace_Reflection.setAttribute('id', 'thinkingFace'); 

        const handWave_Reflection = createImage('../../images/relationship-intent-wave__reflection.png', 'wave');
        handWave_Reflection.setAttribute('id', 'handWave'); 
        
        reflectImg_Arr.push(heartArrow_Reflection); 
        reflectImg_Arr.push(heartEyes_Reflection); 
        reflectImg_Arr.push(drinking_Reflection); 
        reflectImg_Arr.push(tada_Reflection); 
        reflectImg_Arr.push(thinkingFace_Reflection); 
        reflectImg_Arr.push(handWave_Reflection); 
        reflectImg_Arr.forEach((image) => {
            image.style.width = "20px"; 
            image.style.marginRight = "6px"; 
        })

        handleRelationshipIntentButtonClick(relationshipIntent_Arr, saveButton_relationshipIntent, reflectImg_Arr); 
    }
});

const parser = new DOMParser(); 

function createImage(source, alt) {
    const image = new Image(); 
    image.src = source; 
    image.alt = alt; 
    return image; 
}

function enableSingleSelection(btn, arr) {
    arr.forEach((val) => {
        val === btn ? (val.classList.add('left-section-button--selected')) : (val.classList.remove('left-section-button--selected')) ; 
    })
}

// function handleInterestFieldClick(interests, saveButton, selectedInterests) {
//     let currentValue = selectedInterests.length; 
//     const maxInterests = 5; 
//     const minInterests = 3; 
//     const saveButton_Value = document.querySelector('.js-save-button--add-interests .text'); 

//     saveButton_Value.innerText = `Save ${currentValue}/5`;
//     (saveButton_Value && !saveButton_Value.hasAttribute("modalWindowJustOpened")) ? (saveButton_Value.setAttribute("modalWindowJustOpened", ""))
//     : "";  
//     function addActive(clickedField) {   
//         saveButton_Value.hasAttribute("modalWindowJustOpened") ? (saveButton_Value.removeAttribute("modalWindowJustOpened"), currentValue = currentValue) : ""; 
//         currentValue === maxInterests ? "" : (clickedField.classList.add('active'), currentValue ++);     
//     } 
//     interests.forEach((interest) => {
//         if(interest && !interest.hasAttribute("clickListener")) {
//             interest.addEventListener('click', (e) => {
//                 const clickedField = e.currentTarget; 
//                 clickedField.classList.contains('active') ? (clickedField.classList.remove('active'), currentValue--) 
//                 : (addActive(clickedField)); 
//                 saveButton_Value.innerText = `Save ${currentValue}/5`; 
//                 handleStyleOfSaveButton_addInterests(currentValue, saveButton, maxInterests, minInterests); 
//             });
//         } 
//         !interest.hasAttribute("clickListener") ? (interest.setAttribute("clickListener", "")) : ""; 
//     }) 
// }
function selectLastSavedInterests(lastSavedInterests) {
    lastSavedInterests.forEach((lastSavedInterest) => {
        lastSavedInterest.classList.add('active'); 
    })
}

function handleInterestFieldClick(interests, saveButton, selectedInterests) {
    let currentValue = selectedInterests.length;  
    const maxInterests = 5; 
    const minInterests = 3; 
    const saveButton_Value = document.querySelector('.js-save-button--add-interests .text');
    saveButton_Value.innerText = `Save ${currentValue}/5`; 

    // selectedInterests.forEach((selectedInterest) => {
    //     selectedInterest.classList.add('active'); 
    // })

    interests.forEach((interest) => {
        if(interest && !interest.hasAttribute("clickListener")) {
            interest.addEventListener('click', (e) => {
                const clickedField = e.currentTarget; 
                clickedField.classList.contains('active') ? (clickedField.classList.remove('active'), currentValue--) 
                : currentValue === maxInterests ? "" : (clickedField.classList.add('active'), currentValue++); 
                saveButton_Value.innerText = `Save ${currentValue}/5`; 
                handleStyleOfSaveButton_addInterests(currentValue, saveButton, maxInterests, minInterests); 
            });
        } 
        !interest.hasAttribute("clickListener") ? (interest.setAttribute("clickListener", "")) : ""; 
    }) 
}

function handleStyleOfSaveButton_addInterests(currentValue, saveButton, max, min) {
    (inBetween(currentValue, max, min) || currentValue === 0) ? saveButton.removeAttribute("disabled") 
    : saveButton.setAttribute("disabled", ""); 
    saveButton_onDisable(saveButton);    
}

function handleSaveButtonClick_addInterests(saveButton, interestsArr, lastSavedInterests) {
    const interests_Reflection = document.querySelector('.js-interests--reflection'); 
    if(saveButton && !saveButton.hasAttribute('clickEvent')) {
        saveButton.addEventListener('click', (e) => {
            e.preventDefault(); 
            const selectedInterests = interestsArr.filter((interest) => interest.classList.contains('active')); 
            interests_Reflection.innerText = "";   
            interests_Reflection.style.visibility = "visible"; 
            const copyArr = getDeepCopyOfArr(selectedInterests); 
            if(copyArr.length > 0) {
                copyArr.forEach((val) => {
                    interests_Reflection.insertAdjacentHTML("beforeend", val); 
                })
            }
            selectedInterests.forEach((interest) => {
                lastSavedInterests.push(interest); 
            }) 
            // sessionStorage.setItem('interests', JSON.stringify(Object.values(copyArr))); 
            // sessionStorage.setItem("interests", JSON.stringify(copyArr)); 
        })
    }
    if(saveButton && !saveButton.hasAttribute('clickEvent')) {
        saveButton.setAttribute('clickEvent', ""); 
    }
}

function inBetween(val, max, min) {
    return val <= max && val >= min; 
}

function handleLeftSectionButtonClick(buttons, leftSectionButtons_Group) {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const button_Parent = e.target.closest('.js-left-section-button'); 
            enableSingleSelection(button_Parent, leftSectionButtons_Group); 
        }); 
    })
}

function getDeepCopyOfArr(arr) {
    const copyArr = []; 
    if(arr.length > 0) {
        for(val of arr) {
            const copy = val.cloneNode(true);
            copyArr.push(copy.outerHTML);  
        }
    }
    return copyArr; 
}

function removeCurrentInterest(arr, interest) {
    console.log(typeof(interest)); 
    arr.forEach((val, index) => {
        val === interest ? arr.splice(index, 1) : ''; 
    })
}

function handleRelationshipIntentButtonClick(buttons, saveButton, imgArr) {
    const originalContent = document.querySelector('.js-original-content--relationship-intent'); 
    const changedContent = document.querySelector('.js-changed-content--relationship-intent'); 
    const relationshipIntent_Reflection = document.querySelector('.js-relationship-intent--reflection'); 
    saveButton.setAttribute("disabled", ""); 
    saveButton_onDisable(saveButton); 
    for(const button of buttons) {
        button.addEventListener('click', (e) => {
            relationshipIntent_Reflection.style.visibility = "visible";     // the style is changed everytime there is a click, however I want to change the color once and forever the first click appears, not on each click the style change 
            relationshipIntent_Reflection.innerText = ""; 
            const selectedButton = e.currentTarget; 
            const textContent = selectedButton.lastElementChild.innerText; 
            const imageToReflect = filterReflectImages(imgArr, selectedButton); 
            const unselectedButtons = filterUnselectedInnerRelationshipButtons(buttons, selectedButton); 
            unselectedButtons.forEach((unselectedButton) => {
                unselectedButton.classList.remove("selected"); 
            }); 
            handleStyleOfSelectedButton(selectedButton); 
            saveButton.removeAttribute("disabled"); 
            saveButton_onDisable(saveButton); 
            changeRelationshipIntentContent(originalContent, changedContent);

            relationshipIntent_Reflection.append(imageToReflect[0]); 
            relationshipIntent_Reflection.append(textContent); 
        })
    }
}

function functionality_AddInterests() {
    // let selectedInterests = []; 
    const interests = document.querySelectorAll('.js-selection-field--add-interests');
    const interestsArr = Array.from(interests); 
    const saveButton_addInterests = document.querySelector('.js-save-button--add-interests'); 
    const mainContainer = document.querySelector('.js-modal.add-interests'); 
    let lastSavedInterests = []; 
    
    const observer_modalWindow = new MutationObserver((mutations) => {
        // here, each time a new modal window is opened/closed, there is only a single message of 'mutationRecords' (which is good) 
        console.log(mutations); 
        mutations.forEach((mutation) => {
            if(mutation.type === "attributes") {
                const modalWindow = mutation.target; 
                if(modalWindow.classList.contains("active")) {
                    const mainPart = document.querySelector('.add-interests .js-main-part');
                    const blurEffect = document.querySelector('.add-interests .js-blur-effect');  
                    blurEffect.style.top = `${mainPart.offsetHeight + 80}px`; 
                    mainPart.style.paddingRight = `${mainPart.offsetWidth - mainPart.clientWidth}px`; 
 
                    const selectedInterests = interestsArr.filter((interest) => interest.classList.contains('active')); 
                    interestsArr.forEach((interest) => {
                        interest.classList.remove('active'); 
                    })

                    selectLastSavedInterests(lastSavedInterests); 
                    handleInterestFieldClick(interestsArr, saveButton_addInterests, selectedInterests);
                    handleSaveButtonClick_addInterests(saveButton_addInterests, interestsArr, lastSavedInterests); 
                }
            }
        })
    })

    function findMatching(interestToSelect) {
        return interestsArr.find((interest) => interestToSelect.includes(interest.innerText));  
    }


    // const observer_saveButton = new MutationObserver((mutations) => {
    //     console.log(mutations)
    //     // CURRENT: with each time we open the modal window, 1+ mutations are added 
    //     // console.log(mutations)
    //     const mutation = mutations[0]; 
    //     if(mutation.type === 'childList') {
    //         // CURRENT: for some reason, with each time we open the modal window, it is invoked 3 times (if it is 3rd time we open the window) 
    //         ((inBetween(selectedInterests.length, maxInterests, minInterests) || selectedInterests.length === 0) ? saveButton_addInterests.removeAttribute("disabled") 
    //         : saveButton_addInterests.setAttribute("disabled", "")); 
    //         saveButton_onDisable(saveButton_addInterests);    
    //     }
    // })
    
    observer_modalWindow.observe(mainContainer, {attributes: true});  // attributes (config) - change to check for. if there are any changes 
                                                                    // related to the attribute list (some attributes were removed or added), 
                                                                    // then, on each such a change they will be displayed in the mutation record list 
    // observer_saveButton.observe(saveButton_addInterests, {
    //     subtree: true,
    //     childList: true
    // }); 
}


// function mutationCallback_saveButton(mutations) {
//     const mutation = mutations[0]; 
//     if(mutation.type === "clildList") {

//     }
// }

// the following is the structure of the code, assuming the problem is related to the event listener (we just basically get the code out of the loop):
// (this does not work the way we want because it is called only one time. the statement of 'mainContainer.classList.contains('active')' is only checked once)
// 1: 
    
    
// function functionality_AddInterests() {
//     const maxInterests = 5; 
//     const minInterests = 3; 
//     let selectedInterests = []; 
//     const saveButton_addInterests = document.querySelector('.js-save-button--add-interests'); 
//     const mainContainer = document.querySelector('.js-modal.add-interests'); 
//     const mainPart = document.querySelector('.add-interests .js-main-part');
//     const blurEffect = document.querySelector('.add-interests .js-blur-effect');  

//     mainContainer.classList.contains('active') ? (blurEffect.style.top = `${mainPart.offsetHeight + 80}px`, mainPart.style.paddingRight = `${mainPart.offsetWidth - mainPart.clientWidth}px`) : ""; 
//     if(sessionStorage.getItem("interests")) {
//         selectedInterests = Object.values(JSON.parse(sessionStorage.getItem("interests")))
//     }

//     handleSaveButtonClick_addInterests(saveButton_addInterests, selectedInterests); 
//     handleInterestFieldClick(selectedInterests, maxInterests);
//     const observer_saveButton = new MutationObserver((mutations) => {
//         mutations.forEach((mutation) => {
//             if(mutation.type === 'childList') {
//                 (inBetween(selectedInterests.length, maxInterests, minInterests) || selectedInterests.length === 0) ? saveButton_addInterests.removeAttribute("disabled") 
//                 : saveButton_addInterests.setAttribute("disabled", ""); 
//                 handleStyleOfSaveButton(saveButton_addInterests);     
//             }
//         })
//     })

//     observer_saveButton.observe(saveButton_addInterests, {
//         subtree: true,
//         childList: true
//     }); 
// }
        
   

function saveButton_onDisable(saveButton) {
    saveButton.hasAttribute("disabled") ? (saveButton.style.cursor = "default", saveButton.classList.remove('active')) : (saveButton.style.cursor = "pointer", saveButton.classList.add('active')); 
}

function filterUnselectedInnerRelationshipButtons(buttonArr, clickedButton) {
    return buttonArr.filter((button) => button !== clickedButton); 
}

function handleStyleOfSelectedButton(selectedButton) {
    selectedButton.classList.add("selected"); 
}

function changeRelationshipIntentContent(original, changed) {
    original.style.display = "none"; 
    changed.style.display = "flex"; 
}

function filterReflectImages(imgArr, selectedButton) {
    return imgArr.filter((img) => img.getAttribute('id') === selectedButton.getAttribute('id')); 
} 

/*
    in JavaScript, should function declaration be placed inside the code that gets executed on 
    document fully load, or when it is loading? 

    assume I have got this code: 

    document.addEventListener('onreadystatechange', (e) => {
        if(e.target.readyState === "complete") {
            const numbers = [1, 2, 3, 4]; 
            const initialValue = 0; 

            sumNumbers(numbers); 

            function sumNumbers(arr) {
                const sumWithInitial = arr.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    initialValue,
                );
                console.log(sumWithInitial);
            }
        }
    })

    or I just have to declare it separately? 

    document.addEventListener('onreadystatechange', (e) => {
        if(e.target.readyState === "complete") {
            const numbers = [1, 2, 3, 4]; 
            const initialValue = 0; 

            sumNumbers(numbers); 
        }
    })

     function sumNumbers(arr) {
        const sumWithInitial = arr.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue,
        );
        console.log(sumWithInitial);
    }

    speaking of jQuery, I usually put ALL the relevant code inside the block that gets executed only 
    on document fully loaded, like this: 
    
    $(ducument).ready(function() {
        // all code including function declarations goes here
    })

    but was just wondering if functions should be 'run' before the document is fully loaded
*/