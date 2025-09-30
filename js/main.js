import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uckpskfadylgxdofdhhk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja3Bza2ZhZHlsZ3hkb2ZkaGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNTk5NzMsImV4cCI6MjA3NDgzNTk3M30.3sOX1vDxmZYsgI6_h8Lop7LUquy3dkRzWd8d5pg5nQU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);


const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) return;

  // 3️⃣ Insert into Supabase table
  const { data, error } = await supabase
    .from('contacts') // replace with your table name
    .insert([{ name, email, message }]);

  if (error) {
    console.error('Error submitting form:', error);
    alert('There was a problem sending your message. Please try again.');
  } else {
    alert('Message sent successfully!');
    contactForm.reset();
  }
});





document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const dropdownButtons = document.querySelectorAll('.mobile-dropdown-button');

  // Hamburger toggle
  mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');
  });

  // Dropdowns toggle
  dropdownButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = button.parentElement;
      const icon = button.querySelector('svg');
      dropdown.classList.toggle('active');

      icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  });

  // Click outside closes menu & dropdowns
  document.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    dropdownButtons.forEach(button => {
      const dropdown = button.parentElement;
      const icon = button.querySelector('svg');
      dropdown.classList.remove('active');
      icon.style.transform = 'rotate(0deg)';
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("bannerCarousel");
  const slides = Array.from(carousel.children);
  const totalSlides = slides.length;
  const counter = document.getElementById("slideCounter");

  let index = 0;
  const autoRotateTime = 6000;
  let autoRotate = null;

  function updateCounter() {
    counter.textContent = `${index + 1}/${totalSlides}`;
  }

  function scrollToSlide(i) {
    index = i;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    updateCounter();
  }

  function nextSlide() {
    scrollToSlide((index + 1) % totalSlides);
  }

  function prevSlide() {
    scrollToSlide((index - 1 + totalSlides) % totalSlides);
  }

  function startAutoRotate() {
    clearInterval(autoRotate);
    autoRotate = setInterval(nextSlide, autoRotateTime);
  }

  // ---- Run code ----
  startAutoRotate();

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoRotate();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoRotate();
    });
  }

  scrollToSlide(0);
});

  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js";

  // Load PDF
  pdfjsLib.getDocument(pdfUrl).promise.then(doc => {
    pdfDoc = doc;
    totalPages = doc.numPages;

    for (let i = 1; i <= totalPages; i++) {
      doc.getPage(i).then(page => {
        const viewport = page.getViewport({ scale: 0.8 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.classList.add("snap-center", "flex-shrink-0", "cursor-pointer", "hover:scale-60", "transition-transform", "rounded");
        carousel.appendChild(canvas);

        page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise.then(() => {
          // Click to open fullscreen
          canvas.addEventListener("click", () => {
            currentIndex = i - 1;
            openModal(currentIndex);
          });
        });
      });
    }
  }).catch(err => console.error("PDF error:", err));

  // --- Drag-to-scroll ---
  carousel.addEventListener("mousedown", e => {
    isDragging = true;
    carousel.classList.add("cursor-grabbing");
    startX = e.pageX - carousel.offsetLeft;
    scrollStart = carousel.scrollLeft;
  });
  carousel.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const x = e.pageX - carousel.offsetLeft;
    carousel.scrollLeft = scrollStart - (x - startX) * dragMultiplier;
  });
  carousel.addEventListener("mouseup", () => { isDragging = false; carousel.classList.remove("cursor-grabbing"); });
  carousel.addEventListener("mouseleave", () => { isDragging = false; carousel.classList.remove("cursor-grabbing"); });

  // Touch support
  carousel.addEventListener("touchstart", e => {
    isDragging = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollStart = carousel.scrollLeft;
  });
  carousel.addEventListener("touchmove", e => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    carousel.scrollLeft = scrollStart - (x - startX) * dragMultiplier;
  });
  carousel.addEventListener("touchend", () => { isDragging = false; });

  // --- Fullscreen modal ---
  function openModal(index) {
    modal.classList.remove("hidden");
    renderModalPage(index);
  }

  function closeModal() {
    modal.classList.add("hidden");
  }

  function renderModalPage(index) {
    pdfDoc.getPage(index + 1).then(page => {
      const viewport = page.getViewport({ scale: 2 }); // higher resolution for fullscreen
      modalCanvas.width = viewport.width;
      modalCanvas.height = viewport.height;
      page.render({ canvasContext: modalCtx, viewport });
    });
  }

  btnClose.addEventListener("click", closeModal);
  btnNext.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalPages;
    renderModalPage(currentIndex);
  });
  btnPrev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalPages) % totalPages;
    renderModalPage(currentIndex);
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;
    if (e.key === "ArrowRight") { currentIndex = (currentIndex + 1) % totalPages; renderModalPage(currentIndex); }
    if (e.key === "ArrowLeft") { currentIndex = (currentIndex - 1 + totalPages) % totalPages; renderModalPage(currentIndex); }
    if (e.key === "Escape") closeModal();
  });


