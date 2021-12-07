
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Script AnimationBanner Coral Gardeners by Phil
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//--------------------Animationscript--------------------
function init() {
    console.log('Script AnimationBanner Started')


    //--------------------Timelines for Animation--------------------
    //Timeline for Corals
    const corals = gsap.timeline()
    const coralcolors = gsap.timeline().pause()
    //Timeline for Text
    const text = gsap.timeline().pause()
    //Timeline for Slideshow
    const slideshow = gsap.timeline().pause()
    //Timeline for CTA
    const cta = gsap.timeline()

    //--------------------Animations--------------------
    //Corals
    corals.to('.coral', {
        opacity: 1,
        ease: 'linear',
        duration: 1,
        onComplete: function() {
            text.resume()
        }
    })

    //Coralcolors
    coralcolors.to('.coral-3', {
        delay: 5,
        '-webkit-filter':'grayscale(0%)',
        'filter':'grayscale(0%)',
        duration: 0.3
    })
    .to('.coral-8', {
        '-webkit-filter':'grayscale(0%)',
        'filter':'grayscale(0%)',
        duration: 0.3
    })
    .to('.coral-15', {
        '-webkit-filter':'grayscale(0%)',
        'filter':'grayscale(0%)',
        duration: 0.3
    })
    .to('.coral-10', {
        '-webkit-filter':'grayscale(0%)',
        'filter':'grayscale(0%)',
        duration: 0.3
    })
    .to('.coral-1', {
        '-webkit-filter':'grayscale(0%)',
        'filter':'grayscale(0%)',
        duration: 0.3
    })
    .to('.coral-6', {
        '-webkit-filter':'grayscale(0%)',
        'filter':'grayscale(0%)',
        duration: 0.3
    })
    .to('.coral-13', {
        '-webkit-filter':'grayscale(0%)',
        'filter':'grayscale(0%)',
        duration: 0.3
    })
    .to('.coral-5', {
        '-webkit-filter':'grayscale(0%)',
        'filter':'grayscale(0%)',
        duration: 0.3
    })

    //Text
    text.to('.text-one', {
        opacity: 1,
        ease: 'linear',
        duration: 1
    })
    .to('.coral', {
        delay: 4,
        '-webkit-filter':'grayscale(100%)',
        'filter':'grayscale(100%)',
        duration: 2
    })
    .to('.text-one', {
        delay: 2,
        opacity: 0,
        ease: 'linear',
        duration: 0.5
    })
    .to('.text-two', {
        delay: 1,
        opacity: 1,
        ease: 'linear',
        duration: 1,
        onComplete: function() {
            coralcolors.resume()
        }
    })
    .to('.text-two', {
        delay: 8,
        opacity: 0,
        ease: 'linear',
        duration: 0.5
    })
    .to('.text-three', {
        delay: 1,
        opacity: 1,
        ease: 'linear',
        top: 120,
        duration: 1
    })
    .to('.text-three', {
        delay: 5,
        opacity: 0,
        ease: 'linear',
        duration: 1,
        onComplete: function() {
            slideshow.resume()
        }
    })
    .to('.coral', {
        opacity: 0.2,
        ease: 'linear',
        duration: 1
    })

    //Slideshow , CTA Button
    slideshow.add('start',1)
    .to('.content', {
        opacity: 1,
        ease: 'linear',
        duration: 1
    },'start')  
    .to('.container canvas', {
        opacity: 1,
        ease: 'linear',
        duration: 1
    },'start')
    .to('.cta', {   
        bottom: 20,
        ease: 'linear',
        duration: 0.7
    },'start')

    //Animation after cta is clicked
    $('.cta').on('click', e => {
        e.preventDefault()
        cta.to('.container', {
            opacity: 0,
            duration: 1,
            onComplete: function() {
                window.location.href  = 'https://coralgardeners.org/#adopt'
            }
        })
    })

    //Animation for bubbles
    let bubblecount = 30, //Amount of bubbles
    bubbleClass = 'bubble',
    bubbleColors = ['#32527B', '#6B8EB7', '#25476D', '#4F7298'],
    container = document.getElementById('container'),
    w = container.offsetWidth,
    h = container.offsetHeight,
    bubble;

    for(let i = 0; i < bubblecount; i++) {
        bubble = document.createElement('div');
        bubble.className = bubbleClass;
        container.appendChild(bubble);
        gsap.set(bubble, {
            x: gsap.utils.random(0, w),
            y: gsap.utils.random(0, h) + (h * 0.5),
            scale: gsap.utils.random(0.4, 0.9),
            backgroundColor: gsap.utils.random(bubbleColors)
        });
        anime(bubble);
    }

    function anime(bubble) {
        gsap.to(bubble, gsap.utils.random(5, 10), {
            y: 0,
            ease: 'none',
            repeat: -1,
            delay: -10
        });
        gsap.to(bubble, gsap.utils.random(1, 6), {
            x: '+=40',
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        });
        gsap.to(bubble, gsap.utils.random(1, 2), {
            opacity: 0,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        });
    }
}


//--------------------jQuery--------------------
$(function() {
    init();
});