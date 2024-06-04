function getHalfOfViewport() {
    return Math.floor((document.querySelector('.js-main').clientWidth) / 2); 
}

const halfOfViewport = getHalfOfViewport(); 
export default halfOfViewport;  


