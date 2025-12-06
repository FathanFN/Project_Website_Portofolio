// ========== INTERSECTION OBSERVER UNTUK SCROLL ANIMATION ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// ========== TOGGLE GAMBAR ABOUT SECTION ==========
let currentAboutImage = "Image/user.jpg";
const aboutImages = ["Image/user.jpg", "Image/user2.png"];

function toggleAboutImage() {
  console.log("toggleAboutImage dipanggil!");
  const aboutImage = document.getElementById("aboutImage");
  const singleBtn = document.querySelector(".single-image-btn");

  if (!aboutImage || !singleBtn) {
    console.error("Element tidak ditemukan!");
    return;
  }

  // Tentukan gambar berikutnya
  const currentIndex = aboutImages.indexOf(currentAboutImage);
  const nextIndex = (currentIndex + 1) % aboutImages.length;
  const nextImage = aboutImages[nextIndex];

  console.log("Mengganti gambar dari", currentAboutImage, "ke", nextImage);

  // Tambah efek fade out
  aboutImage.style.opacity = "0";
  aboutImage.style.transform = "scale(0.95)";

  // Animasi tombol
  singleBtn.style.transform = "rotate(180deg)";

  // Ganti gambar setelah efek fade out
  setTimeout(() => {
    aboutImage.src = nextImage;
    aboutImage.alt = "Fathan Firdaus Nuzulan";
    currentAboutImage = nextImage;

    // Tambah efek fade in
    aboutImage.style.opacity = "1";
    aboutImage.style.transform = "scale(1)";
    aboutImage.classList.add("image-fade-in");

    // Reset animasi tombol
    setTimeout(() => {
      singleBtn.style.transform = "rotate(0deg)";
    }, 300);

    // Hapus kelas animation setelah selesai
    setTimeout(() => {
      aboutImage.classList.remove("image-fade-in");
    }, 500);
  }, 200);
}

// ========== TAB FUNCTIONALITY ==========
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, event) {
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// ========== PROJECT MODAL FUNCTIONALITY ==========
const projectModal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const modalType = document.getElementById("modalType");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.querySelector(".close");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const currentImageSpan = document.getElementById("currentImage");
const totalImagesSpan = document.getElementById("totalImages");

let currentProjectImages = [];
let currentImageIndex = 0;

function openProjectModal(images, type, title, description) {
  if (event) {
    event.preventDefault();
  }
  currentProjectImages = images;
  currentImageIndex = 0;

  modalImg.src = images[0];
  modalType.textContent = type;
  modalTitle.textContent = title;
  modalDesc.textContent = description;

  currentImageSpan.textContent = currentImageIndex + 1;
  totalImagesSpan.textContent = images.length;

  updateNavigationButtons();

  projectModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function updateNavigationButtons() {
  prevBtn.style.display = currentProjectImages.length > 1 ? "block" : "none";
  nextBtn.style.display = currentProjectImages.length > 1 ? "block" : "none";
  document.querySelector(".image-counter").style.display =
    currentProjectImages.length > 1 ? "block" : "none";
}

function nextImage() {
  if (currentProjectImages.length > 1) {
    currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
    modalImg.src = currentProjectImages[currentImageIndex];
    currentImageSpan.textContent = currentImageIndex + 1;
  }
}

function prevImage() {
  if (currentProjectImages.length > 1) {
    currentImageIndex =
      (currentImageIndex - 1 + currentProjectImages.length) %
      currentProjectImages.length;
    modalImg.src = currentProjectImages[currentImageIndex];
    currentImageSpan.textContent = currentImageIndex + 1;
  }
}

function closeProjectModal() {
  projectModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Event Listeners untuk Modal
closeModal.addEventListener("click", closeProjectModal);
prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

window.addEventListener("click", function (event) {
  if (event.target === projectModal) {
    closeProjectModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeProjectModal();
  }

  if (projectModal.style.display === "block") {
    if (event.key === "ArrowLeft") {
      prevImage();
    } else if (event.key === "ArrowRight") {
      nextImage();
    }
  }
});

// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", function () {
  // Setup tombol toggle gambar
  const toggleButton = document.querySelector(".single-image-btn");
  if (toggleButton) {
    toggleButton.addEventListener("click", function (event) {
      event.preventDefault();
      toggleAboutImage();
    });
  }

  // Setup tab functionality dengan event listeners
  document.querySelectorAll(".tab-links").forEach((tab) => {
    tab.addEventListener("click", function (event) {
      const tabname = this.getAttribute("onclick").match(/'([^']+)'/)[1];
      opentab(tabname, event);
    });
  });

  // ========== MOBILE MENU TOGGLE ==========
  const menuToggle = document.createElement("div");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  menuToggle.addEventListener("click", toggleMobileMenu);

  // Cari nav dan masukkan menu toggle
  const nav = document.querySelector("nav");
  const navList = document.querySelector("nav ul");

  // Pastikan Logo dan menu toggle ada di nav yang sama
  if (nav && navList) {
    nav.appendChild(menuToggle);
  }

  function toggleMobileMenu() {
    navList.classList.toggle("show");

    // Ganti icon menu/hamburger
    const icon = menuToggle.querySelector("i");
    if (navList.classList.contains("show")) {
      icon.className = "fas fa-times";
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    } else {
      icon.className = "fas fa-bars";
      document.body.style.overflow = "auto";
    }
  }

  // Tutup menu ketika klik di luar
  document.addEventListener("click", function (event) {
    if (navList && navList.classList.contains("show")) {
      if (!nav.contains(event.target) && !navList.contains(event.target)) {
        navList.classList.remove("show");
        const icon = menuToggle.querySelector("i");
        icon.className = "fas fa-bars";
        document.body.style.overflow = "auto";
      }
    }
  });

  // Tutup menu ketika klik link
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navList.classList.contains("show")) {
        navList.classList.remove("show");
        const icon = menuToggle.querySelector("i");
        icon.className = "fas fa-bars";
        document.body.style.overflow = "auto";
      }
    });
  });

  console.log("Semua JavaScript sudah dimuat!");
  console.log(
    "Fungsi toggleAboutImage tersedia:",
    typeof toggleAboutImage === "function"
  );
  console.log("Gambar yang tersedia:", aboutImages);
});

/* ini buat form emailjs */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("SERVICE_ID", "TEMPLATE_ID", this).then(
    () => {
      alert("Pesan berhasil dikirim!");
    },
    (error) => {
      alert("Gagal mengirim pesan.", error);
    }
  );
});

