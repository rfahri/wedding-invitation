// Ambil parameter nama dari URL
const urlParams = new URLSearchParams(window.location.search);

const guest = urlParams.get('to');

if (guest) {
  document.getElementById("guestName").innerText =
    decodeURIComponent(guest);
}

// Buka undangan
function openInvitation() {

  document.querySelector(".overlay").style.display = "none";

  document.getElementById("content").style.display = "block";

  document.getElementById("music").play();
}