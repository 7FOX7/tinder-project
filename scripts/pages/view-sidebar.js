
function createImage(src, alt) {
    const image = new Image(); 
    image.src = src; 
    image.alt = alt; 
}

// Corresponding buttons
const exploreBtn = document.querySelector('.js-link-button-explore'); 
const workBtn = document.querySelector('.js-link-button-work'); 
const guardBtn = document.querySelector('.js-link-button-guard'); 

// Default images
const explore_squaresImg = document.querySelector('.js-explore-squares-img'); 
const explore_searchImg = document.querySelector('.js-explore-search-img'); 
const workImg = document.querySelector('.js-suitcase-img'); 
const guardImg = document.querySelector('.js-guard-img'); 

// Colorful images
const COLOR_explore_squaresImg = document.querySelector('.js-COLOR-explore-squares-img');
const COLOR_explore_searchImg = document.querySelector('.js-COLOR-explore-search-img'); 
const COLOR_workImg = document.querySelector('.js-COLOR-suitcase-img'); 
const COLOR_guardImg = document.querySelector('.js-COLOR-guard-img'); 

toggleImages(exploreBtn, explore_squaresImg, COLOR_explore_squaresImg); 
toggleImages(exploreBtn, explore_searchImg, COLOR_explore_searchImg); 
toggleImages(workBtn, workImg, COLOR_workImg); 
toggleImages(guardBtn, guardImg, COLOR_guardImg); 

function toggleImages(btn, defaultImg, colorImg) {
    btn.addEventListener('mouseenter', () => {
        defaultImg.style.display = "none"; 
        colorImg.style.display = "flex";
    }); 

    btn.addEventListener('mouseleave', () => {
        defaultImg.style.display = "flex"; 
        colorImg.style.display = "none"; 
    }); 
}

const innerText_Container = document.querySelector('.js-content-text-container');
const matchesSection = document.querySelector('.js-rectangle-images-container'); 
const messagesSection = document.querySelector('.js-talk-images-container'); 
const matchesBtn = document.querySelector('.js-matches-button');
const messagesBtn = document.querySelector('.js-messages-button'); 
const underlineMatches = document.querySelector('.js-underline-matches'); 
const underlineMessages = document.querySelector('.js-underline-messages'); 
const mainRect = document.querySelector('.js-main-rect'); 
const bigTalk = document.querySelector('.js-big-talk'); 
const smallTalk = document.querySelector('.js-small-talk'); 

const moveLeft = [
    {left: "0"}, 
    {left: "-155px"}
]

const moveRight = [
    {left: "0"}, 
    {left: "155px"}
]

const cardBounce = [
    {transform: "rotate(15deg)"},
    {transform: "rotate(30deg)"},
    {transform: "rotate(0)"}
]

const talkScale = [
    {scale: "1.1"}, 
    {scale: "1.25"}, 
    {scale: "1"}
]

const iconTiming = {
    duration: 800,
    easing: "ease-out"
}

const duration = 250; 
const timing = {
    duration
}; 

function runAnimation(btn, underlineToShow, underlineToHide, animation, timing) {
    btn.addEventListener('click', () => {
        underlineToHide.animate(animation, timing);   
        const animationPromise = underlineToHide.animate(animation, timing).finished; 
        animationPromise.then(() => {  
            underlineToHide.style.opacity = "0"; 
            underlineToShow.style.opacity = "1";
        })
    })
}

function displaySections() {
    let matchesSectionIsOpen = false; 
    let messagesSectionIsOpen = false; 
    matchesBtn.addEventListener('click', () => {
        if(matchesSectionIsOpen) {
            return; 
        }
        matchesSectionIsOpen = true; 
        messagesSectionIsOpen = false; 
        clearTimeout(smallTalkTimeout); 
        toggleSections(matchesSection, messagesSection); 
    
        const innerTitle = innerText_Container.firstElementChild; 
        const innerText = innerText_Container.lastElementChild; 
        innerTitle.textContent = "Start Matching"; 
        innerText.textContent = `Matches will appear here once you start to Like people. You can message them directly from here when
        you're ready to spark up the conversation.`
    
        underlineMatches.animate(moveLeft, timing); 
        runAnimationForCard(); 
        onFinish(underlineMessages, underlineMatches, moveLeft, timing); 
    })
    
    messagesBtn.addEventListener('click', () => {
        if(messagesSectionIsOpen) {
            return; 
        }
        messagesSectionIsOpen = true; 
        matchesSectionIsOpen = false; 
        toggleSections(messagesSection, matchesSection); 
    
        const innerTitle = innerText_Container.firstElementChild;
        const innerText = innerText_Container.lastElementChild; 
        innerText.textContent = `Looking to strike up a conversation? When you match with others, 
        you can send them a message under “Matches”.`; 
        innerTitle.textContent = "Say Hello"; 
    
        underlineMessages.animate(moveRight, timing); 
        runAnimationForTalk(); 
        onFinish(underlineMatches, underlineMessages, moveRight, timing);
    })
}



function onFinish(underlineToHide, underlineToShow, animation, timing) {
    const animationPromise = underlineToHide.animate(animation, timing).finished; 
    animationPromise.then(() => {
        underlineToHide.style.opacity = "0"; 
        underlineToShow.style.opacity = "1"; 
    }); 
}

function runAnimationForCard() {
    mainRect.animate(cardBounce, iconTiming); 
}

function runAnimationForTalk() {
    smallTalkTimeout = setTimeout(() => {
        smallTalk.animate(talkScale, iconTiming);
    }, 800);   
    bigTalk.animate(talkScale, iconTiming); 
}

function toggleSections(sectionToDisplay, sectionToHide) {
    sectionToDisplay.style.display = "inline"; 
    sectionToHide.style.display = "none"; 
}

displaySections(); 


