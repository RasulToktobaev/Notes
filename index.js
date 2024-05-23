let input = window.document.querySelector('input');
let textarea = window.document.querySelector('textarea');


//Переменные


const createNewNote = () => {
    let date = moment(new Date());
    let object = {
        id:0,
        title:input.value,
        text:textarea.value,
        date:date.format('LL')
    }
    console.log(object);
}

//Обработчики событий 
 const backIconClick = () => {
    createNewNote();
 }