import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://uckpskfadylgxdofdhhk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja3Bza2ZhZHlsZ3hkb2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNTk5NzMsImV4cCI6MjA3NDgzNTk3M30.3sOX1vDxmZYsgI6_h8Lop7LUquy3dkRzWd8d5pg5nQU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) return;

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{ name, email, message }]);

      if (error) throw error;

      alert('Message sent successfully!');
      contactForm.reset();
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Something went wrong. Please try again later.');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const desktopTabs = document.querySelectorAll('.tab-btn');
  const mobileTabs = document.querySelectorAll('.tab-btn-mobile');
  const allTabs = [...desktopTabs, ...mobileTabs];
  const allContents = document.querySelectorAll('.tab-content');

  function switchTab(tabId) {
    // Hide all contents
    allContents.forEach(c => c.classList.add('hidden'));

    // Show selected content
    const selected = document.getElementById(tabId);
    if (selected) selected.classList.remove('hidden');

    // Update all tabs
    allTabs.forEach(btn => {
      const btnTab = btn.dataset.tab;
      const isActive = btnTab === tabId;

      if (isActive) {
        // Active tab classes
        btn.classList.add('bg-gold-accent', 'text-background');
        btn.classList.remove('bg-transparent', 'bg-muted', 'text-foreground');
      } else {
        // Inactive tab classes
        btn.classList.remove('bg-gold-accent', 'text-background');
        if (btn.classList.contains('tab-btn')) {
          btn.classList.add('bg-transparent', 'hover:bg-border', 'text-foreground');
          btn.classList.remove('bg-muted');
        } else {
          btn.classList.add('bg-muted', 'hover:bg-border', 'text-foreground');
          btn.classList.remove('bg-transparent');
        }
      }
    });
  }

  // Attach click listeners
  allTabs.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Initialize first tab
  switchTab('second-mortgages');
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
  function scrollToSlide(i) {
    index = i;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    updateCounter();
  
    // Fade in overlay and content for the active slide
    slides.forEach((slide, idx) => {
      const overlay = slide.querySelector('div.absolute.bg-black\\/30');
      const content = slide.querySelector('div.relative.z-20');
  
      if (idx === index) {
        overlay && overlay.classList.replace('opacity-0', 'opacity-100');
        content && content.classList.replace('opacity-0', 'opacity-100');
      } else {
        overlay && overlay.classList.replace('opacity-100', 'opacity-0');
        content && content.classList.replace('opacity-100', 'opacity-0');
      }
    });
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


const openPdfBtn = document.getElementById("open-pdf-btn");

// PDF URL
const pdfUrl = "./content/pdfs/REcolorado.pdf";

openPdfBtn.addEventListener("click", () => {
  // Open PDF in a new browser tab
  window.open(pdfUrl, "_blank");
});