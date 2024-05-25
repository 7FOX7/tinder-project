/*
    we have: 1. label which is created for the input of type file with the id = 'js-input-field'
             2. input of type file with the id 'image input' 

    problem: when trying to upload image for the second image field, image of the first image field is updated again

    possitble solution: create additional input fields, and for each of them create a unique id and create a label 

    problems of realization: there will be too much repeatition; 


    how we put input files inside the  array:   
    $('image-input').each {
        inputFileArr.push($(this));
    }


    how we add a function that will executed each time there are changes to the input:
    inputFileArr.forEach(() => {
        this.onchange = () => profilePic.src = URL.createObjectUrl(this.files[0]); 
    })

    still someting to prove!
    
*/

// const imageField = document.querySelector('.js-stretchbox'); 
// const inputFile = document.querySelector('.js-file-input'); 

// imageField.addEventListener('click', () => {
//     inputFile.click(); 
// });

// inputFile.addEventListener('change', (e) => {
//     let imageUrl = URL.createObjectURL(e.target.files[0]); 
//     if(!imageUrl) {
//         return; 
//     }
//     else {
//         document.querySelector('.js-stretchbox .js-image-field').style.backgroundImage = `url(${imageUrl})`; 
//     }
// })

const inputFile = document.querySelector('.js-file-input'); 
$('.js-stretchbox').click(function() {
    inputFile.click(); 
});

$(document).ready(function() {
    $('.js-remove-image-button').css("display", "none");
    $('#createAccountContinueButton')
        .prop('disabled', true)
        .css({'background-image': 'none', 'background-color': 'rgba(0, 0, 0, 0.2)'}); 

    
    
    inputFile.addEventListener('change', (e) => {
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
     
    function toggleButton(element1, element2) {
        element1.css("display", "none"); 
        element2.css("display", "flex"); 
    }

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
}); 


/*
function fill_ImageFields_in_Order(imageField, imageUrl) {
    const firstToFill = $(imageField).closest(`js-image-field-list`);
    if(firstToFill.css({"background-image" : "none"})) {
        firstToFill.css({"background-image" : `url(${imageUrl})`}); 
    }
}

jQuery.fn.extend({
    getElement: function() {
        return this; 
    }
})
*/
/*
    1. inputImages.forEach(function(image, imageField) {
        imageField.style.backgroundImage = `url(${image})`; 
    }); 


    2. 
    
    
    $('js-image-field').j


    let inputImages = []; 

    $('.js-stretchbox').click(function() {
        inputFile.click(); 
    });

    intputFile.addEventListener('change', (e) => {
        const imageURL = URL.createObjectUrl(e.target.files[0]); 
        if(!imageURL) {
            return; 
        }
        else {
            $('.js-image-field').each(function() {
                if($(this).style.backgroundImage === null) {
                    $(this).style.backgroundImage = `url(${imageUrl})`; 
                    inputFile.value = ''; 
                }
            })
        }
    })

  
    <label> refers to the <div> element. div element contains an id

    so the div with the id equals to 15, label id will be equal to 15 too

    (we have the third element which is 'more > ' button )



    div.change(e) {
        name e.target.value;     
        button = name; 
    }

*/