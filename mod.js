const domMangement = (function () {

  function appendChildren(parent, arrayOfChildren) {
    arrayOfChildren.forEach((child) => {
      parent.appendChild(child);
    })
  }

  function addAttributes(element, dict) {
    for (let key in dict) {
      element.setAttribute(key, dict[key]);
    }
  }

  function removeAllByClass(className) {
    document.querySelectorAll(className).forEach(e => e.remove());
  }

  return {
    appendChildren,
    addAttributes,
    removeAllByClass,
  }
})();



const booksModule = (function () {
  
  let books = [{title: 'title', author: 'author', pages: 22, readStatus: true}];

  // DOM Cache
  let table = document.getElementById("table");

  //bindEvents
  table.addEventListener('click', (event) => { deleteOrRemove(event)} );

  render ();

  function createBook(title, author, pages, readStatus) {
    readStatus = stringifyReadStatus(readStatus);
    console.log(status);
    book =  {
            title,
            author,
            pages,
            readStatus,
    };
    console.log(book);

    addBook(book);
  };

  function addBook(book) {
    books.push(book)
    render();
  }
 
  function deleteOrRemove(event) {
    let node = event.target;
    if (event.target && event.target.className == 'remove') {
      removeBook(node);
    } else if (event.target && event.target.className == 'status') {
      updateStatus(node);
    }
  }

  function removeBook(node) {
    index = node.getAttribute('data-attribute');
    books.splice(index, 1);
    render();
  }

  function updateStatus(node) {
    index = node.getAttribute('data-attribute');
    book = books[index];
    changeStatus(book)
    node.textContent = stringifyReadStatus(book.readStatus)
  }

  function changeStatus(book) {
    book.readStatus = !(book.readStatus);
  }

  function stringifyReadStatus(status) {
    return (status ? "Read" : "Unread" )
  }

  function render() {
    domMangement.removeAllByClass('.book-row')
    books.forEach((book) => {

      const thisRow = document.createElement('tr');
      const titleDisplay = document.createElement('td');
      const authorDisplay = document.createElement('td');
      const pagesDisplay = document.createElement('td');
      const readButtonTd = document.createElement('td');
      const readButton = document.createElement('button');
      const removeButtonTd = document.createElement('td')
      const removeButton = document.createElement('button');


      titleDisplay.textContent = book.title;
      authorDisplay.textContent = book.author;
      pagesDisplay.textContent = book.pages;
      readButton.textContent = stringifyReadStatus(book.status);
      removeButton.textContent = 'Remove';
      removeButton.setAttribute('class', 'remove');
      readButton.setAttribute('class', 'status');
      removeButton.setAttribute('data-attribute', books.indexOf(book).toString());
      readButton.setAttribute('data-attribute', books.indexOf(book).toString());
      thisRow.setAttribute('class', 'book-row')

      readButtonTd.appendChild(readButton);
      removeButtonTd.appendChild(removeButton);
      domMangement.appendChildren(thisRow, [titleDisplay, authorDisplay, pagesDisplay, readButtonTd, removeButtonTd]);
      table.appendChild(thisRow);
    })
  }

  return {
    createBook,
  }
})();



const formModule = (function () {
 

  // DOM Cache
  table = document.getElementById("table");
  button = document.getElementById("addBook")

  //event 
  table.addEventListener('click', (event) => { submitForm(event) })
  button.addEventListener('click', () => {
    button.classList.toggle('hidden');
    createForm()
  })

  function createForm() {
    el = document.createElement('tr');
    el.setAttribute('id', 'form-row')
    for ( let i = 0; i < 5; i++) {
      tabelData = document.createElement('td');
      input = document.createElement('input');
      switch(i) {
        case 0:
          domMangement.addAttributes(input, {id: 'title', name: 'title', type: 'text', placeholder: 'Title'} );
          break
        case 1:
          domMangement.addAttributes(input, {id: 'author', name: 'author', type: 'text', placeholder: 'Author'});
          break
        case 2:
          domMangement.addAttributes(input, {id: 'pages', name: 'pages', type: 'text', placeholder: 'Pages'});
          break
        case 3:
          domMangement.addAttributes(input, {id: 'read', name: 'read', type: 'checkbox'});
          break
        case 4:
          domMangement.addAttributes(input, {id: 'addRecord', name: 'addRecord', type: 'submit', class: 'submitForm'})
          break
      }
      tabelData.appendChild(input);
      el.appendChild(tabelData);
    }
    table.appendChild(el);
  }

  function getFormData() {
    title = document.getElementById("title").value;
    author = document.getElementById("author").value;
    pages = document.getElementById('pages').value;
    read = document.getElementById('read').checked;
    
    return {
      title,
      author,
      pages,
      read,
    }

  }

  function submitForm(event) {
    if (event.target && event.target.className == "submitForm")  {
      booksModule.createBook(getFormData().title, getFormData().author, getFormData().pages, getFormData().read);
      button.classList.toggle('hidden');
      document.getElementById('form-row').remove();
    }
  }

})();
