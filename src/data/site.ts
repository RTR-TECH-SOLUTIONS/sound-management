// BASE_URL este "/" pe un domeniu propriu și "/nume-repo/" pe GitHub Pages.
// u() lipește prefixul pe linkurile și fișierele interne, ca să meargă în ambele cazuri.
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
export const u = (cale: string) => `${base}${cale}`;

// Telefonul și adresa sunt cele de pe pagina de Facebook a clientului
// (adresa verificată pe OpenStreetMap: Bd. General Ion Dragalina 22, cartierul Iosefin).
// E-mailul și programul („Always open” = non-stop) sunt cele publice de pe Facebook. TODO(real): e-mail pe domeniul soundmanagement.ro.
export const site = {
  nume: "Sound Management",
  oras: "Timișoara",
  adresa: "Bd. General Ion Dragalina nr. 22, Timișoara",
  telefon: "+40 726 268 333",
  telefonAfisat: "0726 268 333",
  telefonPuncte: "0726.268.333",
  whatsapp: "40726268333",
  email: "sound_managements@yahoo.com",
  facebook: "https://www.facebook.com/SoundManagementTimisoara",
  program: "Disponibili non-stop",
  harta: { lat: 45.7465535, lon: 21.2105626 },
};

export const telLink = `tel:${site.telefon.replace(/\s/g, "")}`;

export const waLink = (mesaj: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mesaj)}`;

export const nav = [
  { href: u("/"), label: "Acasă" },
  { href: u("/#despre"), label: "Despre noi" },
  { href: u("/#servicii"), label: "Servicii" },
  { href: u("/#ecrane-led"), label: "Ecrane LED" },
  { href: u("/#portofoliu"), label: "Portofoliu" },
  { href: u("/#inchirieri"), label: "Închirieri" },
  { href: u("/#contact"), label: "Contact" },
];
