document.addEventListener('DOMContentLoaded', function () {
  // Select the carousel element
  const myCarouselElement = document.querySelector('#carouselExampleDark');

  // Initialize the Bootstrap carousel with options
  const carousel = new bootstrap.Carousel(myCarouselElement, {
    interval: 2000, // Interval between slides in milliseconds
    touch: true     // Enable touch gestures
  });
});
