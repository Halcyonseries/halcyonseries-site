document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("lightbox-overlay");
  const lbImg = document.getElementById("lightbox-image");
  const links = Array.from(document.querySelectorAll("a.lightbox"));
  const prevBtn = document.getElementById("lb-prev");
  const nextBtn = document.getElementById("lb-next");

  if (!overlay || !lbImg || !prevBtn || !nextBtn || links.length === 0) {
    return;
  }

  let currentIndex = 0;

  function showImage(idx) {
    currentIndex = (idx + links.length) % links.length;
    const link = links[currentIndex];
    const img = link.querySelector("img");

    lbImg.src = link.href;
    lbImg.alt = img?.alt ? `${img.alt} - enlarged view` : "Large artwork";
  }

  function openLightbox(idx) {
    showImage(idx);
    overlay.classList.add("visible");
    overlay.setAttribute("aria-hidden", "false");
    nextBtn.focus();
  }

  function closeLightbox() {
    overlay.classList.remove("visible");
    overlay.setAttribute("aria-hidden", "true");
    lbImg.removeAttribute("src");
  }

  links.forEach((link, idx) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(idx);
    });
  });

  prevBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    showImage(currentIndex + 1);
  });

  lbImg.addEventListener("click", (event) => event.stopPropagation());
  overlay.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("visible")) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      showImage(currentIndex + 1);
    }
  });
});
