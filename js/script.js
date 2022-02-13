let bukuBelumDibaca = [];
let bukuSudahDibaca = [];
const storageBelumDibaca = "Buku_Belum_Dibaca";
const storageSudahDibaca = "Buku_Sudah_Dibaca";

if (typeof Storage !== "undefined") {
  let dataBelumDibaca = JSON.parse(localStorage.getItem(storageBelumDibaca));
  let dataSudahDibaca = JSON.parse(localStorage.getItem(storageSudahDibaca));
  if (dataBelumDibaca !== null) {
    bukuBelumDibaca = dataBelumDibaca;
    updateBelumDibaca();
  }
  if (dataSudahDibaca !== null) {
    bukuSudahDibaca = dataSudahDibaca;
    updateSudahDibaca();
  }
} else {
  alert("Browser tidak mendukung local storage.");
}

function saveData() {
  const stringBelumDibaca = JSON.stringify(bukuBelumDibaca);
  localStorage.setItem(storageBelumDibaca, stringBelumDibaca);
  const stringSudahDibaca = JSON.stringify(bukuSudahDibaca);
  localStorage.setItem(storageSudahDibaca, stringSudahDibaca);
  updateBelumDibaca();
  updateSudahDibaca();
}

function searchBuku() {
  var input = document.querySelector("#search-keyword").value.toUpperCase();
  var infoBuku = document.querySelectorAll(".info");
  var itemBuku = document.querySelectorAll(".book-item");

  for (let i = 0; i < itemBuku.length; i++) {
    var kontenBuku = infoBuku[i].innerText.toUpperCase();
    if (kontenBuku.indexOf(input) > -1) {
      itemBuku[i].style.display = "";
    } else {
      itemBuku[i].style.display = "none";
    }
  }
}

var modalTambah = document.querySelector("#tambah-buku-section");
var closeTambah = document.querySelector(".close");
function modalBukuBaru() {
  modalTambah.style.display = "block";

  closeTambah.onclick = () => {
    modalTambah.style.display = "none";
  };
}

const formBukuBaru = document.querySelector("#tambah-buku-form");
formBukuBaru.addEventListener("submit", (event) => {
  event.preventDefault();
  tambahBuku();
  formBukuBaru.reset();
  modalTambah.style.display = "none";
});

function tambahBuku() {
  let bukuBaru = {};
  bukuBaru.id = Date.now();
  bukuBaru.title = document.querySelector("#tambah-buku-judul").value;
  bukuBaru.author = document.querySelector("#tambah-buku-penulis").value;
  bukuBaru.year = document.querySelector("#tambah-buku-tahun").value;
  bukuBaru.isComplete = document.querySelector("#tambah-buku-selesai").checked;
  if (bukuBaru.isComplete) {
    bukuSudahDibaca.push(bukuBaru);
  } else {
    bukuBelumDibaca.push(bukuBaru);
  }
  saveData();
}

function pindahBelumKeSudah(index) {
  var bukuPindah = bukuBelumDibaca.splice(index, 1)[0];
  bukuPindah.isComplete = true;
  bukuSudahDibaca.push(bukuPindah);
  saveData();
}

function pindahSudahKeBelum(index) {
  var bukuPindah = bukuSudahDibaca.splice(index, 1)[0];
  bukuPindah.isComplete = false;
  bukuBelumDibaca.push(bukuPindah);
  saveData();
}

var modalDelete = document.querySelector("#del-confirm");
var closeDelete = document.querySelector(".close-del");
var yesBtn = document.querySelector("#del-yes");
var noBtn = document.querySelector("#del-no");
function hapusBuku(index, isDibaca) {
  modalDelete.style.display = "block";

  closeDelete.onclick = () => {
    modalDelete.style.display = "none";
  };
  window.onclick = (event) => {
    if (event.target == modalDelete) {
      modalDelete.style.display = "none";
    }
  };
  noBtn.onclick = () => {
    modalDelete.style.display = "none";
  };

  yesBtn.onclick = () => {
    if (isDibaca) {
      bukuSudahDibaca.splice(index, 1);
    } else {
      bukuBelumDibaca.splice(index, 1);
    }
    saveData();
    modalDelete.style.display = "none";
  };
}

function updateBelumDibaca() {
  let compileBelumDibaca = "";
  for (let i = 0; i < bukuBelumDibaca.length; i++) {
    compileBelumDibaca += `
      <article class="book-item">
        <div class="info">
          <h3>${bukuBelumDibaca[i].title}</h3>
          <p>Penulis: ${bukuBelumDibaca[i].author}</p>
          <p>Tahun: ${bukuBelumDibaca[i].year}</p>
        </div>
        <div class="action">
          <button class="swap" onclick="pindahBelumKeSudah(${i})">Selesai Dibaca</button>
          <button class="delete" onclick="hapusBuku(${i}, false)">Hapus Buku</button>
        </div>
      </article>
      `;
  }
  const htmlBelumDibaca = document.querySelector("#belum-dibaca-list");
  htmlBelumDibaca.innerHTML = compileBelumDibaca;
  if (htmlBelumDibaca.innerHTML == "") {
    htmlBelumDibaca.innerHTML = `<div class="empty-list">Daftar buku yang belum selesai dibaca masih kosong.</div>`;
  }
}

function updateSudahDibaca() {
  let compileSudahDibaca = "";
  for (let i = 0; i < bukuSudahDibaca.length; i++) {
    compileSudahDibaca += `
      <article class="book-item">
        <div class="info">
          <h3>${bukuSudahDibaca[i].title}</h3>
          <p>Penulis: ${bukuSudahDibaca[i].author}</p>
          <p>Tahun: ${bukuSudahDibaca[i].year}</p>
        </div>
        <div class="action">
          <button class="swap" onclick="pindahSudahKeBelum(${i})">Belum Selesai</button>
          <button class="delete" onclick="hapusBuku(${i}, true)">Hapus Buku</button>
        </div>
      </article>
      `;
  }
  const htmlSudahDibaca = document.querySelector("#sudah-dibaca-list");
  htmlSudahDibaca.innerHTML = compileSudahDibaca;
  if (htmlSudahDibaca.innerHTML == "") {
    htmlSudahDibaca.innerHTML = `<div class="empty-list">Daftar buku yang sudah selesai dibaca masih kosong.</div>`;
  }
}
