const crossButton = document.querySelector('.js-cross-sign-button'); 

crossButton.addEventListener('mouseenter', () => {
    document.querySelector('.js-cross-small').classList.add('inactive'); 
    document.querySelector('.js-cross-large').classList.add('active'); 
});

crossButton.addEventListener('mouseleave', () => {
    document.querySelector('.js-cross-small').classList.remove('inactive');
    document.querySelector('.js-cross-large').classList.remove('active');  
});

const canvas = document.createElement('canvas'); 

var createImage = function(src, title) {
    var img = new Image(); 
    img.src = src; 
    img.alt = title; 
    img.alt = title; 
    img.title = title; 
    return img; 
}

const lightBlueDolphinImg =  createImage('../../images/CAPTCHA-lightblue_dolphin.png', 'light blue dolphin'); 
const violetDolphinImg = createImage('../../images/CAPTCHA-violet_dolphin.png', 'violet dolphin'); 
const redDolphinImg = createImage('../../images/CAPTCHA-red_dolphin.png', 'red dolphin'); 

const dolphinArr = []; 
dolphinArr.push(lightBlueDolphinImg); 
dolphinArr.push(violetDolphinImg); 
dolphinArr.push(redDolphinImg); 

const opts = {
    len : 3, 
    arr : dolphinArr, 
    cap : [] 
};




