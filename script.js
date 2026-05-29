// ============================================================
//  Mie Ayam Kartotiyasan Mas Fajar — script.js
// ============================================================

// ── Menu Data ──────────────────────────────────────────────
const menuItems = [
  { cat: "andalan", emoji: "🍜", name: "Mie Ayam Original", desc: "Mie kenyal dengan ayam berbumbu khas, kuah kaldu gurih, dan taburan daun bawang segar.", price: "Rp 12.000", badge: "Favorit" },
  { cat: "andalan", emoji: "🥣", name: "Mie Ayam Special", desc: "Versi spesial dengan potongan ayam lebih banyak, pangsit rebus, dan sambal khas.", price: "Rp 15.000", badge: "Best Seller" },
  { cat: "andalan", emoji: "🍲", name: "Mie Ayam Bakso", desc: "Perpaduan sempurna mie ayam dengan bakso kenyal berukuran jumbo dan kuah segar.", price: "Rp 15.000", badge: "" },
  { cat: "andalan", emoji: "🌟", name: "Mie Ayam Komplit", desc: "Paket lengkap: mie ayam, bakso, pangsit, dan telur — sajian paling komplit kami.", price: "Rp 18.000", badge: "Rekomendasi" },
  { cat: "andalan", emoji: "🍳", name: "Mie Goreng Ayam", desc: "Mie goreng kering dengan ayam berbumbu, telur, dan sayuran segar pilihan.", price: "Rp 14.000", badge: "" },
  { cat: "pelengkap", emoji: "🥟", name: "Pangsit Goreng", desc: "Pangsit kulit tipis renyah dengan isian ayam berbumbu, cocok sebagai pelengkap.", price: "Rp 8.000", badge: "" },
  { cat: "pelengkap", emoji: "🥚", name: "Telur Rebus", desc: "Telur rebus setengah matang, pelengkap sempurna semangkuk mie ayam Anda.", price: "Rp 3.000", badge: "" },
  { cat: "pelengkap", emoji: "🧄", name: "Ekstra Ayam", desc: "Tambahan topping ayam berbumbu untuk porsi yang lebih memuaskan.", price: "Rp 5.000", badge: "" },
  { cat: "minuman", emoji: "🍵", name: "Es Teh Manis", desc: "Teh manis dingin segar, pelengkap wajib makan mie ayam di hari yang panas.", price: "Rp 4.000", badge: "" },
  { cat: "minuman", emoji: "☕", name: "Teh Hangat", desc: "Teh hangat pilihan, cocok dinikmati di pagi hari bersama semangkuk mie ayam.", price: "Rp 3.000", badge: "" },
  { cat: "minuman", emoji: "💧", name: "Air Mineral", desc: "Air mineral botol untuk menjaga keseimbangan cairan tubuh Anda.", price: "Rp 3.000", badge: "" },
];

function renderMenu(cat) {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;
  const filtered = cat === "semua" ? menuItems : menuItems.filter(m => m.cat === cat);
  grid.innerHTML = filtered.map(m => `
    <div class="menu-card reveal">
      <div class="menu-img" style="background: linear-gradient(135deg,#fdf6ec,#f5e0c8)">
        <span>${m.emoji}</span>
        ${m.badge ? `<div class="menu-badge">${m.badge}</div>` : ""}
      </div>
      <div class="menu-body">
        <h3>${m.name}</h3>
        <p>${m.desc}</p>
        <div class="menu-footer">
          <span class="menu-price">${m.price}</span>
          <button class="menu-order-btn" onclick="scrollToPesan('${m.name}')">Pesan →</button>
        </div>
      </div>
    </div>
  `).join("");
  observeReveal();
}

function scrollToPesan(name) {
  document.querySelector("#pesan").scrollIntoView({ behavior: "smooth" });
  // pre-select the menu option in the order form
  setTimeout(() => {
    const sel = document.querySelector(".pesan-form select");
    if (!sel) return;
    for (const opt of sel.options) {
      if (opt.text.includes(name.replace(" Original","").slice(0,8))) {
        sel.value = opt.value;
        break;
      }
    }
  }, 700);
}

// ── Tab click ───────────────────────────────────────────────
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderMenu(btn.dataset.cat);
  });
});

renderMenu("semua");

// ── Navbar scroll ───────────────────────────────────────────
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 60);
});

// ── Hamburger / mobile menu ─────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});
function closeMobile() { mobileMenu.classList.remove("open"); }

// ── Scroll reveal ────────────────────────────────────────────
function observeReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

// Add reveal to non-menu elements
document.querySelectorAll(
  ".tentang-card, .th-item, .info-card, .testi-card, .gal-item, .footer-grid > *"
).forEach(el => el.classList.add("reveal"));
observeReveal();

// ── Star rating ─────────────────────────────────────────────
let selectedRating = 0;
document.querySelectorAll(".star-rating span").forEach(star => {
  star.addEventListener("mouseenter", () => {
    const v = +star.dataset.v;
    document.querySelectorAll(".star-rating span").forEach(s => {
      s.classList.toggle("active", +s.dataset.v <= v);
    });
  });
  star.addEventListener("mouseleave", () => {
    document.querySelectorAll(".star-rating span").forEach(s => {
      s.classList.toggle("active", +s.dataset.v <= selectedRating);
    });
  });
  star.addEventListener("click", () => {
    selectedRating = +star.dataset.v;
    document.querySelectorAll(".star-rating span").forEach(s => {
      s.classList.toggle("active", +s.dataset.v <= selectedRating);
    });
  });
});

// ── Testimoni form ───────────────────────────────────────────
const testiForm = document.getElementById("testiForm");
const testiSuccess = document.getElementById("testiSuccess");
if (testiForm) {
  testiForm.addEventListener("submit", e => {
    e.preventDefault();
    testiForm.style.display = "none";
    testiSuccess.style.display = "block";
    setTimeout(() => {
      testiForm.style.display = "block";
      testiSuccess.style.display = "none";
      testiForm.reset();
      selectedRating = 0;
      document.querySelectorAll(".star-rating span").forEach(s => s.classList.remove("active"));
    }, 4000);
  });
}

// ── Pesan form ───────────────────────────────────────────────
const pesanForm = document.getElementById("pesanForm");
const pesanSuccess = document.getElementById("pesanSuccess");
if (pesanForm) {
  pesanForm.addEventListener("submit", e => {
    e.preventDefault();
    const nama = pesanForm.querySelector("input[type=text]").value;
    const wa   = pesanForm.querySelector("input[type=tel]").value;
    const menu = pesanForm.querySelector("select").value;
    const jumlah = pesanForm.querySelector("input[type=number]").value;
    const jenis  = pesanForm.querySelectorAll("select")[1].value;
    const catatan = pesanForm.querySelector("textarea").value;

    // Build WhatsApp message
    const msg = encodeURIComponent(
      `Halo Mie Ayam Kartotiyasan Mas Fajar! 🍜\n\n` +
      `Saya ingin memesan:\n` +
      `• Nama: ${nama}\n` +
      `• Menu: ${menu}\n` +
      `• Jumlah: ${jumlah} porsi\n` +
      `• Jenis: ${jenis}\n` +
      (catatan ? `• Catatan: ${catatan}\n` : "") +
      `\nNo. WA: ${wa}\n\nTerima kasih! 🙏`
    );

    window.open(`https://wa.me/6281234567890?text=${msg}`, "_blank");

    pesanForm.style.display = "none";
    pesanSuccess.style.display = "block";
    setTimeout(() => {
      pesanForm.style.display = "block";
      pesanSuccess.style.display = "none";
      pesanForm.reset();
    }, 5000);
  });
}

// ── Active nav link on scroll ────────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute("href") === "#" + current ? "var(--terracotta)" : "";
  });
});