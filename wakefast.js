const mainTag = document.querySelector("main");
const bodyTag = document.querySelector("body");
const figcaptions = document.querySelectorAll("figcaption");

const motion = window.matchMedia("(perfers-reduced-motion: no-preference)");
const large = window.matchMedia("(min-width:600px)");

if (motion.matches && large.matches){

    mainTag.style.position = "fixed";
    mainTag.style.top = "0px";
    mainTag.style.left = "0px";
    mainTag.style.width = "100%";
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.intersectionRatio > 0.25){
                entry.target.classList.add("in-view");
            } 
        });
    },{
        threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    figcaptions.forEach(caption => {
        observer.observe(caption);
    });
    
    let currentScroll = 0;
    let aimScroll = 0;
    
    const changeScroll = function () {
    
        bodyTag.style.height = mainTag.offsetHeight + "px";
        
        currentScroll = currentScroll + ( aimScroll - currentScroll) * 0.05;
    
        mainTag.style.top = (-1 * currentScroll) + "px";
    
        requestAnimationFrame(changeScroll);
    };
    
    window.addEventListener("scroll", function () {
        aimScroll = window.pageYOffset;
    });
    
    changeScroll();
    
};


