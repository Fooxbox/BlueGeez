/* ============================================
   BLUE GEEZ — Band Website Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navbar scroll effect ----------
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ---------- Active nav link on scroll ----------
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---------- Mobile menu toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---------- Scroll reveal animations ----------
  const revealElements = document.querySelectorAll(
    '.section-title, .section-subtitle, .about-grid, .album-card, .tour-item, .gallery-item, .contact-grid, .member-card, .video-card'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Gallery lightbox ----------
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');

  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryImages = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    return { src: img?.src || '', alt: img?.alt || 'Gallery Image' };
  });
  let currentImageIndex = 0;

  const showLightboxImage = (index) => {
    currentImageIndex = index;
    const { src, alt } = galleryImages[index];
    lightboxContent.innerHTML = `<img src="${src}" alt="${alt}">`;
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      showLightboxImage(index);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Navigate with arrow keys in lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') {
      showLightboxImage((currentImageIndex + 1) % galleryImages.length);
    } else if (e.key === 'ArrowLeft') {
      showLightboxImage((currentImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Lightbox prev/next buttons
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  lightboxPrev.addEventListener('click', () => {
    showLightboxImage((currentImageIndex - 1 + galleryImages.length) % galleryImages.length);
  });

  lightboxNext.addEventListener('click', () => {
    showLightboxImage((currentImageIndex + 1) % galleryImages.length);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // ---------- Contact form ----------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Wird gesendet...';
    submitBtn.disabled = true;

    setTimeout(() => {
      formStatus.textContent = 'Nachricht gesendet! Wir melden uns bald bei dir.';
      formStatus.className = 'form-status success';
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 5000);
    }, 1500);
  });

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Parallax hero title ----------
  const heroTitle = document.querySelector('.hero-title');
  const heroTagline = document.querySelector('.hero-tagline');

  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.3;
      const opacity = 1 - (window.scrollY / (window.innerHeight * 0.7));
      heroTitle.style.transform = `translateY(${offset}px)`;
      heroTitle.style.opacity = Math.max(opacity, 0);
      heroTagline.style.transform = `translateY(${offset * 0.5}px)`;
      heroTagline.style.opacity = Math.max(opacity, 0);
    }
  }, { passive: true });

});
