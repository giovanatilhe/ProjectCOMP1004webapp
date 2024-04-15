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

function saveFile() {
    console.log(dataBook)
    var bookName = ' book ' + (localStorage.length + 1);
    localStorage.setItem(bookName, dataBook);
    if (localStorage.getItem(bookName)) {
        alert('Book succesfully added to local storage as:' + bookName);
    } else {
        alert('Error saving book.');
    }
}

function showData() {
    var bookInfo = [],
        books = Object.keys(localStorage),
        i = books.length;
    if (i == 0) {
        alert('There is nothing in the local storage')
    } else {
        while (i--) {
            bookInfo.push('book' + (i + 1) + ':');
            bookInfo.push('<br>');
            bookInfo.push(localStorage.getItem(books[i]));
            bookInfo.push('<br>');
        }
        document.getElementById('bookBox').innerHTML = bookInfo.join('');
    }
}

function clearData() {
    document.getElementById('bookBox').textContent = '';
}

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
function deleteBook() {
    var deletebook = prompt('Which book would you like to delete?');
    if (!deletebook) {
        alert("No book name entered.");
    }
    var before = localStorage.length;
    var deadbook = "\"" + deletebook + "\"";

    if (confirm('Are you sure you want to delete '+ deletebook + ' from your local storage ?')) {

        for (let i = 0; i < before; i++) {
            if (localStorage.getItem(key[i]) == deadbook) {
                localStorage.removeItem(deadbook);
                if (localStorage.length == before) {
                    alert("Something went wrong, try again!");
                    break;
                } else {
                    alert("Book successfully deleted!");
                    break;
                }
            }
            
        }

        alert('Book was not found in local storage.')

    } else {
        alert("Action canceled, the book is still in the local storage!");
    }

}