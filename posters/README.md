# Posters folder

Put each participant's poster **PDF** in this folder, then register it in
`../js/posters.js`.

## Adding a poster (2 steps)

1. Copy the poster PDF here, e.g. `posters/smith-equivariant-potentials.pdf`.
   (Optional: a preview image in `../media/posters/`, e.g. `poster-02.png`.)

2. Open `../js/posters.js` and add one entry to the `GPMLFF_POSTERS` list:

   ```js
   {
     id: "poster-02",                       // UNIQUE + never change it once used
     title: "Equivariant potentials for reactive systems",
     author: "J. Smith",
     affiliation: "University of Example",
     pdf: "posters/smith-equivariant-potentials.pdf"
     // thumb: "media/posters/poster-02.png"  // optional preview image
   }
   ```

That's it — the grid on the home page and the poster viewer page update
automatically, and the poster gets its own comment thread.

## Notes

- The `id` is the key that ties a poster to its comment thread. Keep it
  stable: if you rename an id, existing comments will no longer show under
  that poster.
- Titles and authors for the current posters were auto-extracted from the
  PDFs — double-check them in `../js/posters.js` and fix any that are off.
