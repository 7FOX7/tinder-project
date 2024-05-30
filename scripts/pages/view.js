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


const matchesBtn = document.querySelector('.js-matches-button');
const messagesBtn = document.querySelector('.js-messages-button'); 
const underlineMatches = document.querySelector('.js-underline-matches'); 
const underlineMessages = document.querySelector('.js-underline-messages'); 
const mainRect = document.querySelector('.js-main-rect'); 

const moveLeft = [
    {left: "0"}, 
    {left: "-164px"}
]

const moveRight = [
    {left: "0"}, 
    {left: "164px"}
]

const cardBounce = [
    {transform: "rotate(15deg)"}
]


const duration = 250; 
const timing = {
    duration,
}; 

// doSomething(matchesBtn, underlineMessages, moveLeft, timing); 

runAnimation(matchesBtn, underlineMatches, underlineMessages, moveLeft, timing, mainRect, cardBounce); 
runAnimation(messagesBtn, underlineMessages, underlineMatches, moveRight, timing, mainRect, cardBounce); 

function runAnimation(btn, underlineToShow, underlineToHide, animation, timing, figure, addAnimation) {
    btn.addEventListener('click', () => {
        // const t0 = performance.now(); 
        underlineToHide.animate(animation, timing); 
        figure.animate(addAnimation, timing); 
        const animationPromise = underlineToHide.animate(animation, timing).finished; 
        animationPromise.then(() => {
            // const t1 = performance.now(); 
            // const millisecondTime = t1 - t0; 
            // const executionTime = (Math.round(millisecondTime)/1000).toFixed(1); 
            // console.log(executionTime); 
            // if(Number(executionTime) === 0.3 || Number(executionTime) === 0.4) {    
                underlineToHide.style.opacity = "0"; 
                underlineToShow.style.opacity = "1";
            //} 
            // else {
            //     console.log("transition failed"); 
            // }
        })
    })
}



 
// function doSomething(button, line, animation, timing) {
//     button.addEventListener('click', () => {
//         const t0 = performance.now();
//         line.animate(animation, timing);
//         const animationPromise = line.animate(animation, timing).finished; 
//         animationPromise.then(() => {
//             const t1 = performance.now();
//             const millisecondTime = t1 - t0;  
//             const executionTime = (Math.round(millisecondTime) / 1000).toFixed(1); 
//             if(Number(executionTime) === 1.0 || Number(executionTime) === 1.1) {
//                 line.style.opacity = "0"; 
//             }
//         })
//     }); 
    
// }



// function stopPlaying() {

// }


// function runAnimation(btn, underlineToShow, underlineToHide, animation, timing) {
//     btn.addEventListener('click', () => {
//         underlineToHide.animate(animation, timing); 
//     }); 
//     setTimeout(() => {
//         underlineToShow.style.opacity = "1"; 
//         underlineToHide.style.opacity = "0"; 
//     }, 1000); 
// }


