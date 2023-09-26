
// locomotive scroll

function locomotive() {
    gsap.registerPlugin(ScrollTrigger);
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true ,
    });
    locoScroll.on("scroll", ScrollTrigger.update);
  
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
  
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
  
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  }
  locomotive();


  function setScrollContentHeight() {
    const scrollContent = document.getElementById('scrollcontent');
    const secondPage = document.getElementById('secondpage');
    
    // Set scrollcontent height based on the secondpage content
    scrollContent.style.height = `${secondPage.offsetHeight}px`;
}

// Call the function after the page loads
window.addEventListener('load', setScrollContentHeight);

// Call the function whenever the window is resized
window.addEventListener('resize', setScrollContentHeight);

// $('.slide1').ripples({
//   resolution: 512,
//   dropRadius: 30,
//   perturbance: 0.08,
// })

const cursor = new MouseFollower({
  container: document.body,
  speed: 0.8,
});


// drag horizontal animation 1st

const slider = document.querySelector('#slides');

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});


// drag horizontal animation 2nd

const slider1 = document.querySelector('#slides1');
slider1.addEventListener('mousedown', (e) => {
  isDown = true;
  slider1.classList.add('active');
  startX = e.pageX - slider1.offsetLeft;
  scrollLeft = slider1.scrollLeft;
});
slider1.addEventListener('mouseleave', () => {
  isDown = false;
  slider1.classList.remove('active');
});
slider1.addEventListener('mouseup', () => {
  isDown = false;
  slider1.classList.remove('active');
});
slider1.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider1.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider1.scrollLeft = scrollLeft - walk;
  console.log(walk);
});


//hero section animation

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
      y: '-10',
      opacity: 0,
      duration: 1.2,
      ease: Expo.easeInOut,
  }) 
      .to(".boundingelem", {
          y: 0,   
          duration: 2,
          delay: -1,
          ease: Expo.easeInOut,
          stagger: .2
      })
      .from("#herovideo", {
          y: -10,
          opacity: 0,
          duration: 1.5,
          delay: -1,       
          ease: Expo.easeInOut,
          stagger: .2
      })     
}

firstPageAnim();

// var tl2  = gsap.timeline({
//   scrollTrigger: {
//       trigger: "#secondpage",
//       start: "top center",
//       // end: "bottom -120%",
//       scrub: 1,
//       pin: true,
//       pinSpacing: false,
//       markers: true,
//   }
// })








//Seamlessly loop elements along the x-axis

// function horizontalLoop(items, config) {
//   items = gsap.utils.toArray(items);
//   config = config || {};
//   let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
//     length = items.length,
//     startX = items[0].offsetLeft,
//     times = [],
//     widths = [],
//     xPercents = [],
//     curIndex = 0,
//     pixelsPerSecond = (config.speed || 1) * 100,
//     snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
//     totalWidth, curX, distanceToStart, distanceToLoop, item, i;
//   gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
//     xPercent: (i, el) => {
//       let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
//       xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
//       return xPercents[i];
//     }
//   });
//   gsap.set(items, {x: 0});
//   totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
//   for (i = 0; i < length; i++) {
//     item = items[i];
//     curX = xPercents[i] / 100 * widths[i];
//     distanceToStart = item.offsetLeft + curX - startX;
//     distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
//     tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
//       .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
//       .add("label" + i, distanceToStart / pixelsPerSecond);
//     times[i] = distanceToStart / pixelsPerSecond;
//   }
//   function toIndex(index, vars) {
//     vars = vars || {};
//     (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
//     let newIndex = gsap.utils.wrap(0, length, index),
//       time = times[newIndex];
//     if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
//       vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
//       time += tl.duration() * (index > curIndex ? 1 : -1);
//     }
//     curIndex = newIndex;
//     vars.overwrite = true;
//     return tl.tweenTo(time, vars);
//   }
//   tl.next = vars => toIndex(curIndex+1, vars);
//   tl.previous = vars => toIndex(curIndex-1, vars);
//   tl.current = () => curIndex;
//   tl.toIndex = (index, vars) => toIndex(index, vars);
//   tl.times = times;
//   tl.progress(1, true).progress(0, true); // pre-render for performance
//   if (config.reversed) {
//     tl.vars.onReverseComplete();
//     tl.reverse();
//   }
//   return tl;
//   }

//   const elems = gsap.utils.toArray(".elem");
//  const loop = horizontalLoop(elems, {paused: false, repeat: -1});


//  animate social div


document.querySelectorAll(".socialmaindiv")
.forEach(function(socialmaindiv) {
  socialmaindiv  
  .addEventListener("mousemove", function() {
      gsap.to(socialmaindiv.children[0], {
        height: "100%",
        opacity: 1,
        ease: Expo,
        duration: .3, 

      });
  })

  socialmaindiv
  .addEventListener("mouseleave", function() {
    gsap.to(socialmaindiv.children[0], {
      height: 0,
      opacity: 0,
      ease: Expo,
      duration: .3,

    });
  })
})

//1st left card animation

document.querySelector("#leftimg1").addEventListener("mousemove", function() {
  gsap.to("#leftimg1 video", {
    opacity: 1,
    
    ease: "Expo.easeOut",
    duration: .3,
  })
  .to("#leftimg1 img", {
    opacity: 0,
    ease: "Expo.easeOut",
    duration: .3,
  })
}) 

document.querySelector("#leftimg1").addEventListener("mouseleave", function() {
  gsap.to("#leftimg1 video", {
    opacity: 0,
    
    ease: "Expo.easeOut",
    duration: 0.3,
  });
  gsap.to("#leftimg1 img", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: 0.3,
  });
});


//2nd left card animation

document.querySelector("#leftimg2").addEventListener("mousemove", function() {
  gsap.to("#leftimg2 video", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: .3,
  })
  .to("#leftimg2 img", {
    opacity: 0,
    ease: "Expo.easeOut",
    duration: .3,
  })
}) 

document.querySelector("#leftimg2").addEventListener("mouseleave", function() {
  gsap.to("#leftimg2 video", {
    opacity: 0,
    
    ease: "Expo.easeOut",
    duration: 0.3,
  });
  gsap.to("#leftimg2 img", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: 0.3,
  });
});


//3rd left card animation

document.querySelector("#leftimg3").addEventListener("mousemove", function() {
  gsap.to("#leftimg3 video", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: .3,
  })
  .to("#leftimg3 img", {
    opacity: 0,
    ease: "Expo.easeOut",
    duration: .3,
  })
}) 

document.querySelector("#leftimg3").addEventListener("mouseleave", function() {
  gsap.to("#leftimg3 video", {
    opacity: 0,
    
    ease: "Expo.easeOut",
    duration: 0.3,
  });
  gsap.to("#leftimg3 img", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: 0.3,
  });
});

//4th left card animation

document.querySelector("#leftimg4").addEventListener("mousemove", function() {
  gsap.to("#leftimg4 video", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: .3,
  })
  .to("#leftimg4 img", {
    opacity: 0,
    ease: "Expo.easeOut",
    duration: .3,
  })
}) 

document.querySelector("#leftimg4").addEventListener("mouseleave", function() {
  gsap.to("#leftimg4 video", {
    opacity: 0,
    
    ease: "Expo.easeOut",
    duration: 0.3,
  });
  gsap.to("#leftimg4 img", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: 0.3,
  });
});

//5th left card animation

document.querySelector("#leftimg5").addEventListener("mousemove", function() {
  gsap.to("#leftimg5 video", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: .3,
  })
  .to("#leftimg5 img", {
    opacity: 0,
    ease: "Expo.easeOut",
    duration: .3,
  })
}) 

document.querySelector("#leftimg5").addEventListener("mouseleave", function() {
  gsap.to("#leftimg5 video", {
    opacity: 0,
    ease: "Expo.easeOut",
    duration: 0.3,
  });
  gsap.to("#leftimg5 img", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: 0.3,
  });
});

//1st right card animation

document.querySelector("#rightimg1").addEventListener("mousemove", function() {
  gsap.to("#rightimg1 video", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: .3,
  })
  .to("#rightimg1 img", {
    opacity: 0,
    ease: "Expo.easeOut",
    duration: .3,
  })
}) 

document.querySelector("#rightimg1").addEventListener("mouseleave", function() {
  gsap.to("#rightimg1 video", {
    opacity: 0,
    
    ease: "Expo.easeOut",
    duration: 0.3,
  });
  gsap.to("#rightimg1 img", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: 0.3,
  });
});

//2nd right card animation

document.querySelector("#rightimg2").addEventListener("mousemove", function() {
  gsap.to("#rightimg2 video", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: .3,
  })
  .to("#rightimg2 img", {
    opacity: 0,
    ease: "Expo.easeOut",
    duration: .3,
  })
}) 

document.querySelector("#rightimg2").addEventListener("mouseleave", function() {
  gsap.to("#rightimg2 video", {
    opacity: 0,
    
    ease: "Expo.easeOut",
    duration: 0.3,
  });
  gsap.to("#rightimg2 img", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: 0.3,
  });
});

//3rd right card animation

document.querySelector("#rightimg3").addEventListener("mousemove", function() {
  gsap.to("#rightimg3 video", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: .3,
  })
  .to("#rightimg3 img", {
    opacity: 0,
    ease: "Expo.easeOut",
    duration: .3,
  })
}) 

document.querySelector("#rightimg3").addEventListener("mouseleave", function() {
  gsap.to("#rightimg3 video", {
    opacity: 0,
    
    ease: "Expo.easeOut",
    duration: 0.3,
  });
  gsap.to("#rightimg3 img", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: 0.3,
  });
});

//4th right card animation

document.querySelector("#rightimg4").addEventListener("mousemove", function() {
  gsap.to("#rightimg4 video", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: .3,
  })
  .to("#rightimg4 img", {
    opacity: 0,
    ease: "Expo.easeOut",
    duration: .3,
  })
}) 

document.querySelector("#rightimg4").addEventListener("mouseleave", function() {
  gsap.to("#rightimg4 video", {
    opacity: 0,
    
    ease: "Expo.easeOut",
    duration: 0.3,
  });
  gsap.to("#rightimg4 img", {
    opacity: 1,
    ease: "Expo.easeOut",
    duration: 0.3,
  });
});