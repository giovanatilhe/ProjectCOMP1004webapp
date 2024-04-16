//donwloading json file button
var dataToSave = {
    "book_title": "Enter book title",
    "author": "Enter author's name",
    "started_reading_on": "Enter date that you started reading on (format: DD/MM/YYYY)",
    "finished_reading_on": "Enter date that you finished reading on (format: DD/MM/YYYY)",
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
            bookInfo.push(localStorage.getItem(books[hhelo]));
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
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(books[i]);

        var parts = item.split(',');
        var filterBookName = bookNameArray[i];
        for (let j = 0; j < parts.length; j++) {
            if (j = 0) {
                filterBookName.title;
            } else if (j = 1) {
                filterBookName.author;
            } else if (j = 2) {
                filterBookName.began;
            } else if (j = 3) {
                filterBookName.finished;
            } else if (j = 4) {
                filterBookName.genre;
            } else if (j = 5) {
                filterBookName.status;
            } else if (j = 6) {
                filterBookName.language;
            } else {
                filterBookName.review;
            }
        }

        if (document.getElementById("2")) {
            //alphabet

        } else if (document.getElementById("3")) {
            //date read recent old

        } else if (document.getElementById("4")) {
            //date read old recent

        } else if (document.getElementById("5")) {
            //rated better worst

        } else if (document.getElementById("6")) {
            //rated worst better

        } else if (document.getElementById("7")) {
            //science fiction

        } else if (document.getElementById("8")) {
            //romance

        } else if (document.getElementById("9")) {
            //thriller

        } else if (document.getElementById("10")) {
            //mystery

        } else if (document.getElementById("11")) {
            //adventure

        } else if (document.getElementById("12")) {
            //young adult

        } else if (document.getElementById("13")) {
            //fantasy

        } else if (document.getElementById("14")) {
            //distopian

        } else if (document.getElementById("15")) {
            //horror

        } else if (document.getElementById("16")) {
            //biography

        } else if (document.getElementById("17")) {
            //self-hel

        } else if (document.getElementById("18")) {
            //history

        } else if (document.getElementById("19")) {
            //business and money

        } else if (document.getElementById("20")) {
            //read
            if (filterBookName.status == 'read') {

            }

        } else if (document.getElementById("21")) {
            //want to read

        } else if (document.getElementById("22")) {
            //english

        } else if (document.getElementById("23")) {
            //spanish

        } else if (document.getElementById("24")) {
            //german

        } else if (document.getElementById("25")) {
            //french

        } else if (document.getElementById("26")) {
            //portuguese

        } else if (document.getElementById("27")) {
            //mandarin

        } else if (document.getElementById("28")) {
            //rated 5 stars

        } else if (document.getElementById("29")) {
            //rated 4 stars

        } else if (document.getElementById("30")) {
            //rated 3 stars

        } else if (document.getElementById("31")) {
            //rated 2 stars

        } else if (document.getElementById("32")) {
            //rated 1 star

        }
    }
}