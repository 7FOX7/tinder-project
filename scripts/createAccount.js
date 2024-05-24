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

    const nameField = $('.js-required-name'); 
    const emailField = $('.js-required-email'); 
    const monthField = $('#monthOfBirth'); 
    const dayField = $('#dayOfBirth'); 
    const yearField = $('#yearOfBirth'); 

    handleInvalidInput(nameField); 
    handleInvalidInput(emailField); 
    handleMonth(monthField); 
    handleDay(dayField); 

    function handleInvalidInput(field) {
        $(field).on('focusout', function() {
            var errorMessage = $(this).closest('.js-input-section').find('.js-error-message'); 
            if($(this).val() === "") {
                errorMessage.addClass('active'); 
            }
            else {
                errorMessage.removeClass('active'); 
            }
        })
    }

    function handleMonth(month) {  
        // const parent = $(month).closest('.js-input-section'); 
        const nextField = dayField; 
        const regex = /\b(10|11|12)\b/g;
        $(month).on('keyup', function() {
            var stringValue = $(month).val(); 
            
            if(regex.test(stringValue)) {
                nextField.focus(); 
            }
            else {
                console.log(`${stringValue} is Invalid`); 
            }
        }); 
    }

    function handleDay(day) {
        const nextField = yearOfBirth; 
        const regex = /\b([12]?\d|3[01])\b/; 
        $(day).on('keyup', function(){
            var stringValue = $(day).val();

            if(regex.test(stringValue) && stringValue.length === 2)  {
                nextField.focus(); 
            }
            else {
                console.log(`${stringValue} is Invalid`); 
            }
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