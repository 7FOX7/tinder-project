$(document).ready(function() {
    const inputFile = $('.js-file-input'); 
    $('.js-stretchbox').click(function() {
        inputFile.click(); 
    });

    $('.js-remove-image-button').css("display", "none");
    $('#createAccountContinueButton')
        .prop('disabled', true)
        .css({'background-image': 'none', 'background-color': 'rgba(0, 0, 0, 0.2)'}); 
    
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
                    .css({"background-image": "linear-gradient(to bottom right, red, hotpink)"}); 
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
                    .css({"background-image": "linear-gradient(to bottom right, red, hotpink)"});  
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
                    .css({"background-image": "linear-gradient(to bottom right, red, hotpink)"});  
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
                .css({"background-image": "linear-gradient(to bottom right, red, hotpink)"}) 
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
                .css({"background-image": "linear-gradient(to bottom right, red, hotpink)"}) 
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
        const leftSectionButtons_Gender = document.querySelectorAll('.js-left-section-button--gender'); 
        const leftSectionButtons_InterestGroup = document.querySelectorAll('.js-left-section-button--interest-group'); 
        const leftSectionButtons_RelationshipIntent = document.querySelectorAll('.js-left-section-button--relationship-intent'); 

        const genderButtons = document.querySelectorAll('.js-button--gender'); 
        handleLeftSectionButtonClick(genderButtons, leftSectionButtons_Gender); 

        const interestGroupButtons = document.querySelectorAll('.js-button--interest-group');  
        handleLeftSectionButtonClick(interestGroupButtons, leftSectionButtons_InterestGroup); 

        const relationshipIntentButtons = document.querySelectorAll('.js-button--relationship-intent')
        handleLeftSectionButtonClick(relationshipIntentButtons, leftSectionButtons_RelationshipIntent);  

        const relationhipIntent_innerButtons = document.querySelectorAll('.js-inner-button--relationship-intent'); 
        handleRelationshipIntentButtonClick(relationhipIntent_innerButtons); 

        const form = document.querySelector('form'); 
        form.addEventListener('submit', e => {
            e.preventDefault(); 
        }); 
    }
});

function enableSingleSelection(btn, arr) {
    arr.forEach((val) => {
        val === btn ? (val.classList.add('left-section-button--selected')) : (val.classList.remove('left-section-button--selected')) ; 
    })
}

function handleLeftSectionButtonClick(buttons, leftSectionButtons_Group) {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const button_Parent = e.target.closest('.js-left-section-button'); 
            enableSingleSelection(button_Parent, leftSectionButtons_Group); 
        }); 
    })
}

function handleRelationshipIntentButtonClick(buttons) {
    const relationshipIntent_Reflection = document.querySelector('.js-relationship-intent--reflection'); 
    for(const button of buttons) {
        button.addEventListener('click', (e) => {
            const currentButton = e.target; 
            relationshipIntent_Reflection.textContent = currentButton.textContent; 
        })
    }
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