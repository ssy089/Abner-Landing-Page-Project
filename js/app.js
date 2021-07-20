let activeSection;    //This is used to get the section that is currently labeled as acitve.
let newActiveSection; //This is used to determine the newly active section.
let sectionList;      //This is used to store all of the content-sections.
let sectionRect;      //This is used to store the DOMRect object for a given section.

/* Get all of the content-sections for the landing page. */
sectionList = document.getElementsByClassName("landing-section");

/*
 Purpose: This function is activated everytime the user
 scrolls through the landing page. This function then
 checks which section has a substantial portion of itself
 that is within the viewport. That section is then updated
 as the active section.
*/
function activateSection() {
  /* Iterate through the list of sections.
     If the bottom edge of a section is 250 pixels or more
     from the top of the viewport, and if it is above other sections
     in the viewport, set it as the active section.
  */
  for (let oneSection of sectionList) {
    sectionRect = oneSection.getBoundingClientRect();
    if (sectionRect.bottom > 250) {
      newActiveSection = oneSection;
      break;
    }
  }
  activeSection = document.querySelector(".active-section");
  activeSection.classList.remove("active-section");
  newActiveSection.classList.add("active-section");
}

/*
 Purpose: This function dynamically builds the navigation menu
 based on the amount of content-sections. This is built once
 the DOM has finished loading.
 */
function loadNavBar() {
  let navItem; //This stores a navigation menu item.
  let navLink; //This stores a section link for a navigation menu item.

  /* Create a DocumentFragment object to append elements to the
     page while minimizing page reflow.
   */
  let documentFragment = document.createDocumentFragment();

  /* Get the unordered list element that will contain the navigation menu. */
  let navBar = document.getElementById("nav-list");

  /* Create list items that contain section links. The url and text for the
     links are obtained from the "data-nav" attributes of the section elements.
     The list items are then appended to the DocumentFragment object, which
     will eventually be appended to the unordered list element.
   */
  for (let oneSection of sectionList) {
    navItem = document.createElement("li");
    navLink = document.createElement("a");
    navLink.textContent = oneSection.getAttribute("data-nav");
    navLink.setAttribute("href", `#${oneSection.getAttribute("id")}`);
    navItem.appendChild(navLink);
    documentFragment.appendChild(navItem);
  }
  navBar.appendChild(documentFragment);
}

/*
 Purpose: Whenever a user clicks on a navigation menu item,
 this function scrolls to the appropriate section.
*/
function scrollToSection(selectEvent) {
  selectEvent.preventDefault(); //Prevent the page from automatically jumping to the appropriate section.

  /* To implement event delegation, this event listener is attached to the
     unordered list rather than to individual list items. Therefore, check
     that the clicked element was an anchor element, and if so, get the appropriate
     section's ID and scroll to that section.
   */
  if (selectEvent.target.nodeName === "A") {
    let targetId = selectEvent.target.textContent;
    targetId = targetId.toLowerCase().split(" ").join("-");
    document.getElementById(targetId).scrollIntoView();
  }
}

document.addEventListener("DOMContentLoaded", loadNavBar); //Load the navigation bar after all the other content.
document.addEventListener("scroll", activateSection);
document.querySelector("nav").firstElementChild.addEventListener("click", scrollToSection);
