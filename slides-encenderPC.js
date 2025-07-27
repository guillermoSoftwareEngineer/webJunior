const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const slides = [
  './imageSlides/slides-encenderPC-1.jpg',
  './imageSlides/slides-encenderPC-2.jpg',
  './imageSlides/slides-encenderPC-3.jpg',
  './imageSlides/slides-encenderPC-4.jpg',
  './imageSlides/slides-encenderPC-5.jpg',
  './imageSlides/slides-encenderPC-6.jpg',
  './imageSlides/slides-encenderPC-7.jpg',
  './imageSlides/slides-encenderPC-8.jpg',
  './imageSlides/slides-encenderPC-9.jpg',
  './imageSlides/slides-encenderPC-10.jpg',
  './imageSlides/slides-encenderPC-11.jpg'
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