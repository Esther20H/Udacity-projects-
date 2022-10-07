// Select color picker and the submit buttons and store them in a variable
let submitButton = document.querySelector('#sizePicker [type="submit"]');
//Select the table element by its id and store it in a variable
let table = document.querySelector("#pixelCanvas");
//function makeGrid() {
function makeGrid() {
    //Select the input element value for  height and width respectively and store them in separate variables each
    let height = document.querySelector("#inputHeight").value;
    let width = document.querySelector("#inputWidth").value;
    /*Create an external for loop that will loop over the number for height as select
    by the user and create a  single vertical table row known as column simutaneously.
    The inner for loop creates table data or rows of columns
     */
    for (let tableColumn = 0; tableColumn < height; tableColumn++) {
        let tr = document.createElement("tr");
        for (let tableRow = 0; tableRow < width; tableRow++) {
            let td = document.createElement("td");
            //It allows you to add an element to your HTML document
            //just specify the position in the document and the element you want to add
            tr.insertAdjacentElement("afterbegin",td)
        }
        table.insertAdjacentElement("afterbegin",tr)
    }
}

// Remove the default event listner
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
});
/*Add event "click", to the submit button. So that when the user clicks on it
    will launch the makeGrid() function and create the table
*/
submitButton.addEventListener("click", makeGrid);
//Add event listener to the table element
//Once the user selects a particular color and click on anywhere in
// the table it will have a background of the selected color.
table.addEventListener("click", function (event) {
    if (event.target.tagName === "TD") {
        let colorValue = document.querySelector("#colorPicker").value;
        event.target.style.backgroundColor = colorValue;
    }
});
///}