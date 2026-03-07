/* ═══════════════════════════════════════════════════
   HomeServe — app.js
   Home services booking platform
═══════════════════════════════════════════════════ */

'use strict';

/* ─── Seed data: service providers ─────────────── */
const PROVIDERS = [
  {
    id: 'p1',
    name: 'Sparkle Clean Co.',
    category: 'cleaning',
    tagline: 'Professional home & office cleaning since 2015',
    icon: '🧹',
    about: 'We are a family-run cleaning business serving the local area for over 9 years. Our team is fully DBS-checked, insured, and trained to the highest standards. We use eco-friendly products and bring all equipment.',
    rating: 4.9,
    reviews: 214,
    price: 28,
    location: 'Central & North District',
    zip: ['10001','10002','10003','SW1A','WC1','EC1'],
    weekend: true,
    evening: true,
    services: [
      { name: 'Regular clean (2 hrs)',    price: 56 },
      { name: 'Deep clean (4 hrs)',        price: 112 },
      { name: 'End-of-tenancy clean',      price: 180 },
      { name: 'Oven / appliance clean',    price: 65 },
      { name: 'Post-construction clean',   price: 220 },
    ],
    reviewList: [
      { name: 'Sarah M.', stars: 5, date: 'Feb 2026', text: 'Absolutely immaculate job. The team arrived on time and worked tirelessly for 3 hours. My flat has never looked this clean!' },
      { name: 'James T.', stars: 5, date: 'Jan 2026', text: 'Used them for an end-of-tenancy clean and got my full deposit back. Highly recommend!' },
      { name: 'Priya K.', stars: 4, date: 'Dec 2025', text: 'Very professional and thorough. Would have given 5 stars but they were 10 minutes late.' },
    ],
  },
  {
    id: 'p2',
    name: 'AquaFix Plumbing',
    category: 'plumbing',
    tagline: 'Trusted plumbers — no call-out fee, fixed prices',
    icon: '🔧',
    about: 'AquaFix has been solving plumbing problems across the area since 2010. From emergency repairs to full bathroom installations, our Gas Safe registered engineers handle it all with a smile and a guarantee.',
    rating: 4.7,
    reviews: 189,
    price: 65,
    location: 'City-wide coverage',
    zip: ['10001','10002','10004','SW1A','SW1B','WC2'],
    weekend: true,
    evening: false,
    services: [
      { name: 'Leak detection & repair',   price: 85 },
      { name: 'Boiler service',            price: 90 },
      { name: 'Tap replacement',           price: 75 },
      { name: 'Bathroom installation',     price: 950 },
      { name: 'Drain unblocking',          price: 95 },
    ],
    reviewList: [
      { name: 'David L.', stars: 5, date: 'Mar 2026', text: 'Fixed our burst pipe at 7am on a Saturday. Incredible service, very fair pricing.' },
      { name: 'Emma R.', stars: 5, date: 'Feb 2026', text: 'Boiler service done efficiently. Engineer was friendly and explained everything clearly.' },
      { name: 'Tom B.', stars: 4, date: 'Jan 2026', text: 'Good work overall. Slightly expensive but the quality justified it.' },
    ],
  },
  {
    id: 'p3',
    name: 'BrightWire Electrical',
    category: 'electrical',
    tagline: 'NICEIC certified electricians — safe, reliable, affordable',
    icon: '⚡',
    about: 'BrightWire is a NICEIC certified electrical contractor. We cover everything from consumer unit upgrades and EV charger installation to fault-finding and lighting design. All work is certified and guaranteed.',
    rating: 4.8,
    reviews: 143,
    price: 70,
    location: 'East & South Zones',
    zip: ['10002','10003','10005','E1','E2','SE1'],
    weekend: false,
    evening: true,
    services: [
      { name: 'Electrical safety inspection', price: 120 },
      { name: 'Consumer unit upgrade',        price: 550 },
      { name: 'EV charger installation',      price: 650 },
      { name: 'Socket / switch installation', price: 85 },
      { name: 'Fault finding & repair',       price: 95 },
    ],
    reviewList: [
      { name: 'Alice N.', stars: 5, date: 'Feb 2026', text: 'Had our consumer unit replaced. The team was professional, tidy and completed on time. Certificates issued same day.' },
      { name: 'Mark S.', stars: 5, date: 'Feb 2026', text: 'Installed our EV charger in just a couple of hours. Brilliant service.' },
      { name: 'Lucy F.', stars: 4, date: 'Jan 2026', text: 'Very knowledgeable. Found the fault quickly and fixed it. Would use again.' },
    ],
  },
  {
    id: 'p4',
    name: 'GreenThumb Gardens',
    category: 'gardening',
    tagline: 'Transforming outdoor spaces with passion and expertise',
    icon: '🌿',
    about: 'GreenThumb Gardens is run by qualified horticulturalists who love what they do. We offer one-off tidy-ups, regular maintenance contracts, and full landscape design services. Your garden is in safe hands.',
    rating: 4.6,
    reviews: 98,
    price: 35,
    location: 'Suburbs & Rural',
    zip: ['10003','10005','10006','N1','N4','NW3'],
    weekend: true,
    evening: false,
    services: [
      { name: 'Garden tidy / clearance',   price: 120 },
      { name: 'Lawn mowing & edging',      price: 45 },
      { name: 'Hedge trimming',            price: 65 },
      { name: 'Planting & landscaping',    price: 200 },
      { name: 'Regular maintenance (monthly)', price: 80 },
    ],
    reviewList: [
      { name: 'Helen P.', stars: 5, date: 'Feb 2026', text: 'My garden looked completely overgrown before. Now it looks like something from a magazine. Exceptional work!' },
      { name: 'Robert K.', stars: 4, date: 'Jan 2026', text: 'Reliable and friendly. Been using them for monthly maintenance for a year now.' },
      { name: 'Claire D.', stars: 5, date: 'Nov 2025', text: 'Planted a whole new border for us. Really listened to what we wanted. Love the result.' },
    ],
  },
  {
    id: 'p5',
    name: 'Colour Crafters',
    category: 'painting',
    tagline: 'Interior & exterior painting done to perfection',
    icon: '🎨',
    about: 'Colour Crafters is a team of skilled painters and decorators with 15 years of experience. We pride ourselves on meticulous preparation and a flawless finish. Fully insured, references available on request.',
    rating: 4.7,
    reviews: 127,
    price: 40,
    location: 'West Side & Suburbs',
    zip: ['10001','10004','10006','W1','W2','SW6'],
    weekend: true,
    evening: false,
    services: [
      { name: 'Room painting (per room)',  price: 180 },
      { name: 'Exterior house paint',      price: 800 },
      { name: 'Wallpaper hanging',         price: 150 },
      { name: 'Feature wall',              price: 140 },
      { name: 'Fence & decking stain',     price: 180 },
    ],
    reviewList: [
      { name: 'Fiona W.', stars: 5, date: 'Mar 2026', text: 'Painted our entire ground floor. Preparation was thorough and the finish is absolutely perfect. Worth every penny.' },
      { name: 'Gary H.', stars: 4, date: 'Jan 2026', text: 'Excellent work on our exterior. Took a little longer than expected but quality is superb.' },
      { name: 'Sandra O.', stars: 5, date: 'Dec 2025', text: 'Hung our new wallpaper and it looks stunning. Will use again for the upstairs rooms.' },
    ],
  },
  {
    id: 'p6',
    name: 'CoolAir HVAC Solutions',
    category: 'hvac',
    tagline: 'Gas Safe & F-Gas certified heating & cooling engineers',
    icon: '❄️',
    about: 'CoolAir provides expert heating, ventilation and air conditioning services to homes and small businesses. Gas Safe registered and F-Gas certified. We offer same-day emergency callouts and annual service plans.',
    rating: 4.5,
    reviews: 76,
    price: 75,
    location: 'Metro Coverage',
    zip: ['10001','10002','10003','10004','SW1A','WC1'],
    weekend: false,
    evening: false,
    services: [
      { name: 'Boiler repair',             price: 130 },
      { name: 'Air-con installation',      price: 1200 },
      { name: 'Annual heating service',    price: 99 },
      { name: 'Radiator installation',     price: 180 },
      { name: 'Thermostat upgrade',        price: 120 },
    ],
    reviewList: [
      { name: 'Martin G.', stars: 5, date: 'Feb 2026', text: 'Boiler broke on the coldest night of the year. CoolAir had it fixed by 10am. Amazing service.' },
      { name: 'Diane S.', stars: 4, date: 'Jan 2026', text: 'Annual service done promptly. Gave good advice on improving efficiency.' },
      { name: 'Patrick F.', stars: 5, date: 'Nov 2025', text: 'Had a split AC installed. Competitive price and spotless work.' },
    ],
  },
  {
    id: 'p7',
    name: 'Handy Hands',
    category: 'handyman',
    tagline: 'Your local fix-it-all service — no job too small',
    icon: '🔨',
    about: 'Handy Hands is your friendly local handyman service. We handle furniture assembly, picture hanging, minor repairs, door adjustments, and much more. Honest pricing and a smile guaranteed.',
    rating: 4.8,
    reviews: 302,
    price: 45,
    location: 'All Areas',
    zip: ['10001','10002','10003','10004','10005','10006','SW1A','WC1','EC1','E1','N1','W1'],
    weekend: true,
    evening: true,
    services: [
      { name: 'Furniture assembly',        price: 60 },
      { name: 'Picture / mirror hanging',  price: 45 },
      { name: 'Door / lock repair',        price: 70 },
      { name: 'Shelving installation',     price: 80 },
      { name: 'General repairs (hourly)',  price: 45 },
    ],
    reviewList: [
      { name: 'Wendy C.', stars: 5, date: 'Mar 2026', text: 'Assembled a complex wardrobe in 2 hours. Efficient, tidy and great value. Booked again immediately.' },
      { name: 'Ben A.', stars: 5, date: 'Feb 2026', text: 'Fixed several doors, hung mirrors and put up shelves. All done in one visit. Brilliant!' },
      { name: 'Laura M.', stars: 5, date: 'Feb 2026', text: 'Incredibly reliable. Used them 4 times now and never been disappointed.' },
    ],
  },
  {
    id: 'p8',
    name: 'BugBusters Pest Control',
    category: 'pest',
    tagline: 'Fast, discrete & effective pest elimination',
    icon: '🪲',
    about: 'BugBusters are fully BPCA-certified pest control technicians. We deal with rodents, insects, bed bugs and more. All treatments are safe for children and pets when correctly followed. Guaranteed results.',
    rating: 4.6,
    reviews: 88,
    price: 80,
    location: 'City & Suburbs',
    zip: ['10001','10002','10003','10004','10005','SW1A','E1','N1'],
    weekend: true,
    evening: false,
    services: [
      { name: 'Rodent treatment',          price: 150 },
      { name: 'Insect / cockroach treatment', price: 120 },
      { name: 'Bed bug treatment',         price: 250 },
      { name: 'Wasp nest removal',         price: 95 },
      { name: 'Commercial pest survey',    price: 200 },
    ],
    reviewList: [
      { name: 'Natalie R.', stars: 5, date: 'Jan 2026', text: 'Had a mouse problem for weeks. One visit and they were completely gone. Professional and discreet.' },
      { name: 'Chris B.', stars: 4, date: 'Dec 2025', text: 'Quick to respond and sorted the issue efficiently. Would recommend.' },
      { name: 'Jenny T.', stars: 5, date: 'Nov 2025', text: 'Discovered a wasp nest in our loft. BugBusters removed it safely the same day. Excellent.' },
    ],
  },
  {
    id: 'p9',
    name: 'Gleam & Shine Cleaners',
    category: 'cleaning',
    tagline: 'Affordable, reliable domestic cleaning',
    icon: '🧹',
    about: 'Gleam & Shine offers budget-friendly domestic cleaning without cutting corners on quality. Our trained cleaners are police-checked and fully insured. Perfect for weekly or fortnightly top-up cleans.',
    rating: 4.4,
    reviews: 156,
    price: 22,
    location: 'South & West Areas',
    zip: ['10004','10005','10006','SW6','W4','W5','TW1'],
    weekend: false,
    evening: true,
    services: [
      { name: 'Standard clean (2 hrs)',    price: 44 },
      { name: 'Spring clean (3 hrs)',      price: 66 },
      { name: 'Carpet vacuum & steam',     price: 50 },
      { name: 'Window cleaning (interior)',price: 35 },
    ],
    reviewList: [
      { name: 'Becky J.', stars: 4, date: 'Feb 2026', text: 'Great value for money. Always leaves the house spotless. Very happy with the regular service.' },
      { name: 'Mike V.', stars: 5, date: 'Jan 2026', text: 'Friendly cleaner who goes above and beyond. Thoroughly recommended.' },
      { name: 'Lisa E.', stars: 4, date: 'Dec 2025', text: 'Good quality clean. Occasionally have to remind about a few spots but overall very happy.' },
    ],
  },
  {
    id: 'p10',
    name: 'Swift Sparks Electrical',
    category: 'electrical',
    tagline: 'Emergency electrical service — available 24/7',
    icon: '⚡',
    about: 'Swift Sparks specialises in rapid-response electrical repairs and installations. Fully qualified Part P electricians available around the clock. Fixed prices, no hidden extras, job done right first time.',
    rating: 4.5,
    reviews: 112,
    price: 80,
    location: 'City Centre & North',
    zip: ['10001','10002','10003','EC1','EC2','N1','NW1'],
    weekend: true,
    evening: true,
    services: [
      { name: 'Emergency callout',         price: 100 },
      { name: 'Light fixture installation',price: 90 },
      { name: 'Outdoor / garden lighting', price: 150 },
      { name: 'Smoke alarm installation',  price: 65 },
      { name: 'CCTV installation',         price: 350 },
    ],
    reviewList: [
      { name: 'Andrew S.', stars: 5, date: 'Mar 2026', text: 'Power cut on a Sunday night. Swift Sparks arrived in 40 minutes and fixed the fuse. Lifesavers!' },
      { name: 'Carol P.', stars: 4, date: 'Feb 2026', text: 'Installed a CCTV system for us. Good quality equipment and neat installation.' },
      { name: 'Neil H.', stars: 5, date: 'Jan 2026', text: 'Had all the smoke alarms replaced. Quick, cheap and professional.' },
    ],
  },
];

/* ─── App state ──────────────────────────────────── */
const state = {
  searchZip:        '',
  searchCategory:   '',
  filteredResults:  [...PROVIDERS],
  sortedResults:    [...PROVIDERS],
  currentProvider:  null,
  booking:          {},
  bookings:         JSON.parse(localStorage.getItem('hs_bookings') || '[]'),
  prevPage:         'home',
};

/* ─── Page routing ───────────────────────────────── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(`page-${id}`);
  if (page) page.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'my-bookings') renderMyBookings();
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
    results = results.filter(p =>
      p.zip.some(z => z.toUpperCase().startsWith(zip) || zip.startsWith(z.toUpperCase()))
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
    `${catLabel}${zip ? ` · Near ${zip}` : ''}`;

  renderGrid(state.sortedResults);
  resetFilters();
}

function renderGrid(providers) {
  const grid = document.getElementById('listings-grid');

  if (providers.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <h3>No providers found</h3>
        <p>Try a different postcode or service category, or <a href="#" onclick="quickSearch(''); return false;">browse all providers</a>.</p>
      </div>`;
    return;
  }

  grid.innerHTML = providers.map(p => `
    <article class="listing-card" onclick="viewProvider('${p.id}')" tabindex="0"
             onkeydown="if(event.key==='Enter')viewProvider('${p.id}')"
             aria-label="${p.name}, ${categoryLabel(p.category)}, £${p.price}/hr, ${p.rating} stars">
      <div class="listing-card-img">
        <span aria-hidden="true">${p.icon}</span>
        <span class="listing-category-badge">${categoryLabel(p.category)}</span>
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
          <div class="listing-price">£${p.price}/hr</div>
        </div>
      </div>
    </article>
  `).join('');
}

/* ─── Filters & sort ─────────────────────────────── */
function updatePriceLabel(val) {
  document.getElementById('price-label').textContent = `Up to £${val}/hr`;
}

function applyFilters() {
  const maxPrice     = parseInt(document.getElementById('price-filter').value, 10);
  const minRating    = parseFloat(document.getElementById('rating-filter').value);
  const wantWeekend  = document.getElementById('avail-weekend').checked;
  const wantEvening  = document.getElementById('avail-evening').checked;

  let results = state.filteredResults.filter(p => {
    if (p.price > maxPrice)           return false;
    if (p.rating < minRating)         return false;
    if (wantWeekend && !p.weekend)    return false;
    if (wantEvening && !p.evening)    return false;
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
  document.getElementById('price-filter').value = 200;
  document.getElementById('price-label').textContent = 'Up to £200/hr';
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
  state.prevPage = 'listings';

  document.getElementById('provider-detail').innerHTML = `
    <div class="provider-hero">
      <div class="provider-hero-img" aria-hidden="true">${p.icon}</div>
      <div class="provider-hero-body">
        <div class="provider-hero-top">
          <h1 class="provider-name">${p.name}</h1>
          <div class="provider-price-block">
            <div class="provider-price">£${p.price}<span style="font-size:.9rem;font-weight:500">/hr</span></div>
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
          <span class="provider-tag">${categoryLabel(p.category)}</span>
          ${p.weekend ? '<span class="provider-tag">Weekends</span>' : ''}
          ${p.evening ? '<span class="provider-tag">Evenings</span>' : ''}
          <span class="provider-tag">Fully insured</span>
          <span class="provider-tag">DBS checked</span>
        </div>
        <p class="provider-about">${p.about}</p>
      </div>
    </div>

    <div class="provider-layout">
      <div>
        <div class="provider-services-card">
          <h3>Services &amp; pricing</h3>
          <ul class="service-list">
            ${p.services.map(s => `
              <li class="service-item">
                <span>${s.name}</span>
                <span class="service-item-price">£${s.price}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="reviews-card">
          <h3>Customer reviews</h3>
          <div class="review-list">
            ${p.reviewList.map(r => `
              <div class="review-item">
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
          <div class="cta-price">£${p.price}/hr</div>
          <div class="cta-price-sub">All prices include VAT</div>
          <ul class="cta-features">
            <li><span class="check-icon" aria-hidden="true">✓</span> Instant booking confirmation</li>
            <li><span class="check-icon" aria-hidden="true">✓</span> Secure online payment</li>
            <li><span class="check-icon" aria-hidden="true">✓</span> Free cancellation (24h notice)</li>
            <li><span class="check-icon" aria-hidden="true">✓</span> Satisfaction guarantee</li>
          </ul>
          <button class="btn-primary full-width" onclick="startBooking('${p.id}')">Book now</button>
        </div>
      </div>
    </div>
  `;

  showPage('provider');
}

function goBackToListings() {
  showPage('listings');
}

function goBackToProvider() {
  if (state.currentProvider) {
    showPage('provider');
  } else {
    showPage('listings');
  }
}

/* ─── Booking ────────────────────────────────────── */
function startBooking(id) {
  const p = PROVIDERS.find(x => x.id === id);
  if (!p) return;
  state.currentProvider = p;

  document.getElementById('booking-provider-summary').innerHTML = `
    <span class="summary-icon" aria-hidden="true">${p.icon}</span>
    <div class="summary-info">
      <strong>${p.name}</strong>
      <span>${categoryLabel(p.category)} · £${p.price}/hr</span>
    </div>
  `;

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('b-date').min = tomorrow.toISOString().split('T')[0];
  document.getElementById('b-date').value = '';
  document.getElementById('b-duration').value = '1';

  updateBookingTotal();
  showPage('booking');
}

function updateBookingTotal() {
  const p = state.currentProvider;
  if (!p) return;
  const hours   = parseInt(document.getElementById('b-duration').value, 10) || 1;
  const total   = p.price * hours;
  const durText = hours === 1 ? '1 hr' : `${hours} hrs`;
  document.getElementById('total-label').textContent  = `Total (${durText})`;
  document.getElementById('total-amount').textContent = `£${total}`;
  state.booking.total  = total;
  state.booking.hours  = hours;
}

function proceedToPayment(e) {
  e.preventDefault();
  const p = state.currentProvider;

  state.booking.provider   = p;
  state.booking.firstName  = document.getElementById('b-first').value.trim();
  state.booking.lastName   = document.getElementById('b-last').value.trim();
  state.booking.email      = document.getElementById('b-email').value.trim();
  state.booking.phone      = document.getElementById('b-phone').value.trim();
  state.booking.address    = document.getElementById('b-address').value.trim();
  state.booking.date       = document.getElementById('b-date').value;
  state.booking.time       = document.getElementById('b-time').value;
  state.booking.duration   = document.getElementById('b-duration').value;
  state.booking.notes      = document.getElementById('b-notes').value.trim();

  if (!state.booking.date) { showToast('Please select a date'); return; }
  if (!state.booking.time) { showToast('Please select a time slot'); return; }

  // Pre-fill payment name
  document.getElementById('p-name').value =
    `${state.booking.firstName} ${state.booking.lastName}`;

  // Render order summary
  const fmtDate = new Date(state.booking.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const hours   = parseInt(state.booking.duration, 10);
  const timeStr = formatTime12h(state.booking.time);

  document.getElementById('payment-order-summary').innerHTML = `
    <div class="order-summary-row"><span>Provider</span><span>${p.name}</span></div>
    <div class="order-summary-row"><span>Service</span><span>${categoryLabel(p.category)}</span></div>
    <div class="order-summary-row"><span>Date</span><span>${fmtDate}</span></div>
    <div class="order-summary-row"><span>Time</span><span>${timeStr}</span></div>
    <div class="order-summary-row"><span>Duration</span><span>${hours} hour${hours > 1 ? 's' : ''}</span></div>
    <div class="order-summary-row total-row">
      <span><strong>Total</strong></span>
      <span class="total-price">£${state.booking.total}</span>
    </div>
  `;

  document.getElementById('payment-total-amount').textContent = `£${state.booking.total}`;
  showPage('payment');
}

/* ─── Payment ────────────────────────────────────── */
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
  const fields = document.getElementById('billing-address-fields');
  fields.classList.toggle('hidden', same);
}

function processPayment(e) {
  e.preventDefault();

  const card   = document.getElementById('p-card').value.replace(/\s/g, '');
  const expiry = document.getElementById('p-expiry').value;
  const cvv    = document.getElementById('p-cvv').value;

  if (card.length < 16) { showToast('Please enter a valid 16-digit card number'); return; }
  if (!/^\d{2}\/\d{2}$/.test(expiry)) { showToast('Please enter expiry as MM/YY'); return; }
  if (cvv.length < 3) { showToast('Please enter a valid CVV'); return; }

  const btn = document.querySelector('.pay-btn');
  btn.textContent = 'Processing…';
  btn.disabled    = true;

  // Simulate payment processing delay
  setTimeout(() => {
    btn.textContent = 'Pay now';
    btn.disabled    = false;
    confirmBooking();
  }, 1800);
}

/* ─── Confirmation ───────────────────────────────── */
function confirmBooking() {
  const b   = state.booking;
  const id  = 'HS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const fmtDate = new Date(b.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  const hours   = parseInt(b.duration, 10);
  const timeStr = formatTime12h(b.time);

  const record = {
    id,
    providerId:   b.provider.id,
    providerName: b.provider.name,
    category:     b.provider.category,
    icon:         b.provider.icon,
    date:         b.date,
    time:         b.time,
    duration:     hours,
    total:        b.total,
    address:      b.address,
    email:        b.email,
    status:       'confirmed',
    bookedAt:     new Date().toISOString(),
  };

  state.bookings.unshift(record);
  localStorage.setItem('hs_bookings', JSON.stringify(state.bookings));

  document.getElementById('confirmation-details').innerHTML = `
    <span class="booking-id">${id}</span>
    <div class="confirmation-row"><span>Provider</span><span>${b.provider.name}</span></div>
    <div class="confirmation-row"><span>Service</span><span>${categoryLabel(b.provider.category)}</span></div>
    <div class="confirmation-row"><span>Date</span><span>${fmtDate}</span></div>
    <div class="confirmation-row"><span>Time</span><span>${timeStr}</span></div>
    <div class="confirmation-row"><span>Duration</span><span>${hours} hour${hours > 1 ? 's' : ''}</span></div>
    <div class="confirmation-row"><span>Address</span><span>${b.address}</span></div>
    <div class="confirmation-row"><span>Confirmation</span><span>${b.email}</span></div>
    <div class="confirmation-row"><span>Amount paid</span><span>£${b.total}</span></div>
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
    const fmtDate = new Date(b.date + 'T12:00:00').toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
    const timeStr = formatTime12h(b.time);
    return `
      <div class="booking-item">
        <div class="booking-item-icon" aria-hidden="true">${b.icon}</div>
        <div class="booking-item-info">
          <strong>${b.providerName}</strong>
          <span>${categoryLabel(b.category)} · ${fmtDate} at ${timeStr} · ${b.duration}hr</span>
          <span style="display:block;font-size:.78rem;color:#9ca3af;margin-top:.1rem">Booking ref: ${b.id}</span>
        </div>
        <span class="booking-item-status status-${b.status}">${b.status}</span>
        <div class="booking-item-total">£${b.total}</div>
      </div>`;
  }).join('');
}

/* ─── Utilities ──────────────────────────────────── */
function categoryLabel(cat) {
  const labels = {
    cleaning:   'Cleaning',
    plumbing:   'Plumbing',
    electrical: 'Electrical',
    gardening:  'Gardening',
    painting:   'Painting',
    hvac:       'HVAC',
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
  return `${hr12}:${String(m).padStart(2,'0')} ${ampm}`;
}

let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ─── Init ───────────────────────────────────────── */
(function init() {
  // Show all providers on first load as a showcase
  state.filteredResults = [...PROVIDERS];
  state.sortedResults   = sortProviders([...PROVIDERS], 'rating');
})();
