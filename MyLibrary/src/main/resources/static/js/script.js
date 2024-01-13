console.log('script.js loaded');


window.addEventListener('load', function() {
	console.log('Page loaded, DOM complete');
	init();
});

//Adding Event Listeners for Update and Delete button Clicks START
document.addEventListener('DOMContentLoaded', function() {

	document.getElementById('bookListBody').addEventListener('click', function(event) {
		if (event.target.classList.contains('delete-btn')) {
			let bookId = event.target.dataset.bookId;
			deleteBook(bookId);
		} else if (event.target.classList.contains('update-btn')) {
			let bookId = event.target.dataset.bookId;
			let updatedData = {
				name: prompt('Enter updated name:', 'Updated Book Name'),
				author: prompt('Enter updated author:', 'Updated Author'),
				genre: prompt('Enter updated genre:', 'Updated Genre'),
				format: prompt('Enter updated format:', 'Updated Format'),
				length: prompt('Enter updated length:', 'Updated Length'),
				description: prompt('Enter updated description:', 'Updated Description'),
			};
			updateBook(bookId, updatedData);
		}
	});
});
//Adding Event Listeners for Update and Delete button Clicks END



function init() {
	loadLibrary();
	bookInfo.submit.addEventListener('click', function(event) {
		event.preventDefault();
		let newBook = {
			name: bookInfo.name.value,
			author: bookInfo.author.value,
			genre: bookInfo.genre.value,
			format: bookInfo.format.value,
			length: bookInfo.length.value,
			description: bookInfo.description.value
		}
		console.log(newBook);
		addToLibrary(newBook);
	});
	const searchBtn = document.getElementById('searchBtn');
	searchBtn.addEventListener('click', performSearch);
}

//XHR code START
function loadLibrary() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/books');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let bookLibrary = JSON.parse(xhr.responseText);
				console.log(bookLibrary)
				displaybookLibrary(bookLibrary);
			}
		}
	};

	xhr.send();
}

//Add a book START
function addToLibrary(book) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/books');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let bookLibrary = JSON.parse(xhr.responseText);
				loadLibrary(bookLibrary);
			} else {
				displayError("You've encountered the folllowing error: " + xhr.status);
			}
		}
	};
	xhr.setRequestHeader('Content-Type', 'application/json');
	let bookJson = JSON.stringify(book);
	xhr.send(bookJson);
	location.reload();

}
//Add a book END


//Search for a book START
function performSearch() {
    let keyword = document.getElementById('searchInput').value;
    console.log('Performing search for: ', keyword);
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/books/search/{keyword}');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let keywordResults = JSON.parse(xhr.responseText);
				displaybookLibrary(keywordResults);
			} else {
				displayError("You've encountered the folllowing error: " + xhr.status);
			}
		}
	};

	xhr.send();
}
//Search for a book END

//Delete Book Function START
function deleteBook(bookId) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', `api/books/${bookId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('Book deleted successfully');
				loadLibrary();
			} else {
				displayError("You've encountered the folllowing error: " + xhr.status);
			}
		}
	};
	xhr.send();
	location.reload();

}
//Delete Book Function END

//Update Book Function START
function updateBook(bookId, updatedData) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', `api/books/${bookId}`);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('Book updated successfully');
				loadLibrary();
			} else {
				displayError("You've encountered the folllowing error: " + xhr.status);
			}
		}
	};
	xhr.send(JSON.stringify(updatedData));
	location.reload();
}
//Update Book Function END

//XHR code END


//Loading books from the database start
function displaybookLibrary(bookLibrary) {
	let tbody = document.getElementById('bookListBody');
	for (let book of bookLibrary) {
		let tr = document.createElement('tr');
		tbody.appendChild(tr);
		let td = document.createElement('td');
		td.textContent = book.id;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = book.name;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = book.author;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = book.genre;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = book.format;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = book.length;
		tr.appendChild(td);
		td = document.createElement('td');
		td.textContent = book.description;
		tr.appendChild(td);

		tr.addEventListener('click', function(event) {
			console.log(event.target);
			let bookId = event.target.parentElement.firstElementChild.textContent;
			getBookDetails(bookId);
		});

		let deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'Delete';
		deleteBtn.classList.add('delete-btn');
		deleteBtn.dataset.bookId = book.id;
		tr.appendChild(deleteBtn);

		let updateBtn = document.createElement('button');
		updateBtn.textContent = 'Update';
		updateBtn.classList.add('update-btn');
		updateBtn.dataset.bookId = book.id;
		tr.appendChild(updateBtn);

	}
}

function getBookDetails(bookId) {
	console.log('getting book info for ' + bookId);
};
//Loading books from the database start


//Checking data input into the create a book form start
let verifyFormData = function(name, author, genre, format, length, description) {
	let errors = [];
	if (name.length === 0) {
		errors.push('Title cannot be blank');
	}
	if (author.length === 0) {
		errors.push('Author cannot be blank');
	}
	if (genre.length === 0) {
		errors.push('Genre cannot be blank');
	}
	if (format.length === 0) {
		errors.push('Format cannot be blank');
	}
	if (length.length !== 2) {
		errors.push('Length must be a number');
	}
	if (description.length === 0) {
		errors.push('Description cannot be blank');
	}
	return errors;
};

let submitCB = function(e) {
	e.preventDefault();
	console.log('Submit button clicked');
	let form = e.target.parentElement;
	console.log('Form values:', form.name.value, form.author.value, form.genre.value, form.format.value, form.length.value, form.description.value);

	let errors = verifyFormData(form.name.value, form.author.value,
		form.genre.value, form.format.value,
		form.length.value, form.description.value);
	console.log('Errors:', errors);

	if (errors.length > 0) {
		let errorDiv = document.getElementById('errors');
		for (let error of errors) {
			let li = document.createElement('li');
			li.textContent = error;
			li.style.color = 'red';
			errorDiv.appendChild(li);
		}
	} else {
		let bookTableBody = document.getElementById('bookListBody');
		let newRow = document.createElement('tr');

		td = document.createElement('td');
		td.textContent = form.name.value;
		newRow.appendChild(td);

		td = document.createElement('td');
		td.textContent = form.author.value;
		newRow.appendChild(td);

		td = document.createElement('td');
		td.textContent = form.genre.value;
		newRow.appendChild(td);

		td = document.createElement('td');
		td.textContent = form.format.value;
		newRow.appendChild(td);

		td = document.createElement('td');
		td.textContent = form.length.value;
		newRow.appendChild(td);

		td = document.createElement('td');
		td.textContent = form.description.value;
		newRow.appendChild(td);

		bookTableBody.appendChild(newRow);

		form.reset();
	}
};
//Checking data input into the create a book form end










