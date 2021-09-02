    // button click handler :
const searchButton = () => {
    let searchText = document.getElementById('search-field');
     let searchValue = searchText.value;
     searchText.value = '';
     searchFunction(searchValue);
}
    // books details :
    const searchFunction = (searchValue) => {
    url = `https://openlibrary.org/search.json?q=${searchValue}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
    let Data = data.numFound;
    let noDataFound = document.getElementById('not-result-found');
    let totalBooksResult = document.getElementById('total-books');
    let detailsBooks = document.getElementById('all-book');
    // No Data Found Error Message show :
    if (Data === 0) {
    noDataFound.innerHTML = `
    <div class="m-auto col-md-6">
    <div class="alert alert-primary text-center" role="alert">
    Books are not Found
        </div>
            </div>                   
                    `
      detailsBooks.innerHTML = '';
      totalBooksResult.innerHTML = '';
                }
       else {
          noDataFound.innerHTML = '';
          let totalBooks = data.numFound;
          totalBooksResult.innerText = `
          Total Search Book : ${totalBooks}
                    `
            showBook(data.docs);
                }
            })
    }
    // all book details :
    const showBook = books => {
    let allBooksDetails = document.getElementById('all-book');
        allBooksDetails.textContent = '';
        books.forEach((book) => {  
            let imgId = book.cover_i;
            let imgUrl = `https://covers.openlibrary.org/b/id/${imgId}-M.jpg`
            let singleBook = document.createElement('div');
            singleBook.classList.add('col-lg-3');
            singleBook.classList.add('mb-3');
            singleBook.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${imgUrl}" class="card-img-top" height="300">
            <div class="card-body">
            <h6>Book Name: ${book.title}</h6>
            <p>Author: ${book.author_name}</p>
            <small>Publisher: ${book.publisher}</small> <br>
            <small>First Publish: ${book.first_publish_year}</small> <br>
            </div>
            </div>
                `
            allBooksDetails.appendChild(singleBook);
        })
    }