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

const sections    = document.querySelectorAll('section');
const navbarlist  = document.querySelector('#navbar__list');
const pageTop     = document.querySelector('.holder');
const scrollToTop = document.querySelector('.scrolltop');
const navbar      = document.querySelector('.navbar__menu');
const collapse    = document.querySelectorAll('.collapse')
let scrolling     = false;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const showScrollTop = ()=>{scrollToTop.style.display = "flex"}
const hideScrollTop = ()=>{scrollToTop.style.display = "none"} 
const shownavbar    = ()=>{navbar.style.display="block"}
const hidenavbar    = ()=>{navbar.style.display="none"}
const wipeSections  = ()=>{sections.forEach((element)=>{element.classList.remove('your-active-class')})}
const wipeNavbar    = ()=>{
    const navbaritems   = document.querySelectorAll('#navbar__list .menu__link')
    navbaritems.forEach((element)=>{ 
        element.classList.remove('active')
    })
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
let objected = {}
// build the nav
sections.forEach((element,index,array)=>{
    let child    = `${element.getAttribute('data-nav')}`
    let listItem = document.createElement('li')
    


    let link = document.createElement('a')

    // scroll to section on link click
    link.addEventListener('click',()=>{
        element.scrollIntoView({behavior:"smooth"})
    })
    listItem.setAttribute('data-section',element.getAttribute('data-nav'))
    link.appendChild(listItem)
    listItem.className="menu__link"
    listItem.innerHTML= child

    listItem.addEventListener('click',()=>{
    const loop = document.querySelectorAll('#navbar__list .menu__link')
        loop.forEach(li=>{
            li.classList.remove('active')
        })
    listItem.classList.add('active')
        sections.forEach((section)=>{
            section.classList.remove('your-active-class')
        })
        element.classList.add('your-active-class')
    })
    
    navbarlist.appendChild(link)

})


// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/

// handling page onScroll 
document.addEventListener('scroll',()=>{
    const Hero = document.querySelector('.main__hero')
    let PageHeroRect = Hero.getBoundingClientRect();
    const isinPageHero = PageHeroRect.top >= 0 &&
    PageHeroRect.left >= 0 &&
    PageHeroRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    PageHeroRect.right <= (window.innerWidth || document.documentElement.clientWidth);
    sections.forEach((element)=>{
        const rect = element.getBoundingClientRect();
        const isInViewPort = rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        if(isInViewPort){
            wipeSections();
            element.classList.add('your-active-class')
             wipeNavbar();
             const navbaritems   = document.querySelectorAll('#navbar__list .menu__link')
            
             navbaritems.forEach((item) => {
                let itemdata= item.getAttribute('data-section')
                let sectiondata= element.getAttribute('data-nav')
                if(itemdata== sectiondata){
                    item.classList.add('active')
                }
             });
        }
        else if(isinPageHero){
            wipeNavbar();
            wipeSections();
        }
    })

    window.scrollY > 300 ? showScrollTop(): hideScrollTop()
    hidenavbar() 
    setTimeout(() => {
        shownavbar()  
    }, (200));
})

// scrollToTop button click event
scrollToTop.addEventListener('click',()=>{
    pageTop.scrollIntoView({behavior:"smooth"})
    wipeSections()
    wipeNavbar()
    console.log(collapse)
})

// handle clicking collapse button 
let collapsed;
collapse.forEach((btn)=>{
    collapsed = true
    const parent = btn.parentElement.nextElementSibling
    btn.addEventListener('click',()=>{
        collapsed = !collapsed
        btn.innerHTML = collapsed? '+':'-'
        if(collapsed){
            parent.style.display= "none"
        }
        else{
            parent.style.display= "block"
        }

    })

})