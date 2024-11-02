const createImage = function(src, alt) {
    const image = new Image(); 
    image.src = src; 
    image.alt = alt; 
    return image; 
} 

const blueDolphinImg = createImage('../../images/CAPTCHA-blue_dolphin.png', 'blue dolphin'); 
blueDolphinImg.setAttribute('data', 'blue'); 

const greenDolphinImg = createImage('../../images/CAPTCHA-green_dolphin.png', 'green dolphin'); 
greenDolphinImg.setAttribute('data', 'green'); 

const lightBlueDolphinImg = createImage('../../images/CAPTCHA-lightblue_dolphin.png', 'lightblue dolphin'); 
lightBlueDolphinImg.setAttribute('data', 'lightblue'); 

const orangeDolphinImg = createImage('../../images/CAPTCHA-orange_dolphin.png', 'orange dolphin'); 
orangeDolphinImg.setAttribute('data', 'orange'); 

const redDolphinImg = createImage('../../images/CAPTCHA-red_dolphin.png', 'red dolphin'); 
redDolphinImg.setAttribute('data', 'red'); 

const violetDolphinImg = createImage('../../images/CAPTCHA-violet_dolphin.png', 'violet dolphin');
violetDolphinImg.setAttribute('data', 'violet'); 

const reloadImg = createImage('../../images/reload_icon.png', 'reload'); 
reloadImg.style.width = "100%"; 


const CAPTCHA_resultText = document.createElement('span'); 
CAPTCHA_resultText.textContent = "default"; 
CAPTCHA_resultText.style.fontWeight = "bold"; 
CAPTCHA_resultText.style.fontSize = "30px"; 
CAPTCHA_resultText.style.visibility = "hidden";  
CAPTCHA_resultText.style.marginBottom = "30px"; 

const CAPTCHA_addText = document.createElement('span');
CAPTCHA_addText.textContent = 'Please pick a dolphin that is '; 

const CAPTCHA_text = document.createElement('span'); 

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
    CAPTCHA_resultText.style.visibility = "hidden";  
    locateAtRandomPositions(); 
    const randDolphin = generateRandomColor(); 
    changeTextColor(randDolphin); 
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

listArr.forEach((list) => {
    list.setAttribute('class', `js-list-selection`); 
}); 

function init() {
    locateAtRandomPositions(); 
    document.querySelector('.js-captcha-inner-content').style.display = "none"; 
    document.querySelector('.js-captcha-inner-container').prepend(CAPTCHA_addText); 
    document.querySelector('.js-captcha-inner-container').append(CAPTCHA_text); 
    document.querySelector('.js-captcha-inner-container').append(CAPTCHA_imageList);
    document.querySelector('.js-captcha-inner-container').append(reloadButton);
    document.querySelector('.js-captcha-inner-container').prepend(CAPTCHA_resultText); 

    const listSelections = document.querySelectorAll('.js-list-selection');
    const index = randomNumGen(); 
    const randDolphin = listSelections[index].firstElementChild; 
    const randDolphinColor = getDolphinColor(randDolphin); 
    CAPTCHA_text.textContent = randDolphinColor; 
    changeTextColor(randDolphin); 

    listSelections.forEach((list) => {
        list.addEventListener('click', function() {
            compareSelections(list); 
        });
    });
} 

function compareSelections(userSelection) {  
    const userDolphin = userSelection.firstElementChild; 
    // const randomDolphin = listSelections[Math.floor(Math.random()*listArr.length)].firstElementChild;
    // CAPTCHA_text.textContent = getDolphinColor(randomDolphin); 
    if(getDolphinColor(userDolphin) === CAPTCHA_text.textContent) {
        CAPTCHA_resultText.style.visibility = "visible"; 
        CAPTCHA_resultText.style.color = "var(--right-answer-color)"; 
        CAPTCHA_resultText.textContent = "Correct!"; 
        setTimeout(() => {
            window.location.replace('../../pages/view.html');
        }, 1500); 
    }
    else {
        CAPTCHA_resultText.style.visibility = "visible"; 
        CAPTCHA_resultText.style.color = "var(--wrong-answer-color)"; 
        CAPTCHA_resultText.textContent = "Oops! Please try again";  
        locateAtRandomPositions(); 
        generateRandomColor(); 
    }
}

function generateRandomColor() {
    const listSelections = document.querySelectorAll('.js-list-selection'); 
    const index = randomNumGen(); 
    const randDolphin = listSelections[index].firstElementChild; 
    CAPTCHA_text.textContent = getDolphinColor(randDolphin); 
    changeTextColor(randDolphin); 
    return randDolphin; 
}

function randomNumGen() {
    return Math.floor(Math.random()*listArr.length);  
}

function getDolphinColor(dolphin) {
     const dolphinColor = dolphin.getAttribute('data'); 
     return dolphinColor; 
}

function changeTextColor(dolphin) {
    CAPTCHA_text.style.color = `${getDolphinColor(dolphin)}`; 
    CAPTCHA_text.style.fontWeight = "bold"; 
    CAPTCHA_text.style.fontSize = "20px"; 
}

function locateAtRandomPositions() {
    updatedImgArr.length = 0; 
    for(let i = 0; i < listArr.length; i++) {
        const imageAtRandomPos = getRandomImage(); 
        updatedImgArr.push(imageAtRandomPos); 

        listArr[i].append(updatedImgArr[i]); 
        CAPTCHA_imageList.append(listArr[i]);
    } 
}

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
        const verifyButton = document.getElementById('verifyBtn');  
        verifyButton.style.outline = "var(--verify-button-color) solid"; 
        verifyButton.style.outlineOffset = "5px";
        setTimeout(() => {
            init(); 
        }, 300); 
    }); 