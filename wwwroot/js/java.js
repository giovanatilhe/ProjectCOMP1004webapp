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
    var filteredBooks = [];
    var extraFilter;
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
                filterBookName.rating;
            } else if (j = 6) {
                filterBookName.status;
            } else if (j = 7) {
                filterBookName.language;
            } else {
                filterBookName.review;
            }
        }
        if (document.getElementById("1")) {
            //reverse alphabet
            filteredBooks.push(filteredBookName.title);
            extraFilter = 1;

        } else if (document.getElementById("2")) {
            //alphabet
            filteredBooks.push(filteredBookName.title);
            extraFilter = 2;

        } else if (document.getElementById("3")) {
            //date read recent old
            filteredBooks.push(filteredBookName.began);
            filteredBooks.push(filteredBookName.finished);
            extraFilter = 3;

        } else if (document.getElementById("4")) {
            //date read old recent
            filteredBooks.push(filteredBookName.began);
            filteredBooks.push(filteredBookName.finished);
            extraFilter = 4;

        } else if (document.getElementById("5")) {
            //rated better worst
            filteredBooks.push(filteredBookName.rating);
            extraFilter = 5;


        } else if (document.getElementById("6")) {
            //rated worst better
            filteredBooks.push(filteredBookName.rating);

        } else if (document.getElementById("7")) {
            //science fiction
            if (filterBookName.genre == 'science fiction') {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("8")) {
            //romance
            if (filterBookName.genre == 'romance') {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("9")) {
            //thriller
            if (filterBookName.genre == 'thriller') {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("10")) {
            //mystery
            if (filterBookName.genre == 'mystery') {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("11")) {
            //adventure
            if (filterBookName.genre == 'adventure') {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("12")) {
            //young adult
            if (filterBookName.genre == ('young adult' || 'ya')) {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("13")) {
            //fantasy
            if (filterBookName.genre == 'fantasy') {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("14")) {
            //dystopia
            if (filterBookName.genre == 'dystopia') {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("15")) {
            //horror
            if (filterBookName.genre == 'horror') {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("16")) {
            //biography
            if (filterBookName.genre == 'biography') {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("17")) {
            //self-help
            if (filterBookName.genre == 'self-help') {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("18")) {
            //history
            if (filterBookName.genre == 'history') {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("19")) {
            //business
            if (filterBookName.genre == 'business') {
                filteredBooks.push(filteredBookName.genre);

            }

        } else if (document.getElementById("20")) {
            //read
            if (filterBookName.status == 'read') {
                filteredBooks.push(filteredBookName.status);

            }

        } else if (document.getElementById("21")) {
            //want to read
            if (filterBookName.status == 'want to read') {
                filteredBooks.push(filteredBookName.status);

            }

        } else if (document.getElementById("22")) {
            //english
            if (filterBookName.language == 'english') {
                filteredBooks.push(filteredBookName.language);

            }

        } else if (document.getElementById("23")) {
            //spanish
            if (filterBookName.language == 'spanish') {
                filteredBooks.push(filteredBookName.language);

            }

        } else if (document.getElementById("24")) {
            //german
            if (filterBookName.language == 'german') {
                filteredBooks.push(filteredBookName.language);

            }

        } else if (document.getElementById("25")) {
            //french
            if (filterBookName.language == 'french') {
                filteredBooks.push(filteredBookName.language);

            }

        } else if (document.getElementById("26")) {
            //portuguese
            if (filterBookName.language == 'portuguese') {
                filteredBooks.push(filteredBookName.language);

            }

        } else if (document.getElementById("27")) {
            //mandarin
            if (filterBookName.language == 'mandarin') {
                filteredBooks.push(filteredBookName.language);

            }

        } else if (document.getElementById("28")) {
            //rated 5 stars
            if (filterBookName.rating == '*****') {
                filteredBooks.push(filteredBookName.rating);

            }

        } else if (document.getElementById("29")) {
            //rated 4 stars
            if (filterBookName.rating == '****') {
                filteredBooks.push(filteredBookName.rating);

            }

        } else if (document.getElementById("30")) {
            //rated 3 stars
            if (filterBookName.rating == '***') {
                filteredBooks.push(filteredBookName.rating);

            }

        } else if (document.getElementById("31")) {
            //rated 2 stars
            if (filterBookName.rating == '**') {
                filteredBooks.push(filteredBookName.rating);

            }

        } else if (document.getElementById("32")) {
            //rated 1 star
            if (filterBookName.rating == '*') {
                filteredBooks.push(filteredBookName.rating);

            }

        }
    }
    if (extraFilter = 1) {
        filteredBooks.sort();
        filteredBooks.reverse();
    } else if (extraFilter = 2) {
        filteredBooks.sort()
    } else if (extraFilter = 3) {
        filteredBooks.sort((a, b) => a.date - b.date);

    } else if (extraFilter = 4) {
        filteredBooks.sort((a, b) => a.date - b.date);
        filteredBooks.reverse();
    } else if (extraFilter = 5) {
        filsteredBooks.sort((a, b) => a.length - b.length);
    } else if (extraFilter = 6) {
        filsteredBooks.sort((a, b) => a.length - b.length);
        filteredBooks.reverse();

    }
    document.getElementById('bookBox').innerHTML = filteredBooks.join('');

}