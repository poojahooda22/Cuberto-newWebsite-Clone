
//locomotive scroll

// function locomotive() {
//     gsap.registerPlugin(ScrollTrigger);
  
//     const locoScroll = new LocomotiveScroll({
//       el: document.querySelector("#main"),
//       smooth: true ,
//     });
//     locoScroll.on("scroll", ScrollTrigger.update);
  
//     ScrollTrigger.scrollerProxy("#main", {
//       scrollTop(value) {
//         return arguments.length
//           ? locoScroll.scrollTo(value, 0, 0)
//           : locoScroll.scroll.instance.scroll.y;
//       },
  
//       getBoundingClientRect() {
//         return {
//           top: 0,
//           left: 0,
//           width: window.innerWidth,
//           height: window.innerHeight,
//         };
//       },
  
//       pinType: document.querySelector("#main").style.transform
//         ? "transform"
//         : "fixed",
//     });
//     ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
//     ScrollTrigger.refresh();
//   }
//   locomotive();


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
      .to(".")
}

firstPageAnim();


