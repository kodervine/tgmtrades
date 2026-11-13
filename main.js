// Checkout links.
const MONTHLY_URL = "https://buy.stripe.com/5kQaEXeGd6aKbUKctf9sk0T"; // $150 / month
const QUARTERLY_URL = "https://buy.stripe.com/8x2dR90Pn8iS8Iyal79sk0N"; // $400 / quarter

document.querySelectorAll("[data-join]").forEach((a) => (a.href = MONTHLY_URL));
document.querySelectorAll("[data-join-q]").forEach((a) => (a.href = QUARTERLY_URL));

const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Miyyah photo carousel: arrows, dots, slow autoplay (paused on touch/hover)
(() => {
  const track = document.getElementById("miyyah-track");
  if (!track) return;
  const dots = [...track.parentElement.querySelectorAll(".dots i")];
  const go = (i) => track.scrollTo({ left: ((i + dots.length) % dots.length) * track.clientWidth });
  const cur = () => Math.round(track.scrollLeft / track.clientWidth);
  track.parentElement.querySelector(".prev").onclick = () => go(cur() - 1);
  track.parentElement.querySelector(".next").onclick = () => go(cur() + 1);
  track.addEventListener("scroll", () => dots.forEach((d, i) => d.classList.toggle("on", i === cur())), { passive: true });
  let t = setInterval(() => go(cur() + 1), 5000);
  const stop = () => clearInterval(t);
  ["pointerdown", "mouseenter", "touchstart"].forEach((e) => track.parentElement.addEventListener(e, stop, { passive: true }));
})();

// Terms & Conditions link
const TERMS_URL = "https://docs.google.com/document/d/10Go5Yi4-t7oz_74h7zeWxsOOqaku9hAPf1CLkd9OBQ8/edit?tab=t.0";
document.querySelectorAll("[data-terms]").forEach((a) => {
  a.href = TERMS_URL;
  if (TERMS_URL !== "#") { a.target = "_blank"; a.rel = "noopener"; }
});

// Lightbox for win screenshots and community messages
(() => {
  const box = document.getElementById("lightbox");
  if (!box) return;
  const img = document.getElementById("lb-img");
  const srcs = [...new Set([...document.querySelectorAll("[data-lightbox]")].map((el) => el.dataset.lightbox))];
  let i = 0, lastFocus = null;
  const show = (n) => { i = (n + srcs.length) % srcs.length; img.src = srcs[i]; };
  const open = (src, from) => { lastFocus = from; show(srcs.indexOf(src)); box.hidden = false; document.body.style.overflow = "hidden"; box.querySelector(".lb-close").focus(); };
  const close = () => { box.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); };
  document.querySelectorAll("[data-lightbox]").forEach((el) => el.addEventListener("click", () => open(el.dataset.lightbox, el)));
  box.querySelector(".lb-close").onclick = close;
  box.querySelector(".lb-prev").onclick = () => show(i - 1);
  box.querySelector(".lb-next").onclick = () => show(i + 1);
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(i - 1);
    if (e.key === "ArrowRight") show(i + 1);
  });
})();

// Wins rail arrows
(() => {
  const rail = document.getElementById("wins-rail");
  if (!rail) return;
  const prev = document.querySelector(".rprev"), next = document.querySelector(".rnext");
  const upd = () => { prev.disabled = rail.scrollLeft < 8; next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8; };
  prev.onclick = () => rail.scrollBy({ left: -rail.clientWidth * 0.8, behavior: "smooth" });
  next.onclick = () => rail.scrollBy({ left: rail.clientWidth * 0.8, behavior: "smooth" });
  rail.addEventListener("scroll", upd, { passive: true });
  rail.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") next.click(); if (e.key === "ArrowLeft") prev.click(); });
  window.addEventListener("resize", upd); upd();
})();
