const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const slides = [
'./imageSlides/slides-scrum-1.png',
'./imageSlides/slides-scrum-2.png',
  './imageSlides/slides-scrum-3.png',
  './imageSlides/slides-scrum-4.png',
  './imageSlides/slides-scrum-5.png',
  './imageSlides/slides-scrum-6.png',
  './imageSlides/slides-scrum-7.png',
  './imageSlides/slides-scrum-8.png',
  './imageSlides/slides-scrum-9.png',
  './imageSlides/slides-scrum-10.png'
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
