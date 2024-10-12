// RECORD
document.addEventListener("DOMContentLoaded", function () {
  let preview = document.getElementById("preview");
  let recording = document.getElementById("recording");
  let startButton = document.getElementById("startButton");
  let stopButton = document.getElementById("stopButton");
  let logElement = document.getElementById("log");

  let mediaStream; // Variable to hold the media stream
  let recorder; // Variable to hold the MediaRecorder instance
  let recordedChunks = []; // Array to store recorded data

  function log(msg) {
    logElement.innerHTML += msg + "<br>"; // Use <br> for line breaks
  }

  function startRecording(stream) {
    recorder = new MediaRecorder(stream);
    recordedChunks = []; // Reset recorded chunks

    recorder.ondataavailable = (event) => recordedChunks.push(event.data);
    recorder.start();
    log("Recording started...");

    recorder.onstop = () => {
      let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      if (recording) {
        recording.src = URL.createObjectURL(recordedBlob);
        recording.style.display = "block"; // Show the recorded video
      }
      log("Recording stopped. Recorded " + recordedBlob.size + " bytes.");
    };
  }

  startButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default button action
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true
      })
      .then((stream) => {
        mediaStream = stream; // Store the media stream
        preview.srcObject = mediaStream;
        preview.captureStream = preview.captureStream || preview.mozCaptureStream;

        startRecording(preview.captureStream());

        // Ensure the recording is hidden at the start
        if (recording) {
          recording.style.display = "none";
        }
      })
      .catch(log);
  }, false);

  stopButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default button action
    if (recorder && recorder.state === "recording") {
      recorder.stop(); // Stop the recording
      mediaStream.getTracks().forEach((track) => track.stop()); // Stop the media stream
      preview.srcObject = null; // Clear the preview

      // Hide the recording when stopping
      if (recording) {
        recording.style.display = "none"; // Hide the recording element
      }
    }
  }, false);
});

// sign speech bubble
const hoverArea = document.getElementById("patch-inner-center");
const reveal = document.querySelector(".triangle-isosceles");
const secondSpeech = document.querySelector(".second-speech");

hoverArea.addEventListener("click", () => {
  if (!reveal.classList.contains("show")) {
    reveal.classList.add("show"); // Show the first textbox

    // Set a timeout for the second textbox to fade in after a delay
    setTimeout(() => {
      secondSpeech.style.display = "block"; // Ensure it is block before opacity transition
      requestAnimationFrame(() => {
        secondSpeech.classList.add("show"); // Show the second textbox
      });
    }, 500); // Adjust this duration for the delay
  } else {
    reveal.classList.remove("show"); // Hide the first textbox
    secondSpeech.classList.remove("show"); // Hide the second textbox
    secondSpeech.style.display = "none"; // Reset display to none after hiding
  }
});











// PETS !!!!!!!!!!!!!!
const pets = document.querySelectorAll('.pet');
let currentPetIndex = 0;

const startFalling = () => {
    // Check if we are at the end of the pets array
    if (currentPetIndex >= pets.length) {
        currentPetIndex = 0; // Reset to the first pet if we reach the end
    }

    const pet = pets[currentPetIndex];

    // Set random left position for the pet
    pet.style.left = `${Math.random() * 100}%`;

    // Make it visible and trigger animation
    pet.classList.add('falling');
    pet.style.animation = 'pet-fall 5s linear forwards, pet-shake 3s ease-in-out infinite';

    // Increment index for the next pet
    currentPetIndex++;

    // Reset the pet's position and visibility after falling
    pet.addEventListener('animationend', () => {
        pet.style.top = '-50%'; // Move up to hide it further
        pet.classList.remove('falling'); // Remove falling class
        pet.style.animation = ''; // Clear animation styles
    }, { once: true });

    // Set timeout for the next pet
    setTimeout(startFalling, 30000); // Wait for 30 seconds before the next pet falls
};

// Initial delay of 10 seconds before the first pet starts falling
setTimeout(startFalling, 10000);

// Open a new window on pet click
pets.forEach(pet => {
    pet.addEventListener('click', () => {
        const link = pet.getAttribute('data-link');
        window.open(link, '_blank'); // Open the link in a new tab
    });
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
    "hello, central!",
    "欢迎光临⊹₊⟡⋆",
    "¡vale!⋆˚✿˖°",
    // "✧˖ °张美迪✩°｡⋆",
    "(×_×;)  .  .  .",
    "[my design.]"
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





// IMAGES TITLE
document.addEventListener("DOMContentLoaded", function (event) {
  const imagesTitle = document.getElementById("images-title");

  // Create an IntersectionObserver to monitor the title
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Fade in the title and start the animation after a delay
        setTimeout(() => {
          imagesTitle.classList.add("show");
          StartTextAnimation(0);
        }, 300); // 0.3 seconds delay
        // Stop observing once the title is visible
        observer.unobserve(imagesTitle);
      }
    });
  });

  // Start observing the imagesTitle element
  observer.observe(imagesTitle);

  var dataText = [
    "check this out!",
    "(◉ _ ◉)  .  .  .",
    "[my art.]"
  ];

function typeWriter(text, i, fnCallback) {
  if (i < text.length) {
    imagesTitle.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
    setTimeout(function () {
      typeWriter(text, i + 1, fnCallback);
    }, 70); // reduced from 100 for faster typing
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






// 4 images & pngs
document.addEventListener("DOMContentLoaded", () => {
    const imageOptions = document.querySelectorAll(".image-option");
    const playPng1 = document.getElementById("play-png1");
    const playPngShadow = document.getElementById("play-png-shadow");
    const playPng2 = document.getElementById("play-png2");
    const playPngShadow2 = document.getElementById("play-png-shadow2");
    const sticker1 = document.getElementById("sticker1");
    const stickerShadow = document.getElementById("sticker-shadow");
  const sticker2 = document.getElementById("sticker2");
    const stickerShadow2 = document.getElementById("sticker-shadow2");
    
    let currentIndex = 0; // Track the current image index

    const fadeInImage = (index) => {
        if (index < imageOptions.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible"); // Fade in the image
                        observer.unobserve(entry.target); // Stop observing once it's visible
                    }
                });
            });

            observer.observe(imageOptions[index]); // Observe the current image

            // Move to the next image after a delay
            setTimeout(() => {
                fadeInImage(index + 1); // Fade in the next image
            }, 700); // Delay for the next image (0.7 seconds)
        }
    };

    // Introduce an initial delay of 2 seconds before starting the fade-in sequence
    setTimeout(() => {
        fadeInImage(currentIndex); // Start fading in the images
    }, 4900); // Initial delay 

    // Fade in the play PNGs and stickers after images
    const fadeInPngsAndStickers = () => {
        playPng1.classList.add("visible");
        playPng2.classList.add("visible");
        playPngShadow.classList.add("visible");
        playPngShadow2.classList.add("visible");
        sticker1.classList.add("visible");
 stickerShadow.classList.add("visible");
      sticker2.classList.add("visible");
 stickerShadow2.classList.add("visible");
    };

    // Fade in the play PNGs and stickers after the image fade-in sequence
    setTimeout(fadeInPngsAndStickers, imageOptions.length * 700 + 4900); // Delay based on the number of images
});










// scroll-stopper
let scrollStopped = false; // Flag to track if the scroll stop has occurred

window.addEventListener('scroll', () => {
    const scrollStopper = document.getElementById('scroll-stopper');
    const rect = scrollStopper.getBoundingClientRect();

    // Check if the top of the scroll-stopper is in view
    if (rect.top <= window.innerHeight && !scrollStopped) {
        scrollStopped = true; // Set the flag to prevent future stops
        const originalScrollY = window.scrollY; // Save the current scroll position

        // Temporarily disable scrolling
        document.body.style.overflow = 'hidden';

        // Smoothly scroll back to the original position after a slight adjustment
        setTimeout(() => {
            window.scrollTo({ top: originalScrollY, behavior: 'smooth' }); // Smooth scroll back
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 500);
    }
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
