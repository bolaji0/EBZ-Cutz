# EBZ Cutz website concept

A production-ready, dependency-free single-page barbershop website. Open `index.html` directly or upload all four files (plus your `assets` folder) to any static host.

## Personalise it

1. Open `script.js` and edit `BUSINESS_CONFIG` first.
2. Confirm the WhatsApp number, then set `whatsappVerified: true`.
3. Keep `demoMode: true` while showing the private concept. Set it to `false` only when the business details are verified and the site is ready to launch.
4. Replace the `SERVICES`, `BARBERS`, `GALLERY` and `REVIEWS` arrays with confirmed information.
5. Update the page title, description, canonical URL and social metadata in `index.html`.
6. Add the real images listed below inside an `assets` folder. Until then, the site displays intentional text-based fallbacks.

## Recommended images

- `assets/hero-barber.webp` — 1440 × 1800 px
- `assets/lead-barber.webp` — 1200 × 1500 px
- `assets/cut-01.webp` through `assets/cut-06.webp` — at least 900 × 1200 px

Export photographs as WebP or AVIF at approximately 70–82% quality. Keep the hero below 250 KB and gallery images below 180 KB where possible. Preserve the existing width and height attributes to avoid layout shift.

## Important launch checks

- Do not publish demo prices, names, ratings or testimonials as fact.
- Test the WhatsApp message using the verified business number.
- Replace `https://example.com/` metadata values with the final domain.
- Add only genuine reviews and accurate business structured data once verified.
- Test navigation, gallery, keyboard controls and booking on a real phone.

No framework, package installation, backend or build command is required.

## Temporary photography sources

The concept currently uses temporary, reuse-friendly photography from Pexels and Unsplash. Replace these files with the shop's original photography when available, keeping the same filenames to avoid code changes.

- Hero: Pexels photo 35157692
- Lead barber: Unsplash photo by Ace Maxwell (`alPVAV3zMMI`)
- Gallery: Pexels photos 12074386, 7697667, 7447126, 7447151, 19140178 and 35157694

Licences: https://www.pexels.com/license/ and https://unsplash.com/license/
