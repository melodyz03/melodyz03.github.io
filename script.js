// PETS !!!!!!!!!!!!!!
const pets = document.querySelectorAll('.pet');
let currentPetIndex = 0;

const startFalling = () => {
    if (currentPetIndex >= pets.length) {
        currentPetIndex = 0;
    }

    const pet = pets[currentPetIndex];

    pet.style.left = `${Math.random() * 100}%`;

    pet.classList.add('falling');
    pet.style.animation = 'pet-fall 5s linear forwards, pet-shake 3s ease-in-out infinite';

    currentPetIndex++;

    pet.addEventListener('animationend', () => {
        pet.style.top = '-50%';
        pet.classList.remove('falling');
        pet.style.animation = '';
    }, { once: true });

    // Set timeout for the next pet
    setTimeout(startFalling, 10000); // Wait for 10 seconds before the next pet falls
};

// Initial delay of 5 seconds before the first pet starts falling
setTimeout(startFalling, 5000);

// Open a new window on pet click
pets.forEach(pet => {
    pet.addEventListener('click', () => {
        const link = pet.getAttribute('data-link');
        window.open(link, '_blank'); // Open the link in a new tab
    });
});





// images!!
document.addEventListener('DOMContentLoaded', function() {
  const imgs = document.querySelectorAll('section .grid-image');

  function scrolling() {
    const viewportHeight = window.innerHeight;
    imgs.forEach(img => {
      if (img.getBoundingClientRect().top < viewportHeight) {
        img.style.animationPlayState = "running";
      }
    });
  }

  // Ensure images take space when they load
  imgs.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = 1; // Force images to show
      scrolling(); // Run scrolling again to account for loaded images
    });
  });

  window.onscroll = scrolling;
  scrolling(); // Run on page load
});
