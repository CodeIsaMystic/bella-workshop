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
    //console.log(e);

    const { offsetX, offsetY, target } = e;
    const { clientWidth, clientHeight } = target;
    //console.log(offsetX, offsetY, clientWidth, clientHeight);

    const xPos = (offsetX / clientWidth) - 0.5;
    const yPos = (offsetY / clientHeight) - 0.5;

    const leftImages = gsap.utils.toArray('.hg__left .hg__image');
    const rightImages = gsap.utils.toArray('.hg__right .hg__image');
    const modifier = (index) => index * 1.2 + 0.5;

    /** Move left 3 images  **/
    leftImages.forEach((image, index) => {
        gsap.to(image, {
            duration: 1.2,
            x: xPos * 20 * modifier(index),
            y: yPos * 30 * modifier(index),
            rotationY: xPos * 25,
            rotationX: yPos * 10,
            ease: 'power3.out'
        });
    });

    /** Move right 3 images  **/
    rightImages.forEach((image, index) => {
        gsap.to(image, {
            duration: 1.2,
            x: -xPos * 20 * modifier(index),
            y: yPos * 30 * modifier(index),
            rotationY: xPos * 10,
            rotationX: yPos * 8,
            ease: 'power3.out'
        });
    });

    /**  Move the Center Decor Circle   **/
    gsap.to('.decor__circle', {
        duration: 1.7, x: 80 * xPos,
        y: 90 * yPos,
        ease: 'power4.out'
    })
}

function initHoverReveal() {
    const sections = document.querySelectorAll('.rg__column');

    sections.forEach(section => {
        section.imageBlock = section.querySelector('.rg__image');
        section.mask = section.querySelector('.rg__image--mask');

        /** Reset initial position **/
        gsap.set(section.imageBlock, { yPercent: -101 });
        gsap.set(section.mask, { yPercent: 100 });

        /** Add event listeners to each section   **/
        section.addEventListener('mouseenter', createHoverReveal);
        section.addEventListener('mouseleave', createHoverReveal);
    })
}

function createHoverReveal(e) {
    //console.log(e.type)

    const { imageBlock, mask } = e.target;

    let tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'power4.out'
        }
    })


    if (e.type === 'mouseenter') {

        tl.to([mask, imageBlock], { yPercent: 0 })

    } else if (e.type === 'mouseleave') {
        tl
            .to(mask, { yPercent: 100 })
            .to(imageBlock, { yPercent: -101 }, 0)
    }

    return tl;
}






function init() {
    initNavigation();
    initHeaderTilt();
    initHoverReveal();
}


window.addEventListener('load', function () {
    init();
});

