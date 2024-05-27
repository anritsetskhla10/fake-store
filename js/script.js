
// menu

const menu = document.getElementById('menu');
const nav = Array.from(document.getElementsByTagName('nav'))[0];
console.log(nav);

menu.addEventListener('click', () => {
    if(!nav.classList.contains('navActive')){
        nav.classList.add('navActive');
    }else{
        nav.classList.remove('navActive');
    }
});