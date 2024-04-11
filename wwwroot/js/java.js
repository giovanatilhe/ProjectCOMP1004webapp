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
