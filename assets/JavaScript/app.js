/*window.location.href rappresenta url della pagina scritto nel browser, urlsearchparams serve a prendere un parametro tipo album id per poi usarlo nella fetch corrispondente e inserirlo nella pagina*/

document.addEventListener("DOMContentLoaded", () => {
  let url = new URL(window.location.href);
  if (url.searchParams.get("albumId")) {
    let albumId = url.searchParams.get("albumId");
    /*FUNZIONE PER POPOLARE ALBUM*/
  }
  if (url.searchParams.get("artistId")) {
    let artistId = url.searchParams.get("artistId");
    /*FUNZIONE PER POPOLARE ARTIST*/
  }
  /*EVENTO INPUT SEARCH BAR DA 3 CARATTERI*/
  let searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("input", () => {
    if (searchBar.value.length >= 3) {
      searchContent(searchBar.value);
    }
  });
});

/*FETCH API*/
async function searchContent(text) {
  let response = await (
    await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=artist:"${text}"`
    )
  ).json();

  createCard(response.data);
}

/*CARDS NELLA SEARCH*/

function createCard(list) {
  if (!list.length > 0) return;

  let contentList = document.getElementById("contentList");
  contentList.innerHTML = "";

  let currentRow = createNewRow();

  for (let i = 0; i < list.length; i++) {
    if (i % 5 == 0 || i == list.length) {
      contentList.appendChild(currentRow);
      currentRow = createNewRow();
    }

    currentRow.appendChild(buildCard(list[i]));
  }
}
/*CREO UNA ROW GENERICA*/
function createNewRow() {
  let newRow = document.createElement("div");
  newRow.classList.add("row");
  return newRow;
}

/*CREO LA SINGOLA CARD*/
function buildCard(el) {
  // Crea l'elemento div con la classe 'col-3 card text-bg-light mb-3'
  const cardDiv = document.createElement("div");
  cardDiv.className = "col-3 card bg-dark text-bg-secondary border-0 m-1 mb-3";
  cardDiv.style.width = "10rem";
  cardDiv.style.height = "15rem";
  cardDiv.style.background = "0";

  // Crea l'elemento div con la classe 'card-header' e aggiungilo come figlio di cardDiv
  // const cardHeaderDiv = document.createElement("div");
  // cardHeaderDiv.className = "card-header";
  // cardHeaderDiv.innerText = el.artist.name;
  // cardDiv.appendChild(cardHeaderDiv);

  // Crea l'elemento div con la classe 'card-body' e aggiungilo come figlio di cardDiv
  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body p-1";
  cardDiv.appendChild(cardBodyDiv);

  const imgTrack = document.createElement("a");
  imgTrack.href = `./album.html?albumId=${el.album.id}`;

  let img = document.createElement("img");
  img.className = "mt-0 img-fluid rounded-3";
  img.src = el.album.cover_medium;
  // Crea l'elemento h5 con la classe 'card-title' e aggiungilo come figlio di cardBodyDiv
  const track = document.createElement("h5");
  track.className = "card-title mb-0";
  track.innerText = `${el.title}`;

  const artist = document.createElement("a");
  artist.className = "card-text text-secondary text-decoration-none lh-1";
  artist.href = `./artist.html?artistId=${el.artist.id}`;
  artist.innerText = el.artist.name;

  // Crea l'elemento p con la classe 'card-text' e aggiungilo come figlio di cardBodyDiv
  const album = document.createElement("a");
  album.className = "card-text text-secondary text-decoration-none lh-1";
  album.href = `./album.html?albumId=${el.album.id}`;
  album.innerText = el.album.title;

  imgTrack.appendChild(img);
  cardBodyDiv.appendChild(imgTrack);
  cardBodyDiv.appendChild(track);
  cardBodyDiv.appendChild(artist);
  cardBodyDiv.appendChild(document.createElement("br"));
  // Aggiungi cardText come figlio di cardBodyDiv
  cardBodyDiv.appendChild(album);
  return cardDiv;
}

/* HOME PAGE Album in evidenza */
function albumEvidenza() {
  // Effettua una richiesta HTTP all'API
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=britneyspears"
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

