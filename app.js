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

  // Section 4: Dual-Stage Continuous Scroll Video Animation
  // Stage 1 (Scroll Down): Video comes from bottom, expands and fits fullscreen
  // Stage 2 (Scroll Further Down): Video shrinks slowly, slides up to top, and next section appears
  const videoSection = document.getElementById('video-section');
  const videoContainer = document.getElementById('video-scroll-container');
  const showcaseVideo = document.querySelector('.showcase-video');

  if (videoSection && videoContainer) {
    window.addEventListener('scroll', () => {
      const sectionRect = videoSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = videoSection.offsetHeight - windowHeight;

      if (totalScrollable > 0) {
        // Calculate progress from 0 (top of section) to 1 (bottom of section)
        const currentScroll = -sectionRect.top;
        let progress = currentScroll / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));

        if (progress > 0 && progress < 1) {
          if (showcaseVideo && showcaseVideo.paused) {
            showcaseVideo.play().catch(() => {});
          }

          if (progress <= 0.5) {
            // Stage 1: Enters from bottom (0 to 0.5 progress) -> Expands to 100% full screen
            const normProgress = progress / 0.5; // 0 to 1
            const translateY = 120 * (1 - normProgress);
            const scale = 0.8 + (0.2 * normProgress);
            const width = 75 + (25 * normProgress); // 75vw to 100vw
            const height = 55 + (45 * normProgress); // 55vh to 100vh
            const borderRadius = 24 * (1 - normProgress);
            const opacity = 0.5 + (0.5 * normProgress);

            videoContainer.style.transform = `translateY(${translateY}px) scale(${scale})`;
            videoContainer.style.width = `${width}vw`;
            videoContainer.style.height = `${height}vh`;
            videoContainer.style.borderRadius = `${borderRadius}px`;
            videoContainer.style.opacity = opacity;
          } else {
            // Stage 2: Exits to top (0.5 to 1.0 progress) -> Shrinks back & slides up
            const normProgress = (progress - 0.5) / 0.5; // 0 to 1
            const translateY = -140 * normProgress;
            const scale = 1.0 - (0.2 * normProgress);
            const width = 100 - (25 * normProgress); // 100vw to 75vw
            const height = 100 - (45 * normProgress); // 100vh to 55vh
            const borderRadius = 24 * normProgress;
            const opacity = 1.0 - (0.3 * normProgress);

            videoContainer.style.transform = `translateY(${translateY}px) scale(${scale})`;
            videoContainer.style.width = `${width}vw`;
            videoContainer.style.height = `${height}vh`;
            videoContainer.style.borderRadius = `${borderRadius}px`;
            videoContainer.style.opacity = opacity;
          }
        } else if (progress <= 0) {
          // Reset before section
          videoContainer.style.transform = `translateY(120px) scale(0.8)`;
          videoContainer.style.width = `75vw`;
          videoContainer.style.height = `55vh`;
          videoContainer.style.borderRadius = `24px`;
          videoContainer.style.opacity = 0.5;
        }
      }
    });
  }

  // Section 5: Proven Success Category Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.proven-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'grid';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

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
