$(document).ready(function(){
    $('#mobile-btn').on('click', function(){
        $('#mobile-menu').toggleClass('active');
        $('#mobile-btn').find('i').toggleClass('fa-x');
    })
});
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = carousel.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
  
    let currentIndex = 0;
  
    function moveToSlide(index) {
      const slideWidth = slides[0].clientWidth;
      const offset = -index * slideWidth;
      carousel.style.transform = `translateX(${offset}px)`;
      currentIndex = index;
    }
  
    prevBtn.addEventListener('click', function() {
      if (currentIndex === 0) {
        currentIndex = slides.length - 1;
      } else {
        currentIndex--;
      }
      moveToSlide(currentIndex);
    });
  
    nextBtn.addEventListener('click', function() {
      if (currentIndex === slides.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      moveToSlide(currentIndex);
    });
  
    // Opcional: Mudança automática de slides
    // setInterval(function() {
    //   if (currentIndex === slides.length - 1) {
    //     currentIndex = 0;
    //   } else {
    //     currentIndex++;
    //   }
    //   moveToSlide(currentIndex);
    // }, 5000); // Altera os slides a cada 5 segundos
  });