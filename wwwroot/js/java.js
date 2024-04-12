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
document.getElementById("read-json").addEventListener('change', function (event) {
    if (event.target.files.length === 0) {
        console.log('no file selected');
        return;
    }

    var file = event.target.files[0];

    if (file.tyype !== "application/json") {
        console.log('Please upload a json file.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (event) {
        try {
            var jsonObj = JSON.parse(event.target.result); // Convert the file content to a JSON object
            console.log(jsonObj); // Output the JSON object to the console
        } catch (e) {
            console.error('Invalid JSON file');
        }
    };
    reader.onerror = function () {
        console.error('File could not be read!');
    };
    reader.readAsText(file); // Read the file as text


});
