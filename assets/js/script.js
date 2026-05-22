// Tailwind Script
tailwind.config = {
    content: [],
    theme: { extend: {} }
}

// Your web app's Firebase configuration
// === Firebase Config ===
const firebaseConfig = {
    apiKey: "AIzaSyAa1IVrlRpJenwE3cOO4tJkt89ag9NajsQ",
    authDomain: "fahri-rizki-wedding.firebaseapp.com",
    databaseURL: "https://fahri-rizki-wedding-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fahri-rizki-wedding",
    storageBucket: "fahri-rizki-wedding.firebasestorage.app",
    messagingSenderId: "245636728968",
    appId: "1:245636728968:web:132368dc347ccb2681f73d",
    measurementId: "G-K998RCPKZV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Guest Name
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get('kpd') || "Bapak/Ibu/Saudara/i";
document.getElementById('guest-name').textContent = decodeURIComponent(guest);

// Open Invitation
function openInvitation() {
    document.getElementById('opening').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('opening').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
        document.getElementById('backsound').play().catch(() => {});
    }, 800);
}

// Countdown
const eventDate = new Date("2026-06-13T09:00:00").getTime();
setInterval(() => {
    const distance = eventDate - new Date().getTime();
    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);

    document.getElementById('countdown').innerHTML = `
        <div class="text-center"><div class="text-5xl font-light">${days}</div><small class="text-xs tracking-widest">HARI</small></div>
        <div class="text-center"><div class="text-5xl font-light">${hours}</div><small class="text-xs tracking-widest">JAM</small></div>
        <div class="text-center"><div class="text-5xl font-light">${minutes}</div><small class="text-xs tracking-widest">MENIT</small></div>
        <div class="text-center"><div class="text-5xl font-light">${seconds}</div><small class="text-xs tracking-widest">DETIK</small></div>
    `;
}, 1000);

// === Firebase Guestbook ===
const ucapanList = document.getElementById('ucapan-list');

function loadUcapan() {
    db.ref('ucapan').orderByChild('timestamp').limitToLast(50).on('value', (snapshot) => {
        ucapanList.innerHTML = '';
        snapshot.forEach((child) => {
            const data = child.val();
            const div = document.createElement('div');
            div.className = "bg-white p-6 rounded-2xl shadow border border-gray-100";
            div.innerHTML = `
                <p class="font-semibold text-[#800000]">${data.nama}</p>
                <p class="mt-2 text-gray-700">${data.ucapan}</p>
                <small class="text-gray-400 text-xs mt-3 block">${new Date(data.timestamp).toLocaleString('id-ID')}</small>
            `;
            ucapanList.appendChild(div);
        });
    });
}

// Submit Ucapan
document.getElementById('guestbook-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nama = document.getElementById('nama').value.trim();
    const ucapan = document.getElementById('ucapan').value.trim();

    if (nama && ucapan) {
        db.ref('ucapan').push({
            nama: nama,
            ucapan: ucapan,
            timestamp: Date.now()
        });
        alert("✅ Ucapan berhasil dikirim!");
        e.target.reset();
    }
});

// Initialize
AOS.init({ duration: 1000, once: true });
loadUcapan();
