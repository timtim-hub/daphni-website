# Visual Fix & Polish Plan

> Ziel: Die Seite von „optisch kaputt" zu **absolut perfekt**. Programmatisch + visuell debuggen, jede Sektion auf Desktop/Tablet/Mobile verifizieren.

## Diagnose (per Playwright, real browser)
1. **Hero kaputt:**
   - WebGL-Canvas verliert Kontext (`THREE.WebGLRenderer: Context Lost`) → **weißer Block** über dem Hero.
   - Riesen-Typo „DAPHNI" liegt mittig **über dem Gesicht** des Portraits (Vollbild-Canvas + zentrierter Text).
2. **Reveal-Animationen:** Inhalte bleiben `opacity:0` bis gescrollt → Sektionen wirken leer / fragil.
3. **Zu viel Whitespace:** `--space-section` bis 16rem oben+unten → große Leerräume.
4. **„Jung."** als erstes Tagline-Wort raus (unerwünscht).

## Fixes
### A. Hero — komplette Neukomposition (editorial split)
- **Layout:** Desktop = 2 Spalten. Links: Eyebrow + großes „DAPHNI / Georoglidis" + Tagline + CTA (vertikal zentriert). Rechts: Portrait in eigenem hohen Frame (bleed). → **kein Text über dem Gesicht.**
- **Mobile:** Portrait-Frame oben, Text darunter (sauberer Stack).
- **3D bulletproof:** Portrait-`<Image>` (duotone, grain) ist immer die Basis + Fallback. WebGL-Shader legt sich darüber, sobald Kontext bereit. Bei `webglcontextlost` / kein WebGL / reduced-motion → nahtlos das gestylte Bild. **Nie wieder weiß.**
- Canvas auf die Portrait-Spalte begrenzt (kleiner → weniger Speicher → stabiler).
- Tagline: „Düster. Gnadenlos. Komisch." (ohne „Jung.").

### B. Reveal robust machen
- Trigger früher (`margin` großzügiger), `once:true` behalten.
- Sicherstellen, dass Inhalte nie dauerhaft unsichtbar bleiben.

### C. Spacing & Rhythmus
- `--space-section` etwas reduzieren, konsistente vertikale Rhythmik, Voids schließen.

### D. Sektionen einzeln verifizieren & polieren
- About, Work (Bento), Acting (Tabelle), Live (Instagram), Contact, Footer.
- Desktop 1440 · Tablet 768 · Mobile 390. Overflow, Alignment, Kontrast, Hover.

## Verifikation
- Pro Sektion: scrollen → settlen → Screenshot → prüfen.
- Konsole fehlerfrei. Build grün. Live nach Push erneut prüfen.
