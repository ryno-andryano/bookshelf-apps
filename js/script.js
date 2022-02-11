let bukuBelumDibaca = [];
let bukuSudahDibaca = [];

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
  updateBelumDibaca();
  updateSudahDibaca();
}

const formBukuBaru = document.querySelector("#inputBook");
formBukuBaru.addEventListener("submit", (event) => {
  event.preventDefault();
  tambahBuku();
});

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

function hapusBukuBelum(index) {
  bukuBelumDibaca.splice(index, 1);
  updateBelumDibaca();
}

function hapusBukuSudah(index) {
  bukuSudahDibaca.splice(index, 1);
  updateSudahDibaca();
}

function pindahBelumKeSudah(index) {
  bukuSudahDibaca.push(bukuBelumDibaca.splice(index, 1)[0]);
  updateBelumDibaca();
  updateSudahDibaca();
}

function pindahSudahKeBelum(index) {
  bukuBelumDibaca.push(bukuSudahDibaca.splice(index, 1)[0]);
  updateSudahDibaca();
  updateBelumDibaca();
}
