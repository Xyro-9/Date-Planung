function spawnParticles(containerId, emoji, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { interval = 900, minSize = 14, maxSize = 26, opacity = 0.5 } = options;

  function spawn() {
    const el = document.createElement("div");
    el.className = "particle";
    el.textContent = emoji;
    el.style.left = `${Math.random() * 100}vw`;
    el.style.fontSize = `${minSize + Math.random() * (maxSize - minSize)}px`;
    el.style.opacity = opacity;
    const duration = 7 + Math.random() * 6;
    el.style.animationDuration = `${duration}s`;
    container.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
  }

  setInterval(spawn, interval);
  for (let i = 0; i < 6; i++) {
    setTimeout(spawn, i * 250);
  }
}

function saveDateChoice(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    /* ignore storage errors */
  }
}

function loadDateChoice(key) {
  try {
    return localStorage.getItem(key) || "";
  } catch (e) {
    return "";
  }
}

const WEB3FORMS_ACCESS_KEY = "b437899e-3b65-49d1-b705-c351b046dfcf";

function buildDateIcs(food, day, time) {
  if (!day || !time) return null;

  const [year, month, dayNum] = day.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const start = new Date(year, month - 1, dayNum, hour, minute);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const pad = (n) => String(n).padStart(2, "0");
  const asIcsDate = (d) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  const uid = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`) + "@date.eneselena.de";

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//date.eneselena.de//Date Planung//DE",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${asIcsDate(new Date())}`,
    `DTSTART:${asIcsDate(start)}`,
    `DTEND:${asIcsDate(end)}`,
    "SUMMARY:Unser Date 💕",
    `DESCRIPTION:Essen: ${food || "Überraschung"}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Blob([lines.join("\r\n")], { type: "text/calendar" });
}

function notifyDateConfirmed(food, day, time) {
  const prettyDay = day
    ? new Date(`${day}T00:00:00`).toLocaleDateString("de-DE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const formData = new FormData();
  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("subject", "💌 Das Date steht!");
  formData.append("from_name", "date.eneselena.de");
  formData.append("Essen", food || "-");
  formData.append("Tag", prettyDay || "-");
  formData.append("Uhrzeit", time || "-");

  const ics = buildDateIcs(food, day, time);
  if (ics) {
    formData.append("attachment", ics, "date.ics");
  }

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    keepalive: true,
    body: formData,
  }).catch(() => {
    /* Benachrichtigung ist nice-to-have, Flow soll dadurch nie blockiert werden */
  });
}

function burstAt(x, y, emojiList) {
  const emojis = emojiList || ["💖", "✨", "💕", "🌸"];
  for (let i = 0; i < 6; i++) {
    const el = document.createElement("div");
    el.className = "tap-burst";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 45;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
    el.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
    el.style.setProperty("--tr", `${Math.random() * 60 - 30}deg`);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 700);
  }
}

document.addEventListener("pointerdown", (e) => {
  const target = e.target.closest(".btn, .food-option");
  if (!target || target.disabled) return;
  burstAt(e.clientX, e.clientY);
});
