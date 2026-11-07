# Demo: Sound Management, Timișoara

Site de prezentare pentru o firmă de tehnică audio-video pentru evenimente (sonorizare, ecrane LED,
traducere simultană, lumini, scenă, foto-video), orientată spre evenimente corporate. Obiectivul clientului:
să fie găsit pe Google.

**Demo:** https://demo.mrwebsites.ro/sound-management/ (GitHub Pages, publicat la fiecare push pe `main`).

Stack: **Astro 7 + Tailwind 4**, static.

```
npm run dev      # http://localhost:4321/sound-management/
npm run build
```

## Versiunea 3: combinație Promond + AVL Systems (cerută de Mario)

Primele două rezultate din Google pentru nișă sunt promond.ro și avlsystems.ro. Mario a cerut elementele lor
identice, combinate. Am luat **structura și componentele**; textele, pozele și brandul sunt ale clientului
(textele și pozele lor sunt protejate și ar crea conținut duplicat pe Google).

| Secțiune | De la | Ce s-a păstrat |
|---|---|---|
| Header transparent peste video, devine negru la scroll | Promond | logo stânga, meniu la mijloc, contact dreapta; telefonul roșu de la AVL |
| Hero video pe tot ecranul, cu titlurile serviciilor scrise în video | Promond | showreel propriu (vezi mai jos) |
| Declarație serif uriașă în două tonuri + butoane + telefon mare roșu | AVL | „Sunet, imagine și lumină / pentru evenimente.” |
| „Bine ați venit! / Cine suntem și cu ce ne ocupăm?” cu cerc și arce | Promond | cercul are video (regia), fundal colorat (vin în loc de albastru) |
| 4 coloane peste poză (tipuri de evenimente) | Promond | conferințe, lansări, corporate, târguri |
| Grila de servicii: poză, titlu serif, text, puncte roșii, „Detalii →” | AVL | 6 servicii; poza devine video la hover |
| Secțiunea ecrane LED cu fundal video + rând de 5 avantaje | Promond | fără iconițe, cu linie roșie deasupra |
| Cifre mari + „echipamente proprii” cu mărcile din dotare | AVL | logo-urile mărcilor, monocrome |
| Portofoliu cu filtre ca pastile + grilă de evenimente | AVL | evenimentele reale de pe Facebook-ul clientului |
| Închirieri: 4 carduri cu poză și titlu tehnic | Promond | Audio, Display, Traducere, Lumini; fără iconițe |
| Panou „clienți și industrii” | AVL | cu numele reale din postările clientului |
| Carusel de poze cu săgeți | Promond | |
| FAQ: titlu stânga, acordeon dreapta | AVL | |
| CTA final cu telefon mare roșu | AVL | bifele înlocuite cu puncte roșii |
| Footer ca panou rotunjit, cu caseta „Sună acum” | AVL | |

Aspect ales de Mario (7 noiembrie 2026), după ce a comparat 4 palete și 4 logo-uri direct în pagină:
- **tema „deschis”**: alb și gri (#ffffff, #f3f4f6), text #16181d, roșu #c8102e; header-ul și secțiunile
  peste poză sau video rămân închise (`.zona-inchisa`, #111318);
- fonturi **Montserrat** (titluri) + **Open Sans** (text), Barlow Condensed pentru titlurile tehnice;
- **logo Script** (Kaushan Script), scriptul de pe site-ul vechi al clientului, redesenat curat;
- **fără iconițe decorative** (pătratele roșii cu pictograme arătau a AI); au rămas doar cele cu rol
  (meniu, săgețile caruselului, întrebările, butonul de apel pe telefon, Facebook, WhatsApp);
- texte mai mari pe telefon: minimum 13-14 px pe etichete, 15-16 px pe text; etichetele de deasupra
  titlurilor nu mai sunt cu majuscule rărite.

## Clipurile: montate de noi

Higgsfield avea 0,43 credite, iar Canva nu are generare video pe planul actual, așa că clipurile sunt
**montate cu ffmpeg din 8 clipuri reale de pe Pexels** (licență gratuită, descărcate cu acordul lui Mario):
- `hero` (19,7 s): 6 cadre (scenă, mixer, ecrane LED, lumini, căști de traducere, cameră), culori unificate,
  vignetă, tranziții fade, titlurile serviciilor scrise în video (ImageMagick, font DIN Condensed), buclă;
- `hero-telefon`: aceeași montare în 720×1560 (cât un telefon modern), decupată din originalele 4K, deci
  clară, cu titluri mari care nu se taie pe lateral; rețeta e în `tools/hero-telefon.sh`;
- 6 bucle de servicii (960×540) și 2 fundaluri (LED, regie), fără sacadare la reluare;
- toate în `public/video/` ca `.webm` + `.mp4` + poster `.jpg`.

TODO(real): filmări de la evenimentele clientului, montate la fel (rețeta e în istoricul proiectului).

## Pozele: ale clientului, de pe Facebook

24 de poze de pe pagina lui (descărcate cu acordul lui Mario): tăiat filigranul telefonului („Galaxy Note20
Ultra 5G”), șterse datele EXIF/GPS, convertite în WebP (2,9 MB în total), în `public/images/`.
Evenimentele din portofoliu sunt reale: lansări Mercedes-Benz / Porsche / Hyundai, congresul IBCTIM (15-17 oct.
2026), workshopul Smart Pedodontics (Hotel Rivo), Fendt Best of Farming Roadshow 2026, deschiderea Zero Gravity
Center, Conferința Națională de Boli Infecțioase, workshopul AstraZeneca (Arad), prezentarea Frontpro (Hotel
Timișoara), o gală. Pe pagină mai sunt și Codecamp, Toyota RAV4, District Masterclass, Timișoara Convention Center.

## Verificat pe Facebook (7 noiembrie 2026)

Pagina lui (fără login: albumele din nov. 2025 până în nov. 2026, coperțile, albumul vechi, site-ul vechi):
- **confirmate**: sonorizare (boxe FL Audio, mixere Yamaha, wireless, headset, microfoane de prezidiu),
  ecrane LED de interior, monitor de confidență, videoproiector, traducere simultană (cabine, console de
  interpret), moving heads pe truss, lumini ambientale, fum greu, podium, închirieri; conferințe și congrese,
  lansări auto, evenimente corporate (AstraZeneca, BRD, Amway, L'Oréal);
- **scoase de pe site, fără dovadă**: live streaming, filmare multi-cameră, montaj, „vestul țării” (lucrează
  doar în Timișoara, Arad și Ghiroda), „fără tehnician”, line array, confetti/haze; foto-video rămâne doar
  ca „Foto și video” (e în descrierea paginii), iar titlul din hero e acum „Foto și video”;
- **face, dar nu punem pe site** (direcția e corporate): DJ, nunți, botezuri, petreceri, concerte, spumă party;
- contact public: sound_managements@yahoo.com, „Always open” (non-stop), 90% recomandă din 15 recenzii;
  tagline-ul logo-ului vechi: „Sound Management Events & More”.

## Ce e placeholder: `TODO(real)`

- **Mărcile din dotare**: Yamaha e confirmată din poze (mixer MG16XU). Boxele sunt FL Audio (din poze, fără logo oficial
  găsit). Restul (Shure, Bosch, Sennheiser, Chauvet, Epson) sunt exemple tipice din nișă, **neconfirmate**. Logo-urile sunt în `public/logos/`
  (Wikimedia Commons și site-urile oficiale).
- **Cifrele** (15+ ani, 400+ evenimente, 6 orașe, 100% echipamente proprii) sunt de confirmat.
- **Pozele și numele evenimentelor**: de confirmat cu clientul că le putem arăta pe site (în unele apar oameni).
- **Logo**: varianta Script e făcută din font, trebuie exportată ca fișier pentru client; **e-mail** pe domeniu încă inexistent.

## La proiectul real

Research SEO RO („sonorizare evenimente Timișoara”, „închiriere ecran LED Timișoara”, „traducere simultană
Timișoara”), pagini separate pe serviciu și oraș, `LocalBusiness` schema, formular și pe e-mail (Resend),
pachet legal + credit RTR, deploy static pe Hostinger.
