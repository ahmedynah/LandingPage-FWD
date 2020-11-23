/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const frag = document.createDocumentFragment();
const sections = document.getElementsByTagName("section");
const main = document.getElementsByTagName("main");
const list = document.querySelector("#navbar__list");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function isInTopOfViewPort(elem){
    
    let topDis = elem.getBoundingClientRect();
    return (
        topDis.top >= 0 &&
        topDis.top <= ((window.innerHeight || document.documentElement.clientHeight) / 4));
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function build_Nav(){
    
        for(section of sections){
            let anchor = document.createElement("a");
            //anchor.href = "#" + section.id;
            anchor.classList.add("menu__link");
            anchor.innerHTML = section.getAttribute("data-nav");
            frag.appendChild(anchor);
        }
        
        list.innerHTML = "";
        list.appendChild(frag);
        list.style.display = "none";
    }


// Add class 'active' to section when near top of viewport
function add_Active(){
    
    list.style.display = "block";
    for(section of sections){
        if(isInTopOfViewPort(section)){
            !section.classList.contains("your-active-class")  && section.classList.add("your-active-class");
        }
        else{
            section.classList.contains("your-active-class") && section.classList.remove("your-active-class");
        }
    }

    setTimeout(()=>{
        list.style.display = "none";
    }, 3000);  

}

// Scroll to anchor ID using scrollTO event
function goto_section(event){

    let wantedSection = event.target.textContent;
    let found = undefined;   
   
    for(section of sections){ 
        (section.getAttribute("data-nav") == wantedSection) &&  (found = section);
        }
                  
    window.scrollTo({
            top: found.offsetTop - 100,
            behavior: 'smooth',
     })   
            
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
 document.addEventListener("DOMContentLoaded", build_Nav);

// Scroll to section on link click
list.addEventListener("click",goto_section);

// Set sections as active
window.addEventListener("scroll",add_Active);

