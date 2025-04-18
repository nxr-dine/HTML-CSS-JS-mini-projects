document.addEventListener("DOMContentLoaded", function () {
  // Add fade-in animation to project cards
  const cards = document.querySelectorAll(".project-card");

  function checkScroll() {
    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (cardTop < windowHeight * 0.9) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  }

  // Initialize card styles
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Check initial positions
  checkScroll();

  // Check on scroll
  window.addEventListener("scroll", checkScroll);
});
