let addRelationshipIntentHTML = ''; 

addRelationshipIntentHTML += `
    <div class="add-relationship-intent modal js-modal" data-modal="Relationship-Intent">
        <div class="inner-container">
            <div class="header">
                <div class="header-top-part">
                    <label>What are you looking for?</label>
                </div>
                <div class="header-lower-part">
                    <span>All good if it changes. There is something for everyone.</span>
                </div>
            </div>
            <div class="main-body">
                <div class="button-container">
                    <button>
                        <span>
                            <img src="../images/relationship-intent-heart-arrow.png" style="width: 35px;">
                        </span>
                        <span>
                            Long-term partner
                        </span>
                    </button>
                    <button>
                        <span>
                            <img src="../images/relationship-intent-heart-eyes.png" style="width: 35px;">
                        </span>
                        <span>
                            Long-term, open to short
                        </span>
                    </button>
                    <button>
                        <span>
                            <img src="../images/relationship-intent-drinking.png" style="width: 35px;">
                        </span>
                        <span>
                            Short-term, open to long
                        </span>
                    </button>
                    <button>
                        <span>
                            <img src="../images/relationship-intent-tada.png" style="width: 35px;">
                        </span>
                        <span>
                            Short-term fun
                        </span>
                    </button>
                    <button>
                        <span>
                            <img src="../images/relationship-intent-wave.png" style="width: 35px;">
                        </span>
                        <span>
                            New friends
                        </span>
                    </button>
                    <button>
                        <span>
                            <img src="../images/relationship-intent-thinking-face.png" style="width: 35px;">
                        </span>
                        <span>
                            Still figuring it out
                        </span>
                    </button>
                </div>
            </div>
            <div class="footer-section">
                <div class="button-container">
                    <button>Save</button>
                </div>
            </div>
        </div>
    </div>
`

document.addEventListener('readystatechange', (e) => {
    if(e.target.readyState === "interactive") {
        addStylesheet_addRelationshipIntent(); 
        const container = document.querySelector('.js-add-relationship-intent'); 
        container.innerHTML = addRelationshipIntentHTML;
    }
}); 

function addStylesheet_addRelationshipIntent() {
    const head = document.getElementsByTagName('HEAD')[0]; 
    const link = document.createElement('link'); 
    link.rel = "stylesheet"; 
    link.type = "text/css"; 
    link.href = "../../styles/pop-ups/add-relationship-intent.css"; 
    head.append(link); 
}