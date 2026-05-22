export class MusicComponent {
    constructor() {
        this.isPlaying = false;
        this.player = document.getElementById('yt-player');
        this.icon = document.getElementById('music-icon');
        this.btn = document.getElementById('music-control');
    }

    init() {
        this.btn.addEventListener('click', () => this.toggle());
    }

    play() {
        this.player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        this.icon.classList.add('animate-spin');
        this.btn.classList.add('pulse-music');
        this.isPlaying = true;
    }

    toggle() {
        if (!this.isPlaying) {
            this.play();
        } else {
            this.player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            this.icon.classList.remove('animate-spin');
            this.btn.classList.remove('pulse-music');
            this.isPlaying = false;
        }
    }
}
