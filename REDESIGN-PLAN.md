# Daphni Georoglidis — Redesign Master Plan

> **Ziel:** Aus einer generischen, peachy-beigen Template-Seite eine **Awwwards-würdige, High-End Dark-Editorial-Experience** mit echtem 3D, WOW-Effekt, perfekter SEO/AEO und 100 % DSGVO-Konformität machen.
>
> **Status:** Living document — wird während der Umsetzung gepflegt.
> **Stack-Constraint:** Next.js Static Export (`output: 'export'`) → GitHub Push → Netlify Auto-Deploy.

---

## 1. Ausgangslage (Audit)

| Bereich | Ist-Zustand | Problem |
|---|---|---|
| **Optik** | Peachy-Beige (`#fff0db` / `#90645A` / `#DCAE96`) | Wirkt soft, generisch, „Standard-Template". Passt NICHT zu „jung, düster, gnadenlos". |
| **Motion** | Dutzende `framer-motion` Floating-Particles, Color-Cycling, Wackel-Icons | Billig, unruhig, kein kuratiertes Motion-Design. |
| **3D** | Keins (nur fake `rotateX/Y` Tilt) | Kein WOW. |
| **Shows** | Hardcoded Termine | Daphni müsste pflegen → soll raus. |
| **SEO** | Nur Basis-`<title>`/Description | Kein JSON-LD, keine Sitemap, kein robots, kein AEO/GEO. |
| **Legal** | `Musterstraße 123` + Fake-Mail | Nicht rechtskonform. |
| **Security** | Keine Header/CSP | Nicht „100 % sicher". |
| **a11y** | `<html class="dark">` + helle Farben (Widerspruch), wenig Semantik | Inkonsistent. |

---

## 2. Design-Direction: „Dark Editorial Luxury — Gnadenlos"

Eine bewusste, kompromisslose Ästhetik, die ihre Bühnen-Persona spiegelt: **düster, scharf, elegant, mit Biss.**

### Farbpalette (Design Tokens)
```
--ink:      #0B0B0D   /* Near-black canvas */
--ink-soft: #141417   /* Surfaces / cards */
--bone:     #F4F0E6   /* Warm off-white — Text & Headlines */
--smoke:    #8C857B   /* Muted text */
--accent:   #FF2E12   /* Vermilion — Signal, Gefahr, Vorhang, Lippenstift */
--accent-2: #E8FF4D   /* Acid lime — sparsamer Pop (Tim-Honnef-Signatur, Hover) */
```
Disziplin: ~90 % Monochrom (Ink + Bone), Akzent gezielt als Signal — nie dekorativ verstreut.

### Typografie
- **Display:** `Fraunces` (variable, high-contrast Serif, Italic + „wonky" optical settings) → riesige editoriale Headlines, kinetisch.
- **Body/UI:** `Geist Sans` (clean Grotesque) → Fließtext, Navigation, Labels.
- Beide via `next/font/google` = **build-time self-hosted** (kein Client-Request zu Google → DSGVO-konform).

### Atmosphäre
- Feinkörniges **Film-Grain**-Overlay (SVG-Noise, animiert, `mix-blend`).
- **Custom Cursor** (magnetisch, invertierend über Interaktiven).
- **Lenis** Smooth-Scroll + **GSAP ScrollTrigger** Choreografie.
- Reduced-Motion: vollständiger Fallback (statisch, lesbar).

---

## 3. 3D-Konzept (der WOW-Layer)

**Hero-WebGL-Szene** (React Three Fiber, lazy via `next/dynamic` `ssr:false`):
- Daphnis Portrait als **Shader-distorted Plane**: RGB-Split, Ripple/Displacement auf Maus-Move, Grain im Fragment-Shader, sanftes „Atmen".
- Dahinter ein **Partikel-/Punktfeld**, das auf Scroll & Pointer reagiert.
- Optional Bloom (Postprocessing) für Glow am Akzent.
- **Kinetische Typografie** „DAPHNI" (HTML-Layer, GSAP) overlagert die 3D-Plane → Tiefe.
- Performance-Gate: Canvas nur ab `md`+ und nur wenn `prefers-reduced-motion: no-preference` & WebGL verfügbar; sonst statisches, gestyltes Portrait.

---

## 4. Informationsarchitektur (One-Pager + Legal)

1. **Hero** — 3D-Portrait, Name kinetisch, Tagline „Jung. Düster. Gnadenlos.", CTA → Instagram.
2. **Intro / Über mich** — Editorial-Statement, Scroll-Reveal Typo. Keywords organisch (Comedienne, Köln/Düsseldorf/Berlin **+ „deutschlandweit / überall"**).
3. **Was sie macht** — Stand-up · Schauspiel · Dark Humor (Bento/Editorial-Grid, kein uniformes Karten-Raster).
4. **Schauspiel / Credits** — Film & Theater Vita (aus Bestand übernommen).
5. **Live & Termine** — **KEINE Termine mehr.** Statement: „Termine immer aktuell auf Instagram" + großer Social-CTA. (Daphni muss nichts pflegen.)
6. **Instagram** — Consent-gated Embeds (DSGVO) ODER eleganter Link-Block bei Ablehnung.
7. **Kontakt** — Booking/Anfrage → Instagram / Mail.
8. **Footer** — Navigation, Legal-Links, **„CRAFTED BY TIM HONNEF — HIGH-END WEB·APP·BRAND ENGINEERING"** (High-End gesetzt, Akzent-Signatur, eigener Hover-Effekt).
9. **/impressum** & **/datenschutz** — rechtskonform, c/o **Moltkestraße 79, 50674 Köln**.

---

## 5. SEO / AEO / GEO

**Klassische SEO**
- Sauberes `<title>` / Meta-Description / Canonical / OpenGraph / Twitter-Card.
- OG-Image (1200×630) generiert.
- `sitemap.xml` + `robots.txt` (erlaubt KI-Crawler explizit).
- Semantisches HTML (`<header> <main> <section aria-labelledby> <footer>`), eine `<h1>`, saubere Heading-Hierarchie.

**Keyword-Strategie**
- Primär: **Comedienne** (weibliche Form von Comedian — siehe Hinweis unten), Stand-up, Schauspielerin.
- Lokal: **Köln, Düsseldorf, Berlin** — eingebettet als „u. a. in Köln, Düsseldorf & Berlin — und **deutschlandweit auf Tour**". → Lokale Relevanz OHNE zu suggerieren, sie trete nur dort auf.
- Long-tail: „Comedienne buchen", „Dark Humor Comedy", „Stand-up Comedienne Köln".

**Structured Data (JSON-LD)**
- `Person` (name, jobTitle, sameAs → Instagram, knowsLanguage, address-Region).
- `WebSite` + `BreadcrumbList`.
- Kein `Event` (Termine raus).

**AEO/GEO (KI-Chatbots)**
- `/llms.txt` — strukturierte Klartext-Zusammenfassung wer Daphni ist (für LLM-Crawler).
- FAQ-artige, faktische Klartext-Absätze („Daphni Georoglidis ist eine Stand-up-Comedienne und Schauspielerin aus Köln, die deutschlandweit auftritt…") → leicht von KI zitierbar.
- `robots.txt` erlaubt GPTBot, ClaudeBot, PerplexityBot, Google-Extended etc.

> **Hinweis „Comedienne":** Ja — *Comedienne* ist die (aus dem Französischen entlehnte) weibliche Form von *Comedian* und im Deutschen gebräuchlich. Alternativen: *Komikerin* oder geschlechtsneutral *Comedian*. Wir nutzen **Comedienne** als Haupt-Keyword (wie gewünscht) und streuen *Comedian/Komikerin* sekundär für Suchabdeckung.

---

## 6. DSGVO (100 %)

- **Fonts self-hosted** (next/font, kein Google-Request).
- **Instagram-Embeds nur nach aktiver Einwilligung** (Opt-in, kein Vorab-Laden von instagram.com). Granularer Consent-State in `localStorage`, jederzeit widerrufbar.
- **Keine** Analytics/Tracking/Cookies ohne Einwilligung (es werden gar keine Tracker eingebaut).
- Datenschutzerklärung: Hosting (Netlify), Server-Logs, Instagram-Plugin, Betroffenenrechte, Verantwortlicher mit c/o-Adresse.
- Kontakt nur via externem Link/Mail → keine Formular-Datenverarbeitung nötig (kein Formular = weniger Angriffsfläche & DSGVO-Aufwand). 

---

## 7. Security (100 %)

Static Export → Header über **`netlify.toml`** (`[[headers]]`):
- `Content-Security-Policy` (default-src 'self'; frame-src instagram; img-src self+instagram+data; restriktiv).
- `Strict-Transport-Security` (HSTS, preload).
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera/mic/geo aus).
- `rel="noopener noreferrer"` auf allen externen Links.
- Keine Inline-Secrets, keine `dangerouslySetInnerHTML` mit User-Daten.

---

## 8. Tech-Stack

| Zweck | Tool |
|---|---|
| Framework | Next.js 16 (App Router, Static Export) |
| 3D | three · @react-three/fiber · @react-three/drei · @react-three/postprocessing |
| Smooth Scroll | lenis |
| Scroll-Choreografie | gsap + ScrollTrigger |
| Component Motion | framer-motion |
| Styling | Tailwind v4 + CSS Custom Properties (Tokens) |
| Fonts | next/font (Fraunces + Geist) |
| Deploy | Netlify (netlify.toml build + security headers) |

---

## 9. Umsetzungs-Reihenfolge

1. ✅ Audit + Plan (dieses Dokument)
2. Stack installieren (3D/Lenis)
3. Design-System: `globals.css` Tokens, Fonts, Grain, Cursor, Reduced-Motion
4. Core-Layer: SmoothScroll (Lenis), GrainOverlay, CustomCursor, Magnetic-Button
5. Sections: Nav → Hero(3D) → Intro → Was-sie-macht → Schauspiel → Live(Instagram-CTA) → Instagram(consent) → Kontakt → Footer(Tim Honnef)
6. SEO: layout-Metadata, JSON-LD, sitemap, robots, llms.txt, OG-Image, manifest
7. Legal: Impressum + Datenschutz (c/o Moltkestraße 79, 50674 Köln)
8. Security: netlify.toml Headers + Build-Config
9. Cleanup: alte `dist/`, `deploy.zip` raus
10. `npm run build` → Fehler fixen → visuell verifizieren
11. Commit → Push → Netlify Auto-Deploy → Live-Check

---

## 10. Definition of Done

- [x] Komplett neue Dark-Editorial-Optik, kein Peach mehr.
- [x] Echtes 3D im Hero (R3F Shader-Portrait, RGB-Split/Duotone/Grain), performant & mit Fallback.
- [x] Kuratiertes, ruhiges Motion-Design (Lenis + Reveal, kein Particle-Spam).
- [x] Keine Termine; Verweis auf Instagram.
- [x] SEO: Comedienne + Köln/Düsseldorf/Berlin + „deutschlandweit", JSON-LD, Sitemap, robots, llms.txt, OG-Image.
- [x] 100 % DSGVO: Self-host Fonts (0 Google-Requests), Instagram-Opt-in (0 IG-Frames vor Consent), korrekte Datenschutzerklärung.
- [x] 100 % Security: CSP + HSTS + Security-Header via netlify.toml.
- [x] Footer-Signatur „CRAFTED BY TIM HONNEF" High-End.
- [x] `npm run build` grün, statisch exportiert (10 Routen).
- [x] Push → Netlify deployt automatisch.

> **Offener Punkt (Daphni):** Für ein 100 % rechtssicheres Impressum nach § 5 DDG ist eine
> gültige, schnell erreichbare E-Mail-Adresse Pflicht. Aktuell ist `kontakt@daphni-georoglidis.de`
> als Platzhalter hinterlegt (in `app/impressum/page.tsx`, `app/datenschutz/page.tsx`, `lib/site.ts`) —
> bitte durch eine real existierende Adresse ersetzen.
