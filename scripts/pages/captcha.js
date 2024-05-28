const crossButton = document.querySelector('.js-cross-sign-button'); 

crossButton.addEventListener('mouseenter', () => {
    document.querySelector('.js-cross-small').classList.add('inactive'); 
    document.querySelector('.js-cross-large').classList.add('active'); 
});

crossButton.addEventListener('mouseleave', () => {
    document.querySelector('.js-cross-small').classList.remove('inactive');
    document.querySelector('.js-cross-large').classList.remove('active');  
});

const createImage = function(src, alt) {
    const image = new Image(); 
    image.src = src; 
    image.alt = alt; 
    return image; 
} 


const blueDolphinImg = createImage('../../images/CAPTCHA-blue_dolphin.png', 'blue dolphin'); 
const greenDolphinImg = createImage('../../images/CAPTCHA-green_dolphin.png', 'green dolphin'); 
const lightBlueDolphinImg = createImage('../../images/CAPTCHA-lightblue_dolphin.png', 'lightblue dolphin'); 
const orangeDolphinImg = createImage('../../images/CAPTCHA-orange_dolphin.png', 'orange dolphin'); 
const redDolphinImg = createImage('../../images/CAPTCHA-red_dolphin.png', 'red dolphin'); 
const violetDolphinImg = createImage('../../images/CAPTCHA-violet_dolphin.png', 'violet dolphin');

const reloadImg = createImage('../../images/reload_icon.png', 'reload'); 
reloadImg.style.width = "100%"; 


const CAPTCHA_imageList = document.createElement('ul'); 

const CAPTCHA_imageList1 = document.createElement('li'); 
CAPTCHA_imageList1.setAttribute('id', '1'); 

const CAPTCHA_imageList2 = document.createElement('li'); 
CAPTCHA_imageList2.setAttribute('id', '2'); 
CAPTCHA_imageList2.style.position = "relative"; 
CAPTCHA_imageList2.style.top = "-60px"; 
CAPTCHA_imageList2.style.left = "65px";

const CAPTCHA_imageList3 = document.createElement('li');
CAPTCHA_imageList3.setAttribute('id', '3');  
CAPTCHA_imageList3.style.position = "relative"; 
CAPTCHA_imageList3.style.top = "-120px"; 
CAPTCHA_imageList3.style.left = "130px";

const CAPTCHA_imageList4 = document.createElement('li'); 
CAPTCHA_imageList4.setAttribute('id', '4'); 
CAPTCHA_imageList4.style.position = "relative"; 
CAPTCHA_imageList4.style.top = "-115px"; 

const CAPTCHA_imageList5 = document.createElement('li'); 
CAPTCHA_imageList5.setAttribute('id', '5'); 
CAPTCHA_imageList5.style.position = "relative"; 
CAPTCHA_imageList5.style.top = "-175px"; 
CAPTCHA_imageList5.style.left = "65px";

const CAPTCHA_imageList6 = document.createElement('li');
CAPTCHA_imageList6.setAttribute('id', '6'); 
CAPTCHA_imageList6.style.position = "relative"; 
CAPTCHA_imageList6.style.top = "-235px"; 
CAPTCHA_imageList6.style.left = "130px";



const reloadButton = document.createElement('button'); 
reloadButton.append(reloadImg); 
reloadButton.style.marginTop = "15px"; 
reloadButton.style.width = "45px"; 
reloadButton.style.border = "none"; 
reloadButton.style.backgroundColor = "transparent"; 
reloadButton.style.cursor = "pointer"; 
reloadButton.addEventListener('click', () => {
    init(); 
})

const imageArr = []; 
const listArr = [];  
const updatedImgArr = []; 

imageArr.push(blueDolphinImg);
imageArr.push(greenDolphinImg); 
imageArr.push(lightBlueDolphinImg);
imageArr.push(orangeDolphinImg); 
imageArr.push(redDolphinImg);
imageArr.push(violetDolphinImg); 

listArr.push(CAPTCHA_imageList1); 
listArr.push(CAPTCHA_imageList2);
listArr.push(CAPTCHA_imageList3);
listArr.push(CAPTCHA_imageList4);
listArr.push(CAPTCHA_imageList5);
listArr.push(CAPTCHA_imageList6);

listArr.forEach((list, index) => {
    index += 1; 
    list.setAttribute('class', `js-list-selection${index}`); 
}); 
// document.addEventListener('DOMContentLoaded', init()); 

const listSelection1 = document.querySelector('.js-list-selection1'); 

function init() {

    for(let i = 0; i < listArr.length; i++) {
        const imageAtRandomPos = getRandomImage(); 
        updatedImgArr.push(imageAtRandomPos); 

        listArr[i].append(updatedImgArr[i]); 
        CAPTCHA_imageList.append(listArr[i]); 
    }
    let rightSelection = Math.floor(Math.random()*updatedImgArr.length);
    // updatedImgArr.splice(0, updatedImgArr.length); 
    updatedImgArr.length = 0; 
    /////////////////////////////////////
    // SLOW BUT SHOULD WORK

    listSelection1.addEventListener('click', (event) => {
            event.preventDefault(); 
            if(Number(event.target.id) === rightSelection) {
                console.log('you are right')
            }
            else {
                console.log('you are wrong'); 
            }
        })
    ////////////////////////////////////
    document.querySelector('.js-captcha-inner-content').style.display = "none"; 
    document.querySelector('.js-captcha-inner-container').style.transform = "translate(-40%, -40%)"; 
    document.querySelector('.js-captcha-inner-container').append(CAPTCHA_imageList);
    document.querySelector('.js-captcha-inner-container').append(reloadButton);
    console.log(rightSelection);  

    
} 

// function locateAtRandomPosition(updatedImgArr) {
//     imageArr.forEach(() => {
//         const ind = Math.floor(Math.random()*imageArr.length);
//         if(!updatedImgArr.includes(imageArr[ind])) {
//             updatedImgArr.push(imageArr[ind]);  
//         } 
//         return locateAtRandomPosition(updatedImgArr); 
//     }); 
//     return updatedImgArr; 
// }

function getRandomImage() {
    const ind = Math.floor(Math.random()*imageArr.length);
    const dolphinImg = imageArr[ind]; 
    if(!updatedImgArr.includes(dolphinImg)) {
        return dolphinImg; 
    }
    return getRandomImage(); 
}

document.querySelector('.js-inner-button')
    .addEventListener('click', () => {
        init(); 
    }); 

/*
function removeThisFunction() {
    const ctx = canvas.getContext("2d"); 

canvas.width = 250; 
canvas.height = 150; 

var createImage = function(src, title) {
    var img = new Image(); 
    img.src = src; 
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



document.querySelector('.js-inner-button')
    .addEventListener('click', () => {
        document.querySelector('.js-captcha-inner-content').style.display = "none"; 
        document.querySelector('.js-captcha-inner-container').append(canvas); 
        init(); 
    }); 

// document.addEventListener('DOMContentLoaded', init); 

function init() {
    for(let i=0; i<opts.len; i++) {
        var char = runCap(); 
        opts.cap.push(char); 
    }
    addToCanvas(); 
}

function runCap() {
    const ind = Math.floor(Math.random()*opts.arr.length); 
    let char = opts.arr[ind]; 
    if(!opts.cap.includes(char)) {
        return char; 
    } 
    else {
        return runCap(); 
    }
}

function locateOnX() {
    const arr = [0, 50, 100]; 
    return arr; 
}

function addToCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    opts.cap.forEach((image) => {
        ctx.drawImage(image, 0, 0); 
    });
}
}
*/





