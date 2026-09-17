const askScreen = document.getElementById("askScreen");
const yesScreen = document.getElementById("yesScreen");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const counter = document.getElementById("counter");
const subtext = document.getElementById("subtext");

const dodgeMessages = [
  "Bist du sicher? 🥺",
  "Wirklich wirklich sicher?",
  "Ok aber... nochmal überlegen?",
  "Der Knopf hat auch keine Lust wegzulaufen 😅",
  "Komm schon 🥹",
  "Letzte Chance...",
  "Du kriegst mich nicht 😌",
];

let dodgeCount = 0;
let yesScale = 1;

function dodgeNoButton() {
  const rect = noBtn.getBoundingClientRect();
  const margin = 16;
  const maxX = window.innerWidth - rect.width - margin;
  const maxY = window.innerHeight - rect.height - margin;

  const newX = Math.max(margin, Math.random() * maxX);
  const newY = Math.max(margin, Math.random() * maxY);

  noBtn.classList.add("escaping");
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;

  dodgeCount += 1;
  yesScale = Math.min(1.6, 1 + dodgeCount * 0.06);
  yesBtn.style.transform = `scale(${yesScale})`;

  const message = dodgeMessages[Math.min(dodgeCount - 1, dodgeMessages.length - 1)];
  counter.textContent = message;
}

noBtn.addEventListener("mouseenter", dodgeNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dodgeNoButton();
}, { passive: false });
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dodgeNoButton();
});

yesBtn.addEventListener("click", () => {
  askScreen.classList.add("hidden");
  yesScreen.classList.remove("hidden");
  launchConfetti();
});

// Floating hearts background
const heartsBg = document.getElementById("heartsBg");
const heartEmojis = ["💖", "💕", "💗", "💘", "💝", "❤️"];

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${14 + Math.random() * 18}px`;
  const duration = 6 + Math.random() * 6;
  heart.style.animationDuration = `${duration}s`;
  heartsBg.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(spawnHeart, 600);
for (let i = 0; i < 8; i++) {
  setTimeout(spawnHeart, i * 200);
}

// Confetti on "Yes"
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchConfetti() {
  const colors = ["#ff6b9d", "#c44569", "#ff9a9e", "#fecfef", "#ffd166", "#ffffff"];
  const pieces = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.5,
    size: 6 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: 2 + Math.random() * 3,
    speedX: -2 + Math.random() * 4,
    rotation: Math.random() * 360,
    rotationSpeed: -6 + Math.random() * 12,
  }));

  const start = performance.now();
  const duration = 4000;

  function frame(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });

    if (elapsed < duration) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(frame);
}
