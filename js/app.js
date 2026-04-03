import { initScroll, initParallax } from './scroll.js';
import { initUI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Custom Cursor
  initUI();
  
  // Initialize Scroll animations & Intersection Observers
  initScroll();
  
  // Initialize Parallax
  initParallax();

  // Basic smooth page transition prep (fade in on load)
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
