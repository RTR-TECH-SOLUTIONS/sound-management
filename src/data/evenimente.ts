import { poze, type Poza } from "./media";

// Evenimente reale, din pozele de pe pagina de Facebook a clientului (2026).
// TODO(real): de confirmat cu clientul că le putem numi pe site și ce a asigurat exact la fiecare.

export type Categorie = "conferinte" | "corporate" | "lansari" | "gale";

export const categorii: { id: Categorie | "toate"; label: string }[] = [
  { id: "toate", label: "Toate" },
  { id: "conferinte", label: "Conferințe" },
  { id: "corporate", label: "Corporate" },
  { id: "lansari", label: "Lansări" },
  { id: "gale", label: "Gale" },
];

// Ordinea contează pentru grilă (3 coloane, 3 carduri înalte): se umple complet, fără goluri.
export const evenimente: { titlu: string; categorie: Categorie; eticheta: string; loc: string; poza: Poza; forma?: "inalt" }[] = [
  { titlu: "Lansări Mercedes-Benz, Porsche, Hyundai", categorie: "lansari", eticheta: "Lansare auto", loc: "Timișoara", poza: poze.amg, forma: "inalt" },
  { titlu: "Congresul IBCTIM, ediția a III-a", categorie: "conferinte", eticheta: "Congres medical", loc: "Timișoara, 15-17 octombrie 2026", poza: poze.ibctim },
  { titlu: "Workshop Smart Pedodontics", categorie: "conferinte", eticheta: "Workshop medical", loc: "Hotel Rivo, Timișoara", poza: poze.pedodontics },
  { titlu: "Fendt Best of Farming Roadshow 2026", categorie: "lansari", eticheta: "Roadshow", loc: "Timișoara", poza: poze.fendt },
  { titlu: "Deschiderea Zero Gravity Center", categorie: "corporate", eticheta: "Inaugurare", loc: "Ghiroda, Timiș", poza: poze.zeroGravity, forma: "inalt" },
  { titlu: "Conferința Națională de Boli Infecțioase", categorie: "conferinte", eticheta: "Congres medical", loc: "Timișoara", poza: poze.cnbi },
  { titlu: "Workshop AstraZeneca", categorie: "corporate", eticheta: "Workshop pharma", loc: "Arad", poza: poze.astrazeneca, forma: "inalt" },
  { titlu: "Prezentare Frontpro", categorie: "lansari", eticheta: "Prezentare de produs", loc: "Hotel Timișoara", poza: poze.frontpro },
  { titlu: "Gală de seară", categorie: "gale", eticheta: "Gală", loc: "Timișoara", poza: poze.gala },
];

// panoul „clienți și industrii” (elementul AVL), cu numele reale din pozele clientului
export const industrii = [
  { nume: "Medical și pharma", detaliu: "AstraZeneca, IBCTIM, Conferința Națională de Boli Infecțioase, Smart Pedodontics" },
  { nume: "Automotive", detaliu: "lansări Mercedes-Benz, Porsche, Hyundai, Toyota RAV4" },
  { nume: "Utilaje agricole", detaliu: "Fendt Best of Farming Roadshow 2026" },
  { nume: "IT și tehnologie", detaliu: "Codecamp Timișoara" },
  { nume: "Hoteluri și centre de conferințe", detaliu: "Timișoara Convention Center, Hotel Timișoara, Hotel Rivo" },
  { nume: "Business și imobiliare", detaliu: "Zero Gravity Center, District Masterclass" },
  { nume: "Prezentări de produs", detaliu: "Frontpro și alte lansări pentru distribuitori" },
];
