// Video-urile: cele „auto” pornesc când sunt pe ecran, cele „hover” la trecerea cu mouse-ul.
// Sursele (webm + mp4) se pun abia la prima pornire, ca pagina să nu descarce video degeaba.
// La „mișcare redusă” sau „economisire date” rămân posterele.

type Conexiune = { saveData?: boolean; effectiveType?: string };

const reducere = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const conexiune = (navigator as Navigator & { connection?: Conexiune }).connection;
const economie = Boolean(conexiune?.saveData) || /(^|-)2g$/.test(conexiune?.effectiveType ?? "");
const areHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const opriteManual = new WeakSet<HTMLVideoElement>();

// ecran înalt (telefon ținut drept): folosim varianta verticală, dacă există
const ecranInalt = window.matchMedia("(max-aspect-ratio: 1/1)").matches;

const incarca = (v: HTMLVideoElement) => {
  if (v.dataset.incarcat) return;
  const vertical = ecranInalt && v.dataset.mp4Vertical;
  for (const [tip, src] of [
    ["video/webm", vertical ? v.dataset.webmVertical : v.dataset.webm],
    ["video/mp4", vertical ? v.dataset.mp4Vertical : v.dataset.mp4],
  ]) {
    if (!src) continue;
    const s = document.createElement("source");
    s.src = src;
    s.type = tip!;
    v.append(s);
  }
  v.preload = "auto";
  v.dataset.incarcat = "1";
  v.load();
};

const porneste = (v: HTMLVideoElement) => {
  if (opriteManual.has(v)) return;
  incarca(v);
  v.play().catch(() => {
    /* autoplay refuzat: rămâne posterul */
  });
};

if (!reducere && !economie) {
  const observator = new IntersectionObserver(
    (intrari) => {
      for (const intrare of intrari) {
        const v = intrare.target as HTMLVideoElement;
        if (intrare.isIntersecting) porneste(v);
        else v.pause();
      }
    },
    { threshold: 0.2 },
  );

  document.querySelectorAll<HTMLDivElement>(".video-bucla").forEach((cutie) => {
    const v = cutie.querySelector("video");
    if (!v) return;
    const buton = cutie.querySelector<HTMLButtonElement>("[data-video-buton]");

    v.addEventListener("playing", () => {
      v.classList.remove("opacity-0");
      if (buton) buton.hidden = false;
    });

    if (cutie.dataset.mod === "hover") {
      if (!areHover) return;
      const card = cutie.closest<HTMLElement>("[data-card]") ?? cutie;
      card.addEventListener("pointerenter", () => porneste(v));
      card.addEventListener("focusin", () => porneste(v));
      card.addEventListener("pointerleave", () => {
        v.pause();
        v.classList.add("opacity-0");
      });
      return;
    }

    buton?.addEventListener("click", () => {
      const oprit = buton.getAttribute("aria-pressed") === "true";
      if (oprit) {
        opriteManual.delete(v);
        porneste(v);
      } else {
        opriteManual.add(v);
        v.pause();
      }
      buton.setAttribute("aria-pressed", String(!oprit));
      buton.setAttribute("aria-label", oprit ? "Oprește video-ul" : "Pornește video-ul");
      buton.querySelector("[data-icon=pauza]")?.toggleAttribute("hidden", !oprit);
      buton.querySelector("[data-icon=play]")?.toggleAttribute("hidden", oprit);
    });
    observator.observe(v);
  });
}
