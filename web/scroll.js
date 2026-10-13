const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const sections = [...document.querySelectorAll(".scene")];
const navDots = [...document.querySelectorAll(".nav-dot")];
const currentStep = document.querySelector("[data-current-step]");

document.querySelectorAll("[data-scroll-target]").forEach((control) => {
  control.addEventListener("click", () => {
    const section = document.getElementById(control.dataset.scrollTarget);
    if (!section) return;
    section.scrollIntoView({
      behavior: reduceMotion.matches ? "auto" : "smooth",
      block: "start"
    });
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const activeIndex = sections.indexOf(visible.target);
    navDots.forEach((dot, index) => {
      if (index === activeIndex) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    if (currentStep) currentStep.textContent = String(activeIndex + 1).padStart(2, "0");
  }, { threshold: [0.25, 0.5, 0.75] });

  sections.forEach((section) => observer.observe(section));
}
