/* =========================================================
   CV. INTANAFDAN - Main Application Logic (assets/js/app.js)
   ========================================================= */

// Data Katalog Bahan Bangunan
const MATERIALS = [
    {
        id: 'pasir-cor',
        name: 'Pasir Cor / Pasir Hitam',
        category: 'alam',
        categoryLabel: 'Material Alam',
        unit: 'Kubik (m³)',
        price: 320000,
        icon: 'fa-mound',
        desc: 'Pasir cuci bersih rendah lumpur, ideal untuk pengecoran struktur dan plesteran.'
    },
    {
        id: 'batu-split',
        name: 'Batu Split 1-2 cm',
        category: 'alam',
        categoryLabel: 'Material Alam',
        unit: 'Kubik (m³)',
        price: 350000,
        icon: 'fa-cubes-stacked',
        desc: 'Batu pecah mesin ukuran standar 1-2 cm untuk campuran beton bertulang.'
    },
    {
        id: 'batu-kali',
        name: 'Batu Kali Pondasi',
        category: 'alam',
        categoryLabel: 'Material Alam',
        unit: 'Kubik (m³)',
        price: 290000,
        icon: 'fa-hill-rockslide',
        desc: 'Batu belah keras berkualitas tinggi untuk pekerjaan pondasi menerus.'
    },
    {
        id: 'semen-50kg',
        name: 'Semen Portland 50 Kg (SNI)',
        category: 'struktur',
        categoryLabel: 'Semen & Struktur',
        unit: 'Sak',
        price: 68000,
        icon: 'fa-bag-shopping',
        desc: 'Daya rekat tinggi untuk struktur beton, pasangan bata, dan acian.'
    },
    {
        id: 'besi-10mm',
        name: 'Besi Beton Polos / Ulir 10mm',
        category: 'besi',
        categoryLabel: 'Besi & Baja',
        unit: 'Batang (12m)',
        price: 76000,
        icon: 'fa-bars-staggered',
        desc: 'Besi beton full standar SNI untuk kolom, balok, dan sloof bangunan.'
    },
    {
        id: 'besi-12mm',
        name: 'Besi Beton Ulir 12mm',
        category: 'besi',
        categoryLabel: 'Besi & Baja',
        unit: 'Batang (12m)',
        price: 112000,
        icon: 'fa-grip-lines',
        desc: 'Besi tulangan ulir berkekuatan tarik tinggi untuk struktur bertingkat.'
    },
    {
        id: 'hebel-bata-ringan',
        name: 'Bata Ringan (Hebel) 10cm',
        category: 'dinding',
        categoryLabel: 'Dinding & Atap',
        unit: 'Kubik (m³)',
        price: 620000,
        icon: 'fa-border-all',
        desc: 'Presisi tinggi, ringan, kedap suara, dan mempercepat pemasangan dinding.'
    },
    {
        id: 'spandek-pasir',
        name: 'Atap Spandek Pasir 0.35mm',
        category: 'dinding',
        categoryLabel: 'Dinding & Atap',
        unit: 'Lembar (3m)',
        price: 145000,
        icon: 'fa-house-chimney',
        desc: 'Atap galvalum berlapis pasir peredam panas dan suara hujan.'
    }
];

// Data Armada Angkutan
const FLEETS = [
    {
        id: 'pickup',
        name: 'Pick Up Bak Terbuka',
        capacity: 'Maks. 1.5 Ton / ± 1.5 m³',
        rate: 150000,
        icon: 'fa-truck-pickup',
        idealFor: 'Jalan perumahan sempit, semen, besi, dan material eceran.'
    },
    {
        id: 'cde-engkel',
        name: 'Truk Engkel (CDE 4 Roda)',
        capacity: 'Maks. 2.5 Ton / ± 3 m³',
        rate: 275000,
        icon: 'fa-truck',
        idealFor: 'Pengiriman pasir, split, bata ringan, dan pindahan barang proyek.'
    },
    {
        id: 'cdd-dump',
        name: 'Dump Truck (CDD 6 Roda)',
        capacity: 'Maks. 6 Ton / ± 6–7 m³',
        rate: 450000,
        icon: 'fa-truck-moving',
        idealFor: 'Material curah (pasir, batu kali, urugan) dengan bongkar hidrolik.'
    },
    {
        id: 'tronton',
        name: 'Dump / Bak Tronton',
        capacity: 'Maks. 20 Ton / ± 20–24 m³',
        rate: 1200000,
        icon: 'fa-truck-front',
        idealFor: 'Suplai proyek skala besar, infrastruktur, dan pengurugan lahan.'
    }
];

// Nomor WhatsApp Resmi CV. INTANAFDAN (ganti sesuai nomor asli)
const WHATSAPP_NUMBER = '6281234567890';

// Format Rupiah
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Render Katalog Material
function renderMaterials(category = 'all', searchQuery = '') {
    const grid = document.getElementById('material-grid');
    if (!grid) return;

    const filtered = MATERIALS.filter(item => {
        const matchCategory = category === 'all' || item.category === category;
        const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
                <i class="fa-solid fa-box-open text-4xl text-slate-300 mb-3"></i>
                <p class="text-slate-600 font-semibold">Material yang dicari tidak ditemukan.</p>
                <p class="text-sm text-slate-400 mt-1">Coba kata kunci lain atau pilih kategori "Semua".</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(item => `
        <div class="material-card bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-700">
                        ${item.categoryLabel}
                    </span>
                    <div class="w-10 h-10 rounded-xl bg-slate-100 text-navy-900 flex items-center justify-center">
                        <i class="fa-solid ${item.icon}"></i>
                    </div>
                </div>
                <h3 class="font-bold text-navy-900 text-lg leading-snug">${item.name}</h3>
                <p class="text-slate-500 text-xs mt-2 leading-relaxed">${item.desc}</p>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100">
                <div class="flex items-baseline justify-between mb-3">
                    <span class="text-lg font-extrabold text-navy-900">${formatRupiah(item.price)}</span>
                    <span class="text-xs text-slate-400">/ ${item.unit}</span>
                </div>
                <button onclick="selectMaterialForCalc('${item.id}')" class="w-full py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-amber-500 text-white hover:text-navy-950 font-bold text-xs transition-colors flex items-center justify-center gap-2">
                    <i class="fa-solid fa-plus"></i> Pilih ke Kalkulator
                </button>
            </div>
        </div>
    `).join('');
}

// Render Armada Angkutan
function renderFleets() {
    const grid = document.getElementById('fleet-grid');
    if (!grid) return;

    grid.innerHTML = FLEETS.map(fleet => `
        <div class="fleet-card bg-navy-800/70 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between">
            <div>
                <div class="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center text-2xl mb-5">
                    <i class="fa-solid ${fleet.icon}"></i>
                </div>
                <h3 class="text-lg font-bold text-white">${fleet.name}</h3>
                <p class="text-amber-400 text-xs font-semibold mt-1">${fleet.capacity}</p>
                <p class="text-slate-300 text-sm mt-3 leading-relaxed">${fleet.idealFor}</p>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-700/80">
                <p class="text-xs text-slate-400">Tarif Dasar Angkutan</p>
                <p class="text-xl font-extrabold text-white mt-0.5">${formatRupiah(fleet.rate)} <span class="text-xs font-normal text-slate-400">/ rit</span></p>
                <button onclick="selectFleetForCalc('${fleet.id}')" class="mt-4 w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs transition-colors">
                    Pilih Armada Ini
                </button>
            </div>
        </div>
    `).join('');
}

// Populate Dropdowns di Kalkulator
function populateCalculatorSelects() {
    const materialSelect = document.getElementById('calc-material');
    const fleetSelect = document.getElementById('calc-fleet');

    if (materialSelect) {
        MATERIALS.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = `${item.name} — ${formatRupiah(item.price)} / ${item.unit}`;
            materialSelect.appendChild(opt);
        });
    }

    if (fleetSelect) {
        FLEETS.forEach(fleet => {
            const opt = document.createElement('option');
            opt.value = fleet.id;
            opt.textContent = `${fleet.name} (${fleet.capacity}) — ${formatRupiah(fleet.rate)}`;
            fleetSelect.appendChild(opt);
        });
    }
}

// Hitung Ulang Estimasi Biaya
function updateEstimate() {
    const matId = document.getElementById('calc-material').value;
    const qty = Math.max(0, parseFloat(document.getElementById('calc-qty').value) || 0);
    const fleetId = document.getElementById('calc-fleet').value;

    const selectedMaterial = MATERIALS.find(m => m.id === matId);
    const selectedFleet = FLEETS.find(f => f.id === fleetId) || FLEETS[0];

    const materialCost = selectedMaterial ? selectedMaterial.price * qty : 0;
    const fleetCost = selectedFleet ? selectedFleet.rate : 0;
    const totalCost = materialCost + fleetCost;

    document.getElementById('summary-material-name').textContent = selectedMaterial
        ? `${selectedMaterial.name} (${qty} ${selectedMaterial.unit})`
        : 'Hanya Jasa Angkut';
    document.getElementById('summary-material-cost').textContent = formatRupiah(materialCost);
    document.getElementById('summary-fleet-name').textContent = selectedFleet ? selectedFleet.name : '-';
    document.getElementById('summary-fleet-cost').textContent = formatRupiah(fleetCost);
    document.getElementById('summary-total').textContent = formatRupiah(totalCost);
}

// Helper dari Tombol Card ke Kalkulator
window.selectMaterialForCalc = function(materialId) {
    const matSelect = document.getElementById('calc-material');
    const qtyInput = document.getElementById('calc-qty');
    if (matSelect) {
        matSelect.value = materialId;
        if (parseFloat(qtyInput.value) <= 0) qtyInput.value = 1;
        updateEstimate();
        document.getElementById('kalkulator').scrollIntoView({ behavior: 'smooth' });
    }
};

window.selectFleetForCalc = function(fleetId) {
    const fleetSelect = document.getElementById('calc-fleet');
    if (fleetSelect) {
        fleetSelect.value = fleetId;
        updateEstimate();
        document.getElementById('kalkulator').scrollIntoView({ behavior: 'smooth' });
    }
};

// Kirim Order ke WhatsApp
function sendWhatsAppOrder() {
    const matId = document.getElementById('calc-material').value;
    const qty = Math.max(0, parseFloat(document.getElementById('calc-qty').value) || 0);
    const fleetId = document.getElementById('calc-fleet').value;
    const customerName = document.getElementById('customer-name').value.trim() || 'Calon Pelanggan';
    const customerAddress = document.getElementById('customer-address').value.trim() || 'Belum diisi';

    const selectedMaterial = MATERIALS.find(m => m.id === matId);
    const selectedFleet = FLEETS.find(f => f.id === fleetId) || FLEETS[0];

    const materialCost = selectedMaterial ? selectedMaterial.price * qty : 0;
    const fleetCost = selectedFleet.rate;
    const totalCost = materialCost + fleetCost;

    const materialLine = selectedMaterial
        ? `• Material: *${selectedMaterial.name}* (${qty} ${selectedMaterial.unit}) = ${formatRupiah(materialCost)}`
        : `• Layanan: *Hanya Jasa Angkutan / Carter Armada*`;

    const message = [
        `Halo *CV. INTANAFDAN*, saya ingin melakukan pemesanan/konfirmasi ketersediaan:`,
        ``,
        `*Data Pemesan:*`,
        `• Nama/Proyek: ${customerName}`,
        `• Alamat Tujuan: ${customerAddress}`,
        ``,
        `*Rincian Pesanan:*`,
        materialLine,
        `• Armada: *${selectedFleet.name}* (${formatRupiah(fleetCost)})`,
        `• *Estimasi Total: ${formatRupiah(totalCost)}*`,
        ``,
        `Mohon info jadwal pengiriman dan ketersediaannya. Terima kasih.`
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Inisialisasi Event Listeners saat DOM Siap
document.addEventListener('DOMContentLoaded', () => {
    // Tahun dinamis di footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Render awal
    renderMaterials();
    renderFleets();
    populateCalculatorSelects();
    updateEstimate();

    // Filter kategori material
    let currentCategory = 'all';
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-material');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active', 'bg-navy-900', 'text-white');
                b.classList.add('bg-white', 'text-slate-700');
            });
            btn.classList.add('active');
            btn.classList.remove('bg-white', 'text-slate-700');
            currentCategory = btn.dataset.category;
            renderMaterials(currentCategory, searchInput ? searchInput.value : '');
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderMaterials(currentCategory, e.target.value);
        });
    }

    // Listener perubahan kalkulator
    ['calc-material', 'calc-qty', 'calc-fleet'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateEstimate);
    });

    // Reset kalkulator
    const resetBtn = document.getElementById('reset-calc-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.getElementById('calc-material').value = '';
            document.getElementById('calc-qty').value = 1;
            document.getElementById('calc-fleet').selectedIndex = 0;
            document.getElementById('customer-name').value = '';
            document.getElementById('customer-address').value = '';
            updateEstimate();
        });
    }

    // Tombol Order WhatsApp
    const waBtn = document.getElementById('whatsapp-order-btn');
    if (waBtn) waBtn.addEventListener('click', sendWhatsAppOrder);

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }
});
