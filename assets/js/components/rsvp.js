export class RsvpComponent {
    init() {
        document.getElementById('rsvp-form').addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        // Logika pengiriman data asli/API eksternal bisa disisipkan di sini
        document.getElementById('rsvp-toast').classList.remove('hidden');
        document.getElementById('rsvp-form').reset();
    }
}
