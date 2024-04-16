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

function cleanarray() {
    while (bookNameArray.length > 0) {
        bookNameArray.pop();
    }
    alert('array cleaned');
}

function displayarray() {
    for (let i = 0; i < bookNameArray; i++) {
        document.getElementById('bookBox').innerHTML = bookNameArray[i];

    }
    alert('done');
}



//displaying data from local storage
var bookInfo = [],
        books = Object.keys(localStorage),
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
function filterBook() {
    const books = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        const value = localStorage.getItem(key);

        var parts = value.split(',');
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
       
    }

    const selectElement = document.getElementById('filter');
    let filteredBooks = []
    const selectedFilter = selectElement.value;
    switch (selectedFilter) {
        case 1:
            filteredBooks = books.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 2:
            filteredBooks = books.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 3:
            filteredBooks = books.sort((a, b) => b.began - a.began);
            break;
        case 4:
            filteredBooks = books.sort((a, b) => a.began - b.began);
            break;
        case 5:
            filteredBooks = books.sort((a, b) => b.rating.localeCompare(a.rating));
            break;
        case 6:
            filteredBooks = books.sort((a, b) => a.rating.localeCompare(b.rating));
            break;
        case 7:
            filteredBooks = books.filter(book => book.genre === 'science fiction');
            break;
        case 8:
            filteredBooks = books.filter(book => book.genre === 'romance');
            break;
        case 9:
            filteredBooks = books.filter(book => book.genre === 'thriller');
            break;
        case 10:
            filteredBooks = books.filter(book => book.genre === 'mystery');
            break;
        case 11:
            filteredBooks = books.filter(book => book.genre === 'adventure');
            break;
        case 12:
            filteredBooks = books.filter(book => book.genre === 'young adult');
            break;
        case 13:
            filteredBooks = books.filter(book => book.genre === 'fantasy');
            break;
        case 14:
            filteredBooks = books.filter(book => book.genre === 'dystopian');
            break;
        case 15:
            filteredBooks = books.filter(book => book.genre === 'horror');
            break;
        case 16:
            filteredBooks = books.filter(book => book.genre === 'biography');
            break;
        case 17:
            filteredBooks = books.filter(book => book.genre === 'self-help');
            break;
        case 18:
            filteredBooks = books.filter(book => book.genre === 'history');
            break;
        case 19:
            filteredBooks = books.filter(book => book.genre === 'business');
            break;
        case 20:
            filteredBooks = books.filter(book => book.status === 'read');
            break;
        case 21:
            filteredBooks = books.filter(book => book.status === 'want to read');
            break;
        case 22:
            filteredBooks = books.filter(book => book.language === 'english');
            break;
        case 23:
            filteredBooks = books.filter(book => book.language === 'spanish');
            break;
        case 24:
            filteredBooks = books.filter(book => book.language === 'german');
            break;
        case 25:
            filteredBooks = books.filter(book => book.language === 'french');
            break;
        case 26:
            filteredBooks = books.filter(book => book.language === 'portuguese');
            break;
        case 27:
            filteredBooks = books.filter(book => book.language === 'mandarin');
            break;
        case 28:
            filteredBooks = books.filter(book => book.rating === '*****');
            break;
        case 29:
            filteredBooks = books.filter(book => book.rating === '****');
            break;
        case 30:
            filteredBooks = books.filter(book => book.rating === '***');
            break;
        case 31:
            filteredBooks = books.filter(book => book.rating === '**');
            break;
        case 32:
            filteredBooks = books.filter(book => book.rating === '*');
            break;
    }
    document.getElementById('bookBox').innerHTML = filteredBooks.join('');

}