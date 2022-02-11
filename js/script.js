let bukuBelumDibaca = [];
let bukuSudahDibaca = [];
const storageBelumDibaca = "Buku-Belum-Dibaca";
const storageSudahDibaca = "Buku-Sudah-Dibaca";

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

function tambahBuku() {
  let bukuBaru = {};
  bukuBaru.id = Date.now();
  bukuBaru.title = document.querySelector("#inputBookTitle").value;
  bukuBaru.author = document.querySelector("#inputBookAuthor").value;
  bukuBaru.year = document.querySelector("#inputBookYear").value;
  bukuBaru.isComplete = document.querySelector("#inputBookIsComplete").checked;
  if (bukuBaru.isComplete) {
    bukuSudahDibaca.push(bukuBaru);
  } else {
    bukuBelumDibaca.push(bukuBaru);
  }
  saveData();
}

const formBukuBaru = document.querySelector("#inputBook");
formBukuBaru.addEventListener("submit", (event) => {
  event.preventDefault();
  tambahBuku();
  formBukuBaru.reset();
});

function hapusBukuBelum(index) {
  bukuBelumDibaca.splice(index, 1);
  saveData();
}

function hapusBukuSudah(index) {
  bukuSudahDibaca.splice(index, 1);
  saveData();
}

function pindahBelumKeSudah(index) {
  bukuSudahDibaca.push(bukuBelumDibaca.splice(index, 1)[0]);
  saveData();
}

function pindahSudahKeBelum(index) {
  bukuBelumDibaca.push(bukuSudahDibaca.splice(index, 1)[0]);
  saveData();
}

function updateBelumDibaca() {
  let compileBelumDibaca = "";
  for (let i = 0; i < bukuBelumDibaca.length; i++) {
    compileBelumDibaca += `
      <article class="book_item">
        <h3>${bukuBelumDibaca[i].title}</h3>
        <p>Penulis: ${bukuBelumDibaca[i].author}</p>
        <p>Tahun: ${bukuBelumDibaca[i].year}</p>

        <div class="action">
          <button class="green" onclick="pindahBelumKeSudah(${i})">Selesai dibaca</button>
          <button class="red" onclick="hapusBukuBelum(${i})">Hapus buku</button>
        </div>
      </article>
      `;
  }
  const htmlBelumDibaca = document.querySelector("#incompleteBookshelfList");
  htmlBelumDibaca.innerHTML = compileBelumDibaca;
}

function updateSudahDibaca() {
  let compileSudahDibaca = "";
  for (let i = 0; i < bukuSudahDibaca.length; i++) {
    compileSudahDibaca += `
      <article class="book_item">
        <h3>${bukuSudahDibaca[i].title}</h3>
        <p>Penulis: ${bukuSudahDibaca[i].author}</p>
        <p>Tahun: ${bukuSudahDibaca[i].year}</p>

        <div class="action">
          <button class="green" onclick="pindahSudahKeBelum(${i})">Belum selesai dibaca</button>
          <button class="red" onclick="hapusBukuSudah(${i})">Hapus buku</button>
        </div>
      </article>
      `;
  }
  const htmlSudahDibaca = document.querySelector("#completeBookshelfList");
  htmlSudahDibaca.innerHTML = compileSudahDibaca;
}
