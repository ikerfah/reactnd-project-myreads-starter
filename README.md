# MyReads Project

MyReads project is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there.
With the possibility to search for books to add to your library.

This project is using React.


## Installation

To get started developing or running the project, to:
* clone this repo
* install all project dependencies with `npm install`
* start the development server with `npm start`


## Backend Server

To simplify the development process, please use the provided file [`BooksAPI.js`](src/BooksAPI.js) that contains the methods needed will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
