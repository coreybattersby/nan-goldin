 
 gsap.registerPlugin(ScrollTrigger);

 //Fade animation on scroll
 function reveal() {
    let reveals = document.querySelectorAll(".reveal"); // finding reveal class names

    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight; //gives us height of viewport
        let elementTop = reveals[i].getBoundingClientRect().top; //gives us the distance from the top of the viewport
        let elementVisible = 300; // 300 pixels from bottom of viewport
    
        if (elementTop < windowHeight - elementVisible) { // if the element has scrolled past 300 pixels, add active class with transition
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }
    
    window.addEventListener("scroll", reveal); // listens to scroll


//Homepage transition

function panelTransition() {

gsap.timeline({
	scrollTrigger: {
	  trigger: ".panel", // find the panel class 
	  scrub: true, //scrub on scroll
	  pin: true, //pin in position
    // markers: true,
	  start: "top top",
	  end: "+=200", 
	}
  })

  .from(".panel", { //scales the size by 90%
	scale: 0.90, 
	ease: "none"
  });
}

  




// Header colour change - linked with CSS

function headerChange() { 

gsap.timeline({
    scrollTrigger: {
      trigger: '#homepage',
      start: '-50',
      end: "+=250",
      duration: 0.8, // transition time
      scrub: 0, // no delay
      // markers: true,
      pinSpacing: true,
    }
    
  })

        .from("li a", { 
          color: "#292120", //change colour indicated by start and end dimensions
      })
  
        .to("li a",{
          color: "#f0ddde" ,
        });
  
  }



  // Header colour change back to black 

function headerChangeReverse() { 
 gsap.timeline({
    scrollTrigger: {
      trigger: '#out', // transition called by out section
      start: 'bottom',
      end: "+=120",
      duration: 0.8,
      scrub: 0,
      // markers: true,
      pinSpacing: true,
    }
    
  })

        .from("li a", { 
          color: "#f0ddde", //change colour indicated by start and end dimensions
      })
  
        .to("li a",{
          color: "#292120",
        });
  
  }


function lineScroll() {

//  Calculate the scroll percentage position
 const scrollPercent = () => {
  const bodyST = document.body.scrollTop;
  const docST = document.documentElement.scrollTop;
  const docSH = document.documentElement.scrollHeight;
  const docCH = document.documentElement.clientHeight;

  return (docST + bodyST) / (docSH - docCH) * 100;
};

// Animate the line

let lineAnimation = anime({
  targets: '.line path',
  strokeDashoffset: [anime.setDashoffset, -160000], // offset set depending on a size of entire viewport
  easing: 'easeInOutSine',
  duration: 100, 
  delay: 0,
  direction: 'alternate',
  loop: false, // do not loop
});

// * Scroll listener on the window object to control animations based on scroll percentage.
window.addEventListener('scroll', () => {
  lineAnimation.seek((scrollPercent() / 100) * lineAnimation.duration);
});
}

// Full page pin - saturate image on scroll

function fullPagePin() { 

  const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.fullpage-pin',
    pin: '.fullpage-pin',
    start: 'top top',
    end: "+=500",
    scrub: 1,
    // markers: true,
    pinSpacing: true,
    // anticipatePinSpacing: true,
  }
  
});

tl.addLabel(".saturate") // saturation effect on scroll
      .from(".saturate", { 
        filter: "grayscale(100%)",
        opacity: ".2",
    })

      .to(".saturate",{
        filter: "grayscale(0%)", 
        opacity: "1",
      });

}



// Image Gallery Pin

function galleryPin() { 
  // Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.gallery-pin',
      pin: '.gallery-pin', // changes animation to a fixed position on the screen
      start: 'top top', // start animation at the top of the section 'gallery-pin'
      end: "bottom top",
      scrub: 1,
      // markers: true,
      pinSpacing: true,
      anticipatePinSpacing: true,
    }
    
  });


  tl.addLabel(".gallery-image")
      .from(".gallery-image", { 
        filter: "grayscale(100%)",
        
    })

      .to(".gallery-image",{
        filter: "grayscale(0%)", 
      });
  
  }
  



  //  horizontal slide pin

let sections = gsap.utils.toArray(".scroll .slide");


gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none", // <-- IMPORTANT!
    duration: 6,
    scrollTrigger: {
      trigger: ".container",
      pin: true,
      scrub: true,
    // markers: true,
      end: "+=2000"
    }
  });

    gsap.to('.slide-pin', { 
    position: "fixed",
    clearProps: true, //removes default element style 
  });





  gsap.to(".image-background", {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
      trigger: ".artist-container",
      // start: "top bottom", // the default values
      // end: "bottom top",
      scrub: true,
      // markers: true,
    }, 
  });


  // Auto play on scroll


  function videoScroll() {

    if ( document.querySelectorAll('video[autoplay]').length > 0) {
      var windowHeight = window.innerHeight;
      var VideoElement = document.querySelectorAll('video[autoplay]'); // finds video source from html
  
      for (let i = 0; i < VideoElement.length; i++) {
  
        var VideoElement = VideoElement[i],
            videoHeight = VideoElement.clientHeight, //gives us height of viewport
            videoClientRect = VideoElement.getBoundingClientRect().top; //gives us the distance from the top of the viewport
  
        if ( videoClientRect <= ( (windowHeight) - (videoHeight*1) ) && videoClientRect >= ( 0 - ( videoHeight*1 ) ) ) {
          VideoElement.play();
        } else {
          VideoElement.pause();
        }
      }
    }
  
  }

  window.addEventListener('load', videoScroll);
window.addEventListener('scroll', videoScroll);



panelTransition();
lineScroll();
headerChange();
headerChangeReverse();
fullPagePin();
galleryPin();
reveal();
videoScroll();

