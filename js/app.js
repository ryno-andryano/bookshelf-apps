let bukuBelumDibaca = [];
let bukuSudahDibaca = [];

function tambahBuku() {
  let bukuBaru = {};
  bukuBaru.id = Date.now();
  bukuBaru.judul = document.querySelector("#inputBookTitle").value;
  bukuBaru.penulis = document.querySelector("#inputBookAuthor").value;
  bukuBaru.tahun = document.querySelector("#inputBookYear").value;
  bukuBaru.isDibaca = document.querySelector("#inputBookIsComplete").checked;
  if (bukuBaru.isDibaca) {
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
        <h3>${bukuBelumDibaca[i].judul}</h3>
        <p>Penulis: ${bukuBelumDibaca[i].penulis}</p>
        <p>Tahun: ${bukuBelumDibaca[i].tahun}</p>

        <div class="action">
          <button class="green">Belum selesai di Baca</button>
          <button class="red">Hapus buku</button>
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
        <h3>${bukuSudahDibaca[i].judul}</h3>
        <p>Penulis: ${bukuSudahDibaca[i].penulis}</p>
        <p>Tahun: ${bukuSudahDibaca[i].tahun}</p>

        <div class="action">
          <button class="green">Belum selesai di Baca</button>
          <button class="red">Hapus buku</button>
        </div>
      </article>
      `;
  }
  const htmlSudahDibaca = document.querySelector("#completeBookshelfList");
  htmlSudahDibaca.innerHTML = compileSudahDibaca;
}
