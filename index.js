let input = window.document.querySelector('input');
let textarea = window.document.querySelector('textarea');
let mainScreen = window.document.querySelector('#main-screen');
let editScreen = window.document.querySelector('#edit-screen');
let notesCount = window.document.querySelector('#notes-count');
let tableBody = window.document.querySelector('tbody');

//Переменные

let noteList = [];
let noteId = -1;

//Функций

const createNewTableRow = () => {
//     <tr>
//     <td class="notes-title">
//         Название
//         <br>
//         <span class="note-date">May 22 , 2024</span>
//     </td>
//     <td>
//         <i class="material-icons note-del-icon">
//             -
//         </i>
//     </td>
// </tr>

    //Создание тегов
    let row = window.document.createElement('tr');
    let titleColumn = window.document.createElement('td');
    let delColumn = window.document.createElement('td');
    let delIcon = window.document.createElement('i');
    let date = window.document.createElement('span');
    //Установка классов
    titleColumn.className = 'note-title';
    date.className = 'note-date';
    delIcon.className = 'material-icons note-del-icon';
    //Устанавливаем содержимое 
    date.innerText = noteDate;
    delIcon.innerText = 'delete_outlined';
    titleColumn.innerText = noteTitle;
     // Добавление элементов
     delColumn.appendChild(delIcon);
     titleColumn.appendChild(window.document.createElement('br'));
     titleColumn.appendChild(date);
     row.appendChild(titleColumn);
     row.appendChild(delColumn);
     tableBody.appendChild(row);
}

const onLoad = () => {
    noteList = window.localStorage.getItem('noteList')
    ? JSON.parse(window.localStorage.getItem('noteList'))
    : [];
    notesCount.innerText = `Заметок ${noteList.length}`;
    if(noteList) {
        noteList.map(elem => {
            createNewTableRow(elem.id, elem.title, elem.date);
        });
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