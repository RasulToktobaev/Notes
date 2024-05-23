 // Извлечение тегов из разметки
 let input = window.document.querySelector('input');
 let textarea = window.document.querySelector('textarea');
 let mainScreen = window.document.querySelector('#main-screen');
 let editScreen = window.document.querySelector('#edit-screen');
 let notesCount = window.document.querySelector('#notes-count');
 let tableBody = window.document.querySelector('tbody');
 let installIcon = window.document.querySelector('#install-icon');

 //Переменные
 let noteList = [];
 let noteId = -1;

 // Функции
 const removeNoteFromList = (id) => {
   noteList.map((elem, index) => {
     if(elem.id === id) noteList.splice(index, 1);
   });
   window.localStorage.setItem('noteList', JSON.stringify(noteList));
   window.location.reload();
 }
 const goToEdit = () => {
   mainScreen.style.display = 'none';
   editScreen.style.display = 'block';
   noteList.map(elem => {
     if(elem.id === noteId){
       input.value = elem.title;
       textarea.value = elem.text;
     }
   });
   textarea.focus();
 }
 const createNewTableRow = (id, noteTitle, noteDate) => {
   // <tr>
   //   <td class="note-title">
   //     Название
   //     <br/>
   //     <span class="note-date">May 15, 2023</span>
   //   </td>
   //   <td>
   //     <i class="material-icons note-del-icon">delete_outlined</i>
   //   </td>
   // </tr>
   // Создание тегов
   let row = window.document.createElement('tr');
   let titleColumn = window.document.createElement('td');
   let delColumn = window.document.createElement('td');
   let delIcon = window.document.createElement('i');
   let date = window.document.createElement('span');
   // Установка классов
   titleColumn.className = 'note-title';
   date.className = 'note-date';
   delIcon.className = 'material-icons note-del-icon';
   // Установка содержимого
   date.innerText = noteDate;
   delIcon.innerText = 'delete_outlined';
   titleColumn.innerText = noteTitle;
   // Обработчики событий
   titleColumn.addEventListener('click', () => {
     noteId = id;
     goToEdit();
   });
   delColumn.addEventListener('click', () => removeNoteFromList(id));
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

 // Утилиты для обработчиков
 
 const getTitleSlice = (title, strLength = 20) => {
    if(title.length > strLength) 
        return `${title.substr(0, strLength)}...`;
    else return title;
 }

 const updateNote = () => {
    // Обновление заметки по noteId;
    noteList.map(elem => {
        if(elem.id === noteId) {
            elem.title = getTitleSlice(input.value);
            elem.text = textarea.value;
        }
    })
 }
 const createNewNote = () => {
   let date = moment(new Date());
   let object = {
     id: noteList.length,
     title: input.value
       ? getTitleSlice(input.value)
       : getTitleSlice(textarea.value)
     ,
     text: textarea.value,
     date: date.format('LL'),
   }
   noteList.push(object);
 }
 // Обработчики событий
 const backIconClick = () => {
   editScreen.style.display = 'none';
   mainScreen.style.display = 'block';
   noteId = -1;
   window.location.reload();
 }
 const saveNote = () => {
   if(textarea.value){
     if(noteId < 0) createNewNote();
     else updateNote();
     window.localStorage.setItem('noteList', JSON.stringify(noteList));
   }
 }
 const addNoteIconClick = () => {
   mainScreen.style.display = 'none';
   editScreen.style.display = 'block';
 }

 // Установка
