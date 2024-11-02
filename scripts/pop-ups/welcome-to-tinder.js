let welcomeToTinderHTML = ''; 

welcomeToTinderHTML += `
    <div class="modal js-modal welcome-to-tinder" data-modal="Welcome To Tinder" id="888j">
        <div style="display: flex; flex-direction: column; align-items: center; background-color: #fff; width: 100%; height: 100%; border-radius: 10px; padding: 5%;" >
            <div class="header-popup">
                <div style="display: flex; width: 100%; height: 100%; flex-direction: column; align-items: center; justify-items: center; text-align: center;">
                    <div>
                        <img src="../images/favicon.ico" style="width: 30px;">
                    </div>
                    <div>
                        <h1>Welcome to Tinder</h1>
                    </div>
                    <div>
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
                                <span class="span-popup">Don't be too quick to give out personal information. <a href="#" style="text-decoration: none;"><span style="color: blue; font-size: 14px;">Date Safely</span></a></span>
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
                    <button class="js-close-modal agree-button" id="888j" style="font-size: 20px; font-weight: bold; cursor: pointer; padding: 15px; width: 80%; border-radius: 35px; 
                    color: white; border: none; background-image: linear-gradient(to bottom right, red, hotpink); transition: 0.35s;">I agree</button>
                </div>
            </div>
        </div>
    </div>
`

document.addEventListener('readystatechange', (e) => {
    if(e.target.readyState === "interactive") {
        addStylesheet_welcomeToTinder(); 
        const container = document.querySelector('.js-welcome-to-tinder-popup'); 
        container.innerHTML = welcomeToTinderHTML; 

        const welcomeToTinderPopup = document.querySelector('.js-modal[id="888j"]')
        welcomeToTinderPopup.classList.add('active')
        document.querySelector('.js-overlay').classList.add('active')
        document.body.style.overflow = "hidden"
    }
}); 

function addStylesheet_welcomeToTinder() {
    const head = document.getElementsByTagName('HEAD')[0]; 
    const link = document.createElement('link'); 
    link.rel = "stylesheet"; 
    link.type = "text/css"; 
    link.href = "../../styles/pop-ups/welcome-to-tinder.css"; 
    head.append(link); 
}