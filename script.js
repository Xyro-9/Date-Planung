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

function notifyDateConfirmed(food, day, time) {
  const prettyDay = day
    ? new Date(`${day}T00:00:00`).toLocaleDateString("de-DE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "💌 Das Date steht!",
      from_name: "date.eneselena.de",
      Essen: food || "-",
      Tag: prettyDay || "-",
      Uhrzeit: time || "-",
    }),
  }).catch(() => {
    /* Benachrichtigung ist nice-to-have, Flow soll dadurch nie blockiert werden */
  });
}
