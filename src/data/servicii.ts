import { clipuri, poze, type Clip } from "./media";

// TODO(real): listele de echipamente sunt generice; la proiectul real intră modelele exacte
// din depozitul clientului (cum face AVL: „microfoane wireless Shure, mixere DiGiCo”).

export type Serviciu = {
  id: string;
  titlu: string;
  text: string;
  puncte: string[];
  clip: Clip;
};

// grila de servicii (elementul AVL)
export const servicii: Serviciu[] = [
  {
    id: "sonorizare",
    titlu: "Sonorizare profesională",
    text: "Sisteme de sunet pentru săli de la 20 la peste 600 de persoane, cu mixer digital și tehnician care operează pe toată durata evenimentului.",
    puncte: ["Boxe active și subwoofere FL Audio", "Microfoane wireless, lavalieră și headset", "Microfoane de pupitru pentru prezidiu"],
    clip: clipuri.sonorizare,
  },
  {
    id: "led",
    titlu: "Ecrane LED și videoproiecție",
    text: "Ecrane LED modulare pentru scenă, monitoare de confidență pentru vorbitori, videoproiectoare și ecrane de proiecție pentru sălile mai mici.",
    puncte: ["Ecrane LED modulare indoor și outdoor", "Monitoare de confidență", "Videoproiectoare și ecrane de proiecție"],
    clip: clipuri.led,
  },
  {
    id: "traducere",
    titlu: "Traducere simultană",
    text: "Cabine pentru interpreți, receptoare cu căști pentru fiecare participant și microfoane de delegat, pentru congrese și conferințe internaționale.",
    puncte: ["Cabine izolate fonic pentru interpreți", "Receptoare cu căști, pe canale de limbă", "Microfoane de delegat"],
    clip: clipuri.traducere,
  },
  {
    id: "lumini",
    titlu: "Lumini și efecte speciale",
    text: "Lumini de scenă pentru vorbitori, lumini ambientale în culorile firmei și efecte pentru momentele importante ale lansărilor și galelor.",
    puncte: ["Moving heads și lumini LED de ambient", "Lumină frontală pentru scenă", "Fum greu pentru momentele de scenă"],
    clip: clipuri.lumini,
  },
  {
    id: "scena",
    titlu: "Scenotehnică și structuri",
    text: "Podium modular, structuri truss pentru ecrane și lumini, pupitru pentru vorbitor. Montajul și demontajul le face echipa noastră.",
    puncte: ["Podium modular cu treaptă", "Structuri truss pentru ecrane și lumini", "Cablare ascunsă și asigurată"],
    clip: clipuri.scena,
  },
  {
    id: "filmare",
    titlu: "Foto și video",
    text: "Fotografii și filmare la conferințe, lansări și evenimente corporate, ca să aveți materiale pentru presă, site și rețelele sociale.",
    puncte: ["Fotograf la eveniment", "Filmarea conferinței sau a lansării", "Fotografiile și filmarea, predate după eveniment"],
    clip: clipuri.filmare,
  },
];

// cele 4 coloane peste poză (elementul Promond)
export const tipuri = [
  { titlu: "Conferințe și congrese", text: "Asigurăm toată tehnica pentru conferințe și congrese medicale: sunet pentru prezidiu, ecran mare și traducere simultană." },
  { titlu: "Lansări de produs", text: "Momentul dezvelirii, pe muzică și lumină, sincronizat cu prezentatorul. Lansări auto și de produs în showroom sau în aer liber." },
  { titlu: "Evenimente corporate", text: "Gale, petreceri de firmă, team building și ceremonii de premiere, cu scenă, lumini în culorile firmei și sunet pentru toată sala." },
  { titlu: "Târguri și expoziții", text: "Ecrane și sunet pe standul dumneavoastră, montate și testate înainte să se deschidă târgul, ca standul să iasă în evidență." },
];

// rândul de avantaje din secțiunea LED (elementul Promond)
export const avantajeLed = ["Imagine clară și cu lumina aprinsă", "Configurație modulară", "Culori naturale", "Unghi larg de vizualizare", "Orice dimensiune și formă"];

// cardurile de închiriere (elementul Promond)
export const inchirieri = [
  { titlu: "Audio", text: "Boxe, mixere digitale, microfoane wireless și de conferință, pentru orice sală.", poza: poze.tcc },
  { titlu: "Display", text: "Ecrane LED modulare, televizoare pe stand, videoproiectoare și ecrane de proiecție.", poza: poze.ibctimSala },
  { titlu: "Traducere", text: "Sisteme complete de traducere simultană: cabine, pupitre de interpret, receptoare și căști.", poza: poze.cabina },
  { titlu: "Lumini", text: "Lumini de scenă și ambientale, moving heads, efecte speciale și console de lumini.", poza: poze.exterior },
];

// cifrele (elementul AVL). TODO(real): de confirmat cu clientul.
export const cifre = [
  { val: "15+", text: "ani de experiență" },
  { val: "400+", text: "evenimente realizate" },
  { val: "45+", text: "evenimente în ultimele 12 luni" },
  { val: "100%", text: "echipamente proprii" },
];

// mărcile din dotare (elementul AVL), afișate cu logo-ul lor, monocrom.
// Yamaha e confirmată din poze (mixer Yamaha MG16XU la workshopul AstraZeneca din Arad). Boxele sunt FL Audio,
// dar nu am găsit un logo oficial descărcabil: TODO(real) de cerut de la client.
// TODO(real): restul sunt exemple tipice din nișă, de confirmat cu clientul și înlocuite cu ce are efectiv.
// Sursele logo-urilor: Wikimedia Commons (Shure, Yamaha, Bosch, Sennheiser, Epson) și site-ul oficial (Chauvet).
export const marci = [
  { nume: "Shure", rol: "Microfoane wireless", logo: "/logos/shure.svg", w: 957, h: 228 },
  { nume: "Yamaha", rol: "Mixere audio", logo: "/logos/yamaha.svg", w: 663, h: 150 },
  { nume: "Bosch", rol: "Sisteme de conferință", logo: "/logos/bosch.svg", w: 433, h: 97 },
  { nume: "Sennheiser", rol: "Traducere simultană", logo: "/logos/sennheiser.svg", w: 312, h: 42 },
  { nume: "Chauvet", rol: "Lumini de scenă", logo: "/logos/chauvet.svg", w: 600, h: 393 },
  { nume: "Epson", rol: "Videoproiectoare", logo: "/logos/epson.svg", w: 300, h: 74 },
];
