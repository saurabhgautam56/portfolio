document.addEventListener("DOMContentLoaded", () => {

  const menuIcon = document.getElementById("menuIcon");
  const navLinks = document.getElementById("navLinks");
  const overlay = document.getElementById("overlay");
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("progressBar");

  const sections = document.querySelectorAll("section");
  const navLinksArr = document.querySelectorAll(".nav-links a");
  const bars = document.querySelectorAll(".bar");

  const filterBtns = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-item");

  /* ================= NAV + SECTION OBSERVER ================= */
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {

        // show section
        entry.target.classList.add("visible");

        // active nav
        navLinksArr.forEach(link => link.classList.remove("active"));
        const id = entry.target.id;
        document.querySelector(`.nav-links a[href="#${id}"]`)
          ?.classList.add("active");
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ================= SKILL BARS ================= */
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.percent + "%";
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => skillObserver.observe(bar));

  /* ================= MOBILE MENU ================= */
  const toggleMenu = () => {
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  };

  menuIcon.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // close on nav click
  navLinksArr.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  /* ================= PROJECT FILTER ================= */
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      projects.forEach(project => {
        const category = project.dataset.category;

        project.classList.toggle(
          "hide",
          !(filter === "all" || category === filter)
        );
      });
    });
  });

  /* ================= GITHUB STARS ================= */
document.querySelectorAll(".stars").forEach(async el => {
  const repo = el.dataset.repo;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`);
    const data = await res.json();
    el.textContent = data.stargazers_count ?? 0;
  } catch {
    el.textContent = "—";
  }
});

  /* ================= SCROLL (NAV + PROGRESS) ================= */
  let lastScroll = 0;

  window.addEventListener("scroll", () => {

    const current = window.scrollY;

    // navbar shadow
    navbar.classList.toggle("scrolled", current > 50);

    // hide / show navbar
    if (current > lastScroll && current > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScroll = current;

    // progress bar
    const height = document.body.scrollHeight - window.innerHeight;
    progressBar.style.width = (current / height) * 100 + "%";
  });

  /* ================= FORM ================= */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea");
    let valid = true;

    inputs.forEach(i => {
      if (!i.value.trim()) valid = false;
    });

    if (!valid) {
      status.textContent = "Fill all fields!";
      return;
    }

    status.textContent = "Sending...";

    setTimeout(() => {
      status.textContent = "Message sent!";
      form.reset();
    }, 1200);
  });

  /* ================= YEAR ================= */
  document.getElementById("year").textContent =
    new Date().getFullYear();

});