// const { json } = require("body-parser");
// const { application } = require("express");

// Your Code Here
let baseURL = "http://localhost:3001"

// Retrieve books list

async function main() {
    let response = await fetch(baseURL + "/listBooks")
    let books = await response.json()
    console.log(books);

    // Make a titles only array
    function addBooks() {

        let titlesArray = books.map((titles) => {
            return titles.title
        })
        console.log(titlesArray)

        // Place array elements in corresponding containers
        function createElements(bookNumber, index) {
            let book = document.getElementById(bookNumber)
            book.textContent = titlesArray[index]

            // Create input box to update availability
            let inputBox = document.createElement("input")
            inputBox.setAttribute("id", bookNumber + "newQuantity")
            inputBox.setAttribute("type", "number")
            document.getElementById(bookNumber).appendChild(inputBox)

            // Create submit button
            let submitButton = document.createElement("button")
            submitButton.innerText = "Update"
            submitButton.setAttribute("name", bookNumber)
            document.getElementById(bookNumber).appendChild(submitButton)

            // Add functionality to submit button
            submitButton.addEventListener("click", () => {
                let quantity = document.getElementById(bookNumber + "newQuantity").value
                console.log(quantity)
                updateQuantity(index + 1, quantity)
            })

            // Update quantity function
            async function updateQuantity(id, newQuantity) {
                await fetch(baseURL + "/updateBook", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "id": id,
                        "quantity": newQuantity,
                    })

                })
            }
        }
        createElements("book1", 0)
        createElements("book2", 1)
        createElements("book3", 2)
        createElements("book4", 3)
    }
    addBooks()
}


main()
