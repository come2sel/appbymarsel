// Nomor WhatsApp lo
const WA_NUMBER = "6282311746375"; 

// Data produk (Canva & Capcut paling atas)
const products = {
  "CANVA PRO": [
    { desc: "Team Invite 1 Bulan", price: "Rp 4.000", cat: "Editing" },
    { desc: "Team Invite 1 Tahun", price: "Rp 10.000", cat: "Editing" }
  ],
  "CAPCUT": [
    { desc: "Sharing 7 Hari", price: "Rp 5.000", cat: "Editing" },
    { desc: "Private 7 Hari", price: "Rp 8.000", cat: "Editing" },
    { desc: "Sharing 1 Bulan", price: "Rp 10.000", cat: "Editing" },
    { desc: "Private 1 Bulan", price: "Rp 15.000", cat: "Editing" }
  ],
  "VIU": [
    { desc: "Private 1 Bulan", price: "Rp 4.000", cat: "Streaming" },
    { desc: "Private 1 Tahun", price: "Rp 8.000", cat: "Streaming" }
  ],
  "WETV": [
    { desc: "Sharing 1 Bulan", price: "Rp 13.000", cat: "Streaming" },
    { desc: "Private 1 Bulan", price: "Rp 35.000", cat: "Streaming" }
  ],
  "HBO GO / MAX": [
    { desc: "Standar 1 Bulan ", price: "Rp 16.000", cat: "Streaming" },
    { desc: "Ultimate 1 Bulan ", price: "Rp 20.000", cat: "Streaming" }
  ],
  "YOUKU": [
    { desc: "Sharing 1 Bulan", price: "Rp 7.000", cat: "Streaming" },
    { desc: "Sharing 3 Bulan", price: "Rp 9.000", cat: "Streaming" },
    { desc: "Sharing 1 Tahun", price: "Rp 13.000", cat: "Streaming" }
  ],
  "IQIYI": [
    { desc: "Sharing Standar 1 Bulan", price: "Rp 6.000", cat: "Streaming" },
    { desc: "Sharing Standar 3 Bulan", price: "Rp 10.000", cat: "Streaming" },
    { desc: "Sharing Standar 1 Tahun", price: "Rp 16.000", cat: "Streaming" },
    { desc: "Sharing Premium 1 Bulan", price: "Rp 8.500", cat: "Streaming" },
    { desc: "Sharing Premium 3 Bulan", price: "Rp 13.000", cat: "Streaming" },
    { desc: "Sharing Premium 1 Tahun", price: "Rp 19.000", cat: "Streaming" }
  ],
  "PRIME VIDEO": [
    { desc: "Sharing 1 Bulan", price: "Rp 8.000", cat: "Streaming" },
    { desc: "Private 1 Bulan", price: "Rp 15.000", cat: "Streaming" }
  ],
  "Bstation": [
    { desc: "Sharing 1 Bulan", price: "Rp 7.000", cat: "Streaming" },
    { desc: "Sharing 3 Bulan", price: "Rp 10.000", cat: "Streaming" },
    { desc: "Sharing 1 Tahun", price: "Rp 15.000", cat: "Streaming" }
  ],
  "VIDEO PLATINUM": [
    { desc: "Sharing 1 Bulan", price: "Rp 19.000", cat: "Streaming" },
    { desc: "Private 1 Bulan", price: "Rp 30.000", cat: "Streaming" }
  ],
  "CAPCHPLAY": [
    { desc: "Sharing 1 Bulan", price: "Rp 6.000", cat: "Streaming" },
    { desc: "Sharing 6 Bulan", price: "Rp 8.000", cat: "Streaming" },
    { desc: "Sharing 12 Bulan", price: "Rp 13.000", cat: "Streaming" }
  ],
  "DRAKOR ID": [
    { desc: "Sharing 1 Bulan", price: "Rp 6.000", cat: "Streaming" },
    { desc: "Sharing 3 Bulan", price: "Rp 8.000", cat: "Streaming" },
    { desc: "Sharing 12 Bulan", price: "Rp 13.000", cat: "Streaming" }
  ],
  "ALIGHT MOTION": [
    { desc: "Private 1 Tahun", price: "Rp 7.000", cat: "Editing" }
  ],
  "PICSART": [
    { desc: "Sharing 1 Bulan", price: "Rp 8.000", cat: "Editing" },
    { desc: "Private 1 Bulan", price: "Rp 12.000", cat: "Editing" }
  ],
  "QUILLBOT": [
    { desc: "Sharing 1 Bulan", price: "Rp 14.000", cat: "Other" }
  ],
  "GRAMMARLY": [
    { desc: "Sharing 1 Bulan", price: "Rp 14.000", cat: "Other" }
  ],
  "SCRIBD": [
    { desc: "Private 1 Bulan", price: "Rp 10.000", cat: "Other" }
  ],
  "ZOOM": [
    { desc: "Private 14 Hari", price: "Rp 8.000", cat: "Other" }
  ]
};

// Ambil elemen DOM
const grid = document.getElementById('product-grid');
const searchInput = document.getElementById('search');
const filtersContainer = document.getElementById('filters');

// Modal elements
const modal = document.getElementById('order-modal');
const modalApp = document.getElementById('modal-app');
const modalPaket = document.getElementById('modal-paket');
const modalPrice = document.getElementById('modal-price');
const btnWa = document.getElementById('btn-wa');
const btnCancel = document.getElementById('btn-cancel');
const modalClose = document.querySelector('.modal-close');

// Bikin filter chips
const categories = ['all', ...new Set(Object.values(products).flat().map(p => p.cat))];
categories.forEach(cat => {
  const btn = document.createElement('button');
  btn.className = `filter-btn ${cat === 'all' ? 'active' : ''}`;
  btn.dataset.category = cat;
  btn.textContent = cat === 'all' ? 'Semua' : cat;
  filtersContainer.appendChild(btn);
});

// Render produk
function renderData(query = '') {
  grid.innerHTML = '';
  let hasResult = false;

  Object.keys(products).forEach(appName => {
    const items = products[appName];
    const filteredItems = items.filter(item => {
      const matchCat = activeCat === 'all' || item.cat === activeCat;
      const matchSearch = item.desc.toLowerCase().includes(query.toLowerCase()) || 
                          appName.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filteredItems.length > 0) {
      hasResult = true;
      const card = document.createElement('div');
      card.className = 'group-card';

      let listHTML = '';
      filteredItems.forEach(item => {
        listHTML += `
          <div class="item-row" role="button" tabindex="0" 
               data-app="${appName}" data-desc="${item.desc}" data-price="${item.price}">
            <span class="item-name">${item.desc}</span>
            <span class="item-price">${item.price}</span>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="group-header">
          <h2 class="group-title">${appName}</h2>
          <div class="group-subtitle">PAKET</div>
        </div>
        <ul class="item-list">${listHTML}</ul>
      `;
      grid.appendChild(card);
    }
  });

  if (!hasResult) {
    grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:#B44446; padding:40px;">Aplikasi tidak ditemukan.</p>';
  }
}

// ✅ LOGIC MODAL + FORMAT PESAN WA SESUAI REQUEST
function openModal(app, desc, price) {
  modalApp.textContent = app;
  modalPaket.textContent = desc;
  modalPrice.textContent = price;
  
  // Format pesan persis kayak yang lo minta
  const msg = `Halo kak, aku mau order:

• Aplikasi: ${app}
• Paket: ${desc}
• Harga: ${price}`;
  
  btnWa.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Event delegation klik item
grid.addEventListener('click', e => {
  const row = e.target.closest('.item-row');
  if (row) openModal(row.dataset.app, row.dataset.desc, row.dataset.price);
});

// Support keyboard
grid.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const row = e.target.closest('.item-row');
    if (row) { e.preventDefault(); openModal(row.dataset.app, row.dataset.desc, row.dataset.price); }
  }
});

// Tutup modal
btnCancel.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

// Filter & Search
let activeCat = 'all';
let query = '';

function filter() { renderData(query); }

searchInput.addEventListener('input', e => { query = e.target.value; filter(); });

filtersContainer.addEventListener('click', e => {
  if (e.target.classList.contains('filter-btn')) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    activeCat = e.target.dataset.category;
    filter();
  }
});

// Render awal
renderData();