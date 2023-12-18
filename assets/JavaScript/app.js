// Funzione per mostrare l'album in evidenza //

function albumEvidenza() {
  // Effettua una richiesta HTTP all'API
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=Mika"
  )
    .then((response) => response.json())
    .then((data) => {
      // Popola gli elementi con i dati ottenuti dall'API
      const albumCover = document.getElementById("albumCover");
      const titolo = document.getElementById("testoAlbum");

      // Genera un indice random per selezionare la copertina dell'album
      const randomIndex = Math.floor(Math.random() * data.data.length);

      albumCover.src = data.data[randomIndex].artist.picture_medium;
      titolo.textContent = data.data[randomIndex].title;
      
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
}

albumEvidenza();

function playAlbum() {
  // Add logic for playing the album
  console.log("Play button clicked");
}

function saveAlbum() {
  // Add logic for saving the album
  console.log("Save button clicked");
}

// Funzione per mettere a display in maniera dinamica al refresh un artista diverso per ogni colonna di Buonasera //

function scaricaAlbums() {
  const artists = ["coldplay", "Muse", "Rihanna", "Madonna", "Queen", "Mika"];

  artists.forEach((artist, index) => {
    // Effettua una richiesta HTTP all'API
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
      .then((response) => response.json())
      .then((data) => {
        // Popola gli elementi con i dati ottenuti dall'API
        const div = document.getElementById(`album${index + 1}`);
        const imgElements = div.querySelectorAll("img");
        const title = div.querySelector("small");

        // Genera un indice random per selezionare la copertina dell'album
        const randomIndex1 = Math.floor(Math.random() * data.data.length);
        const randomIndex2 = Math.floor(Math.random() * data.data.length);
        const randomIndex3 = Math.floor(Math.random() * data.data.length);
        const randomIndex4 = Math.floor(Math.random() * data.data.length);

        imgElements[0].src = data.data[randomIndex1].album.cover_medium;
        imgElements[1].src = data.data[randomIndex2].album.cover_medium;
        imgElements[2].src = data.data[randomIndex3].album.cover_medium;
        imgElements[3].src = data.data[randomIndex4].album.cover_medium;
        title.textContent =  data.data[randomIndex1].artist.name;
      })
      .catch((error) => {
        console.error("Si è verificato un errore:", error);
      });
  });
}



scaricaAlbums();

// Funzione per creare dinamicamente 5 card per fare un display di 5 artisti diversi //

function createCards() {
  const artists = ["daftpunk", "coldplay", "Muse", "Rihanna", "Britney"];
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";

  artists.forEach((artist) => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.data.length);
        const song = data.data[randomIndex];
        const card = `
          <div class="card d-flex align-items-center bg-black bg-opacity-25 text-light">
            <img class="card-img-top mt-2" src="${song.album.cover_medium}" alt="Copertina" style="width: 90%">
            <div class="card-body">
              <h5 class="card-title">${song.artist.name}</h5>
            </div>
          </div>
        `;
        cardsContainer.innerHTML += card;
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

createCards(); 

