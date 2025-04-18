document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const slider = document.querySelector(".slider");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pagination = document.querySelector(".pagination");
  const cards = document.querySelectorAll(".card");

  // State
  let currentIndex = 0;
  let cardsPerView = getCardsPerView();
  let totalSlides = Math.ceil(cards.length / cardsPerView);

  // Initialize
  createPaginationDots();
  updateSlider();

  // Event listeners
  prevBtn.addEventListener("click", goToPrevSlide);
  nextBtn.addEventListener("click", goToNextSlide);
  window.addEventListener("resize", handleResize);

  // Functions
  function getCardsPerView() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 768) return 3;
    if (windowWidth >= 640) return 2;
    return 1;
  }

  function createPaginationDots() {
    pagination.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      pagination.appendChild(dot);
    }
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  function goToPrevSlide() {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateSlider();
  }

  function goToNextSlide() {
    currentIndex = Math.min(currentIndex + 1, totalSlides - 1);
    updateSlider();
  }

  function updateSlider() {
    // Calculate the slide position
    const slideWidth = cards[0].offsetWidth;
    const gapWidth = 16; // 1rem = 16px
    const offset = currentIndex * cardsPerView * (slideWidth + gapWidth);

    // Update slider position
    slider.style.transform = `translateX(-${offset}px)`;

    // Update pagination
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    // Update button state
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalSlides - 1;

    // Visual feedback on buttons
    prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
    nextBtn.style.opacity = currentIndex === totalSlides - 1 ? "0.5" : "1";
  }

  function handleResize() {
    const newCardsPerView = getCardsPerView();
    if (newCardsPerView !== cardsPerView) {
      cardsPerView = newCardsPerView;
      totalSlides = Math.ceil(cards.length / cardsPerView);
      currentIndex = Math.min(currentIndex, totalSlides - 1);
      createPaginationDots();
      updateSlider();
    } else {
      updateSlider();
    }
  }

  // Add touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    false
  );

  slider.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    false
  );

  function handleSwipe() {
    const minSwipeDistance = 50;
    if (touchStartX - touchEndX > minSwipeDistance) {
      goToNextSlide();
    } else if (touchEndX - touchStartX > minSwipeDistance) {
      goToPrevSlide();
    }
  }

  // Add keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      goToPrevSlide();
    } else if (e.key === "ArrowRight") {
      goToNextSlide();
    }
  });

  // Auto-play functionality (optional)
  let autoplayInterval;
  const autoplayDelay = 5000; // 5 seconds

  function startAutoplay() {
    stopAutoplay(); // Clear any existing interval
    autoplayInterval = setInterval(() => {
      if (currentIndex < totalSlides - 1) {
        goToNextSlide();
      } else {
        goToSlide(0);
      }
    }, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }

  // Uncomment the line below to enable autoplay
  // startAutoplay();

  // Stop autoplay on user interaction
  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("touchstart", stopAutoplay);
  prevBtn.addEventListener("click", stopAutoplay);
  nextBtn.addEventListener("click", stopAutoplay);
  pagination.addEventListener("click", stopAutoplay);
});
