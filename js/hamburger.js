  function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
  }

  // Optional: Close menu when clicking outside of it (mobile only)
  document.addEventListener('click', function (event) {
    const isClickInsideMenu = document.getElementById('navLinks').contains(event.target);
    const isClickOnHamburger = document.getElementById('hamburger').contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger && window.innerWidth <= 768) {
      document.getElementById('navLinks').classList.remove('active');
    }
  });

  // Optional: Ensure menu is visible again on window resize (if moving to desktop)
  window.addEventListener('resize', () => {
    const navLinks = document.getElementById('navLinks');
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active'); // Reset menu state for desktop
    }
  });