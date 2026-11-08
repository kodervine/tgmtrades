// Checkout links. CONFIRM monthly is the $150/month link.
const MONTHLY_URL = "https://buy.stripe.com/9B63cv1Tr9mW5wm50N9sk0w"; // $150 / month (from thegirlsmanual.com)
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
