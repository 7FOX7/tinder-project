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


