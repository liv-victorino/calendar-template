
const dropdownButton = document.getElementsByClassName('hamburger-button')[0]
const dropdownMenu = document.getElementsByClassName('nav-dropdown')[0]

dropdownButton.addEventListener('click', function(){
    dropdownMenu.classList.toggle('inactive');
    console.log("fine")
});

/* Set the width of the side navigation to 250px */
function openNav() {
document.getElementById("mySidenav").style.width = "250px";
document.getElementById("black-filter").style.opacity = "0.5";
document.getElementById("black-filter").style.width = "100%";
document.getElementById("black-filter").style.transition = "opacity 0.5s";

}

/* Set the width of the side navigation to 0 */
function closeNav() {
document.getElementById("mySidenav").style.width = "0";
document.getElementById("black-filter").style.opacity = "0";
document.getElementById("black-filter").style.width = "0%";
document.getElementById("black-filter").style.transition = "opacity 0.5s";
}