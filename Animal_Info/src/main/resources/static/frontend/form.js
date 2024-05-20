function fetchAnimals() {
    fetch('/animals')
        .then(response => response.json())
        .then(data => populateTable(data))
        .catch(error => console.error('Error getting animal data:', error));
}

document.getElementById('animalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch('/animals', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          alert(' saved successfully!');
          document.getElementById('animalForm').reset();

          fetchAnimals();
      })
      .catch(error => alert('Error : ' + error));
});
