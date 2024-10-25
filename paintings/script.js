document.addEventListener("DOMContentLoaded", function() {
    const imgs = document.querySelectorAll("section .grid-image");
  
    function scrolling() {
      const viewportHeight = window.innerHeight;
      imgs.forEach(function(img) {
        const rect = img.getBoundingClientRect();
        if (rect.top < viewportHeight) {
          img.style.animationPlayState = "running";
        }
      });
    }
  
    window.addEventListener("scroll", scrolling);
    scrolling(); // Run on page load to check if any images are in view
  });
  
  
  
  
  
  
  
  // TOP TITLE
  document.addEventListener("DOMContentLoaded", function (event) {
    const centeredTitle = document.getElementById("centered-title");
  
    // Fade in centered title after half a second
    setTimeout(() => {
      centeredTitle.classList.add("show"); // Add class to trigger fade-in
  
      // Start typing animation after fade-in
      StartTextAnimation(0);
    }, 500); // Delay for fade-in (500 milliseconds = half a second)
  
    // array with texts to type in typewriter
    var dataText = [
      "oil painting",
      "& gouache!",
      "portraits,",
      "animals,",
      "& landscapes!",
      "[my paintings.]"
    ];
  
    // type one text in the typewriter
    function typeWriter(text, i, fnCallback) {
      if (i < text.length) {
        document.querySelector("h1").innerHTML =
          text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        setTimeout(function () {
          typeWriter(text, i + 1, fnCallback);
        }, 100);
      } else if (typeof fnCallback == "function") {
        setTimeout(fnCallback, 700);
      }
    }
  
    function StartTextAnimation(i) {
      if (i < dataText.length) {
        typeWriter(dataText[i], 0, function () {
          StartTextAnimation(i + 1);
        });
      } else {
        setTimeout(function () {
          StartTextAnimation(0);
        }, 20000);
      }
    }
  });
  
  
  // main menu
  document.addEventListener("DOMContentLoaded", () => {
    const menuOptions = document.querySelectorAll(".menu-option");
    const filler1 = document.getElementById("filler1");
  
    // Fade in menu options
    menuOptions.forEach((option, index) => {
      setTimeout(() => {
        option.classList.add("show"); // Add class to trigger fade-in
      }, index * 500); // Delay based on index
    });
  
    // Fade in filler1 after menu options
    setTimeout(() => {
      filler1.classList.add("show"); // Add class to trigger fade-in for filler1
    }, menuOptions.length * 500); // Delay to start after menu options
  });
  
  
  
  // side menu
  document.addEventListener("DOMContentLoaded", () => {
      const menu = document.getElementById("side-menu");
      const fadeInScrollY = 300; // Y-coordinate to trigger fade in
      const menuOptions = document.querySelectorAll('.side-menu-option');
  
      // Listen for scroll events
      window.addEventListener("scroll", () => {
          const scrollY = window.scrollY;
  
          // Fade in the menu when scrolling down past the specified Y-coordinate
          if (scrollY >= fadeInScrollY) {
              menu.classList.add("visible");
          } else {
              menu.classList.remove("visible"); // Fade out when scrolling back up
          }
      });
  
      // Change text on hover
      menuOptions.forEach(option => {
          const originalText = option.textContent;
  
          option.addEventListener('mouseenter', () => {
              option.textContent = option.getAttribute('data-text');
          });
  
          option.addEventListener('mouseleave', () => {
              option.textContent = originalText;
          });
      });
  
      // Pulse menu options one by one
      let pulseIndex = 0;
  
      const pulseMenuOptions = () => {
          // Remove pulse effect from all options
          menuOptions.forEach(option => {
              option.classList.remove('menu-pulse');
          });
  
          // Add pulse effect to the current index
          menuOptions[pulseIndex].classList.add('menu-pulse');
  
          // Move to the next index
          pulseIndex = (pulseIndex + 1) % menuOptions.length; // Wrap around to the start
      };
  
      // Start pulsing every 5 seconds
      setInterval(() => {
          pulseMenuOptions(); // Pulse the current option
          setTimeout(pulseMenuOptions, 300); // Pulse the next option after 300ms
          setTimeout(pulseMenuOptions, 600); // Pulse the next option after 600ms
          setTimeout(pulseMenuOptions, 900); // Pulse the next option after 900ms
          setTimeout(pulseMenuOptions, 1200); // Pulse the next option after 1200ms
      }, 5000); // Adjust the interval for pulsing each option
  });
  
  
  
  // back to top button
  $(document).ready(function() {
      var btn = $('#top'); // Change to the new ID
  
      $(window).scroll(function() {
          if ($(window).scrollTop() > 300) {
              btn.addClass('show');
          } else {
              btn.removeClass('show');
          }
      });
  
      btn.on('click', function(e) {
          e.preventDefault();
          $('html, body').animate({scrollTop: 0}, 50);
      });
  
      // Flash the button every 6 seconds
      setInterval(function() {
          btn.addClass('flash'); // Add the flash class
  
          // Remove the flash class after the animation completes
          setTimeout(function() {
              btn.removeClass('flash');
          }, 1000); // Match this duration to the animation duration
      }, 6000); // 6 seconds
  });
  