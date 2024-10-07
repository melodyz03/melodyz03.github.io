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
  
  
  
  // sparkle when click
  var colour="random";
  var sparkles=100;// increase or decrease for number of sparkles falling
  
  var x=ox=400;
  var y=oy=300;
  var swide=800;
  var shigh=600;
  var sleft=sdown=0;
  var tiny=new Array();
  var star=new Array();
  var starv=new Array();
  var starx=new Array();
  var stary=new Array();
  var tinyx=new Array();
  var tinyy=new Array();
  var tinyv=new Array();
  
  colours=new Array('#ff0036','#FF8A00','#92e000','#00B7FD','#fd37b2','#f58eff','#b566ff','#ffffff')
  
  n = 10;
  y = 0;
  x = 0;
  n6=(document.getElementById&&!document.all);
  ns=(document.layers);
  ie=(document.all);
  d=(ns||ie)?'document.':'document.getElementById("';
  a=(ns||n6)?'':'all.';
  n6r=(n6)?'")':'';
  s=(ns)?'':'.style';
  
  if (ns){
      for (i = 0; i < n; i++)
          document.write('<layer name="dots'+i+'" top=0 left=0 width='+i/2+' height='+i/2+' bgcolor=#ff0000></layer>');
  }
  
  if (ie)
      document.write('<div id="con" style="position:absolute;top:0px;left:0px"><div style="position:relative">');
  
  if (ie||n6){
      for (i = 0; i < n; i++)
          document.write('<div id="dots'+i+'" style="position:absolute;top:0px;left:0px;width:'+i/2+'px;height:'+i/2+'px;background:#ff0000;font-size:'+i/2+'"></div>');
  }
  
  if (ie)
      document.write('</div></div>');
  (ns||n6)?window.captureEvents(Event.MOUSEMOVE):0;
  
  function Mouse(evnt){
  
      y = (ns||n6)?evnt.pageY+4 - window.pageYOffset:event.y+4;
      x = (ns||n6)?evnt.pageX+1:event.x+1;
  }
  
  (ns)?window.onMouseMove=Mouse:document.onmousemove=Mouse;
  
  function animate(){
  
      o=(ns||n6)?window.pageYOffset:0;
  
      if (ie)con.style.top=document.body.scrollTop + 'px';
  
      for (i = 0; i < n; i++){
  
          var temp1 = eval(d+a+"dots"+i+n6r+s);
  
          randcolours = colours[Math.floor(Math.random()*colours.length)];
  
          (ns)?temp1.bgColor = randcolours:temp1.background = randcolours; 
  
          if (i < n-1){
  
              var temp2 = eval(d+a+"dots"+(i+1)+n6r+s);
              temp1.top = parseInt(temp2.top) + 'px';
              temp1.left = parseInt(temp2.left) + 'px';
  
          } 
          else{
  
              temp1.top = y+o + 'px';
              temp1.left = x + 'px';
          }
      }
  
      setTimeout("animate()",10);
  }
  
  animate();
  
  window.onload=function() { if (document.getElementById) {
      var i, rats, rlef, rdow;
      for (var i=0; i<sparkles; i++) {
          var rats=createDiv(13, 13); //TINY sparkles
          rats.style.visibility="hidden";
          rats.style.zIndex="999";
          document.body.appendChild(tiny[i]=rats);
          starv[i]=0;
          tinyv[i]=0;
          var rats=createDiv(15, 15); //BIG sparkles
          rats.style.backgroundColor="transparent";
          rats.style.visibility="hidden";
          rats.style.zIndex="999";
          var rlef=createDiv(1, 5);
          var rdow=createDiv(5, 1);
          rats.appendChild(rlef);
          rats.appendChild(rdow);
          rlef.style.top="2px";
          rlef.style.left="0px";
          rdow.style.top="0px";
          rdow.style.left="2px";
          document.body.appendChild(star[i]=rats);
      }
      set_width();
      sparkle();
  }}
  
  function sparkle() {
      var c;
      if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
          ox=x;
          oy=y;
          for (c=0; c<sparkles; c++) if (!starv[c]) {
              star[c].style.left=(starx[c]=x)+"px";
              star[c].style.top=(stary[c]=y+1)+"px";
              star[c].style.clip="rect(0px, 5px, 5px, 0px)";
              star[c].childNodes[0].style.backgroundColor=star[c].childNodes[1].style.backgroundColor=(colour=="random")?newColour():colour;
              star[c].style.visibility="visible";
              starv[c]=50;
              break;
          }
      }
      for (c=0; c<sparkles; c++) {
          if (starv[c]) update_star(c);
          if (tinyv[c]) update_tiny(c);
      }
      setTimeout("sparkle()", 40);
  }
  
  function update_star(i) {
      if (--starv[i]==25) star[i].style.clip="rect(1px, 4px, 4px, 1px)";
      if (starv[i]) {
          stary[i]+=1+Math.random()*3;
          starx[i]+=(i%5-2)/5;
          if (stary[i]<shigh+sdown) {
              star[i].style.top=stary[i]+"px";
              star[i].style.left=starx[i]+"px";
          }
          else {
              star[i].style.visibility="hidden";
              starv[i]=0;
              return;
          }
      }
      else {
          tinyv[i]=50;
          tiny[i].style.top=(tinyy[i]=stary[i])+"px";
          tiny[i].style.left=(tinyx[i]=starx[i])+"px";
          tiny[i].style.width="2px";
          tiny[i].style.height="2px";
          tiny[i].style.backgroundColor=star[i].childNodes[0].style.backgroundColor;
          star[i].style.visibility="hidden";
          tiny[i].style.visibility="visible"
      }
  }
  
  function update_tiny(i) {
      if (--tinyv[i]==25) {
          tiny[i].style.width="1px";
          tiny[i].style.height="1px";
      }
      if (tinyv[i]) {
          tinyy[i]+=1+Math.random()*3;
          tinyx[i]+=(i%5-2)/5;
          if (tinyy[i]<shigh+sdown) {
              tiny[i].style.top=tinyy[i]+"px";
              tiny[i].style.left=tinyx[i]+"px";
          }
          else {
              tiny[i].style.visibility="hidden";
              tinyv[i]=0;
              return;
          }
      }
      else tiny[i].style.visibility="hidden";
  }
  
  document.onmousemove=mouse;
  function mouse(e) {
      if (e) {
          y=e.pageY;
          x=e.pageX;
      }
      else {
          set_scroll();
          y=event.y+sdown;
          x=event.x+sleft;
      }
  }
  
  window.onscroll=set_scroll;
  function set_scroll() {
      if (typeof(self.pageYOffset)=='number') {
          sdown=self.pageYOffset;
          sleft=self.pageXOffset;
      }
      else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
          sdown=document.body.scrollTop;
          sleft=document.body.scrollLeft;
      }
      else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
          sleft=document.documentElement.scrollLeft;
          sdown=document.documentElement.scrollTop;
      }
      else {
          sdown=0;
          sleft=0;
      }
  }
  
  window.onresize=set_width;
  function set_width() {
      var sw_min=999999;
      var sh_min=999999;
      if (document.documentElement && document.documentElement.clientWidth) {
          if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
          if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
      }
      if (typeof(self.innerWidth)=='number' && self.innerWidth) {
          if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
          if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
      }
      if (document.body.clientWidth) {
          if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
          if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
      }
      if (sw_min==999999 || sh_min==999999) {
          sw_min=800;
          sh_min=600;
      }
      swide=sw_min;
      shigh=sh_min;
  }
  
  function createDiv(height, width) {
      var div=document.createElement("div");
      div.style.position="absolute";
      div.style.height=height+"px";
      div.style.width=width+"px";
      div.style.overflow="hidden";
      return (div);
  }
  
  function newColour() {
      var c=new Array();
      c[0]=255;
      c[1]=Math.floor(Math.random()*256);
      c[2]=Math.floor(Math.random()*(256-c[1]/2));
      c.sort(function(){return (0.5 - Math.random());});
      return ("rgb("+c[0]+", "+c[1]+", "+c[2]+")");
  }
  // ]]>
  
  
  
  
  //end the page
  let isAtStopper = false; // Flag to check if the user is at the stopper
  
  document.addEventListener('scroll', function() {
      const stopper = document.getElementById('stopper');
      const stopperOffset = stopper.getBoundingClientRect().top + window.scrollY; // Get the top position of the stopper
      const windowHeight = window.innerHeight; // Height of the viewport
      const scrollY = window.scrollY; // Current vertical scroll position
  
      // Check if the user has scrolled to the position of the stopper
      if (scrollY + windowHeight >= stopperOffset) {
          if (!isAtStopper) {
              isAtStopper = true; // Set the flag to true
              // Immediately snap to the stopper position to avoid jitter
              window.scrollTo(0, stopperOffset - windowHeight);
          }
      } else {
          isAtStopper = false; // Reset the flag if not at the stopper
      }
  });
  
  // Prevent scrolling down if the user is at or below the stopper
  window.addEventListener('wheel', function(e) {
      const stopper = document.getElementById('stopper');
      const stopperOffset = stopper.getBoundingClientRect().top + window.scrollY; // Get the top position of the stopper
      const scrollY = window.scrollY; // Current vertical scroll position
  
      // Prevent scrolling down if the user is at or below the stopper
      if (e.deltaY > 0 && scrollY + window.innerHeight >= stopperOffset) {
          e.preventDefault(); // Stop the scroll event
          window.scrollTo(0, stopperOffset - window.innerHeight);
      }
  }, { passive: false });
  
  let timeout;
  document.addEventListener('scroll', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          // Insert the scroll stop logic here
      }, 50); // Adjust timing as needed
  });
  