const engWord = document.getElementById('eng'),
    rusWord = document.getElementById('rus'),
    inputs = document.getElementsByClassName('input'),
    addButton = document.getElementById('add-word-btn'),
    table = document.getElementById('table');

let words;
let btnsDelete;

localStorage.getItem('words') ? words = JSON.parse(localStorage.getItem('words')) : words = [];

const addWordToTable = index => {
    let wordsRow = `
    <tr data-word-id=${index}>
      <td class="eng-word">${words[index].english}</td>
       <td class="rus-word">${words[index].russian}</td>
        <td>
          <button class="btn-delete"></button>
       </td>
    </tr>`;
    wordsRow += table.innerHTML;
    table.innerHTML = wordsRow;
    words[index].id = index;
}

words.forEach((element, i) => {
    addWordToTable(i);
});

addButton.addEventListener('click', () => {

    if (engWord.value.length < 1 || rusWord.value.length < 1 || !isNaN(engWord.value) || !isNaN(rusWord.value)) {
        for (let key of inputs) {
            key.classList.add('error');
        }
    } else {
        for (let key of inputs) {
            key.classList.remove('error');
        }
        words.push(new CreateWord(engWord.value, rusWord.value, getLastId()));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);
        engWord.value = null;
        rusWord.value = null;
    }
    addEventDelete();
});

function getLastId() {
    let receivedWords = JSON.parse(localStorage.getItem('words'));
    let currentId = 0;
    if (receivedWords && receivedWords.length > 0) {
        currentId = ++receivedWords[receivedWords.length - 1].id;
    }
    return currentId;
}

function CreateWord(english, russian, id) {
    this.english = english;
    this.russian = russian;
    this.id = id;
};

const deleteWord = e => {
    const clickedElement = e.target.parentNode.parentNode;
    const currentId = +clickedElement.dataset.wordId;
    clickedElement.parentNode.remove();
    let filteredWords = words.filter(e => currentId !== e.id);
    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(filteredWords));
}

function addEventDelete() {
    btnsDelete = document.querySelectorAll('.btn-delete');
    for (let btn of btnsDelete) {
        btn.addEventListener('click', e => {
            deleteWord(e);
        });
    }
}

getLastId();
addEventDelete();