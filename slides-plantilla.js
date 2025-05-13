const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const slides = [
  './imageSlides/Algoritmos-1.png',
  './imageSlides/Algoritmos-2.png',
  './imageSlides/Algoritmos-3.png',
  './imageSlides/Algoritmos-4.png',
  './imageSlides/Algoritmos-5.png',
  './imageSlides/Algoritmos-6.png',
  './imageSlides/Algoritmos-7.png',
  './imageSlides/Algoritmos-8.png',
  './imageSlides/Algoritmos-9.png',
  './imageSlides/Algoritmos-10.png',  
];
let currentIndex = 0;
const wrapper = document.querySelector('.slides-wrapper');

slides.forEach((src, i) => {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add('slide');
  if (i === 0) img.classList.add('active');
  wrapper.appendChild(img);
});

const updateSlides = (index) => {
  const imgs = document.querySelectorAll('.slide');
  imgs.forEach((img, i) => {
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
