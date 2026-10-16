const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const form = document.querySelector("[data-contact-form]");
if (form) {
  const WHATSAPP_NUMBER = "919345713457";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector("[data-form-note]");
    const data = new FormData(form);
    const val = (key) => String(data.get(key) || "").trim();
    const lines = [
      "Hello Smartuitions, I would like to make an admission enquiry.",
      "",
      "Student Name: " + val("student"),
      "Parent Phone: " + val("phone"),
      "Class / Standard: " + val("class"),
      "Program Interest: " + val("program")
    ];
    if (val("message")) lines.push("Message: " + val("message"));
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    const popup = window.open(url, "_blank");
    if (popup) {
      popup.opener = null;
    } else {
      window.location.href = url;
    }
    if (note) {
      note.textContent = "Your enquiry has been prepared in WhatsApp. Please check the message and press Send in WhatsApp to confirm it.";
    }
    form.reset();
  });
}
