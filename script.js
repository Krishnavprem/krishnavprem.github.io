/* ================= MOBILE NAV ================= */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger?.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* ================= PROJECT FILTER ================= */

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const value = btn.dataset.filter;

    projects.forEach(card => {
      card.style.display =
        value === "all" || card.dataset.category === value
          ? "block"
          : "none";
    });
  });
});

/* ================= ZOI ASSISTANT ================= */

const zoiAvatar = document.getElementById("zoi-avatar");
const zoiPanel = document.getElementById("zoi-panel");
const zoiClose = document.getElementById("zoi-close");
const zoiMessage = document.querySelector(".zoi-message");
const zoiButtons = document.querySelectorAll(".zoi-actions button");

const zoiAnswers = {
  work: "Krishna focuses on embedded C, Linux system programming, RTOS concepts, and microcontroller-based development.",
  skills: "Core skills include C/C++, Linux internals, data structures, RTOS basics, debugging, and firmware design.",
  projects: "Start with the Inverted Search Engine, MP3 Tag Reader, and Embedded Smart Home Controller projects.",
  resume: "You can download Krishna's resume or visit his GitHub and LinkedIn from the Home section."
};

zoiAvatar.addEventListener("click", () => {
  zoiPanel.style.display = "block";
});

zoiClose.addEventListener("click", () => {
  zoiPanel.style.display = "none";
});

zoiButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    zoiMessage.textContent = zoiAnswers[btn.dataset.answer];
  });
});

/* ================= IMAGE LIGHTBOX ================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-nav.prev");
const lightboxNext = document.querySelector(".lightbox-nav.next");

const achievementImages = document.querySelectorAll(".carousel-slide img");
let currentLightboxIndex = 0;
const lightboxImages = [...achievementImages].map(img => img.src);

achievementImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentLightboxIndex = index;
    lightboxImg.src = lightboxImages[currentLightboxIndex];
    lightbox.classList.add("show");
  });
});

lightboxNext.addEventListener("click", () => {
  currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
  lightboxImg.src = lightboxImages[currentLightboxIndex];
});

lightboxPrev.addEventListener("click", () => {
  currentLightboxIndex =
    (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[currentLightboxIndex];
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.classList.remove("show");
  }
});

/* ================= ACHIEVEMENTS CAROUSEL ================= */

document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector("#achievements");
  if (!section) return;

  const track = section.querySelector(".carousel-track");
  const slides = section.querySelectorAll(".carousel-slide");
  const dots = section.querySelectorAll(".carousel-dots .dot");
  const nextBtn = section.querySelector(".carousel-nav.next");
  const prevBtn = section.querySelector(".carousel-nav.prev");

  let index = 0;
  const INTERVAL = 5000;
  let timer = null;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  function next() {
    index = (index + 1) % slides.length;
    update();
  }

  function prev() {
    index = (index - 1 + slides.length) % slides.length;
    update();
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, INTERVAL);
  }

  function stopAuto() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      index = Number(dot.dataset.slide);
      update();
    });
  });

  update();
  startAuto();
});
