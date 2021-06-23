const mainTag = document.querySelector("main");
const bodyTag = document.querySelector("body");
const figcaptions = document.querySelectorAll("figcaption");

const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
const large = window.matchMedia("(min-width:600px)");

if (motion.matches && large.matches){

    mainTag.style.position = "fixed";
    mainTag.style.top = "0px";
    mainTag.style.left = "0px";
    mainTag.style.width = "100%";
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.intersectionRatio > 0.5){
                entry.target.classList.add("in-view");
            } 
        });
    },{
        threshold: [0, 0.25, 1]
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

        figcaptions.forEach(caption => {
            const box = caption.getBoundingClientRect();
            const midY = box.y + box.height / 2;
            const midScreen = window.innerHeight / 2;
            const diff = midY - midScreen ;

            const images = caption.querySelectorAll("img");

            images.forEach((image, index) => {
                const speed = 0.1 + 0.1 * index;
                image.style.top = (diff * speed) + "px";
            })
        });
        
        
    
        requestAnimationFrame(changeScroll);
    };
    
    window.addEventListener("scroll", function () {
        aimScroll = window.pageYOffset;
    });
    
    changeScroll();
    
};


