let input = window.document.querySelector('input');
let textarea = window.document.querySelector('textarea');
let mainScreen = window.document.querySelector('#main-screen');
let editScreen = window.document.querySelector('#edit-screen');
let notesCount = window.document.querySelector('#notes-count');

//Переменные

let noteList = [];
let noteId = -1;

//Функций

const onLoad = () => {
    noteList = window.localStorage.getItem('noteList')
    ? JSON.parse(window.localStorage.getItem('noteList'))
    : [];
    notesCount.innerText = `Заметок ${noteList.length}`;
    if(noteList) {
        noteList.map(elem => console.log(elem));
    }
}

onLoad();

const updateNote = () => {
    
}

const createNewNote = () => {
    let date = moment(new Date());
    let object = {
        id:noteList.length,
        title:input.value,
        text:textarea.value,
        date:date.format('LL')
    }
    noteList.push(object);
}


//Обработчики событий 
 const backIconClick = () => {
    mainScreen.style.display = 'block';
    editScreen.style.display = 'none';
    noteId = -1;
    window.location.reload();
 }

 const saveNote = () => {
    if(textarea.value) {
        if(noteId < 0) {
            createNewNote();
        } else{
            updateNote();
        }
    }
    window.localStorage.setItem('noteList', JSON.stringify(noteList));
 }

 const addNoteIconClick = () => {
    mainScreen.style.display = 'none';
    editScreen.style.display = 'block';
 }