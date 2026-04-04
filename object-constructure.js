myLibrary = [];

const dialog = document.getElementById("bookDialog");
const editBookDialog = document.getElementById("editbookDialog");
const form = document.getElementById("bookForm");
const editform = document.getElementById("editbookForm");
editingBook={};
// OPEN
function openDialog() {
    dialog.showModal();
}
function editDialog() {
    editBookDialog.showModal();
}

function renderBook() {
    const container = document.getElementById("book-list");
    container.innerHTML = "";

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.page}</p>
        <p>${book.read ? "reading" : "not read yet"}</p>
        <div>
            <button class="delete-btn" data-id="${book.id}">Delete</button>
            <button class="edit-btn" data-id="${book.id}">Edit</button>
        </div>
        `;
        
        container.appendChild(card);
    });
}

function removeBook(id){
    myLibrary=myLibrary.filter(b=> b.id!== id)
    renderBook();
}
// CLOSE
function closeDialog() {
  dialog.close();
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const page = document.getElementById("page").value;
    const read = document.getElementById("read").checked;
    const id = crypto.randomUUID();

    const newBook = {
        id : id,
        title:title,
        author:author,
        page:page,
        read:read
    }
    myLibrary.push(newBook);
    renderBook();
    dialog.close();
})

editform.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("edittitle").value;
    const author = document.getElementById("editauthor").value;
    const page = document.getElementById("editpage").value;
    const read = document.getElementById("editread").checked;
    console.log(`object ${title}`);
    myLibrary = myLibrary.map(b => {
        if (b.id === editingBook.id) {
            return { ...b, title, author, page, read };
        }
        return b;
    });
    renderBook();
    editBookDialog.close();
})

document.getElementById("book-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        removeBook(id);
        renderBook();
    }
    if (e.target.classList.contains("edit-btn")) {
        const id = e.target.dataset.id;
        editDialog();
        editingBook = myLibrary.find(b => b.id === id);
        document.getElementById("edittitle").value = editingBook.title;
        document.getElementById("editauthor").value = editingBook.author;
        document.getElementById("editpage").value = editingBook.page;
        document.getElementById("editread").checked = editingBook.read;
    }

})

function Book(id,title,author,pages,read) {
    this.id =id;
    this.title =title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
}
