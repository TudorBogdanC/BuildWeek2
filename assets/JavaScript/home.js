/*window.location.href rappresenta url della pagina scritto nel browser, urlsearchparams serve a prendere un parametro tipo album id per poi usarlo nella fetch corrispondente e inserirlo nella pagina*/

document.addEventListener("DOMContentLoaded", () => {
  albumEvidenza();
  scaricaAlbums();
  createCards();

  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");

  leftBtn.addEventListener("click", () => {
    albumEvidenza();
  });
  rightBtn.addEventListener("click", () => {
    albumEvidenza();
  });
});

/* HOME PAGE Album in evidenza */
async function albumEvidenza() {
  const artists = [
    "coldplay",
    "Muse",
    "Rihanna",
    "Madonna",
    "Queen",
    "Mika",
    "britneyspears",
  ];

  const randomIndex = Math.floor(Math.random() * artists.length);
  const albumArtist = artists[randomIndex];
  try {
    const albumInEvidence = await getAlbumInEvidence(albumArtist);

    if (!albumInEvidence)
      console.error("an error occurred during fetching album in evidence");

    // Popola gli elementi con i dati ottenuti dall'API
    const albumCover = document.getElementById("albumCover");
    const titolo = document.getElementById("testoAlbum");
    const artista = document.getElementById("artistName");
    const ascolta = document.getElementById("ascolta");
    const playBtn = document.getElementById("playBtn");
    // Genera un indice random per selezionare la copertina dell'album
    const randomIndex = Math.floor(Math.random() * albumInEvidence.data.length);

    albumCover.src = albumInEvidence.data[randomIndex].artist.picture_medium;
    titolo.textContent = albumInEvidence.data[randomIndex].title;
    titolo.className = "fw-bold display-1";
    artista.textContent = albumInEvidence.data[randomIndex].artist.name;
    ascolta.textContent = albumInEvidence.data[randomIndex].artist.name;
    ascolta.innerText = `Ascolta il nuovo singolo di ${albumInEvidence.data[randomIndex].artist.name}`;
    playBtn.addEventListener("click", function () {
      setOnPlay(
        albumInEvidence.data[randomIndex].artist.name,
        albumInEvidence.data[randomIndex].title,
        albumInEvidence.data[randomIndex].album.cover_medium,
        albumInEvidence.data[randomIndex].duration
      );
    });
  } catch (error) {
    console.error(
      "an error occurred during fetching album in evidence:",
      error
    );
  }
}
// Funzione per mettere a display in maniera dinamica al refresh un artista diverso per ogni colonna di Buonasera //

async function scaricaAlbums() {
  const artists = ["coldplay", "Muse", "Rihanna", "Madonna", "Queen", "Mika"];
  try {
    artists.forEach(async (artist, index) => {
      // Effettua una richiesta HTTP all'API
      const contents = await searchArtistContent(artist);

      if (!contents) {
        console.error("Error during searching artist contents.");
        return;
      }

      // Popola gli elementi con i dati ottenuti dall'API
      const div = document.getElementById(`album${index + 1}`);
      const imgElements = div.querySelectorAll("img");
      const title = div.querySelector("small");

      // Genera un indice random per selezionare la copertina dell'album
      const randomIndex1 = Math.floor(Math.random() * contents.data.length);
      const randomIndex2 = Math.floor(Math.random() * contents.data.length);
      const randomIndex3 = Math.floor(Math.random() * contents.data.length);
      const randomIndex4 = Math.floor(Math.random() * contents.data.length);

      imgElements[0].src = contents.data[randomIndex1].album.cover_medium;
      imgElements[1].src = contents.data[randomIndex2].album.cover_medium;
      imgElements[2].src = contents.data[randomIndex3].album.cover_medium;
      imgElements[3].src = contents.data[randomIndex4].album.cover_medium;
      title.textContent = contents.data[randomIndex1].artist.name;
    });
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
}

// Funzione per creare dinamicamente 5 card per fare un display di 5 artisti diversi //

async function createCards() {
  const artists = ["Mika", "coldplay", "Muse", "Rihanna", "Britney"];
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";
  try {
    artists.forEach(async (artist) => {
      const contents = await searchArtistContent(artist);

      if (!contents) {
        console.error("Error during searching artist contents.");
        return;
      }

      const randomIndex = Math.floor(Math.random() * contents.data.length);
      const song = contents.data[randomIndex];
      const card = `
          <div class="card d-flex align-items-center bg-black bg-opacity-25 text-light">
            <img class="card-img-top mt-2" src="${song.album.cover_medium}" alt="Copertina" style="width: 90%">
            <div class="card-body">
              <h5 class="card-title">${song.artist.name}</h5>
            </div>
          </div>
        `;
      cardsContainer.innerHTML += card;
    });
  } catch (error) {
    console.log(error);
  }
}
