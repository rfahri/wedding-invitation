export class CountdownComponent {
    constructor(targetDateString) {
        this.targetDate = new Date(targetDateString).getTime();
    }

    init() {
        this.updateDOM();
        setInterval(() => this.updateDOM(), 1000);
    }

    updateDOM() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) return;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(d).padStart(2, '0');
        document.getElementById("hours").innerText = String(h).padStart(2, '0');
        document.getElementById("minutes").innerText = String(m).padStart(2, '0');
        document.getElementById("seconds").innerText = String(s).padStart(2, '0');
    }
}
