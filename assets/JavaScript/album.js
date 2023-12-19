/*window.location.href rappresenta url della pagina scritto nel browser, urlsearchparams serve a prendere un parametro tipo album id per poi usarlo nella fetch corrispondente e inserirlo nella pagina*/

document.addEventListener("DOMContentLoaded", () => {
  let url = new URL(window.location.href);
  if (url.searchParams.get("albumId")) {
    let albumId = url.searchParams.get("albumId");

    getAlbumData(albumId);
  }
});

async function getAlbumData(albumId) {
  try {
    const album = await getAlbumById(albumId);

    if (!album) {
      console.error("Invalid or missing data in the API response.");
      return;
    }

    albumCard(album); // Pass the response to albumCard function
  } catch (error) {
    console.error("Error fetching album data:", error);
  }
}

async function albumCard(album) {
  // Check if the response contains the necessary information

  // Access the cover_xl property from the response
  const cover = album.cover_medium;
  const title = album.title;
  const artistPic = album.artist.picture;
  const artistName = album.artist.name;
  const artistId = album.artist.id;
  const year = new Date(album.release_date).getFullYear();
  const numTracks = album.nb_tracks;
  const durationSec = album.duration;
  const durationMin = normalizeTime(durationSec, true);
  const tracks = album.tracks.data;

  //const artistPic = response.album.contributors.picture_small;
  // Crea l'elemento div con la classe 'col-3 card text-bg-light mb-3'
  const cardAlbum = document.getElementById("bg-image");
  const cardTracks = document.getElementById("listaTracks");

  const list = `
  <div class="row text-light mt-5">
      <div class="col-1 text-end">#</div>
      <div class="col-6">TITOLO</div>
    
      <div class="col-3 text-end">RIPRODUZIONI</div>
      <div class="col-2 text-end">
        <i
         class="fa-regular fa-clock fa-xs"
         style="color: #d2d9e4"
        ></i>
  </div>
`;

  cardTracks.innerHTML += list;

  tracks.forEach((track, index) => {
    // Creazione della riga
    let row = createNewRow("text-light mt-5");
    row.style.cursor = "pointer";
    row.addEventListener("click", function () {
      setOnPlay(track.artist.name, track.title, track.album.cover_medium);
    });
    // Creazione delle colonne
    let colIndex = createNewCol(1, "text-end");
    colIndex.textContent = index + 1;
    row.appendChild(colIndex);

    let colDetails = createNewCol(6);
    colDetails.innerHTML = `${track.title}<br>${track.artist.name}`;
    row.appendChild(colDetails);

    let colRank = createNewCol(3, "text-end");
    colRank.textContent = track.rank;
    row.appendChild(colRank);

    let colDuration = createNewCol(2, "text-end");
    colDuration.textContent = normalizeTime(track.duration);
    row.appendChild(colDuration);

    // Aggiunta della riga al contenitore
    cardTracks.appendChild(row);
  });

  // Crea l'elemento div con la classe 'card-body' e aggiungilo come figlio di cardDiv
  const div = `
    
      <div class="row d-flex">
        <div class="col-4">
          <img src="${cover}" salt="albumPicture">
        </div>
        <div class="col-8 text-light d-flex flex-column align-items-start align-self-end">
        <small>ALBUM</small>
        <h1 class="mb-3 display-2 fw-bolder">${title}</h1>
        <small><img class="rounded-circle" style="width: 5%;" src="${artistPic}" alt="artistPicture">
        <a class="text-decoration-none text-light" href="./artist.html?artistId=${artistId}">${artistName}</a> • ${year} • ${numTracks} brani, ${durationMin}
        </small>
        </div>
      </div>
    
    
  `;
  cardAlbum.innerHTML += div;
}
