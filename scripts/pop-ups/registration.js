let registrationHTML = ''; 

registrationHTML += `
<div class="container registration-container">
    <div class="header">
        <div class="header-upper-section">
            <img src="images/favicon.ico">
            <button class="close-modal js-close-modal">
                <img src="images/close_window_icon.png">
            </button>
         </div>
        <div class="header-lower-section">
            <h2 class="js-header-title">Create account</h2>
        </div>
    </div>
    <div class="main-body">
        <span>By tapping Log In, you are agree to our 
            <a href="#" class="link-in-text"><span>Terms</span></a>
        . Learn how we process your data in our 
        <a href="#" class="link-in-text"><span>Privacy Policy</span></a>
        , and 
        <a href="#" class="link-in-text"><span>Cookie Policy</span></a>
        .</span>
        <div class="main-body-buttons">
            <button class="btn google-lgn-button js-button" id="login-with-google">
                <span class="login-text">Log in with Google</span>
                <img class="img google-icon" src="./images/google_icon.png" alt="Google">
            </button>
            <button class="btn facebook-lgn-button js-button" id="login-with-facebook">
                <span class="login-text">Log in with Facebook</span>
                <img class="img facebook-icon" src="./images/facebook_icon.png" alt="Facebook">
            </button>
            <button class="btn phone-lgn-button js-button" data-modal="Phone Login">
                <span class="login-text">Log in with phone number</span>
                <img class="img phone-icon" src="./images/phone_icon.png" alt="Phone"> 
            </button>
        </div>
    </div>
    <div class="footage">
        <a href="#" class="link-in-text">Trouble Logging In?</a>
    </div>
</div>
`

document.querySelector('.js-registration-popup')
    .innerHTML = registrationHTML; 