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
 * Coordinates below were geocoded via OpenStreetMap (June 2026).
 * Only PUBLIC (off-campus) restaurants are listed. Belval restaurants
 * are all open past 14:00, so attendees can eat after moving across
 * from the Limpertsberg campus. Re-check opening hours before the event.
 * ============================================================ */

var CAMPUS_DATA = {
  limpertsberg: {
    elId: 'map-limpertsberg',
    listId: 'list-limpertsberg',
    center: [49.6188, 6.1212],
    zoom: 16,
    places: [
      // --- Public transport (navy markers) ---
      {
        type: 'transit',
        name: 'Tram — Faïencerie (line T1)',
        coords: [49.6161901, 6.1215216],
        note: 'Closest tram stop (~7 min walk down Av. de la Faïencerie). T1 runs to Gare Centrale for trains to Belval.',
        url: 'https://www.mobiliteit.lu/en/'
      },
      {
        type: 'transit',
        name: 'Tram — Theater (line T1)',
        coords: [49.6175714, 6.1253048],
        note: 'By Place du Glacis / Grand Théâtre. Buses 2, 16, 18, 111, 201 also serve Av. de la Faïencerie.',
        url: 'https://www.mobiliteit.lu/en/'
      },
      // --- Restaurants & lunch (pink markers) ---
      {
        type: 'food',
        name: 'Bo Zai Fan',
        coords: [49.6179924, 6.1192979],
        note: 'Hong Kong / Chinese — homemade steamed bites. 48 Av. de la Faiencerie.',
        url: 'https://www.google.com/maps/search/?api=1&query=Bo+Zai+Fan+Avenue+de+la+Faiencerie+Luxembourg'
      },
      {
        type: 'food',
        name: 'Basta Così',
        coords: [49.6186886, 6.1232536],
        note: 'Italian. 18 Av. Pasteur. Lunch Mon–Fri 11:30–14:00.',
        url: 'https://www.google.com/maps/search/?api=1&query=Basta+Cosi+Avenue+Pasteur+Luxembourg'
      },
      {
        type: 'food',
        name: 'Tempura',
        coords: [49.6186117, 6.1230685],
        note: 'Japanese. 21 Av. Pasteur. Lunch Mon–Fri 11:30–14:30.',
        url: 'https://www.google.com/maps/search/?api=1&query=Tempura+Avenue+Pasteur+Luxembourg'
      },
      {
        type: 'food',
        name: 'Que Pasa',
        coords: [49.6186381, 6.1240588],
        note: 'Mexican / Latin. 8 Av. Pasteur. Lunch from 11:30.',
        url: 'https://www.google.com/maps/search/?api=1&query=Que+Pasa+Avenue+Pasteur+Luxembourg'
      },
      {
        type: 'food',
        name: 'Chiche!',
        coords: [49.6189711, 6.1233952],
        note: 'Levantine / Middle-Eastern sharing plates. 20 Av. Pasteur.',
        url: 'https://www.google.com/maps/search/?api=1&query=Chiche+Avenue+Pasteur+Luxembourg'
      },
      {
        type: 'food',
        name: 'Caftan',
        coords: [49.6189392, 6.1216152],
        note: 'Moroccan café-restaurant. 37 Av. Pasteur.',
        url: 'https://www.google.com/maps/search/?api=1&query=Caftan+Avenue+Pasteur+Luxembourg'
      },
      {
        type: 'food',
        name: 'Intense',
        coords: [49.6197136, 6.1199435],
        note: 'Coffee shop / light lunch. 61 Av. Pasteur. Mon–Fri 07:30–18:00.',
        url: 'https://www.google.com/maps/search/?api=1&query=Intense+Avenue+Pasteur+Luxembourg'
      },
      {
        type: 'food',
        name: 'Kontur — Concept Store & Coffee',
        coords: [49.6199091, 6.1195414],
        note: 'Café. 67 Av. Pasteur.',
        url: 'https://www.google.com/maps/search/?api=1&query=Kontur+Avenue+Pasteur+Luxembourg'
      }
    ]
  },

  belval: {
    elId: 'map-belval',
    listId: 'list-belval',
    center: [49.5025, 5.9468],
    zoom: 16,
    places: [
      // --- Public transport (navy markers) ---
      {
        type: 'transit',
        name: 'Belval-Université — train & bus station',
        coords: [49.5008863, 5.9440454],
        note: 'At the campus. CFL trains to/from Luxembourg Gare Centrale ~every 15 min (~25 min). Adjacent bus station (TICE 4, 7, 15). Main link between the two campuses.',
        url: 'https://www.mobiliteit.lu/en/'
      },
      // --- Restaurants & lunch (pink markers) — all open past 14:00 ---
      {
        type: 'food',
        name: 'Urban Belval',
        coords: [49.5005900, 5.9469353],
        note: 'Brasserie / burgers / bar. 7 Av. du Rock\'n\'Roll. Open all day, ~11:00–late (7 days).',
        url: 'https://www.google.com/maps/search/?api=1&query=Urban+Belval+Avenue+du+Rock+n+Roll'
      },
      {
        type: 'food',
        name: 'L\'Osteria Belval',
        coords: [49.5009913, 5.9463482],
        note: 'Italian / pizza & pasta. 12 Av. du Rock\'n\'Roll (by the Ibis). Continuous 11:30–23:00.',
        url: 'https://www.google.com/maps/search/?api=1&query=L+Osteria+Belval+Avenue+du+Rock+n+Roll'
      },
      {
        type: 'food',
        name: 'Food House',
        coords: [49.5038045, 5.9493298],
        note: 'Quick lunch / food court. 8 Place de l\'Université. Mon–Fri 11:30–16:00.',
        url: 'https://www.google.com/maps/search/?api=1&query=Food+House+Place+de+l+Universite+Belval'
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
