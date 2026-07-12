/* ==========================================================================
   GPMLFF Workshop — Online posters + comments
   --------------------------------------------------------------------------
   HOW TO ADD A POSTER
   1. Drop the poster PDF into the  posters/  folder
      (optionally a preview image into  media/posters/).
   2. Add one entry to the GPMLFF_POSTERS list below.
   That's it — the grid on the home page and the viewer page update
   automatically, and each poster gets its own comment thread.
   ========================================================================== */

/* -----------------------------------------------------------------------
   1) The poster list
   Each poster needs a UNIQUE, STABLE `id` — it is the key that ties the
   poster to its own comment thread, so never reuse or rename an id once
   people have started commenting.
   ----------------------------------------------------------------------- */
window.GPMLFF_POSTERS = [
  {
    id: "poster-moussadik",
    title: "CoOOH/BiVO₄ Photocatalyst for Efficient Solar Water Splitting",
    author: "Ali Moussadik, Wei Chen, Gian-Marco Rignanese",
    affiliation: "Institute of Condensed Matter and Nanosciences (IMCN), UCLouvain, Belgium",
    pdf: "posters/Ali_Moussadik_Poster.pdf"
  },
  {
    id: "poster-khan",
    title: "Machine Learning Interatomic Potentials for Exploring Surface Features of Bulk Metallic Glasses",
    author: "Md Sharif Khan, Oliviero Andreussi",
    affiliation: "Department of Chemistry and Biochemistry, Boise State University, Idaho",
    pdf: "posters/GPMLFF_Poster_Khan.pdf"
  },
  {
    id: "poster-zardoshti",
    title: "Machine-Learning Interatomic Potentials for Structural and Dynamical Properties of Ag₂₀ Clusters",
    author: "Amir Mahdi Zardoshti, Zahra Jamshidi",
    affiliation: "Chemistry Department, Sharif University of Technology, Tehran, Iran",
    pdf: "posters/poster_AmirMahdiZardoshti.pdf"
  },
  {
    id: "poster-salazar-lozas",
    title: "Probing the Limits of the Universal Models for Atoms: Energetic and Structural Analysis of Polyoxometalates",
    author: "Hugo Salazar-Lozas, Jordi Buils, Carles Bo, Albert Solé Daura",
    affiliation: "Institute of Chemical Research of Catalonia (ICIQ)",
    pdf: "posters/Poster_GPMLFF_HSL_11-07-26.pdf"
  },
  {
    id: "poster-rudenko",
    title: "Towards Robust Machine-Learned Interatomic Potentials for Radiation-Damaged Waste Immobilization Materials",
    author: "M. A. Rudenko, A. A. Mitrofanov",
    affiliation: "Chemistry Department, Lomonosov Moscow State University",
    pdf: "posters/Rudenko_o9.pdf"
  }
];

/* -----------------------------------------------------------------------
   2) Giscus configuration (the GitHub-powered comments)
   Fill these in AFTER you have:
     a) enabled "Discussions" in the repo settings, and
     b) installed the giscus GitHub App on the repo, and
     c) opened https://giscus.app to generate the two IDs below.
   Leave the PASTE_… placeholders as-is until then — the viewer will show a
   friendly "comments not configured yet" note instead of a broken widget.
   ----------------------------------------------------------------------- */
window.GPMLFF_GISCUS = {
  repo:       "GPMLFFWorkshop/gpmlffworkshop.github.io", // already correct for this repo
  repoId:     "PASTE_REPO_ID",                           // from https://giscus.app
  category:   "Posters",                                 // a Discussions category name (create one called "Posters")
  categoryId: "PASTE_CATEGORY_ID",                       // from https://giscus.app
  theme:      "light",                                   // matches the site theme
  lang:       "en"
};

/* -----------------------------------------------------------------------
   Helpers + grid renderer (no need to edit below this line)
   ----------------------------------------------------------------------- */
(function () {
  "use strict";

  window.GPMLFF_getPosterById = function (id) {
    var list = window.GPMLFF_POSTERS || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  };

  window.GPMLFF_giscusConfigured = function () {
    var g = window.GPMLFF_GISCUS || {};
    return g.repoId && g.repoId.indexOf("PASTE_") !== 0 &&
           g.categoryId && g.categoryId.indexOf("PASTE_") !== 0;
  };

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function cardHtml(p) {
    var href = "poster.html?id=" + encodeURIComponent(p.id);
    var media = p.thumb
      ? '<div class="poster-card-thumb" style="background-image:url(\'' + escapeHtml(p.thumb) + '\')"></div>'
      : '<div class="poster-card-thumb poster-card-thumb--placeholder">' +
          '<i class="fa fa-file-pdf-o" aria-hidden="true"></i>' +
        '</div>';

    return '' +
      '<div class="col-lg-4 col-md-6 poster-col">' +
        '<a class="poster-card" href="' + href + '">' +
          media +
          '<div class="poster-card-body">' +
            '<h3 class="poster-card-title">' + escapeHtml(p.title) + '</h3>' +
            (p.author ? '<p class="poster-card-author">' + escapeHtml(p.author) +
              (p.affiliation ? ' &middot; <span>' + escapeHtml(p.affiliation) + '</span>' : '') +
              '</p>' : '') +
            '<span class="poster-card-cta">View &amp; discuss ' +
              '<i class="fa fa-angle-right" aria-hidden="true"></i></span>' +
          '</div>' +
        '</a>' +
      '</div>';
  }

  function renderGrid() {
    var grid = document.getElementById("posters-grid");
    if (!grid) return;
    var list = window.GPMLFF_POSTERS || [];

    if (!list.length) {
      grid.innerHTML =
        '<div class="col-12 text-center">' +
          '<p class="posters-empty">Posters will appear here soon. Check back shortly!</p>' +
        '</div>';
      return;
    }
    grid.innerHTML = list.map(cardHtml).join("");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderGrid);
  } else {
    renderGrid();
  }
})();
