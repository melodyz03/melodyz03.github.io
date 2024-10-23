// images!!
document.addEventListener('DOMContentLoaded', function() {
  const imgs = document.querySelectorAll('.grid-image');

  // Make sure all images are visible on load
  imgs.forEach(img => {
    img.style.opacity = '1'; // Ensure images are shown
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const heartButton = document.getElementById("redheartbutton1");
  const hoverText = document.getElementById("hover-text");

  heartButton.addEventListener("mouseover", function() {
    heartButton.style.display = "none"; // Hide the image
    hoverText.style.display = "block";  // Show the text
  });

  
  
  
  
  hoverText.addEventListener("mouseleave", function() {
    heartButton.style.display = "block"; // Show the image
    hoverText.style.display = "none";    // Hide the text
  });
});
