let chooseGenderHTML = ''; 

chooseGenderHTML = `
<div class="popup-container js-popup-container">
<div class="main-body">
    <div class="header-container">
        <div class="header">
            <label style="font-size: 23px; font-weight: bold;">What's your gender?</label>
            <span style="font-size: 19px; color: rgba(0, 0, 0, 0.65); margin-top: 6px;">Select one that best represents you</span>
        </div>
    </div>
    <div class="search-input-container">
        <span class="material-symbols-outlined" style="opacity: 0.6;">search</span>
        <input class="search-input" type="text" spellcheck="false" placeholder="Search">
    </div>
    <ul class="search-results-container js-search-results-container">
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Agender">Agender</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Androgyne">Androgyne</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Androgynous">Androgynous</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Bigender">Bigender</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Female to Male">Female to Male</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="FTM">FTM</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Gender Fluid">Gender Fluid</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Gender Nonconfirming">Gender Nonconfirming</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Genderqueer">Genderqueer</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Male to Female">Male to Female</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="MTF">MTF</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Neither">Neither</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Neutrois">Neutrois</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Other">Other</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Trans Man">Trans Man</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Trans Woman">Trans Woman</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Transmasculine">Transmasculine</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
        <li class="search-result">
        <div class="js-menu-option menu-option">
            <div class="search-inner-content">
                <label class="js-label-gender label-gender" data-gender="Two-Spirit">Two-Spirit</label>
                <div class="js-checkbox-container2 checkbox-container2">
                    <svg>
                        <path fill="red" d="M23.1 2.348a2.174 2.174 0 0 1 .358 3.198L8.925 22.061.63 13.745a2.161 2.161 0 0 1 3.06-3.053l5.018 5.031 11.484-13.05a2.174 2.174 0 0 1 2.907-.325"></path>
                    </svg>
                </div>
            </div>
        </li>
    </ul>
    <div style="backdrop-filter: blur(2px); width: 100%; height: 145px; position: relative; top: -65px;"></div>
    <div class="checkbox-container">
        <label class="js-custom-checkbox custom-checkbox" for="checkboxInput">
            <input class="custom-checkbox-input" type="checkbox" id="checkboxInput">
            <span class="checkmark"></span>
        </label>
        Show my gender on my profile
    </div>
    <div class="button-container">
        <button class="js-save-button save-button">Save</button>
    </div>
</div>
</div>
</div>
`

$(document).ready(function() {
    $('head').append('<link rel="stylesheet" type="text/css" href="../../styles/pop-ups/searchbar-listbox.css"/>'); 
    $('head').append('<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />'); 

    document.querySelector('.js-show-genders-popup')
            .innerHTML = chooseGenderHTML; 

    $('.js-gender-button').click(function() {
        document.body.style.overflow = 'hidden'; 
        $('.js-popup-container').addClass('active');
        $('.js-overlay').addClass('active');  
    });


    $('.js-menu-option').on('click', function() { 
        enableSingleCheck(); 
        var checkbox = $(this).find('.js-checkbox-container2');
        var label = $(this).find('.js-label-gender'); 
        label.addClass('font-bold'); 
        checkbox.addClass('active'); 
    });

    $('.js-save-button').on('click', function() {
        $('.js-checkbox-container2').each(function() {
            if(isChecked($(this))) {
                var parent = getParentOf($(this)); 
                var gender = parent.find('.js-label-gender').attr("data-gender"); 
                $('.js-gender-button').text(`${gender} >`); 
                console.log(gender); 
            }
            else {
                return; 
            }
        });
        closePopup(); 
    });

    $('#checkboxInput').change(function() {
        if($(this).is(':checked')) {
            $('.js-checkbox').prop('checked', true); 
        }
        else {
            $('.js-checkbox').prop('checked', false); 
        }
    })
    

    $(window).on("scroll", function() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            console.log('you are at the bottom'); 
        }
    });

    $('.js-overlay').click(function() {
        closePopup(); 
    })

    function isChecked(value) {
        return value.hasClass('active'); 
    }

    function getParentOf(value) {
        return value.closest('.js-menu-option'); 
    }

    function closePopup() {
        if($('.js-popup-container').hasClass('active')) {
            $('.js-popup-container').removeClass('active'); 
            $('.js-overlay').removeClass('active'); 
            document.body.style.overflow = 'auto';
        } 
    }

    function enableSingleCheck() {
        $('.js-checkbox-container2').each(function() {
            $(this).removeClass('active'); 
        });
        $('.js-label-gender').each(function() {
            $(this).removeClass('font-bold'); 
        })
    }
});


