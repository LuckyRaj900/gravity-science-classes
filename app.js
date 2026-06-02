const pages = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["courses.html", "Courses"],
  ["science.html", "Science"],
  ["mathematics.html", "Mathematics"],
  ["dashboard.html", "Dashboard"],
  ["lectures.html", "Lectures"],
  ["notes.html", "Notes"],
  ["tests.html", "Tests"],
  ["contact.html", "Admission"],
  ["admin.html", "Admin"],
  ["payment.html", "Payments"]
];

const lectures = [
  ["Class 10 Physics", "Light Reflection and Refraction", "Dr. Ananya Singh", "48 min", "CBSE", "Physics", "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=900&q=80"],
  ["Class 12 Chemistry", "Electrochemistry Masterclass", "Prof. R. Kumar", "62 min", "BSEB", "Chemistry", "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=900&q=80"],
  ["NEET Biology", "Human Physiology Rapid Revision", "Dr. Meera Jha", "55 min", "NEET", "Biology", "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80"],
  ["JEE Mathematics", "Limits and Continuity", "Amit Verma", "71 min", "JEE", "Mathematics", "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80"],
  ["Class 9 Science", "Atoms and Molecules", "Prof. R. Kumar", "39 min", "CBSE", "Chemistry", "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80"],
  ["Class 11 Physics", "Newton's Laws", "Dr. Ananya Singh", "58 min", "BSEB", "Physics", "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=900&q=80"]
];

const WHATSAPP_NUMBER = "919999999999";

function icon(name) {
  const map = {
    menu: "M4 6h16M4 12h16M4 18h16",
    moon: "M21 12.8A8.5 8.5 0 1111.2 3 6.8 6.8 0 0021 12.8z",
    sun: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z",
    rocket: "M4.5 16.5c-1.5 1.26-2 4.5-2 4.5s3.24-.5 4.5-2C7.7 18.2 7.7 17.2 7 16.5c-.7-.7-1.7-.7-2.5 0zM12 15l-3-3c.8-4.8 3.8-7.8 9-9 1.2 5.2-1.8 8.2-6 12zM15 6l3 3"
  };
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${map[name] || map.rocket}"/></svg>`;
}

function buildHeader() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.body.insertAdjacentHTML("afterbegin", `
    <header class="site-header">
      <nav class="nav">
        <a class="brand" href="index.html"><span class="brand-mark">${icon("rocket")}</span><span>Gravity Science Classes</span></a>
        <div class="nav-links" id="navLinks">
          ${pages.slice(0, 10).map(([href, label]) => `<a href="${href}" class="${current === href ? "active" : ""}">${label}</a>`).join("")}
        </div>
        <div class="nav-actions">
          <button class="icon-btn" id="themeToggle" title="Toggle dark mode" aria-label="Toggle dark mode">${icon(localStorage.theme === "dark" ? "sun" : "moon")}</button>
          <a class="btn small orange" href="login.html">Login</a>
          <button class="menu-btn" id="menuBtn" aria-label="Open menu">${icon("menu")}</button>
        </div>
      </nav>
    </header>`);
}

function buildFooter() {
  document.body.insertAdjacentHTML("beforeend", `
    <footer class="footer">
      <div class="section-inner">
        <div class="footer-grid">
          <div>
            <h3>Gravity Science Classes</h3>
            <p>Premium coaching for CBSE, BSEB, JEE and NEET students with lecture library, notes, tests, admissions, payments and dashboards.</p>
          </div>
          <div><h3>Academics</h3><div class="footer-links"><a href="courses.html">Courses</a><a href="science.html">Science Department</a><a href="mathematics.html">Mathematics Department</a></div></div>
          <div><h3>Platform</h3><div class="footer-links"><a href="dashboard.html">Student Dashboard</a><a href="lectures.html">Lecture Library</a><a href="notes.html">Study Materials</a></div></div>
          <div><h3>Connect</h3><div class="footer-links"><a href="contact.html">Admissions</a><a href="payment.html">Pay Fees</a><a href="admin.html">Admin Panel</a></div></div>
        </div>
        <div class="copyright">© 2026 Gravity Science Classes. All rights reserved.</div>
      </div>
    </footer>
    <div class="assistant">
      <div class="chat-panel" id="chatPanel">
        <div class="chat-head">AI Study Assistant</div>
        <div class="chat-log" id="chatLog"><div class="bubble">Ask me for course guidance, notes, test strategy, or admission help.</div></div>
        <div class="chat-input"><input id="chatInput" placeholder="Ask a study question"><button class="btn small primary" id="chatSend">Send</button></div>
      </div>
      <button class="btn orange" id="chatToggle">AI Help</button>
    </div>`);
}

function initCommon() {
  document.documentElement.dataset.theme = localStorage.theme || "light";
  buildHeader();
  buildFooter();
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.theme = next;
    document.getElementById("themeToggle").innerHTML = icon(next === "dark" ? "sun" : "moon");
  });
  document.getElementById("menuBtn")?.addEventListener("click", () => document.getElementById("navLinks").classList.toggle("open"));
  const observer = new IntersectionObserver(items => items.forEach(item => item.isIntersecting && item.target.classList.add("visible")), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  document.getElementById("chatToggle")?.addEventListener("click", () => document.getElementById("chatPanel").classList.toggle("open"));
  document.getElementById("chatSend")?.addEventListener("click", sendChat);
  document.getElementById("chatInput")?.addEventListener("keydown", e => { if (e.key === "Enter") sendChat(); });
}

function sendChat() {
  const input = document.getElementById("chatInput");
  const log = document.getElementById("chatLog");
  const text = input.value.trim();
  if (!text) return;
  log.insertAdjacentHTML("beforeend", `<div class="bubble"><strong>You:</strong> ${text}</div>`);
  const reply = text.toLowerCase().includes("jee") ? "For JEE, start with Physics concepts, daily maths practice, and weekly mock analysis." : "I can help you find lectures, notes, tests, and admission details from this platform.";
  log.insertAdjacentHTML("beforeend", `<div class="bubble"><strong>Assistant:</strong> ${reply}</div>`);
  input.value = "";
}

function renderLectures(target = "#lectureGrid", filter = "All") {
  const el = document.querySelector(target);
  if (!el) return;
  const data = filter === "All" ? lectures : lectures.filter(x => x.includes(filter));
  el.innerHTML = data.map(([course, title, teacher, duration, board, subject, img]) => `
    <article class="card lecture-card reveal">
      <img src="${img}" alt="${title}">
      <div class="body">
        <div class="meta"><span class="pill">${course}</span><span class="pill">${board}</span><span class="pill">${subject}</span></div>
        <h3>${title}</h3>
        <p>${teacher} · ${duration}</p>
        <button class="btn primary small" data-video="${title}">Watch</button>
      </div>
    </article>`).join("");
}

function initFilters() {
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderLectures("#lectureGrid", btn.dataset.filter);
    });
  });
}

function initUploads() {
  document.querySelectorAll("[data-upload]").forEach(input => {
    input.addEventListener("change", () => {
      const preview = input.closest(".admin-upload").querySelector(".upload-preview");
      preview.textContent = input.files.length ? `${input.files.length} file ready: ${Array.from(input.files).map(f => f.name).join(", ")}` : "No file selected.";
    });
  });
}

function initForms() {
  document.querySelectorAll("form[data-demo]:not([data-whatsapp-enroll])").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      form.querySelector("[data-status]").textContent = "Submitted successfully. Our team will contact you shortly.";
      form.reset();
    });
  });
}

function initWhatsAppEnroll() {
  document.querySelectorAll("form[data-whatsapp-enroll]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);
      const message = [
        "New student enrollment request for Gravity Science Classes",
        "",
        `Student Name: ${data.get("studentName") || ""}`,
        `Phone: ${data.get("phone") || ""}`,
        `Class/Course: ${data.get("course") || ""}`,
        `Board/Exam: ${data.get("board") || ""}`,
        `Preferred Subject: ${data.get("subject") || ""}`,
        `Message: ${data.get("message") || "Please contact me for admission details."}`
      ].join("\n");
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      form.querySelector("[data-status]").textContent = "Opening WhatsApp with the student's enrollment details.";
      window.open(url, "_blank", "noopener");
    });
  });
}

function initTestTimer() {
  const timer = document.getElementById("timer");
  if (!timer) return;
  let seconds = 900;
  setInterval(() => {
    seconds = Math.max(0, seconds - 1);
    timer.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  }, 1000);
  document.getElementById("submitTest")?.addEventListener("click", () => {
    document.getElementById("testResult").textContent = "Auto evaluated: 8/10 correct. Rank estimate: Top 12%.";
  });
}

function initSearch() {
  const input = document.getElementById("materialSearch");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll("[data-material]").forEach(card => {
      card.style.display = card.dataset.material.toLowerCase().includes(q) ? "" : "none";
    });
  });
}

function initPayment() {
  document.getElementById("payNow")?.addEventListener("click", () => {
    document.getElementById("paymentStatus").textContent = "Demo payment captured. Connect Razorpay Checkout with your live key on backend deployment.";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCommon();
  renderLectures();
  initFilters();
  initUploads();
  initForms();
  initWhatsAppEnroll();
  initTestTimer();
  initSearch();
  initPayment();
});
