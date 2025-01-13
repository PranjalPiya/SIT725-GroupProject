const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let currentIndex = 0;

function updateCarousel() {
  const slideWidth = track.children[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === track.children.length - 1;
}

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextButton.addEventListener('click', () => {
  if (currentIndex < track.children.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

updateCarousel();

const menuItems = document.querySelectorAll('.menu-item');
const menuImage = document.getElementById('menu-image');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.menu-item.active').classList.remove('active');
    item.classList.add('active');
    menuImage.src = item.getAttribute('data-image');
  });
});