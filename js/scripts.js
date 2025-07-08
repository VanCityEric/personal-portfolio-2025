document.addEventListener("DOMContentLoaded", () => {
  const waitForFadeUps = () => {
    const fadeUps = document.querySelectorAll(".fade-up, .zoom-in");
    if (fadeUps.length === 0) {
      setTimeout(waitForFadeUps, 100);
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
          observer.disconnect();
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

const greetingObserver = new MutationObserver(() => {
  const el = document.getElementById("greeting-text");
  if (el) {
    startTypingGreeting();
    greetingObserver.disconnect();
  }
});

greetingObserver.observe(document.body, { childList: true, subtree: true });

const toggleObserver = new MutationObserver(() => {
  const toggleDesktop = document.getElementById("theme-toggle-desktop");
  const toggleMobile = document.getElementById("theme-toggle-mobile");
  const logoblack = document.getElementById("logoblack");
  const logowhite = document.getElementById("logowhite");

  const allToggles = [toggleDesktop, toggleMobile].filter(Boolean);

  if (allToggles.length) {
    const enableDarkMode = () => {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      allToggles.forEach((t) => (t.checked = true));
      if (logoblack && logowhite) {
        logoblack.classList.add("hide");
        logowhite.classList.remove("hide");
      }
      console.log("Dark mode enabled");
    };

    const disableDarkMode = () => {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      allToggles.forEach((t) => (t.checked = false));
      if (logoblack && logowhite) {
        logoblack.classList.remove("hide");
        logowhite.classList.add("hide");
      }
      console.log("Dark mode disabled");
    };

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") enableDarkMode();
    else disableDarkMode();

    allToggles.forEach((toggle) => {
      toggle.addEventListener("change", () => {
        toggle.checked ? enableDarkMode() : disableDarkMode();
      });
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

new MutationObserver((_, obs) => {
  const hamburger = document.getElementById("hamburger-menu");
  const navOverlay = document.getElementById("nav-overlay");
  const navWrapper = document.querySelector(".navigation-wrapper");
  const links = document.querySelectorAll(".nav-overlay .nav-link-a");

  if (!hamburger || !navOverlay || !navWrapper || !links.length) return;

  const closeMenu = () => {
    navOverlay.classList.remove("open");
    navWrapper.classList.remove("nav-open");
  };

  const toggleMenu = () => {
    const isOpen = navOverlay.classList.toggle("open");
    navWrapper.classList.toggle("nav-open", isOpen);
  };

  hamburger.removeEventListener("click", toggleMenu);
  hamburger.addEventListener("click", toggleMenu);

  links.forEach((link) => {
    link.removeEventListener("click", closeMenu);
    link.addEventListener("click", closeMenu);
  });

  obs.disconnect();
}).observe(document.body, { childList: true, subtree: true });

// Corrected MutationObserver for closing menu on scroll
const scrollObserver = new MutationObserver((mutations, observerInstance) => {
  const navOverlay = document.getElementById("nav-overlay");
  const navWrapper = document.querySelector(".navigation-wrapper");

  if (!navOverlay || !navWrapper) return;

  const closeMenuOnScroll = () => {
    if (navOverlay.classList.contains("open")) {
      navOverlay.classList.remove("open");
      navWrapper.classList.remove("nav-open");
    }
  };

  window.addEventListener("scroll", closeMenuOnScroll, { passive: true });

  observerInstance.disconnect();
});

scrollObserver.observe(document.body, { childList: true, subtree: true });
