# Alexander Avila — portfolio

Static portfolio hosted on GitHub Pages at https://alex.net.pe.
No build step is required.

## Languages

The homepage, IPA case study, thank-you page and interactive content are
available in Spanish and English. The ES / EN control is visible outside the
mobile menu, including the case-study dialog.

Language priority:

1. A valid `?lang=es` or `?lang=en` URL parameter.
2. The visitor’s manual choice saved as `aa-portfolio-language` in localStorage.
3. The first Spanish or English locale in the browser’s preferred languages.
4. English when none of the browser’s languages are supported.

Manual changes preserve the current scroll position, open panels, game progress
and form inputs. Internal links, the embedded case and the contact-form return
page carry the chosen language even when localStorage is unavailable. Switching
languages never submits the form. With JavaScript disabled, the original
Spanish HTML is retained and the inactive selector stays hidden.

The English translations live in `language.js`, keyed by the original Spanish
text. When editing a Spanish phrase, update its translation there too.
Use `PortfolioLanguage.text()` or `.attribute()` for dynamically generated text
so subsequent language changes update it without rebuilding the interaction.
The original artwork, client names and links are preserved.

## Local preview

Run `python -m http.server 8765` from the repository root and open
http://localhost:8765/. Add `?lang=en` to preview English or `?lang=es` for Spanish.

Before publishing, verify the language controls at mobile and desktop widths,
open the IPA case, switch languages during the mini challenge, and confirm that
the contact form keeps its inputs and uses a localized thank-you URL.
