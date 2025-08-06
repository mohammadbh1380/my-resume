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

  const form = document.getElementById('contact-form');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');
  const formMessage = document.getElementById('form-message');


  form.addEventListener('submit', function (e) {
    e.preventDefault();

    subjectError.classList.add('d-none');
    messageError.classList.add('d-none');

    let valid = true;

    if (subject.value.trim() === '') {
      subjectError.classList.remove('d-none');
      valid = false;
    }

    if (message.value.trim() === '') {
      messageError.classList.remove('d-none');
      valid = false;
    }

    if (!valid) return;

    const formData = new FormData(form);

    fetch("https://formsubmit.co/ajax/mohammadbagherbahrami2@gmail.com", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      formMessage.innerText = "✅ پیام با موفقیت ارسال شد.";
      formMessage.style.display = "block";
      form.reset();
    })
    .catch(error => {
      formMessage.innerText = "❌ خطا در ارسال پیام.";
      formMessage.style.display = "block";
    });
  });