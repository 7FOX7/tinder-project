let loginWithPhoneNumberHTML = ''; 

loginWithPhoneNumberHTML += `
    <div class="modal js-modal login-with-phone-number" data-modal="Phone Login" id="788y">
        <div class="header">
            <div class="header-upper-section">
                <div style="margin-left: 45%">
                    <img src="../images/favicon.ico">
                </div>
                <button class="close-modal js-close-modal" id="788y">
                    <img src="../images/close_window_icon.png">
                </button>
                </div>
            <div class="header-lower-section">
                <h2 class="js-header-title">Can we get your number?</h2>
            </div>
        </div>
        <div class="main-body-phone">
            <div class="phone-enter-section">
                <form class="form js-form">
                    <label style="margin-bottom: 10px" for="phone">Phone Number</label>
                    <input id="phone" class="phone-input-field js-phone-input-field" type="tel" name="phone">
                    <div class="alert alert-error js-alert-error" style="visibility: hidden;"></div>
                    <button type="submit" class="next-button">Next</button>
                </form>
            </div>
        </div>
    </div>
`


document.addEventListener('readystatechange', (e) => {
    if(e.target.readyState === "interactive") {
        addStylesheet_loginWithPhoneNumber(); 
        const container = document.querySelector('.js-login-with-phone-number-popup'); 
        container.innerHTML = loginWithPhoneNumberHTML; 
    }
    else if(e.target.readyState === "complete") {
        const form = document.querySelector('.js-form'); 
        const error = document.querySelector('.js-alert-error');

        form.addEventListener("submit", (e) => {
            process(e); 
        }); 

        const phoneInputField = document.querySelector('.js-phone-input-field'); 
        const phoneInput = window.intlTelInput(phoneInputField, {
            preferredCountries: ["us", "ca", "de"],
            utilsScript:
                "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });

        function process(event) {
            event.preventDefault(); 

            error.style.visibility = "hidden"
            if(!phoneInput.isValidNumber()) {
                error.style.visibility = "visible"; 
                error.innerHTML = `Invalid phone number`;
                return; 
            }
            window.location.replace("../../pages/create-account.html"); 
        }; 
    }
}) 

function addStylesheet_loginWithPhoneNumber() {
    const head = document.getElementsByTagName('HEAD')[0]; 
    const link = document.createElement('link'); 
    link.rel = "stylesheet"; 
    link.type = "text/css"; 
    link.href = "../../styles/pop-ups/login-with-phone-number.css"; 
    head.append(link); 
}