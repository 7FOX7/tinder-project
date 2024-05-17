/*
function togglePopup() {
    document.querySelector('.js-registration-popup').classList.toggle("active"); 
    document.querySelector('.js-tinder-background').classList.toggle("active");  
}

// const buttonList = document.querySelectorAll('.js-button'); 
const popupHeader = document.querySelector('.js-header-title'); 
buttonList.forEach((button) => {
    let id = button.getAttribute('id'); 
    button.addEventListener('click', () => {
        if(id === 'login') {
            popupHeader.innerHTML = 'Get Started';
        }
        else if(id === 'create-account') {
            popupHeader.innerHTML = 'Create account'
        }
        togglePopup(); 
    })
});
*/
/*
const buttonList = document.querySelectorAll('.js-button'); 

const registrationHeaderTitle = document.querySelector('.js-header-title'); 
const registrationPopup = document.querySelector('.js-registration-popup'); 
const loginWithPhoneNumberPopup = document.querySelector('.js-login-with-phone-number-popup');
const tinderBackground = document.querySelector('.js-tinder-background'); 


buttonList.forEach((button) => {
    let id = button.getAttribute('id'); 
    button.addEventListener('click', () => {
        if(id === 'create-account') {
            registrationHeaderTitle.innerHTML = 'Create account'; 
            toggle(registrationPopup); 
            toggle(tinderBackground); 
        }
        else if(id === 'login') {
            registrationHeaderTitle.innerHTML = 'Get Started'; 
            toggle(registrationPopup); 
            toggle(tinderBackground); 
        }
        else {
            toggle(registrationPopup); 
            toggle(tinderBackground); 
        }
    })
})

function toggle(popup) {
    popup.classList.toggle("active"); 
}
*/

const registrationHeaderTitle = document.querySelector('.js-header-title'); 

$('.js-button').click(function(event) {
    event.preventDefault(); 
    var modalName = $(this).attr('data-modal');
    if(modalName === 'Create-Account') {
        // handle Create account / Login cases

        if($(this).attr('data-modal-type')) {
            registrationHeaderTitle.innerHTML = 'Get Started'; 
        }
        else {
            registrationHeaderTitle.innerHTML = 'Create Account'; 
        }
    }
    
    closePreviousPopups(modalName); 
    // var modal = $('.js-modal[data-modal="'+modalName+'"]');
    // modal.addClass('active'); 
});

$('.js-close-modal').click(function() {
    var closeId = $(this).attr('id');
    var modalObj = $('.js-modal[id="'+closeId+'"]');   
    var modalId = modalObj.attr('id');
    if(modalId === closeId) {
        var modal = $('.js-modal[id="'+modalId+'"]'); 
        modal.removeClass('active'); 
        $('.js-overlay-modal').removeClass('active'); 
    }
});

function closePreviousPopups(modalName) {
    $('.js-modal').each(function() { 
        if($(this).attr('data-modal') !== modalName) {
            $(this).removeClass('active'); 
        }
        else {
            $(this).addClass('active'); 
            $('.js-overlay-modal').addClass('active'); 
        }
    });
}

$('.js-overlay-modal').click(function() {
    $(this).removeClass('active'); 
    $('.js-modal').removeClass('active'); 
})

/*{event.preventDefault(); 
    $(this).parent('.js-modal').removeClass('active');}*/