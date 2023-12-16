/* Album in evidenza */ 


function albumEvidenza() {
    // Effettua una richiesta HTTP all'API
    fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=britneyspears')
      .then(response => response.json())
      .then(data => {
        // Popola gli elementi con i dati ottenuti dall'API
        const albumCover = document.getElementById('albumCover');
        const titolo = document.getElementById('testoAlbum');
  
        // Genera un indice random per selezionare la copertina dell'album
        const randomIndex = Math.floor(Math.random() * data.data.length);
  
        albumCover.src = data.data[randomIndex].artist.picture_medium;
        titolo.textContent = data.data[randomIndex].title;
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error);
      });
  }
  
  function playAlbum() {
    // Add logic for playing the album
    console.log('Play button clicked');
  }
  
  function saveAlbum() {
    // Add logic for saving the album
    console.log('Save button clicked');
  }
  
  albumEvidenza();
  
  



  function scaricaAlbums() {
    const artists = ['coldplay', 'Muse', 'Rihanna', 'Elodie', 'Queen', 'marina'];
    
    artists.forEach((artist, index) => {
      // Effettua una richiesta HTTP all'API
      fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=[${artist}]`)
        .then(response => response.json())
        .then(data => {
          // Popola gli elementi con i dati ottenuti dall'API
          const div = document.getElementById(`album${index + 1}`);
          const img = div.querySelector('img');
          const title = div.querySelector('small');
    
          // Genera un indice random per selezionare la copertina dell'album
          const randomIndex = Math.floor(Math.random() * data.data.length);
    
          img.src = data.data[randomIndex].artist.picture_medium;
          title.textContent = data.data[randomIndex].title;
        })
        .catch(error => {
          console.error('Si è verificato un errore:', error);
        });
    });
  }
  
  scaricaAlbums();