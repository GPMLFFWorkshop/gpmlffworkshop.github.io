/* ============================================================
 * Getting Around & Lunch — interactive campus maps (Leaflet/OSM)
 * ============================================================
 *
 * HOW TO EDIT THE DATA
 * --------------------
 * Everything shown on the maps and in the side lists comes from the
 * CAMPUS_DATA object below. To add/change a restaurant or a transport
 * stop, just edit the `places` arrays. No other code needs to change.
 *
 * Each place entry:
 *   {
 *     type:   'food' | 'transit',   // controls marker colour + legend
 *     name:   'Display name',
 *     coords: [latitude, longitude],
 *     note:   'Short description (cuisine, lines served, price…)',
 *     url:    'https://…'           // optional link shown in popup + list
 *   }
 *
 * Tip: to get coordinates, right-click a spot in Google Maps /
 * OpenStreetMap and copy the lat,lng. (Ask Claude to look them up too.)
 *
 * The entries below are PLACEHOLDERS — replace them with the real list.
 * ============================================================ */

var CAMPUS_DATA = {
  limpertsberg: {
    elId: 'map-limpertsberg',
    listId: 'list-limpertsberg',
    center: [49.6205, 6.1197],
    zoom: 15,
    places: [
      // --- Public transport (navy markers) ---
      {
        type: 'transit',
        name: 'Faïencerie (tram)',
        coords: [49.6188, 6.1208],
        note: 'Luxtram line T1 — towards Gare Centrale / Kirchberg.',
        url: 'https://www.mobiliteit.lu/en/'
      },
      // --- Restaurants (pink markers) — PLACEHOLDERS ---
      {
        type: 'food',
        name: 'Example café (replace me)',
        coords: [49.6210, 6.1185],
        note: 'Placeholder — swap for a real lunch spot near Limpertsberg.',
        url: ''
      }
    ]
  },

  belval: {
    elId: 'map-belval',
    listId: 'list-belval',
    center: [49.5046, 5.9483],
    zoom: 15,
    places: [
      // --- Public transport (navy markers) ---
      {
        type: 'transit',
        name: 'Belval-Université (train)',
        coords: [49.5036, 5.9447],
        note: 'CFL train station at the campus — direct trains to Luxembourg Gare (~25 min).',
        url: 'https://www.mobiliteit.lu/en/'
      },
      // --- Restaurants (pink markers) — PLACEHOLDERS ---
      {
        type: 'food',
        name: 'Example restaurant (replace me)',
        coords: [49.5050, 5.9470],
        note: 'Placeholder — swap for a real lunch spot near Belval.',
        url: ''
      }
    ]
  }
};

(function () {
  if (typeof L === 'undefined') {
    return; // Leaflet failed to load (e.g. offline) — fail quietly.
  }

  var TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var TILE_ATTR =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  function makeIcon(type) {
    return L.divIcon({
      className: '', // avoid default leaflet-div-icon box
      html: '<span class="marker-dot marker-' + type + '"></span>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -8]
    });
  }

  function popupHtml(place) {
    var html = '<strong>' + place.name + '</strong>';
    if (place.note) {
      html += '<br>' + place.note;
    }
    if (place.url) {
      html +=
        '<br><a href="' + place.url + '" target="_blank" rel="noopener">More info &rarr;</a>';
    }
    return html;
  }

  function listItemHtml(place) {
    var html =
      '<li><span class="marker-dot marker-' + place.type + '"></span>' +
      '<strong>' + place.name + '</strong>';
    if (place.note) {
      html += '<br>' + place.note;
    }
    if (place.url) {
      html +=
        ' <a href="' + place.url + '" target="_blank" rel="noopener">More info &rarr;</a>';
    }
    html += '</li>';
    return html;
  }

  function buildCampus(cfg) {
    var mapEl = document.getElementById(cfg.elId);
    if (!mapEl) {
      return;
    }

    var map = L.map(cfg.elId, { scrollWheelZoom: false }).setView(cfg.center, cfg.zoom);
    L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 19 }).addTo(map);

    var bounds = [];
    var listEl = document.getElementById(cfg.listId);
    var listHtml = '';

    cfg.places.forEach(function (place) {
      L.marker(place.coords, { icon: makeIcon(place.type) })
        .addTo(map)
        .bindPopup(popupHtml(place));
      bounds.push(place.coords);
      listHtml += listItemHtml(place);
    });

    if (listEl) {
      listEl.innerHTML = listHtml;
    }

    // Fit to all markers (keeps the campus centred when only a few exist).
    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: cfg.zoom });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    Object.keys(CAMPUS_DATA).forEach(function (key) {
      buildCampus(CAMPUS_DATA[key]);
    });
  });
})();
