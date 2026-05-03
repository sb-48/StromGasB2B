# B2B Energiedienstleister – Landingpage

Statische, conversion-orientierte Landingpage nach Konzept (Hero bis Footer inkl. Quick-Check, Tabs, FAQ, Lead-Formular).

## Lokale Ansicht

Öffnen Sie `index.html` im Browser oder nutzen Sie einen lokalen Server, z. B.:

```bash
npx --yes serve .
```

## Anpassungen

- **Branding:** Logo/Name „EnergieExpert B2B“ und Kontaktdaten in [`index.html`](index.html)
- **Forms:** Aktuell Demo (`alert`) – Endpunkt/CRM in [`js/main.js`](js/main.js) bei `#lead-form` und Quick-Check anbinden
- **Kalender:** `[data-calendly]` durch echten Link oder Widget ersetzen
- **Downloads:** PDFs für Checkliste / Fallstudie verlinken statt Demo-Alerts

## Dateien

- `index.html` – Struktur, SEO-Meta, alle Sektionen
- `css/styles.css` – Farbwelt und Layout (#1A365D / #38A169 / #DD6B20)
- `js/main.js` – Navigation, Tabs, Accordion, Wizard
