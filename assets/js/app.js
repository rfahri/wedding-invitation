import { CountdownComponent } from './components/countdown.js';
import { MusicComponent } from './components/music.js';
import { GuestbookComponent } from './components/guestbook.js';
import { RsvpComponent } from './components/rsvp.js';

class App {
    static init() {
        // Inisialisasi Pustaka Animasi Pihak Ketiga
        if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 1000, once: true });
        }

        // Resolusi Nama Tamu Otomatis (URL Parameter Parser)
        const params = new URLSearchParams(window.location.search);
        const toName = params.get('to');
        if (toName) {
            document.getElementById('guest-name').innerText = decodeURIComponent(toName);
        }

        // Instansiasi Komponen Logika Bisnis
        const countdown = new CountdownComponent("Jun 13, 2026 09:00:00");
        const music = new MusicComponent();
        const guestbook = new GuestbookComponent();
        const rsvp = new RsvpComponent();

        countdown.init();
        music.init();
        guestbook.init();
        rsvp.init();

        // Alur pembukaan Splash Screen menuju Main Content
        document.getElementById('btn-open-invitation').addEventListener('click', () => {
            const splash = document.getElementById('splash-screen');
            splash.classList.add('opacity-0', 'scale-105');
            
            setTimeout(() => {
                splash.style.display = 'none';
                const main = document.getElementById('main-content');
                main.classList.remove('hidden');
                setTimeout(() => main.classList.remove('opacity-0'), 50);
            }, 1000);

            // Jalankan musik otomatis pasca interaksi klik pengguna
            music.play();
        });
    }
}

// Jalankan aplikasi utama saat DOM siap
window.addEventListener('DOMContentLoaded', App.init);
