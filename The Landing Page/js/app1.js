//Global constants
const sections = document.querySelectorAll('section');
const parent = document.querySelector('#navbar__list');
/**@@description navigation builder
 * Creates navigation menu by adding nav links
 */
function navGen() {
    sections.forEach(section => {
        let child = document.createElement('li');
        let link = document.createElement('a');
        let sectionId = section.id;
        link.textContent = section.dataset.nav;
        link.setAttribute('class','menu__link');
        link.setAttribute('href', `#${sectionId}`);
        child.appendChild(link);
        parent.appendChild(child);
    });
}
// The navGen() function is called
navGen();

//Alternative styling
//Media queries
if (window.innerWidth <= 599) {
    document.querySelector('h1').style.cssText = "font-size: 3em;\n" +
        "margin: 4em 1em 2.4em 0.5em;";
}
else if (window.innerWidth >= 560){
    document.querySelector('h1').style.cssText = "font-size: 7em;\n" +
        "margin: 2em 4rem 3em;";
}

// Add scroll method to navigation links and remove click event from links
  anchor = parent.querySelectorAll('a');
document.querySelectorAll('a[href^="#"]').forEach(navLin =>{
  navLin.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
            speed: 800
        })
    })
})
const offSet = (section) => {
    // Get the position of the current section in view
    return Math.floor(section.getBoundingClientRect().top);
}
// Remove class of 'active-section' when section is not in viewport
const removeActiveClass = (section) => {
    section.classList.remove('active-section');
    sectionId = section.id.slice(7,8)-1;
    anchor[sectionId].style.cssText = "color: black;";
}
// Add class of 'active-section' when section is in viewport
const activeSection = (condition, section) => {
    if(condition){
        section.classList.add('active-section');
        sectionId = section.id.slice(7,8)-1;
        anchor[sectionId].style.cssText = "color: #fff; background-color: #333;";
    }
}
/* Create a function to check from the list of available section which is currently inviewport
    call the activeSection()
    call the removeSection()
 */
const activateSection = () => {
    sections.forEach(section => {
        const elementOffSet = offSet(section);
        inViewport = () => elementOffSet < 270 && elementOffSet >= -220;
        removeActiveClass(section);
        activeSection(inViewport(), section);
    });
}
document.addEventListener("scroll",activateSection);
// ====Scroll to top =====
const scrollBtn = document.querySelector('.scroll-to-top');
scrollBtn.addEventListener('click', () =>{
   document.documentElement.scrollTop = 0;
   // document.body.scrollTop = 0; //For safari  browers
})
// When page is loaded, hide the scroll to top button
window.onload = () => {
    scrollBtn.style.cssText = "    position: fixed;\n" +
        "    bottom: 0;\n" +
        "    right: 60px;\n" +
        "    opacity: 1; border: none;\n" +
        "    font-size: 40px;\n" +
        "    color: rgb(255 248 220);\n" +
        "    background: linear-gradient(-90deg, rgb(9 49 247), rgb(245 245 245));\n" +
        "    border-radius: 50%;\n" +
        "    width: 50px; cursor: pointer;\n" +
        "    height: 50px;";
    scrollBtn.style.visibility = "hidden";
    scrollBtn.style.opacity = 0;
}
/*If page is scrolled more than 200px
display the scroll-to-top button
Otherwise keep it hidden 
 */
window.onscroll = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight ;
    const scrolled = window.scrollY
    if(Math.ceil(scrolled) === scrollable) {
        scrollBtn.style.visibility = "visible";
        scrollBtn.style.opacity = 1;
    }
    else {
        scrollBtn.style.visibility = "hidden";
    }
}
