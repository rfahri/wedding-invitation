import { StorageUtil } from '../utils/storage.js';

export class GuestbookComponent {
    constructor() {
        this.STORAGE_KEY = 'wedding_wishes';
        this.defaultWishes = [
            { name: "Siti Rahma Renngur", status: "Hadir", comment: "Selamat menempuh hidup baru Kak Fahri dan Kak Balqis!", time: "2 jam yang lalu" }
        ];
    }

    init() {
        document.getElementById('btn-submit-gb').addEventListener('click', () => this.addComment());
        this.render();
    }

    render() {
        const container = document.getElementById('wishes-box');
        let wishes = StorageUtil.get(this.STORAGE_KEY) || this.defaultWishes;
        
        container.innerHTML = wishes.map(wish => `
            <div class="bg-gray-50 border p-4 rounded-xl text-sm">
                <div class="flex justify-between mb-1">
                    <h4 class="font-bold text-gray-800">${wish.name}</h4>
                    <span class="text-[10px] px-2 rounded-full bg-emerald-50 text-emerald-600">${wish.status}</span>
                </div>
                <p class="text-gray-600 font-light">${wish.comment}</p>
            </div>
        `).join('');
    }

    addComment() {
        const name = document.getElementById('gb-name').value;
        const status = document.getElementById('gb-status').value;
        const comment = document.getElementById('gb-comment').value;

        if(!name.trim() || !comment.trim()) return;

        let current = StorageUtil.get(this.STORAGE_KEY) || this.defaultWishes;
        current.unshift({ name, status, comment, time: "Baru saja" });
        StorageUtil.set(this.STORAGE_KEY, current);

        document.getElementById('gb-name').value = '';
        document.getElementById('gb-comment').value = '';
        this.render();
    }
}
