document.addEventListener("DOMContentLoaded", () => {
  const waitForFadeUps = () => {
    const fadeUps = document.querySelectorAll(".fade-up, .zoom-in");
    if (fadeUps.length === 0) {
      setTimeout(waitForFadeUps, 100); // Wait for includes to load
      return;
    }

    const onScroll = () => {
      fadeUps.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const trigger = window.innerHeight * 0.85;
        if (rect.top < trigger) el.classList.add("in-view");
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // run on page load too
  };

  waitForFadeUps();
});

document.addEventListener("DOMContentLoaded", () => {
  const experienceSection = document.querySelector(".experience-wrapper");
  const timeline = document.querySelector(".timeline-horizontal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timeline.classList.add("animate-line");
          observer.disconnect(); // run once
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  if (experienceSection && timeline) {
    observer.observe(experienceSection);
  }
});

let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navigation-wrapper");

  // show/hide on scroll direction
  if (window.scrollY > lastScrollY) {
    nav.classList.add("nav-hide");
  } else {
    nav.classList.remove("nav-hide");
  }
  lastScrollY = window.scrollY;

  // apply shadow + white background if not at top
  if (window.scrollY > 0) {
    nav.classList.add("nav-scrolled");
  } else {
    nav.classList.remove("nav-scrolled");
  }
});

const greetings = [
  "Hey, I'm Eric.",
  "Hola, soy Eric.",
  "Bonjour, je suis Eric.",
  "你好，我是Eric。",
  "안녕하세요, 에릭입니다.",
  "こんにちは、エリックです。",
  "Ciao, sono Eric.",
  "Hallo, ich bin Eric.",
];

function startTypingGreeting() {
  const el = document.getElementById("greeting-text");
  if (!el) return;

  let index = 0;
  let charIndex = 0;
  let current = greetings[index];
  let typingSpeed = 60;
  let pauseBetween = 2000;

  function type() {
    if (charIndex < current.length) {
      el.textContent += current.charAt(charIndex++);
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(() => {
        erase();
      }, pauseBetween);
    }
  }

  function erase() {
    if (charIndex > 0) {
      el.textContent = current.substring(0, --charIndex);
      setTimeout(erase, typingSpeed / 2);
    } else {
      index = (index + 1) % greetings.length;
      current = greetings[index];
      setTimeout(type, typingSpeed);
    }
  }

  type();
}

// Rename one observer to avoid conflict
const greetingObserver = new MutationObserver(() => {
  const el = document.getElementById("greeting-text");
  if (el) {
    startTypingGreeting();
    greetingObserver.disconnect();
  }
});

greetingObserver.observe(document.body, { childList: true, subtree: true });

const toggleObserver = new MutationObserver(() => {
  const toggle = document.getElementById("theme-toggle");
  const logoblack = document.getElementById("logoblack");
  const logowhite = document.getElementById("logowhite");

  if (toggle) {
    const enableDarkMode = () => {
      document.body.classList.add("dark-mode");
      toggle.checked = true;
      localStorage.setItem("theme", "dark");
      if (logoblack && logowhite) {
        logoblack.classList.add("hide");
        logowhite.classList.remove("hide");
      }
      console.log("Dark mode enabled");
    };

    const disableDarkMode = () => {
      document.body.classList.remove("dark-mode");
      toggle.checked = false;
      localStorage.setItem("theme", "light");
      if (logoblack && logowhite) {
        logoblack.classList.remove("hide");
        logowhite.classList.add("hide");
      }
      console.log("Dark mode disabled");
    };

    // Apply saved preference on load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }

    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    });

    toggleObserver.disconnect();
  }
});

toggleObserver.observe(document.body, { childList: true, subtree: true });

const logoObserver = new MutationObserver(() => {
  const logo = document.getElementById("logo-scroll");
  if (logo) {
    logo.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    logoObserver.disconnect();
  }
});

logoObserver.observe(document.body, { childList: true, subtree: true });

const navObserver = new MutationObserver(() => {
  const hamburger = document.getElementById("hamburger-menu");
  const navWrapper = document.querySelector(".navigation-wrapper");

  if (hamburger && navWrapper) {
    hamburger.addEventListener("click", () => {
      navWrapper.classList.toggle("nav-open");
    });
    navObserver.disconnect(); // Stop observing once initialized
  }
});

navObserver.observe(document.body, { childList: true, subtree: true });
