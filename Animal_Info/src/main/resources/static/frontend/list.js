function fetchAnimals() {
    fetch('/animals')
        .then(response => response.json())
        .then(data => populateTable(data))
        .catch(error => console.error('Error fetching animal data:', error));
}

function populateTable(animals) {
    const tbody = document.getElementById('animalTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    animals.forEach(animal => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = animal.name;
        row.insertCell(1).textContent = animal.category;
        row.insertCell(2).textContent = animal.description;
        row.insertCell(3).textContent = animal.lifeExpectancy;
        const actionsCell = row.insertCell(4);
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editAnimal(animal.id);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteAnimal(animal.id, row);
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}

function editAnimal(id) {

    fetch(`/animals/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to get animal.');
            }
            return response.json();
        })
        .then(animal => {
            // Populate form fields with animal data for editing
            document.getElementById('animalId').value = animal.id;
            document.getElementById('name').value = animal.name;
            document.getElementById('category').value = animal.category;
            document.getElementById('description').value = animal.description;
            document.getElementById('lifeExpectancy').value = animal.lifeExpectancy;


            document.getElementById('animalForm').action = `/animals/${id}`;

            document.querySelector('button[type="submit"]').textContent = 'Update';
        })
        .catch(error => {
            console.error('Error fetching animal', error);
            alert('Failed.');
        });
}

function updateAnimal() {
    const id = document.getElementById('animalId').value;
    const data = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        lifeExpectancy: document.getElementById('lifeExpectancy').value
    };

    // Optimistically update the UI
    const table = document.getElementById('animalTable');
    const rows = Array.from(table.rows).slice(1);
    rows.forEach(row => {
        if (row.cells[0].textContent == data.name) {
            row.cells[1].textContent = data.category;
            row.cells[2].textContent = data.description;
            row.cells[3].textContent = data.lifeExpectancy;
        }
    });

    fetch(`/animals/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update ');
        }
        // Display success message
        alert(' data updated successfully.');
    })
    .catch(error => {
        console.error('Error updating animal data:', error);
        alert('Failed to update animal ');
        // Revert UI changes in case of an error
        fetchAnimals();
    });
}

document.getElementById('animalForm').addEventListener('submit', function(event) {
    event.preventDefault();
    updateAnimal();
});

function deleteAnimal(id, row) {
       const tbody = row.parentNode;
    tbody.removeChild(row);

    fetch(`/animals/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete animal.');
        }

    })
    .catch(error => {
        console.error('Error deleting animal:', error);
        alert('Failed to delete animal');

        fetchAnimals();
    });
}

function sortTable(columnIndex) {
    const table = document.getElementById('animalTable');
    const rows = Array.from(table.rows).slice(1);
    const sortedRows = rows.sort((a, b) => a.cells[columnIndex].textContent.localeCompare(b.cells[columnIndex].textContent));
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    sortedRows.forEach(row => tbody.appendChild(row));
}

document.addEventListener('DOMContentLoaded', fetchAnimals);
