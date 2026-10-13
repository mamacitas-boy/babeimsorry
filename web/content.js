const fallbackConfig = {
  eyebrow: "A little note, from Medo",
  headline: "I’m sorry.",
  apology_message: "I should have listened more carefully. You matter to me, and I’m sorry for the ways I hurt you. I want to understand, make things right, and show you with my actions how much I care.",
  hero_note: "No excuses — just a real apology, and a lot of love.",
  memory_heading: "The little things mean everything.",
  memory_top: "I’m grateful for every laugh, every quiet moment, and all the memories we’ve made together.",
  memory_bottom: "You deserve patience, honesty, and care. I want to keep showing up for you that way.",
  gift_heading: "A little something for you.",
  gift_description: "A small reminder that I care about you, and that I’m trying.",
  gift_button: "View gift",
  animation_complete: "For you, with all my heart.",
  footer_text: "Made with love & sorry — your boyfriend, Medo.",
  photos: {},
  photo_alt: {}
};

function applyConfig(config) {
  document.querySelectorAll("[data-text]").forEach((element) => {
    const key = element.dataset.text;
    const value = config[key];
    if (typeof value === "string") element.textContent = value;
  });

  document.querySelectorAll("img[data-photo]").forEach((image) => {
    const key = image.dataset.photo;
    const source = config.photos?.[key];
    const frame = image.closest("[data-photo-frame]");
    const alt = config.photo_alt?.[key];
    if (typeof alt === "string") image.alt = alt;
    if (!frame || typeof source !== "string" || !source.trim()) return;

    image.addEventListener("load", () => frame.classList.add("has-image"), { once: true });
    image.addEventListener("error", () => {
      frame.classList.remove("has-image");
      image.removeAttribute("src");
    }, { once: true });
    image.src = source;
    if (image.complete && image.naturalWidth > 0) frame.classList.add("has-image");
  });

  document.title = config.headline ? `${config.headline} — a note from Medo` : "A little note, from Medo";
  window.apologyConfig = config;
}

fetch("config.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error("Could not load config.json");
    return response.json();
  })
  .then((config) => applyConfig({ ...fallbackConfig, ...config }))
  .catch(() => applyConfig(fallbackConfig));

const playButton = document.querySelector("#play-gift");
playButton?.addEventListener("click", async () => {
  if (playButton.disabled) return;
  playButton.disabled = true;
  const player = document.querySelector("#gift-player");
  const canvas = document.querySelector("#heart-canvas");
  player?.classList.add("is-playing");

  try {
    const { playHeart } = await import("./animation.js");
    playHeart(canvas);
  } catch (error) {
    player?.classList.remove("is-playing");
    playButton.disabled = false;
    const caption = document.querySelector("#animation-caption");
    if (caption) caption.textContent = "The gift could not load. Please try again.";
    console.error(error);
  }
});
