$(document).ready(function() {
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
        })
    }

    function handleInvalidEmail(emailField) {
        const errorMessage = $(emailField).closest('.js-input-section').find('.js-error-message'); 
        const regex =  /^\S+@\S+\.com$/; 
        onFocus(emailField);
        $(emailField).on('focusout', function() {
            var stringValue = $(emailField).val(); 
            if(!regex.test(stringValue)) {
                errorMessage.addClass('active'); 
                addRedBorder(emailField); 
            }
            else {
                errorMessage.removeClass('active'); 
                removeRedBorder(emailField); 
            }
        })
    }

    function handleMonth(month) {  
        const errorMessage = $(month).closest('.js-input-section').find('.js-error-message'); 
        const nextField = dayField; 
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
        })
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
}); 

document.addEventListener('readystatechange', (e) => {
    if(e.target.readyState === "complete") {
        const reflectImg_Arr = []; 
        checkAllFieldsAreFilled(); 
        functionality_AddInterests(); 
        const form = document.getElementById('create-account-form'); 
        form.addEventListener('submit', e => {
            e.preventDefault(); 
        }); 

        const saveButton_relationshipIntent = document.querySelector('.js-save-button--relationship-intent'); 
        const genderButtons = document.querySelectorAll('.js-button--gender'); 
        const interestGroupButtons = document.querySelectorAll('.js-button--interest-group');  
        handleLeftSectionButtonClick(genderButtons, '.js-left-section-button--container'); 
        handleLeftSectionButtonClick(interestGroupButtons, '.js-left-section-button--container'); 

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

function enableSingleSelection(btn, btns, cntr) {
    btns.forEach((val) => {
        val === btn ? (val.closest(cntr).classList.add('left-section-button--selected')) : (val.closest(cntr).classList.remove('left-section-button--selected')); 
    })
}

function selectLastSavedInterests(lastSavedInterests) {
    lastSavedInterests.forEach((lastSavedInterest) => {
        lastSavedInterest.classList.add('active'); 
    })
}

function inBetween(val, max, min) {
    return val <= max && val >= min; 
}

const interestGroups = ["Men", "Women", "Everyone"]

let isGenderSelected = false; 
let isInterestGroupSelected = false; 

function handleLeftSectionButtonClick(buttons, container) {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const isGenderButton = interestGroups.includes(e.target.innerText) ? "" : button
            if(isGenderButton) {
                isGenderSelected = true
            }
            else {
                isInterestGroupSelected = true
            }
            enableSingleSelection(button, buttons, container); 
        }); 
    })
}

function removeCurrentInterest(arr, interest) {
    arr.forEach((val, index) => {
        val === interest ? arr.splice(index, 1) : ''; 
    })
}

let isRelationshipIntentSelected = false; 
function handleRelationshipIntentButtonClick(buttons, saveButton, imgArr) {
    const originalContent = document.querySelector('.js-original-content--relationship-intent'); 
    const changedContent = document.querySelector('.js-changed-content--relationship-intent'); 
    const relationshipIntent_Reflection = document.querySelector('.js-relationship-intent--reflection'); 
    saveButton.setAttribute("disabled", ""); 
    saveButton_onDisable(saveButton); 
    for(const button of buttons) {
        button.addEventListener('click', (e) => {
            isRelationshipIntentSelected = true
            relationshipIntent_Reflection.style.visibility = "visible"; 
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

function checkAllFieldsAreFilled() {
    const clickEvent = new MouseEvent("click"); 
    const inputFiles = Array.from(document.querySelectorAll('.js-file-input')); 
    const strBoxes = Array.from(document.querySelectorAll('.js-stretchbox')); 
    const removeImageButtons = Array.from(document.querySelectorAll('.js-remove-image-button')); 
    const inputFields = Array.from(document.querySelectorAll('.js-required-field')); 
    const imageFields = Array.from(document.querySelectorAll('.js-image-field')); 
    const continueButton = document.querySelector('#createAccountContinueButton'); 

    for(let i = 0; i < removeImageButtons.length; i++) {
        removeImageButtons[i].style.display = "none"; 

        removeImageButtons[i].addEventListener('click', (e) => {    
            const removeImageButton = e.currentTarget; 
            const strBox = removeImageButton.closest('.js-stretchbox'); 
            const addImageButton = strBox.querySelector('.js-add-image-button');  
            const image = strBox.querySelector('.js-image-field') 
            image.style.backgroundImage = "none"; 
            toggleButton(removeImageButton, addImageButton); 
        })
    }

    for(let i = 0; i < inputFiles.length; i++) {
        strBoxes[i].addEventListener('click', () => {
            inputFiles[i].dispatchEvent(clickEvent)
        })

        inputFiles[i].addEventListener("change", (e) => {
            const imageUrl = URL.createObjectURL(e.target.files[0]); 
            if(!imageUrl) return;
            for(let i = 0; i < imageFields.length; i++) {
                const imageField = imageFields[i];  
                if(imageField.style.backgroundImage === "none") {
                    imageField.style.backgroundImage = `url(${imageUrl})`; 
                    const strBox = imageField.closest('.js-stretchbox'); 
                    const addImageButton = strBox.querySelector('.js-add-image-button'); 
                    const removeImageButton = strBox.querySelector('.js-remove-image-button'); 
                    toggleButton(addImageButton, removeImageButton);
                    return; 
                }
                continue
            }
        }); 
    }

    function isValidEmail() {
        return (/^\S+@\S+\.com$/.test(document.getElementById("emailAddress").value))
    }
    
    function toggleButton(element1, element2) {
        element1.style.display = "none";  
        element2.style.display = "flex"; 
    }

    function allFilled() {
        if(inputFieldsAreFilled() && isValidEmail() && isGenderSelected && isInterestGroupSelected && isRelationshipIntentSelected && areInterestsSelected) {
            return true; 
        }
        return false; 
    }

    function inputFieldsAreFilled() {
        const filledFields = inputFields.filter((inputField) => inputField.val !== ''); 
        if(filledFields.length === inputFields.length) {
            return true; 
        }
        return false; 
    }

    function twoImagesAreUploaded() {
        const uploadedImages = imageFields.filter((imageField) => imageField.style.backgroundImage !== "none"); 
        if(inBetween(uploadedImages.length, imageFields.length, 2)) {
            return true; 
        }
        return false; 
    }

    inputFields.forEach((inputField) => {
        inputField.addEventListener("keyup", () => {
            allFilled() ? continueButton.removeAttribute("disabled") : continueButton.setAttribute("disabled", "disabled") 
        })
    });
    
    continueButton.addEventListener('click', () => {
        window.location.replace("../../captcha/index.html")
    })
}

let areInterestsSelected = false; 
function functionality_AddInterests() { 
    const maxInterests = 8; 
    const minInterests = 3; 
    const saveBtn = document.querySelector('.js-save-button--add-interests'); 
    const text = saveBtn.querySelector('.text');
    const interests = Array.from(document.querySelectorAll('.js-selection-field--add-interests'));
    saveBtn.addEventListener('click', () => {
        document.querySelector('.js-interests-preview').innerText = ""; 
        const selectedInterests = interests.filter((interest) => interest.classList.contains('active'))
        for(const interest of selectedInterests) {
            document.querySelector('.js-interests-preview').innerText += " " + interest.firstElementChild.innerText
        }
    })

    interests.forEach((interest) => {
        interest.addEventListener('click', (e) => {
            e.currentTarget.classList.contains('active') ? e.currentTarget.classList.remove('active') : e.currentTarget.classList.add('active'); 

            const selectedInterests = interests.filter((interest) => interest.classList.contains('active'))
            text.innerHTML = `Save (${selectedInterests.length}/${maxInterests})`
            if(selectedInterests.length === maxInterests || selectedInterests.length < minInterests) {
                saveBtn.setAttribute('disabled', 'disabled')
                areInterestsSelected = false; 
                return; 
            }
            saveBtn.removeAttribute('disabled')
            areInterestsSelected = true; 
        })
    })
}

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