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


////////////////////////////////////////////////////
const underline = document.createElement('label'); 
underline.style.width = "100%"; 
underline.style.display = "flex"; 
underline.style.height = "4px"; 
underline.style.backgroundImage = "linear-gradient(to right, rgb(255, 46, 46), rgb(255, 86, 114))"; 
/*
    display: flex; 
    width: 100%; 
    height: 4px; 
    background-image: linear-gradient(to right, rgb(255, 46, 46), rgb(255, 86, 114)); 
*/
const matchesBtn = document.querySelector('.js-matches-button');
const messagesBtn = document.querySelector('.js-messages-button'); 

// displayUnderlineFor(matchesBtn); 
// displayUnderlineFor(messagesBtn); 

// function displayUnderlineFor(element) {
//     const parent = element.closest('.js-button-section'); 
//     element.addEventListener('click', () => {
//         underline.style.display = "flex"; 
//         parent.append(underline); 
//     })
// }


