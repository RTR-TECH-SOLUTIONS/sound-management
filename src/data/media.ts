import { u } from "./site";

// Clipurile din public/video/ sunt montate de noi (ffmpeg) din footage real de pe Pexels
// (licență gratuită): tăieturi, culori unificate, titluri scrise în video, bucle fără sacadare.
// Pozele din public/images/ sunt ale clientului, de pe pagina lui de Facebook.
// TODO(real): filmări de la evenimentele lui, montate la fel ca showreel-ul.

export type Clip = {
  webm: string;
  mp4: string;
  poster: string;
  /** descrierea cadrului, pentru cine nu vede video-ul */
  alt: string;
  /** variantă verticală pentru ecranele înalte (telefon ținut drept) */
  vertical?: { webm: string; mp4: string; poster: string };
};

const clip = (nume: string, alt: string, poster = `${nume}.jpg`): Clip => ({
  webm: u(`/video/${nume}.webm`),
  mp4: u(`/video/${nume}.mp4`),
  poster: u(`/video/${poster}`),
  alt,
});

export type Poza = { src: string; alt: string; w: number; h: number };

// pozele clientului, de pe pagina lui de Facebook (descărcate cu acordul lui Mario, 6 nov. 2026):
// tăiat filigranul telefonului, șterse datele EXIF/GPS, convertite în WebP.
const poza = (nume: string, w: number, h: number, alt: string): Poza => ({ src: u(`/images/${nume}.webp`), w, h, alt });

export const clipuri = {
  hero: {
    ...clip(
      "hero",
      "Montaj cu serviciile Sound Management: scenă cu ecrane, mixer, ecrane LED, lumini de scenă, căști de traducere, cameră video",
      "hero-poster.jpg",
    ),
    vertical: {
      webm: u("/video/hero-telefon.webm"),
      mp4: u("/video/hero-telefon.mp4"),
      poster: u("/video/hero-telefon-poster.jpg"),
    },
  },
  sonorizare: clip("sonorizare", "Faderele unui mixer audio digital, cu leduri aprinse"),
  led: clip("ecrane-led", "Perete de ecrane LED aprins într-o sală întunecată"),
  traducere: clip("traducere", "Căști pentru traducere simultană pregătite pentru participanți"),
  lumini: clip("lumini", "Moving heads care trimit fascicule de lumină prin fum"),
  scena: clip("scena", "Scenă cu structură truss și lumini, pregătită pentru eveniment"),
  filmare: clip("filmare", "Cameră video profesională filmând un eveniment"),
  ledFundal: clip("led-fundal", "Ecran LED mare aprins pe o scenă de eveniment"),
};

// TODO(real): de confirmat cu clientul că putem arăta pozele și numele evenimentelor pe site.
export const poze = {
  codecamp: poza("codecamp-timisoara", 1920, 798, "Sală mare plină la conferința Codecamp Timișoara, cu ecran pe scenă și candelabre"),
  codecampPublic: poza("codecamp-public", 1600, 665, "Publicul la conferința Codecamp Timișoara"),
  ibctim: poza("congres-ibctim", 1600, 665, "Ecranul LED și pupitrul digital la congresul IBCTIM, Innovation in Breast Cancer Treatments, Timișoara"),
  ibctimSala: poza("congres-ibctim-sala", 1600, 665, "Sala congresului IBCTIM pregătită, cu ecran LED mare pe scenă"),
  cnbi: poza("congres-cnbi", 1600, 665, "Scena Conferinței Naționale de Boli Infecțioase, cu ecrane de proiecție și prezidiu"),
  simpozion: poza("simpozion-boli-infectioase", 1600, 665, "Ecran LED cu grafica simpozionului de boli infecțioase și pupitru digital"),
  pedodontics: poza("workshop-smart-pedodontics", 1600, 665, "Ecran LED la workshopul Smart Pedodontics de la Hotel Rivo"),
  pedodonticsMese: poza("workshop-pedodontics-mese", 1600, 665, "Mesele de lucru și ecranul la workshopul Smart Pedodontics"),
  astrazeneca: poza("workshop-astrazeneca-arad", 1000, 1331, "Sala de la workshopul AstraZeneca din Arad, cu lumini ambientale roșii"),
  mixer: poza("mixer-astrazeneca", 1000, 1313, "Mixerul și laptopul de regie Sound Management la workshopul AstraZeneca din Arad"),
  zeroGravity: poza("zero-gravity-panel", 1000, 1082, "Panelul de discuții la deschiderea Zero Gravity Center"),
  aerodium: poza("zero-gravity-aerodium", 1080, 953, "Decorul și luminile de la deschiderea Zero Gravity Center"),
  amg: poza("lansare-mercedes-amg", 1000, 1396, "Mercedes-AMG GT în lumină albastră, la o lansare auto în Timișoara"),
  mercedes: poza("lansare-mercedes", 1000, 1163, "Lansare Mercedes-Benz, cu lumini de scenă roșii"),
  porsche: poza("lansare-porsche", 1080, 539, "Porsche în showroom luminat în albastru, la o lansare"),
  hyundai: poza("lansare-hyundai", 1080, 535, "Hyundai Ioniq 6 la lansare, în showroom"),
  fendt: poza("roadshow-fendt", 1600, 665, "Scena mobilă cu ecran LED la Fendt Best of Farming Roadshow 2026"),
  frontpro: poza("prezentare-frontpro", 1600, 665, "Prezentarea Frontpro la Hotel Timișoara, cu ecran LED și mese rotunde"),
  frontproSala: poza("prezentare-frontpro-sala", 1600, 665, "Sala prezentării Frontpro, cu publicul la mese"),
  gala: poza("gala", 1080, 537, "Gală de seară cu scenă și ecrane LED în lumină violet"),
  district: poza("district-masterclass", 1600, 665, "Ecran LED roșu la District Masterclass"),
  tcc: poza("timisoara-convention-center", 1080, 533, "Scena de la Timișoara Convention Center, cu boxe și ecran"),
  cabina: poza("workshop-cabina-traducere", 1062, 533, "Workshop cu participanții în cerc și cabina de traducere în spate"),
  exterior: poza("eveniment-exterior-lumini", 1600, 665, "Eveniment în aer liber, cu lumini și instalație luminoasă"),
};
