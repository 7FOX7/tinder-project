$(document).ready(function() {
    const welcomeToTinderPopup = $('.js-modal[id="888j"]'); 
    welcomeToTinderPopup.addClass('active'); 
    $('.js-overlay').addClass('active'); 
    $("body").css({"overflow": "hidden"});

    const registrationHeaderTitle = $('.js-header-title'); 
    $('.js-button').click(function() {
        var modalName = $(this).attr('data-modal');
        if(modalName === 'Create-Account') {
            if($(this).attr('data-modal-type')) {
                registrationHeaderTitle.text('Get Started'); 
            }
            else {
                registrationHeaderTitle.text('Create Account'); 
            }
        }
        
        closePreviousPopups(modalName); 
    });
    
    $('.js-close-modal').click(function() {
        var closeId = $(this).attr('id');
        var modalObj = $('.js-modal[id="'+closeId+'"]');   
        var modalId = modalObj.attr('id');
        if(modalId === closeId) {
            var modal = $('.js-modal[id="'+modalId+'"]'); 
            modal.removeClass('active'); 
            $('.js-overlay').removeClass('active'); 
            $("body").css({"overflow": "auto"});
        }
    });
    
    function closePreviousPopups(modalName) {
        $('.js-modal').each(function() { 
            if($(this).attr('data-modal') !== modalName) {
                $(this).removeClass('active'); 
            }
            else {
                $(this).addClass('active'); 
                $('.js-overlay').addClass('active'); 
            }
        });
        $("body").css({"overflow": "hidden"}); 
    }
    
    $('.js-overlay').click(function() {
        welcomeToTinderPopup.hasClass('active') ? 0 : ($(this).removeClass('active'), $('.js-modal').removeClass('active'), $("body").css({"overflow": "auto"})); 
    })
})

// document.addEventListener('readystatechange', (e) => {
//     if(e.target.readyState === "interactive") {
//         const modalButtons = document.querySelectorAll('.js-button');
//         modalButtons.forEach((modalButton) => {
//             modalButton.addEventListener('click', (e) => {
//                 const modalName = e.target.dataset.modal; 
                
//             })
//         }) 
//     }
// })

