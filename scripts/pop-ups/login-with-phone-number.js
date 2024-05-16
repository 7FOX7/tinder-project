let loginWithPhoneNumberHTML = ''; 

loginWithPhoneNumberHTML += `
    <div class="container login-with-mobile-phone-container">
        <div class="header">
            <div class="header-upper-section">
                <img src="images/favicon.ico">
                <button class="close-window-button js-button" id="close-window">
                    <img src="images/close_window_icon.png">
                </button>
                </div>
            <div class="header-lower-section">
                <h2 class="js-header-title">Can we get your number?</h2>
            </div>
        </div>
        <div class="main-body-phone">
            <div class="phone-enter-section">
                <form class="form" onsubmit="process(event)">
                    <span>Phone Number</span>
                    <input class="phone-input-field js-phone-input-field" type="tel" name="phone">
                    <input type="submit" class="next-button" value="Next"/>
                </form>
                <div class="alert alert-info js-alert-info" style="display: none"></div>
                <div class="alert alert-error js-alert-error" style="display: none"></div>
            </div>
        </div>
    </div>
`

document.querySelector('.js-login-with-phone-number-popup')
    .innerHTML = loginWithPhoneNumberHTML; 