let welcomeToTinderHTML = ''; 

welcomeToTinderHTML += `
<div class="overlay-popup js-overlay-popup">
<div class="popup js-popup">
<div style="display: flex; flex-direction: column; align-items: center; background-color: #fff; width: 100%; height: 100%; border-radius: 10px; padding: 5%;" >
    <div class="header-popup">
        <div style="display: flex; width: 100%; height: 100%; flex-direction: column; align-items: center;">
            <div style="margin: 2px;">
                <img src="../images/favicon.ico" style="width: 20px;">
            </div>
            <div style="margin: 5px;">
                <label style="font-size: 25px;">Welcome to Tinder</label>
            </div>
            <div style="margin: 2px">
                <span style="font-size: 16px;">Please follow these house rules</span>
            </div>
        </div>
    </div>
    <div class="main-body-popup">
        <ul>
            <li style="margin-top: 6px;">
                <div style="display: flex; flex-direction: column;">
                    <label class="label-popup">Be yourself</label>
                    <div style="margin-block: 5px;">
                        <span class="span-popup">Make sure your photos, age, and bio are accurate to who you are.</span>
                    </div>
                </div>
            </li>
            <li style="margin-top: 6px;">
                <div style="display: flex; flex-direction: column">
                    <label class="label-popup">Stay safe</label>
                    <div style="margin-block: 5px;">
                        <span class="span-popup">Don't be too quick to give out personal information. <a href="#" style="text-decoration: none;"><span style="color: blue;">Date Safely</span></a></span>
                    </div>
                </div>
            </li>
            <li style="margin-top: 6px;">
                <div style="display: flex; flex-direction: column">
                    <label class="label-popup">Play it cool</label>
                    <div style="margin-block: 5px;">
                        <span class="span-popup">Respect others and treat them as you would like to be treated.</span>
                    </div>
                </div>
            </li>
            <li style="margin-top: 6px;">
                <div style="display: flex; flex-direction: column">
                    <label class="label-popup">Be proactive</label>
                    <div style="margin-block: 5px;">
                        <span class="span-popup">Always report bad behavior.</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="footage-popup">
        <div style="display: flex; justify-content: center; align-items: center;">
            <button id="agree-button" style="font-size: 20px; font-weight: bold; cursor: pointer; padding: 15px; width: 80%; border-radius: 35px; 
            color: white; border: none; background-image: linear-gradient(to bottom right, red, hotpink); transition: 0.35s; ">I agree</button>
        </div>
    </div>
</div>
</div>
`

$('head').append('<link rel="stylesheet" type="text/css" href="../../styles/pop-ups/welcome-to-tinder.css">'); 

document.querySelector('.js-welcome-popup')
    .innerHTML = welcomeToTinderHTML; 

document.body.style.position = 'fixed'; 
document.body.style.top = `-${window.scrollY}px`;

$("#agree-button").on("click", function() {
    document.body.style.position = ''; 
    document.body.style.top = ''; 
    $('.js-overlay-popup').addClass('inactive');
    $('.js-popup').addClass('inactive'); 
}); 

