// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Color selection functionality
const selectedColors = {
  interior: null,
  eksterior: null,
  dekoratif: null,
  cargloss: null,
  custom: null,
};

function selectColor(colorElement, productType) {
  // Remove selection from other colors in the same product
  const productCard = colorElement.closest(".product-card");
  productCard.querySelectorAll(".color-option").forEach((option) => {
    option.classList.remove("selected");
  });

  // Add selection to clicked color
  colorElement.classList.add("selected");

  // Store selected color
  const colorName = colorElement.getAttribute("data-color");
  selectedColors[productType] = colorName;

  // Update selected color display
  const selectedDisplay = document.getElementById(productType + "-selected");
  selectedDisplay.textContent = `Warna terpilih: ${colorName}`;

  // Enable buy button
  const buyButton = productCard.querySelector(".buy-button");
  buyButton.disabled = false;
}

function buyNow(productName, productType) {
  const selectedColor = selectedColors[productType];

  if (!selectedColor) {
    alert("Silakan pilih warna terlebih dahulu!");
    return;
  }

  // WhatsApp admin number (ganti dengan nomor admin yang sebenarnya)
  const adminWhatsApp = "6281234567890"; // Ganti dengan nomor admin

  // Create WhatsApp message
  const message = `Halo Admin FDL Warna Mandiri!\n\nSaya tertarik untuk membeli:\n📦 Produk: ${productName}\n🎨 Warna: ${selectedColor}\n\nMohon informasi lebih lanjut mengenai:\n- Harga produk\n- Ketersediaan stok\n- Cara pemesanan\n- Estimasi pengiriman\n\nTerima kasih! 😊`;

  // Encode message for WhatsApp URL
  const encodedMessage = encodeURIComponent(message);

  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodedMessage}`;

  // Open WhatsApp
  window.open(whatsappUrl, "_blank");
}

// Function for floating WhatsApp button
function openWhatsAppAdmin() {
  // WhatsApp admin number (ganti dengan nomor admin yang sebenarnya)
  const adminWhatsApp = "6281234567890"; // Ganti dengan nomor admin

  // Create simple greeting message
  const message = `Halo Admin FDL Warna Mandiri! 👋\n\nSaya ingin bertanya tentang produk cat yang tersedia. Mohon informasi lebih lanjut.\n\nTerima kasih! 😊`;

  // Encode message for WhatsApp URL
  const encodedMessage = encodeURIComponent(message);

  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodedMessage}`;

  // Open WhatsApp
  window.open(whatsappUrl, "_blank");
}

function addCustomColor() {
  // Buat input color picker secara dinamis
  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.style.position = "fixed";
  colorInput.style.left = "-9999px"; // Sembunyikan dari tampilan
  document.body.appendChild(colorInput);

  colorInput.addEventListener("change", function handler() {
    const colorHex = colorInput.value;
    colorInput.removeEventListener("change", handler);
    document.body.removeChild(colorInput);
    const colorName = `Custom ${colorHex}`;
    // Buat elemen warna baru
    const colorOptions = document.getElementById("custom-color-options");
    const newColor = document.createElement("div");
    newColor.className = "color-option";
    newColor.style.backgroundColor = colorHex;
    newColor.setAttribute("data-color", colorName);
    newColor.onclick = function () {
      selectColor(newColor, "custom");
    };
    // Sisipkan sebelum tombol plus
    const addBtn = colorOptions.querySelector(".add-color");
    colorOptions.insertBefore(newColor, addBtn);
    // Otomatis pilih warna custom yang baru
    selectColor(newColor, "custom");
  });

  colorInput.click();
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
  }
});

// Hero animations
setTimeout(() => {
  document.querySelector(".hero h1").style.transform = "translateY(0)";
}, 500);

setTimeout(() => {
  document.querySelector(".hero p").style.transform = "translateY(0)";
}, 700);

setTimeout(() => {
  document.querySelector(".cta-button").style.transform = "translateY(0)";
}, 900);
// Testimoni Carousel Infinite Loop
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("testimoni-carousel");
  if (carousel) {
    // Duplikat isi agar animasi loop mulus
    carousel.innerHTML += carousel.innerHTML;
  }
});

// Highlight menu aktif saat scroll
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Fade-in animasi saat section masuk viewport
function checkFadeIn() {
  document.querySelectorAll(".fade-in").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", checkFadeIn);
window.addEventListener("DOMContentLoaded", checkFadeIn);

function toggleNavbar() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("active");
}
