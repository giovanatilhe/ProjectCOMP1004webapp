//donwloading json file button
var dataToSave = {
    "book_title": "Enter book title",
    "author": "Enter author's name",
    "started_reading_on": "Enter date that you started reading on (format: YYYY-MM-DD)",
    "finished_reading_on": "Enter date that you finished reading on (format: YYYY-MM-DD)",
    "genre": "Enter the genre of the book",
    "rating": "Enter your rating for this book (format: ***** [5 max])",
    "status": "Enter read or want to read",
    "language": "Enter the language the book is in",
    "review": "Enter your opinion on this book"
};

document.getElementById('bookData').addEventListener('click', function () {
    var jsonstring = JSON.stringify(dataToSave);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonstring);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'bookData.json';
    hiddenElement.click();
});
// font size button
let cont = document.getElementById("container");
function changeSizeByBtn(size) {
    cont.style.fontSize = size;
}
function changeSizeBySlider() {
    let slider = document.getElementById("slider");
    cont.style.fontSize = slider.value + "px";
}


//night day button
const htmlEl = document.getElementsByTagName('html')[0];

const toggleTheme = (theme) => {
    htmlEl.dataset.theme = theme;
}

// reading json file 
function init() {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(event) {

    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

let dataBook;
function handleFileLoad(event) {

    const fileContent = event.target.result;
    document.getElementById('bookBox').textContent = fileContent;
    dataBook = fileContent;
    console.log("dataBook", dataBook);
}
//saving data to local storage
const bookNameArray = [];
function saveFile() {
    console.log(dataBook)
    var bookName = prompt("Please write the name of the book so it can be organised and retrieved easily")
    if (bookNameArray.length == 0) {
        bookNameArray.push(bookName);
    } else {
        if (bookNameArray.indexOf(bookName) !== -1) {
            if (confirm('This books is already in the local storage, are you sure you want to add it again?')) {
                bookName = bookName + '1';
                bookNameArray.push(bookName);
            } else {
                alert('Book not added to local storage');
            }
        } else {
            bookNameArray.push(bookName);
        }
    } 

    localStorage.setItem(bookName, dataBook);
    if (localStorage.getItem(bookName)) {
        alert('Book successfully added to local storage as: ' + bookName);
    } else {
        alert('Error saving book.');
    }
}

//displaying data from local storage
var bookInfo = [];
books = Object.keys(localStorage);
        hello = books.length;
function showData() {
    
    if (hello == 0) {
        alert('There is nothing in the local storage')
    } else {
        while (hello--) {
            bookInfo.push('book' + (hello + 1) + ':');
            bookInfo.push('<br>');
            bookInfo.push(localStorage.getItem(books[hello]));
            bookInfo.push('<br>');
        }
        document.getElementById('bookBox').innerHTML = bookInfo.join('');
    }
}
//clearing display
function clearData() {
    document.getElementById('bookBox').textContent = '';
}
//deleting everything from local storage
function deleteData(){
    if (confirm('Are you sure you want to delete everything saved in your local storage?')) {
        localStorage.clear();
        if (localStorage.length == 0) {
            while (bookNameArray.length > 0) {
                bookNameArray.pop();
            }
            alert("Local storage successfully cleared!");
            clearData();
        } else {
            alert("Something went wrong, try again!");
        }

    } else {
        alert("Action canceled, Local storage preserved!");
    }
}
//deleting one book from local storage
function deleteBook() {
    for (let i = 0; i < bookNameArray.length; i++) {
        const displayBook =+ bookNameArray[i] + ',';
    }
    var deletebook = prompt('Which book would you like to delete?');

var before = localStorage.length;
    var deadbook = "\"" + deletebook + "\"";

    if (deletebook) {
        if (confirm('Are you sure you want to delete ' + deletebook + ' from your local storage ?')) {

            if (localStorage.getItem(deletebook)) {
                localStorage.removeItem(deletebook);
                if (localStorage.length == before) {
                    alert("Error, book was not deleted from local storage");
                } else {
                    bookNameArray.indexOf(deletebook);
                    alert("Book successfully deleted!");
                    clearData();
                }
            } else {
            alert('Book was not found in local storage.')
            }

        } else {
            alert("Action canceled, the book is still in the local storage!");
        }

    } else {
        alert("No book name entered.");
    }
}
// getting data so the filter can be used and filtered
let filteredBooks = [];
function filterBook() {
    console.log('filterBook is called');
    const books = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        let value = localStorage.getItem(key);
        value = value.replace(/[{}"':]|\b(?:book_title|started_reading_on|finished_reading_on|genre|rating|status|language|review)\b|\s*\r?\n\s*/g, '');

        console.log('value', value);

        let parts = value.split(',');
        parts = parts.map(part => part.replace(/,\s*/g, ''));
        books.push({
            title: parts[0],
            author: parts[1],
            began: new Date(parts[2]),
            finished: new Date(parts[3]),
            genre: parts[4],
            rating: parts[5],
            status: parts[6],
            language: parts[7],
            review: parts.slice(8).join(', ')
        });
       console.log('books', books);
    }
    
    const selectElement = document.getElementById('filter');
    
    const selectedFilter = parseInt(selectElement.value, 10);
    switch (selectedFilter) {
        case 1:
            filteredBooks = books.sort((a, b) => b.title.localeCompare(a.title));
            console.log('cases', filteredBooks);
            handlingCase();
            break;
        case 2:
            filteredBooks = books.sort((a, b) => a.title.localeCompare(a.title));
            handlingCase();
            break;
        case 3:
            filteredBooks = books.sort((a, b) => b.began - a.began);
            handlingCase();
            break;
        case 4:
            filteredBooks = books.sort((a, b) => a.began - b.began);
            handlingCase();
            break;
        case 5:
            filteredBooks = books.sort((a, b) => b.rating.localeCompare(a.rating));
            handlingCase();
            break;
        case 6:
            filteredBooks = books.sort((a, b) => a.rating.localeCompare(b.rating));
            handlingCase();
            break;
        case 7:
            filteredBooks = books.filter(book => book.genre === ' science fiction');
            handlingCase();
            break;
        case 8:
            filteredBooks = books.filter(book => book.genre === ' romance');
            handlingCase();
            break;
        case 9:
            filteredBooks = books.filter(book => book.genre === ' thriller');
            handlingCase();
            break;
        case 10:
            filteredBooks = books.filter(book => book.genre === ' mystery');
            handlingCase();
            break;
        case 11:
            filteredBooks = books.filter(book => book.genre === ' adventure');
            handlingCase();
            break;
        case 12:
            filteredBooks = books.filter(book => book.genre === ' young adult');
            handlingCase();
            break;
        case 13:
            filteredBooks = books.filter(book => book.genre === ' fantasy');
            handlingCase();
            break;
        case 14:
            filteredBooks = books.filter(book => book.genre === ' dystopian');
            handlingCase();
            break;
        case 15:
            filteredBooks = books.filter(book => book.genre === ' horror');
            handlingCase();
            break;
        case 16:
            filteredBooks = books.filter(book => book.genre === ' biography');
            handlingCase();
            break;
        case 17:
            filteredBooks = books.filter(book => book.genre === ' self-help');
            handlingCase();
            break;
        case 18:
            filteredBooks = books.filter(book => book.genre === ' history');
            handlingCase();
            break;
        case 19:
            filteredBooks = books.filter(book => book.genre === ' business');
            handlingCase();
            break;
        case 20:
            filteredBooks = books.filter(book => book.status === ' read');
            handlingCase();
            break;
        case 21:
            filteredBooks = books.filter(book => book.status === ' want to read');
            handlingCase();
            break;
        case 22:
            filteredBooks = books.filter(book => book.language === ' english');
            handlingCase();
            break;
        case 23:
            filteredBooks = books.filter(book => book.language === ' spanish');
            handlingCase();
            break;
        case 24:
            filteredBooks = books.filter(book => book.language === ' german');
            handlingCase();
            break;
        case 25:
            filteredBooks = books.filter(book => book.language === ' french');
            handlingCase();
            break;
        case 26:
            filteredBooks = books.filter(book => book.language === ' portuguese');
            handlingCase();
            break;
        case 27:
            filteredBooks = books.filter(book => book.language === ' mandarin');
            handlingCase();
            break;
        case 28:
            filteredBooks = books.filter(book => book.rating === ' *****');
            handlingCase();
            break;
        case 29:
            filteredBooks = books.filter(book => book.rating === ' ****');
            handlingCase();
            break;
        case 30:
            filteredBooks = books.filter(book => book.rating === ' ***');
            handlingCase();
            break;
        case 31:
            filteredBooks = books.filter(book => book.rating === ' **');
            handlingCase();
            break;
        case 32:
            filteredBooks = books.filter(book => book.rating === ' *');
            handlingCase();
            break;
        case 33:
            clearData();
            break;
    }

}
function handlingCase() {
    console.log('handlingCase is called');
    const bookBox = document.getElementById('bookBox');
    bookBox.innerHTML = filteredBooks.map(book => {
        return `<div>
                    <h3>Title: ${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <p>Began Reading: ${book.began.toDateString()}</p>
                    <p>Finished Reading: ${book.finished.toDateString()}</p>
                    <p>Genre: ${book.genre}</p>
                    <p>Rating: ${book.rating}</p>
                    <p>Status: ${book.status}</p>
                    <p>Language: ${book.language}</p>
                    <p>Review: ${book.review}</p>
                </div>`;
    }).join('');
    filteredBooks.length = 0;
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('filter').addEventListener('change', filterBook);
});