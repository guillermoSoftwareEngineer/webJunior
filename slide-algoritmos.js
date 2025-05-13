const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const slides = [
  './imageSlides/slides-algoritmos-1.png',
  './imageSlides/slides-algoritmos-2.png',
  './imageSlides/slides-algoritmos-3.png',
  './imageSlides/slides-algoritmos-4.png',
  './imageSlides/slides-algoritmos-5.png',
  './imageSlides/slides-algoritmos-6.png',
  './imageSlides/slides-algoritmos-7.png',
  './imageSlides/slides-algoritmos-8.png',
  './imageSlides/slides-algoritmos-9.png',
  './imageSlides/slides-algoritmos-10.png'
];

let currentIndex = 0;
const wrapper = document.querySelector('.slides-wrapper');

slides.forEach((src, i) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = `Slide ${i + 1}`;
  img.classList.add('slide');
  if (i === 0) img.classList.add('active');
  wrapper.appendChild(img);
});

const updateSlides = index => {
  document.querySelectorAll('.slide').forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
};

document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlides(currentIndex);
});

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlides(currentIndex);
});
