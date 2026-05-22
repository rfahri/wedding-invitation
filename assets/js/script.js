// Tailwind Script
tailwind.config = {
    content: [],
    theme: { extend: {} }
}

// Guest Name
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get('kpd') || "Bapak/Ibu/Saudara/i";
document.getElementById('guest-name').textContent = decodeURIComponent(guest);

// Open Invitation
function openInvitation() {
    const opening = document.getElementById('opening');
    opening.style.opacity = '0';
    setTimeout(() => {
        opening.style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('backsound').play().catch(() => {});
    }, 1000);
}

// Countdown
const eventDate = new Date("2026-06-13T09:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);

    document.getElementById('countdown').innerHTML = `
        <div class="text-center"><div class="text-5xl">${days}</div><div class="text-sm tracking-widest">HARI</div></div>
        <div class="text-center"><div class="text-5xl">${hours}</div><div class="text-sm tracking-widest">JAM</div></div>
        <div class="text-center"><div class="text-5xl">${minutes}</div><div class="text-sm tracking-widest">MENIT</div></div>
        <div class="text-center"><div class="text-5xl">${seconds}</div><div class="text-sm tracking-widest">DETIK</div></div>
    `;
}, 1000);

// Guestbook (Simple)
document.getElementById('guestbook-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("✅ Ucapan berhasil dikirim! Terima kasih.");
    this.reset();
});

AOS.init({ duration: 1000, once: true });