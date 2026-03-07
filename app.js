/* ═══════════════════════════════════════════════════
   HomeServe SG — app.js
   Singapore home services booking platform
═══════════════════════════════════════════════════ */

'use strict';

/* ─── Category colours (used for map markers + badges) ── */
const CAT_COLORS = {
  cleaning:   '#6366f1',
  aircon:     '#0ea5e9',
  plumbing:   '#2563eb',
  electrical: '#f59e0b',
  gardening:  '#16a34a',
  painting:   '#db2777',
  handyman:   '#7c3aed',
  pest:       '#dc2626',
};

/* ─── Seed data: Singapore service providers ─────── */
const PROVIDERS = [
  {
    id: 'p1',
    name: 'SparkleMaid Services',
    category: 'cleaning',
    tagline: 'Part-time maid & deep cleaning — trusted since 2015',
    icon: '🧹',
    about: 'Family-run home cleaning service with 9 years of experience across Singapore. Our cleaners are police-checked, trained and carry public liability insurance. Eco-friendly supplies included.',
    rating: 4.9,
    reviews: 214,
    price: 28,
    priceUnit: 'hr',
    location: 'Toa Payoh / Bishan',
    lat: 1.3344, lng: 103.8467,
    zip: ['31','32','33','57','56'],
    weekend: true, evening: true,
    license: 'BizSafe Certified',
    services: [
      { name: 'Part-time maid (3 hrs)',     price: 84 },
      { name: 'Spring clean (5 hrs)',        price: 140 },
      { name: 'Move-in / move-out clean',   price: 250 },
      { name: 'Post-renovation clean',      price: 350 },
      { name: 'Office cleaning (per visit)',price: 120 },
    ],
    reviewList: [
      { name: 'Wei Ming L.',  stars: 5, date: 'Feb 2026', text: 'The auntie who came was so thorough! My flat has never been this clean. Will definitely hire again every fortnight.' },
      { name: 'Siti N.',      stars: 5, date: 'Jan 2026', text: 'Used them for move-in cleaning of new BTO. Absolutely spotless. Neighbours asked for the contact!' },
      { name: 'Rajesh K.',    stars: 4, date: 'Dec 2025', text: 'Good work overall, very careful with our fragile items. Minor timing issue but resolved quickly. Would use again.' },
    ],
  },
  {
    id: 'p2',
    name: 'CoolBreeze Aircon',
    category: 'aircon',
    tagline: 'All brands serviced — fast response, honest pricing',
    icon: '❄️',
    about: 'NEA-licensed aircon specialist serving East Singapore since 2012. We service all brands — Mitsubishi, Daikin, Panasonic, Midea and more. Chemical washes, gas top-ups, and full system installations available.',
    rating: 4.8,
    reviews: 327,
    price: 35,
    priceUnit: 'unit',
    location: 'Tampines / Pasir Ris',
    lat: 1.3545, lng: 103.9434,
    zip: ['52','51','82'],
    weekend: true, evening: false,
    license: 'NEA Licensed',
    services: [
      { name: 'General service (per unit)',  price: 35 },
      { name: 'Chemical wash (per unit)',    price: 80 },
      { name: 'Chemical overhaul',           price: 120 },
      { name: 'Gas top-up (R22/R410A)',      price: 60 },
      { name: 'New unit installation',       price: 400 },
    ],
    reviewList: [
      { name: 'Huang Jun H.', stars: 5, date: 'Mar 2026', text: 'Booked at 9am, technician arrived by 11am. Aircon blows so cold now. Very fast lah!' },
      { name: 'Nurul A.',     stars: 5, date: 'Feb 2026', text: 'Very honest! They told me I only needed a standard wash, not the expensive overhaul. Saved $80. Very trustworthy.' },
      { name: 'Ahmad R.',     stars: 4, date: 'Jan 2026', text: 'Professional and explained everything clearly before starting. Fair pricing. Will book again.' },
    ],
  },
  {
    id: 'p3',
    name: 'PipePro Plumbing',
    category: 'plumbing',
    tagline: 'PUB-licensed — no call-out fee, same-day service',
    icon: '🔧',
    about: 'PUB-licensed plumber with 12 years of HDB and condo experience across Singapore. Transparent pricing before we start — no hidden fees. Emergency same-day service available island-wide.',
    rating: 4.7,
    reviews: 189,
    price: 80,
    priceUnit: 'hr',
    location: 'Jurong West / Boon Lay',
    lat: 1.3404, lng: 103.6990,
    zip: ['64','61','62','63','65','66'],
    weekend: true, evening: false,
    license: 'PUB Licensed',
    services: [
      { name: 'Choke clearing (basin/toilet)', price: 80 },
      { name: 'Tap / faucet replacement',      price: 90 },
      { name: 'Water heater installation',     price: 250 },
      { name: 'Toilet bowl replacement',       price: 320 },
      { name: 'Pipe leak repair',              price: 120 },
    ],
    reviewList: [
      { name: 'Lim Ah K.', stars: 5, date: 'Feb 2026', text: 'Toilet choke on a Sunday night. They came within 2 hours and fixed it quickly. Fair price, no hidden charges. 5 stars!' },
      { name: 'Kavitha P.', stars: 5, date: 'Jan 2026', text: 'Replaced our water heater so professionally. Explained warranty and maintenance tips. Very satisfied.' },
      { name: 'Jason T.',   stars: 4, date: 'Jan 2026', text: 'Good work fixing our leaky pipe under the sink. Slightly pricier than I expected but quality was solid.' },
    ],
  },
  {
    id: 'p4',
    name: 'BrightSpark Electrical',
    category: 'electrical',
    tagline: 'EMA-licensed electricians — safe, fast, certified',
    icon: '⚡',
    about: 'EMA-licensed electrical contractor serving North Singapore HDBs and condos. We handle DB box replacements, fan installations, lighting upgrades, CCTV and all electrical faults. Work certified and insured.',
    rating: 4.8,
    reviews: 143,
    price: 90,
    priceUnit: 'hr',
    location: 'Ang Mo Kio / Yishun',
    lat: 1.3699, lng: 103.8461,
    zip: ['56','57','76','77','78'],
    weekend: false, evening: true,
    license: 'EMA Licensed',
    services: [
      { name: 'DB box replacement',         price: 600 },
      { name: 'Ceiling fan installation',   price: 100 },
      { name: 'Light fixture installation', price: 80 },
      { name: 'Power socket installation',  price: 90 },
      { name: 'Electrical fault diagnosis', price: 100 },
    ],
    reviewList: [
      { name: 'Sandra L.',   stars: 5, date: 'Mar 2026', text: 'DB box replaced in 4 hours with minimal disruption. Certification issued same day. Very professional team.' },
      { name: 'Faridah B.',  stars: 5, date: 'Feb 2026', text: 'Installed fans and light fixtures in our new flat. Professional team and clean work. Highly recommended!' },
      { name: 'Kevin C.',    stars: 4, date: 'Jan 2026', text: 'Fixed an electrical fault two other electricians couldn\'t find. Worth every dollar. Very knowledgeable.' },
    ],
  },
  {
    id: 'p5',
    name: 'Greenscapes SG',
    category: 'gardening',
    tagline: 'NParks-certified landscapers — landed homes & condos',
    icon: '🌿',
    about: 'NParks-certified horticulturalists specialising in tropical gardens for landed properties, condo balconies, and HDB void deck greenery. From routine maintenance to full landscape design — we bring nature home.',
    rating: 4.6,
    reviews: 98,
    price: 45,
    priceUnit: 'hr',
    location: 'Holland Village / Buona Vista',
    lat: 1.3114, lng: 103.7960,
    zip: ['27','26','11','12','13'],
    weekend: true, evening: false,
    license: 'NParks Certified',
    services: [
      { name: 'Monthly garden maintenance',  price: 120 },
      { name: 'Grass cutting & edging',      price: 80 },
      { name: 'Tree & shrub pruning',        price: 100 },
      { name: 'Balcony garden setup',        price: 300 },
      { name: 'Landscape design & planting', price: 500 },
    ],
    reviewList: [
      { name: 'Patricia S.', stars: 5, date: 'Feb 2026', text: 'Transformed our condo balcony into a lush tropical garden. So professional and creative. Worth every dollar!' },
      { name: 'Ivan L.',     stars: 4, date: 'Jan 2026', text: 'Reliable monthly service. The garden always looks well-kept. Very happy with the regular arrangement.' },
      { name: 'Mei Lin T.',  stars: 5, date: 'Nov 2025', text: 'Designed and planted our private landed garden. They really listened to what we wanted. Love the result!' },
    ],
  },
  {
    id: 'p6',
    name: 'HDB PaintPro',
    category: 'painting',
    tagline: 'HDB specialist — Nippon & Dulux, clean workmanship',
    icon: '🎨',
    about: 'Specialist in HDB and condo interior painting across Singapore. We use premium Nippon Paint and Dulux with full surface preparation — sanding, sealing and primer. Dust-minimised workmanship guaranteed.',
    rating: 4.7,
    reviews: 127,
    price: 50,
    priceUnit: 'hr',
    location: 'Queenstown / Buona Vista',
    lat: 1.2981, lng: 103.8053,
    zip: ['14','15','11','12','13'],
    weekend: true, evening: false,
    license: 'BizSafe Certified',
    services: [
      { name: '3-room HDB painting',    price: 800 },
      { name: '4-room HDB painting',    price: 1100 },
      { name: '5-room HDB painting',    price: 1350 },
      { name: 'Single room painting',   price: 300 },
      { name: 'Touch-up & repainting',  price: 180 },
    ],
    reviewList: [
      { name: 'Grace T.',  stars: 5, date: 'Mar 2026', text: 'Painted our whole 4-room HDB. The finish was flawless and the team was clean and tidy. Very pleased with the result!' },
      { name: 'Muthu K.', stars: 5, date: 'Feb 2026', text: 'Excellent workmanship at a very reasonable price. Will definitely use again for our kitchen repaint.' },
      { name: 'Jenny O.', stars: 4, date: 'Jan 2026', text: 'Good quality work. Appreciated that they covered all furniture and mopped the floor before leaving.' },
    ],
  },
  {
    id: 'p7',
    name: 'FixIt Handyman SG',
    category: 'handyman',
    tagline: 'TV mounting, furniture assembly, HDB repairs & more',
    icon: '🔨',
    about: 'Your reliable one-stop handyman for all HDB and condo repairs. TV mounting, IKEA furniture assembly, door adjustments, shelf installation and minor plumbing. Honest, upfront pricing — no hidden fees.',
    rating: 4.9,
    reviews: 302,
    price: 60,
    priceUnit: 'hr',
    location: 'Bedok / Tampines',
    lat: 1.3242, lng: 103.9255,
    zip: ['46','47','48','52','51'],
    weekend: true, evening: true,
    license: 'BizSafe Certified',
    services: [
      { name: 'TV wall mounting',             price: 80 },
      { name: 'IKEA furniture assembly',      price: 70 },
      { name: 'HDB shelving installation',    price: 100 },
      { name: 'Door hinge / lock repair',     price: 80 },
      { name: 'General repairs (hourly)',     price: 60 },
    ],
    reviewList: [
      { name: 'Mark C.',   stars: 5, date: 'Mar 2026', text: 'Assembled 3 IKEA pieces and mounted 2 TVs in one visit. Super efficient and affordable. Best handyman I\'ve found!' },
      { name: 'Amirah Y.',stars: 5, date: 'Feb 2026', text: 'Fixed our bedroom door and installed shelves. Very polite, neat, and fast. Highly recommend!' },
      { name: 'Daniel F.', stars: 5, date: 'Feb 2026', text: 'Used them 5 times now. Always reliable, always does a great job. My go-to for all HDB repairs.' },
    ],
  },
  {
    id: 'p8',
    name: 'NoPest SG',
    category: 'pest',
    tagline: 'NEA-licensed — termites, dengue, cockroaches & more',
    icon: '🪲',
    about: 'NEA-licensed pest control operator for HDB and landed homes across Singapore. We handle cockroaches, rodents, termites, bed bugs and dengue mosquitoes. All chemicals are safe for children and pets.',
    rating: 4.6,
    reviews: 88,
    price: 120,
    priceUnit: 'treatment',
    location: 'Woodlands / Sembawang',
    lat: 1.4369, lng: 103.7869,
    zip: ['73','75','76','72','71'],
    weekend: true, evening: false,
    license: 'NEA Licensed',
    services: [
      { name: 'Cockroach baiting & treatment', price: 120 },
      { name: 'Rodent trapping & control',     price: 180 },
      { name: 'Termite treatment (per visit)', price: 400 },
      { name: 'Bed bug heat treatment',        price: 350 },
      { name: 'Dengue mosquito fogging',       price: 100 },
    ],
    reviewList: [
      { name: 'Eric T.',    stars: 5, date: 'Jan 2026', text: 'Cockroach problem at my HDB solved in one session. The technician was very professional and explained everything clearly.' },
      { name: 'Noraini M.', stars: 5, date: 'Dec 2025', text: 'Found termites in our door frame. NoPest treated it quickly and gave us a 6-month warranty. Very reassuring.' },
      { name: 'Stephen L.', stars: 4, date: 'Nov 2025', text: 'Quick response for mosquito fogging ahead of a family event. The whole condo smelled fresh after. Will book again.' },
    ],
  },
  {
    id: 'p9',
    name: 'IceCold Aircon',
    category: 'aircon',
    tagline: 'Budget-friendly aircon servicing — West Singapore',
    icon: '❄️',
    about: 'Affordable aircon servicing for HDB and condo units in West Singapore. Our trained technicians cover all major brands. Regular maintenance packages available for great long-term savings.',
    rating: 4.7,
    reviews: 211,
    price: 30,
    priceUnit: 'unit',
    location: 'Clementi / West Coast',
    lat: 1.3152, lng: 103.7649,
    zip: ['12','11','13','59','58','21'],
    weekend: false, evening: false,
    license: 'NEA Licensed',
    services: [
      { name: 'General service (per unit)',          price: 30 },
      { name: 'Chemical wash (per unit)',            price: 70 },
      { name: 'Chemical overhaul (per unit)',        price: 100 },
      { name: 'Condenser coil wash',                 price: 80 },
      { name: '4-unit package (×4 services)',        price: 320 },
    ],
    reviewList: [
      { name: 'Alvin G.',   stars: 5, date: 'Feb 2026', text: 'Serviced 3 units for only S$90. Aircon blowing cold again after months of being warm. Will book every 3 months.' },
      { name: 'Susan K.',   stars: 4, date: 'Jan 2026', text: 'Reliable and punctual. On a maintenance plan for 2 years — aircon has been trouble-free since. Great value.' },
      { name: 'Raymond L.', stars: 5, date: 'Jan 2026', text: 'Chemical overhaul done so professionally. Aircon looks brand new. Great value for the price.' },
    ],
  },
  {
    id: 'p10',
    name: 'HomeShine Cleaners',
    category: 'cleaning',
    tagline: 'Affordable regular & deep cleaning — Northeast SG',
    icon: '🧹',
    about: 'Reliable home cleaning for HDB and condo households in Northeast Singapore. All cleaners are police-checked, trained and bring eco-friendly supplies. Flexible one-time or regular packages available.',
    rating: 4.5,
    reviews: 156,
    price: 22,
    priceUnit: 'hr',
    location: 'Sengkang / Punggol',
    lat: 1.3913, lng: 103.8936,
    zip: ['54','53','82','55','82'],
    weekend: false, evening: true,
    license: 'BizSafe Certified',
    services: [
      { name: 'Regular clean (3 hrs)',     price: 66 },
      { name: 'Deep clean (5 hrs)',        price: 110 },
      { name: 'Carpet vacuum & shampoo',   price: 50 },
      { name: 'Window & glass cleaning',   price: 40 },
      { name: 'Kitchen deep clean',        price: 80 },
    ],
    reviewList: [
      { name: 'Yong Ling T.', stars: 4, date: 'Feb 2026', text: 'Good value for money. Reliable cleaner every fortnight. The flat is always spotless when I get home from work.' },
      { name: 'Haziq A.',     stars: 5, date: 'Jan 2026', text: 'Used for move-out cleaning of my rental. Landlord returned full deposit. Highly recommend for end-of-tenancy!' },
      { name: 'Preethi R.',   stars: 4, date: 'Dec 2025', text: 'Thorough cleaning, always on time. Minor communication issue once but was resolved promptly. Will continue.' },
    ],
  },
];

/* ─── App state ──────────────────────────────────── */
const state = {
  searchZip:       '',
  searchCategory:  '',
  filteredResults: [...PROVIDERS],
  sortedResults:   [...PROVIDERS],
  currentProvider: null,
  booking:         {},
  bookings:        JSON.parse(localStorage.getItem('hs_sg_bookings') || '[]'),
  paymentMethod:   'card',
};

/* ─── Map state ──────────────────────────────────── */
let map           = null;
let mapInitialized = false;
const mapMarkers  = []; // { marker, provider }

/* ─── Page routing ───────────────────────────────── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(`page-${id}`);
  if (page) page.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'my-bookings') renderMyBookings();
  if (id === 'home' && !mapInitialized) setTimeout(initMap, 100);
}

/* ─── Map initialisation ─────────────────────────── */
function initMap() {
  if (mapInitialized || typeof L === 'undefined') return;
  mapInitialized = true;

  map = L.map('services-map', {
    center: [1.3521, 103.8198],
    zoom: 11,
    scrollWheelZoom: false,
    zoomControl: true,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  PROVIDERS.forEach(addMapMarker);
  setTimeout(() => map.invalidateSize(), 300);
}

function addMapMarker(p) {
  const color = CAT_COLORS[p.category] || '#2563eb';

  const icon = L.divIcon({
    className: 'hs-marker',
    html: `<div class="hs-marker-pin" style="background:${color}" title="${p.name}">
             <span class="hs-marker-emoji">${p.icon}</span>
           </div>
           <div class="hs-marker-label">S$${p.price}</div>`,
    iconSize: [44, 58],
    iconAnchor: [22, 58],
    popupAnchor: [0, -62],
  });

  const popup = L.popup({ maxWidth: 230, className: 'hs-popup' }).setContent(`
    <div class="map-popup">
      <div class="map-popup-head" style="background:${color}">
        <span class="map-popup-ico" aria-hidden="true">${p.icon}</span>
        <span class="map-popup-catbadge">${categoryLabel(p.category)}</span>
      </div>
      <div class="map-popup-body">
        <div class="map-popup-name">${p.name}</div>
        <div class="map-popup-meta">
          <span class="map-popup-stars">★ ${p.rating}</span>
          <span class="map-popup-rc">(${p.reviews})</span>
          <span class="map-popup-price">S$${p.price}/${p.priceUnit}</span>
        </div>
        <div class="map-popup-loc">📍 ${p.location}</div>
        <div class="map-popup-lic">${p.license}</div>
        <button class="map-popup-btn" onclick="viewProviderFromMap('${p.id}')">View &amp; Book →</button>
      </div>
    </div>
  `);

  const marker = L.marker([p.lat, p.lng], { icon }).addTo(map).bindPopup(popup);
  mapMarkers.push({ marker, provider: p });
}

function filterMapMarkers(btn, cat) {
  // Update pill active state
  document.querySelectorAll('.map-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  // Show / dim markers
  mapMarkers.forEach(({ marker, provider }) => {
    const show = !cat || provider.category === cat;
    marker.setOpacity(show ? 1 : 0.2);
    const el = marker.getElement();
    if (el) el.style.pointerEvents = show ? '' : 'none';
  });
}

function viewProviderFromMap(id) {
  if (map) map.closePopup();
  viewProvider(id);
}

/* ─── Search ─────────────────────────────────────── */
function doSearch() {
  const zip = document.getElementById('search-zip').value.trim().toUpperCase();
  const cat  = document.getElementById('search-category').value;
  state.searchZip      = zip;
  state.searchCategory = cat;
  renderListings(zip, cat);
  showPage('listings');
}

function quickSearch(category) {
  state.searchZip      = '';
  state.searchCategory = category;
  document.getElementById('search-zip').value = '';
  document.getElementById('search-category').value = category;
  renderListings('', category);
  showPage('listings');
}

/* ─── Listings ───────────────────────────────────── */
function renderListings(zip, category) {
  let results = [...PROVIDERS];

  if (zip) {
    const q = zip.toLowerCase();
    results = results.filter(p =>
      p.zip.some(z => z.toLowerCase().startsWith(q) || q.startsWith(z.toLowerCase())) ||
      p.location.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q)
    );
  }

  if (category) {
    results = results.filter(p => p.category === category);
  }

  state.filteredResults = results;
  state.sortedResults   = sortProviders([...results], document.getElementById('sort-select').value);

  const catLabel = category
    ? document.getElementById('search-category').querySelector(`option[value="${category}"]`)?.textContent
    : 'All services';

  document.getElementById('listings-title').textContent =
    `${state.sortedResults.length} provider${state.sortedResults.length !== 1 ? 's' : ''} found`;
  document.getElementById('listings-subtitle').textContent =
    `${catLabel}${zip ? ` · Near ${zip}` : ' · Singapore'}`;

  renderGrid(state.sortedResults);
  resetFilters();
}

function renderGrid(providers) {
  const grid = document.getElementById('listings-grid');

  if (providers.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <h3>No providers found</h3>
        <p>Try a different postal code or area name, or <a href="#" onclick="quickSearch(''); return false;">browse all providers</a>.</p>
      </div>`;
    return;
  }

  grid.innerHTML = providers.map(p => `
    <article class="listing-card" onclick="viewProvider('${p.id}')" tabindex="0"
             onkeydown="if(event.key==='Enter')viewProvider('${p.id}')"
             aria-label="${p.name}, ${categoryLabel(p.category)}, from S$${p.price}, ${p.rating} stars">
      <div class="listing-card-img" style="--cat-color:${CAT_COLORS[p.category] || '#2563eb'}">
        <span aria-hidden="true">${p.icon}</span>
        <span class="listing-category-badge" style="background:${CAT_COLORS[p.category] || '#2563eb'}">${categoryLabel(p.category)}</span>
      </div>
      <div class="listing-card-body">
        <div class="listing-card-title">${p.name}</div>
        <div class="listing-card-tagline">${p.tagline}</div>
        <div class="listing-avail-tags">
          ${p.weekend ? '<span class="avail-tag">Weekends</span>' : ''}
          ${p.evening ? '<span class="avail-tag">Evenings</span>' : ''}
          <span class="avail-tag">${p.location}</span>
        </div>
        <div class="listing-card-meta">
          <div class="rating">
            <span class="star" aria-hidden="true">★</span>
            ${p.rating}
            <span class="review-count">(${p.reviews})</span>
          </div>
          <div class="listing-price">from S$${p.price}/${p.priceUnit}</div>
        </div>
      </div>
    </article>
  `).join('');
}

/* ─── Filters & sort ─────────────────────────────── */
function updatePriceLabel(val) {
  document.getElementById('price-label').textContent = `Up to S$${val}`;
}

function applyFilters() {
  const maxPrice    = parseInt(document.getElementById('price-filter').value, 10);
  const minRating   = parseFloat(document.getElementById('rating-filter').value);
  const wantWeekend = document.getElementById('avail-weekend').checked;
  const wantEvening = document.getElementById('avail-evening').checked;

  const results = state.filteredResults.filter(p => {
    if (p.price > maxPrice)         return false;
    if (p.rating < minRating)       return false;
    if (wantWeekend && !p.weekend)  return false;
    if (wantEvening && !p.evening)  return false;
    return true;
  });

  state.sortedResults = sortProviders(results, document.getElementById('sort-select').value);
  renderGrid(state.sortedResults);

  document.getElementById('listings-title').textContent =
    `${state.sortedResults.length} provider${state.sortedResults.length !== 1 ? 's' : ''} found`;
}

function applySort() {
  state.sortedResults = sortProviders([...state.sortedResults], document.getElementById('sort-select').value);
  renderGrid(state.sortedResults);
}

function sortProviders(arr, key) {
  switch (key) {
    case 'price-asc':  return arr.sort((a, b) => a.price - b.price);
    case 'price-desc': return arr.sort((a, b) => b.price - a.price);
    case 'reviews':    return arr.sort((a, b) => b.reviews - a.reviews);
    default:           return arr.sort((a, b) => b.rating - a.rating);
  }
}

function resetFilters() {
  document.getElementById('price-filter').value = 300;
  document.getElementById('price-label').textContent = 'Up to S$300';
  document.getElementById('rating-filter').value = '0';
  document.getElementById('avail-weekend').checked = false;
  document.getElementById('avail-evening').checked = false;
  state.sortedResults = sortProviders([...state.filteredResults], document.getElementById('sort-select').value);
  renderGrid(state.sortedResults);
  document.getElementById('listings-title').textContent =
    `${state.filteredResults.length} provider${state.filteredResults.length !== 1 ? 's' : ''} found`;
}

/* ─── Provider detail ────────────────────────────── */
function viewProvider(id) {
  const p = PROVIDERS.find(x => x.id === id);
  if (!p) return;
  state.currentProvider = p;
  const color = CAT_COLORS[p.category] || '#2563eb';

  document.getElementById('provider-detail').innerHTML = `
    <div class="provider-hero">
      <div class="provider-hero-img" style="background:linear-gradient(135deg,${color}22,${color}55)" aria-hidden="true">${p.icon}</div>
      <div class="provider-hero-body">
        <div class="provider-hero-top">
          <h1 class="provider-name">${p.name}</h1>
          <div class="provider-price-block">
            <div class="provider-price" style="color:${color}">S$${p.price}<span style="font-size:.9rem;font-weight:500">/${p.priceUnit}</span></div>
            <div class="provider-price-label">starting rate</div>
          </div>
        </div>
        <div class="provider-meta-row">
          <div class="provider-rating-lg">
            <span class="star" aria-hidden="true">★</span>
            ${p.rating} <span class="review-count">(${p.reviews} reviews)</span>
          </div>
          <div class="provider-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${p.location}
          </div>
        </div>
        <div class="provider-tags">
          <span class="provider-tag" style="background:${color}18;color:${color}">${categoryLabel(p.category)}</span>
          ${p.weekend ? '<span class="provider-tag">Weekends</span>' : ''}
          ${p.evening ? '<span class="provider-tag">Evenings</span>' : ''}
          <span class="provider-tag">${p.license}</span>
          <span class="provider-tag">Fully insured</span>
        </div>
        <p class="provider-about">${p.about}</p>
      </div>
    </div>

    <div class="provider-layout">
      <div>
        <div class="provider-services-card">
          <h3>Services &amp; pricing <span class="gst-note">(incl. 9% GST)</span></h3>
          <ul class="service-list">
            ${p.services.map(s => `
              <li class="service-item">
                <span>${s.name}</span>
                <span class="service-item-price" style="color:${color}">S$${s.price}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="reviews-card">
          <h3>Customer reviews</h3>
          <div class="review-list">
            ${p.reviewList.map(r => `
              <div class="review-item" style="border-left-color:${color}44">
                <div class="review-header">
                  <span class="reviewer-name">${r.name}</span>
                  <span class="review-date">${r.date}</span>
                </div>
                <div class="review-stars" aria-label="${r.stars} stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
                <p class="review-text">${r.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div>
        <div class="booking-cta-card">
          <h3>Book this pro</h3>
          <div class="cta-price" style="color:${color}">S$${p.price}<span style="font-size:.85rem;font-weight:500">/${p.priceUnit}</span></div>
          <div class="cta-price-sub">Prices include 9% GST</div>
          <ul class="cta-features">
            <li><span class="check-icon" aria-hidden="true">✓</span> Instant booking confirmation</li>
            <li><span class="check-icon" aria-hidden="true">✓</span> Pay by card or PayNow</li>
            <li><span class="check-icon" aria-hidden="true">✓</span> Free cancellation (24h notice)</li>
            <li><span class="check-icon" aria-hidden="true">✓</span> ${p.license}</li>
          </ul>
          <button class="btn-primary full-width" style="background:${color}" onclick="startBooking('${p.id}')">Book now</button>
        </div>
      </div>
    </div>
  `;

  showPage('provider');
}

function goBackToListings() { showPage('listings'); }

function goBackToProvider() {
  showPage(state.currentProvider ? 'provider' : 'listings');
}

/* ─── Booking ────────────────────────────────────── */
function startBooking(id) {
  const p = PROVIDERS.find(x => x.id === id);
  if (!p) return;
  state.currentProvider = p;

  const color = CAT_COLORS[p.category] || '#2563eb';

  document.getElementById('booking-provider-summary').innerHTML = `
    <span class="summary-icon" aria-hidden="true">${p.icon}</span>
    <div class="summary-info">
      <strong>${p.name}</strong>
      <span>${categoryLabel(p.category)} · S$${p.price}/${p.priceUnit} · ${p.location}</span>
    </div>
  `;
  document.getElementById('booking-provider-summary').style.borderColor = `${color}55`;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('b-date').min = tomorrow.toISOString().split('T')[0];
  document.getElementById('b-date').value  = '';
  document.getElementById('b-duration').value = '1';
  updateBookingTotal();
  showPage('booking');
}

function updateBookingTotal() {
  const p = state.currentProvider;
  if (!p) return;
  const qty   = parseInt(document.getElementById('b-duration').value, 10) || 1;
  const total = p.price * qty;
  const label = qty === 1 ? `1 ${p.priceUnit}` : `${qty} ${p.priceUnit}s`;
  document.getElementById('total-label').textContent  = `Total (${label})`;
  document.getElementById('total-amount').textContent = `S$${total}`;
  state.booking.total = total;
  state.booking.qty   = qty;
}

function proceedToPayment(e) {
  e.preventDefault();
  const p = state.currentProvider;

  state.booking.provider  = p;
  state.booking.firstName = document.getElementById('b-first').value.trim();
  state.booking.lastName  = document.getElementById('b-last').value.trim();
  state.booking.email     = document.getElementById('b-email').value.trim();
  state.booking.phone     = document.getElementById('b-phone').value.trim();
  state.booking.address   = document.getElementById('b-address').value.trim();
  state.booking.date      = document.getElementById('b-date').value;
  state.booking.time      = document.getElementById('b-time').value;
  state.booking.duration  = document.getElementById('b-duration').value;
  state.booking.notes     = document.getElementById('b-notes').value.trim();

  if (!state.booking.date) { showToast('Please select a date'); return; }
  if (!state.booking.time) { showToast('Please select a time slot'); return; }

  document.getElementById('p-name').value =
    `${state.booking.firstName} ${state.booking.lastName}`;

  const fmtDate = new Date(state.booking.date + 'T12:00:00').toLocaleDateString('en-SG', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const qty     = parseInt(state.booking.duration, 10);
  const timeStr = formatTime12h(state.booking.time);
  const amt     = `S$${state.booking.total}`;

  document.getElementById('payment-order-summary').innerHTML = `
    <div class="order-summary-row"><span>Provider</span><span>${p.name}</span></div>
    <div class="order-summary-row"><span>Service</span><span>${categoryLabel(p.category)}</span></div>
    <div class="order-summary-row"><span>Date</span><span>${fmtDate}</span></div>
    <div class="order-summary-row"><span>Time</span><span>${timeStr}</span></div>
    <div class="order-summary-row"><span>Duration / Units</span><span>${qty}</span></div>
    <div class="order-summary-row total-row">
      <span><strong>Total (incl. GST)</strong></span>
      <span class="total-price">${amt}</span>
    </div>
  `;

  document.getElementById('payment-total-amount').textContent = amt;
  document.getElementById('paynow-amount').textContent  = amt;
  document.getElementById('paynow-amount-2').textContent = amt;

  setPaymentMethod('card');
  showPage('payment');
}

/* ─── Payment methods ────────────────────────────── */
function setPaymentMethod(method) {
  state.paymentMethod = method;
  document.getElementById('card-panel').classList.toggle('hidden', method !== 'card');
  document.getElementById('paynow-panel').classList.toggle('hidden', method !== 'paynow');
  document.getElementById('pm-tab-card').classList.toggle('active', method === 'card');
  document.getElementById('pm-tab-paynow').classList.toggle('active', method === 'paynow');
}

function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 4);
  if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2);
  input.value = v;
}

function toggleBilling() {
  const same = document.getElementById('billing-same').checked;
  document.getElementById('billing-address-fields').classList.toggle('hidden', same);
}

function processPayment(e) {
  e.preventDefault();
  const card   = document.getElementById('p-card').value.replace(/\s/g, '');
  const expiry = document.getElementById('p-expiry').value;
  const cvv    = document.getElementById('p-cvv').value;

  if (card.length < 16)              { showToast('Please enter a valid 16-digit card number'); return; }
  if (!/^\d{2}\/\d{2}$/.test(expiry)) { showToast('Please enter expiry as MM/YY'); return; }
  if (cvv.length < 3)                { showToast('Please enter a valid CVV'); return; }

  const btn = document.querySelector('.pay-btn');
  btn.textContent = 'Processing…';
  btn.disabled    = true;

  setTimeout(() => {
    btn.textContent = 'Pay now';
    btn.disabled    = false;
    confirmBooking('card');
  }, 1800);
}

function processPayNow() {
  const btn = document.querySelector('#paynow-panel .pay-btn');
  btn.textContent = 'Verifying payment…';
  btn.disabled    = true;

  setTimeout(() => {
    btn.textContent = 'I have paid via PayNow';
    btn.disabled    = false;
    confirmBooking('paynow');
  }, 2000);
}

/* ─── Confirmation ───────────────────────────────── */
function confirmBooking(method) {
  const b   = state.booking;
  const id  = 'HS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const fmtDate = new Date(b.date + 'T12:00:00').toLocaleDateString('en-SG', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const qty     = parseInt(b.duration, 10);
  const timeStr = formatTime12h(b.time);

  const record = {
    id,
    providerId:   b.provider.id,
    providerName: b.provider.name,
    category:     b.provider.category,
    icon:         b.provider.icon,
    date:         b.date,
    time:         b.time,
    duration:     qty,
    total:        b.total,
    address:      b.address,
    email:        b.email,
    paymentMethod: method,
    status:       'confirmed',
    bookedAt:     new Date().toISOString(),
  };

  state.bookings.unshift(record);
  localStorage.setItem('hs_sg_bookings', JSON.stringify(state.bookings));

  document.getElementById('confirmation-details').innerHTML = `
    <span class="booking-id">${id}</span>
    <div class="confirmation-row"><span>Provider</span><span>${b.provider.name}</span></div>
    <div class="confirmation-row"><span>Service</span><span>${categoryLabel(b.provider.category)}</span></div>
    <div class="confirmation-row"><span>Date</span><span>${fmtDate}</span></div>
    <div class="confirmation-row"><span>Time</span><span>${timeStr}</span></div>
    <div class="confirmation-row"><span>Duration / Units</span><span>${qty}</span></div>
    <div class="confirmation-row"><span>Address</span><span>${b.address}</span></div>
    <div class="confirmation-row"><span>Email</span><span>${b.email}</span></div>
    <div class="confirmation-row"><span>Payment</span><span>${method === 'paynow' ? 'PayNow' : 'Credit Card'}</span></div>
    <div class="confirmation-row"><span>Amount paid</span><span>S$${b.total}</span></div>
  `;

  showPage('confirmation');
}

/* ─── My Bookings ────────────────────────────────── */
function renderMyBookings() {
  const list = document.getElementById('my-bookings-list');

  if (state.bookings.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <h3>No bookings yet</h3>
        <p>Once you book a service it will appear here.</p>
        <button class="btn-primary" onclick="showPage('home')">Find a service</button>
      </div>`;
    return;
  }

  list.innerHTML = state.bookings.map(b => {
    const fmtDate = new Date(b.date + 'T12:00:00').toLocaleDateString('en-SG', { day:'numeric', month:'short', year:'numeric' });
    const timeStr = formatTime12h(b.time);
    const pm = b.paymentMethod === 'paynow' ? ' · PayNow' : ' · Card';
    return `
      <div class="booking-item">
        <div class="booking-item-icon" aria-hidden="true">${b.icon}</div>
        <div class="booking-item-info">
          <strong>${b.providerName}</strong>
          <span>${categoryLabel(b.category)} · ${fmtDate} at ${timeStr} · ${b.duration} unit(s)${pm}</span>
          <span style="display:block;font-size:.78rem;color:#9ca3af;margin-top:.1rem">Ref: ${b.id}</span>
        </div>
        <span class="booking-item-status status-${b.status}">${b.status}</span>
        <div class="booking-item-total">S$${b.total}</div>
      </div>`;
  }).join('');
}

/* ─── Utilities ──────────────────────────────────── */
function categoryLabel(cat) {
  const labels = {
    cleaning:   'Cleaning',
    aircon:     'Aircon',
    plumbing:   'Plumbing',
    electrical: 'Electrical',
    gardening:  'Gardening',
    painting:   'Painting',
    handyman:   'Handyman',
    pest:       'Pest Control',
  };
  return labels[cat] || cat;
}

function formatTime12h(time) {
  if (!time) return '';
  const [h, m] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hr12  = h % 12 || 12;
  return `${hr12}:${String(m).padStart(2, '0')} ${ampm}`;
}

let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ─── Init ───────────────────────────────────────── */
(function init() {
  state.filteredResults = [...PROVIDERS];
  state.sortedResults   = sortProviders([...PROVIDERS], 'rating');
  // Initialise map on next frame (DOM ready, container has dimensions)
  requestAnimationFrame(() => requestAnimationFrame(initMap));
})();
