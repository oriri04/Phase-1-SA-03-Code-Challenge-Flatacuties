//let characters = [];

function fetchCharacters() {
    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(data => {
           let characters = data;
            displayCharacters(characters);
        })
        .catch(error => console.error('Error:', error));
}

function displayCharacters(characters) {
    const listContainer = document.getElementById('character-list');
    listContainer.innerHTML = '';
    const list = document.createElement('ul');

    characters.forEach(character => {
        const listItem = document.createElement('li');
        listItem.textContent = character.name;
        listItem.style.cursor = 'pointer';
        listItem.onclick = () => showCharacterDetails(character);
        list.appendChild(listItem);
    });
    listContainer.appendChild(list);
}

function showCharacterDetails(character) {
    const detailsContainer = document.getElementById('character-details');
    detailsContainer.innerHTML = '';

    const animal = document.createElement('h2');
    animal.textContent = character.name;

    const image = document.createElement('img');
    image.src = character.Image; 
    image.alt = character.name; 
    image.style.width = '30px'; 

    const votes = document.createElement('p');
    votes.textContent = `votes: ${character.votes}`; 
    votes.id ="vote-count";

    const voteButton = document.createElement('button');
    voteButton.textContent = 'Vote';
    voteButton.onclick = () => {
        character.votes++;
        document.getElementById('vote-count').innerHTML = `votes: ${character.votes}`;
    };

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset votes';
    resetButton.onclick = () => {
        character.votes = 0;
        document.getElementById('vote-count').textContent = `votes: ${character.votes}`;
    };

    detailsContainer.appendChild(animal);
    detailsContainer.appendChild(image);
    detailsContainer.appendChild(votes);
    detailsContainer.appendChild(voteButton);
    detailsContainer.appendChild(resetButton);
}

document.getElementById('add-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const newAnimal = document.getElementById('new-animal').value;
    const newImage = document.getElementById('new-image').value;

    const newCharacter = {
        id: characters.length + 1,
        animal: newAnimal,
        Image: newImage, 
        votes: 0
    };

    characters.push(newCharacter);
    displayCharacters(characters);

    document.getElementById('new-animal').value = '';
    document.getElementById('new-image').value = '';
    
});

fetchCharacters();
