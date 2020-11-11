gsap.registerPlugin(ScrollTrigger);

function initNavigation() {

    const mainNavLinks = gsap.utils.toArray('.main-nav a');
    const mainNavLinksRev = gsap.utils.toArray('.main-nav a').reverse();


    mainNavLinks.forEach(link => {
        link.addEventListener('mouseleave', e => {

            link.classList.add('animate-out');
            setTimeout(() => {
                link.classList.remove('animate-out');
            }, 300);
        })
    });

    function navAnimation(direction) {
        //console.log(direction)
        const scrollingDown = direction === 1;
        const links = scrollingDown ? mainNavLinks : mainNavLinksRev;
        return gsap.to(links, {
            duration: .3,
            stagger: 0.08,
            autoAlpha: () => scrollingDown ? 0 : 1,
            y: () => scrollingDown ? 20 : 0,
            ease: 'power4.easeOut'
        });
    }

    ScrollTrigger.create({
        start: 100,
        end: 'bottom bottom-=20',
        toggleClass: {
            targets: 'body',
            className: 'has-scrolled'
        },
        //markers: true,
        onEnter: ({ direction }) => navAnimation(direction),
        onLeaveBack: ({ direction }) => navAnimation(direction)
    });
}

function initHeaderTilt() {

    document.querySelector('header').addEventListener('mousemove', moveImages);

}

function moveImages(e) {
    console.log(e);
}






function init() {
    initNavigation();
    initHeaderTilt();
}


window.addEventListener('load', function () {
    init();
});

