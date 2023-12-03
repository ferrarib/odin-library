const myLibrary = [];
var maxID = 1;

function Book(id, name, author, pages, haveRead) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.getHtmlRepresentation = function () {
    const book = document.createElement("div");
    book.classList.add("book");

    const info = document.createElement("div");

    const title = document.createElement("div");
    title.textContent = this.name;
    title.style.fontWeight = "bold";
    title.style.fontSize = "1.3rem";

    const author = document.createElement("div");
    author.textContent =  "By " + this.author;
    author.style.fontSize = "0.9rem";

    info.appendChild(title);
    info.appendChild(author);

    const numberOfPages = document.createElement("div");
    numberOfPages.textContent =  "Pages: " + this.pages;
    numberOfPages.style.fontSize = "0.9rem";

    const haveReadButton = document.createElement("button");
    haveReadButton.style.margin = "0";
    haveReadButton.style.width = "100%";
    haveReadButton.style.padding = "5px 5px";
    haveReadButton.style.boxSizing = "border-box";

    haveReadButton.textContent =  this.haveRead ? "Have Read" : "Have Not Read";
    haveReadButton.style.backgroundColor = this.haveRead ? "#23C552" : "#F84F31";
    haveReadButton.addEventListener('click', () => {
        this.haveRead = !this.haveRead;
        haveReadButton.textContent =  this.haveRead ? "Have Read" : "Have Not Read";
        haveReadButton.style.backgroundColor = this.haveRead ? "#23C552" : "#F84F31";
    });

    book.appendChild(info);
    book.appendChild(numberOfPages);
    book.appendChild(haveReadButton);

    //Add DeleteOnHover logic
    const hoverContainer = document.createElement("div");
    hoverContainer.classList.add("hover-container");
    book.addEventListener('mouseover', () => {
        hoverContainer.style.visibility = "visible";
    });

    book.addEventListener('mouseout', () => {
        hoverContainer.style.visibility = "hidden";
    });

    const hoverButtons = document.createElement("div");
    hoverButtons.classList.add("hover-buttons");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("hover-button");
    
    const deleteImage = document.createElement("img");
    deleteImage.src = "assets/icons8-delete.svg";
    deleteImage.style.width = "70%";

    deleteButton.appendChild(deleteImage);

    deleteButton.addEventListener('click', () => {
        var object = myLibrary.find((item) => {
            return item.id == this.id;
        });
        var index = myLibrary.indexOf(object);
        myLibrary.splice(index, 1);
        book.remove();
    })

    const editButton = document.createElement("button");
    editButton.classList.add("hover-button");
    
    const editImage = document.createElement("img");
    editImage.src = "assets/icons8-edit.svg";
    editImage.style.width = "70%";

    editButton.appendChild(editImage);

    editButton.addEventListener('click', () => {

        const dialog = document.getElementById("edit-dialog");

        const editForm = dialog.querySelector("form");

        const nameField = editForm.querySelector("input[name=\"name\"]");
        nameField.setAttribute("value", this.name);

        const authorField = editForm.querySelector("input[name=\"author\"]");
        authorField.setAttribute("value", this.author);

        const pagesField = editForm.querySelector("input[name=\"pages\"]");
        pagesField.setAttribute("value", this.pages);

        const haveReadField = editForm.querySelector("input[name=\"have-read\"]");
        haveReadField.checked = this.haveRead

        const hiddenID = editForm.querySelector("input[name=\"id\"]");
        hiddenID.setAttribute("value", this.id);

        editForm.appendChild(hiddenID);

        dialog.showModal();
    })

    hoverButtons.appendChild(editButton);
    hoverButtons.appendChild(deleteButton);

    hoverContainer.appendChild(hoverButtons);

    book.appendChild(hoverContainer);
    
    return book;
}

const addButton = document.getElementById("add-book");
const dialog = document.getElementById("add-dialog");
const closeButton = dialog.getElementsByClassName("cancel-add")[0];
const submitButton = dialog.getElementsByClassName("confirm-add")[0];

addButton.addEventListener('click', () => {
    dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

// "Close" button closes the dialog
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    var formEl = document.forms.AddForm;
    var formData = new FormData(formEl);

    myLibrary.push(new Book(maxID++, formData.get('name'), formData.get('author'), Number(formData.get('pages')), formData.get('have-read')));
    formEl.reset();
    dialog.close();
    RenderLibrary(false);
});


const editDialog = document.getElementById("edit-dialog");
const editCloseButton = editDialog.getElementsByClassName("cancel-add")[0];
const editSubmitButton = editDialog.getElementsByClassName("confirm-add")[0];

// "Close" button closes the dialog
editCloseButton.addEventListener("click", (e) => {
    e.preventDefault();

    editDialog.close();
});

editSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    var formEl = document.forms.EditForm;
    var formData = new FormData(formEl);

    console.log(formData);

    var libraryIndex = myLibrary.findIndex((item) => {
        return item.id.toString() === formData.get("id");
    })

    console.log(myLibrary[libraryIndex]);
    
    myLibrary[libraryIndex] = new Book(Number(formData.get("id")),formData.get("name"),formData.get("author"), Number(formData.get("pages")),formData.get("have-read"));

    console.log(myLibrary[libraryIndex]);

    formEl.reset();
    editDialog.close();
    RenderLibrary(false);
});

function RenderInitial(){
    myLibrary.push(new Book(maxID++, "And Then There Were None", "Agatha Christie", 200, true));
    myLibrary.push(new Book(maxID++, "And Then There Were None", "Agatha Christie", 200, true));
    myLibrary.push(new Book(maxID++, "And Then There Were None", "Agatha Christie", 200, true));
    myLibrary.push(new Book(maxID++, "And Then There Were None", "Agatha Christie", 200, true));
    myLibrary.push(new Book(maxID++, "And Then There Were None", "Agatha Christie", 200, true));
    myLibrary.push(new Book(maxID++, "And Then There Were None", "Agatha Christie", 200, true));
    myLibrary.push(new Book(maxID++, "And Then There Were None", "Agatha Christie", 200, true));
    myLibrary.push(new Book(maxID++, "And Then There Were None", "Agatha Christie", 200, true));
    myLibrary.push(new Book(maxID++, "And Then There Were None", "Agatha Christie", 200, true));
    myLibrary.push(new Book(maxID++, "And Then There Were None", "Agatha Christie", 200, true));
    myLibrary.push(new Book(maxID++, "And Then There Were None", "Agatha Christie", 200, true));
    myLibrary.push(new Book(maxID++, "And Then There Were None", "Agatha Christie", 200, true));
}

function RenderLibrary(isInitial){
    if (isInitial){
        RenderInitial();
    }
    else {
        books.innerHTML = '';
    }

    myLibrary.forEach((item) => {
        books.appendChild(item.getHtmlRepresentation());
    });
}
  

const books = document.getElementById("body");

RenderLibrary(false);



