document.addEventListener('DOMContentLoaded', () => {
  // FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const toggleBtn = item.querySelector('.faq-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Section 4: Scroll-triggered Fullscreen Video Expansion Animation
  const videoContainer = document.getElementById('video-scroll-container');
  const videoSection = document.getElementById('video-section');
  const showcaseVideo = document.querySelector('.showcase-video');

  if (videoContainer && videoSection) {
    window.addEventListener('scroll', () => {
      const sectionRect = videoSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Expand video container when scrolled into view
      if (sectionRect.top <= windowHeight * 0.3 && sectionRect.bottom >= windowHeight * 0.3) {
        videoContainer.classList.add('is-expanded');
        if (showcaseVideo && showcaseVideo.paused) {
          showcaseVideo.play().catch(() => {});
        }
      } else {
        videoContainer.classList.remove('is-expanded');
      }
    });
  }

  // Smooth scroll active nav link highlight
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });
});
