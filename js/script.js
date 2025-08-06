  AOS.init({
    duration: 1000,
    once: true
  });

  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", setActiveSection);
    window.addEventListener("load", setActiveSection); // هنگام لود هم اجرا شه

    function setActiveSection() {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.progress-bar');
        bars.forEach(bar => {
          const percent = parseInt(bar.getAttribute('data-percentage'));
          let current = 0;
          const speed = 20;
          const step = Math.ceil(percent / (2000 / speed)); // برای 2 ثانیه

          const interval = setInterval(() => {
            current += step;
            if (current >= percent) {
              current = percent;
              clearInterval(interval);
            }
            bar.querySelector('.progress-text').textContent = current + '%';
          }, speed);

          // انیمیشن پر شدن نوار
          bar.style.width = percent + '%';
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.skill-box').forEach(box => {
    observer.observe(box);
  });
