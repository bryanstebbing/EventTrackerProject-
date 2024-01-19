package com.skilldistillery.mylibrary.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.mylibrary.entities.Book;
import com.skilldistillery.mylibrary.services.BookService;

import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class BookController {

	@Autowired
	private BookService bookService;

	@GetMapping("books")
	public List<Book> index() {
		List<Book> books = bookService.getAllBooks();
		return books;
	}

	@GetMapping("books/{bookId}")
	public Book show(@PathVariable("bookId") Integer bookId, HttpServletResponse hsr) {
		Book book = bookService.show(bookId);
		if (book == null) {
			hsr.setStatus(404);
		}
		return book;
	}

	@PostMapping("books")
	public Book create(@RequestBody Book newBook, HttpServletResponse hsr) {
		try {
	        Book createdBook = bookService.create(newBook);
	        hsr.setStatus(201);
	        hsr.setHeader("Location", "http://localhost:8083/api/books");
	        return createdBook;
	    } catch (Exception e) {
	        e.printStackTrace();
	        hsr.setStatus(400);
	        return null;
	    }
	}

	@PutMapping("books/{bookId}")
	public Book update(@RequestBody Book book, @PathVariable("bookId") Integer bookId, HttpServletResponse hsr) {
		book.setId(bookId);
		book = bookService.update(bookId, book);
		if (book == null) {
			hsr.setStatus(404);
		}
		return book;
	}

	@DeleteMapping("books/{bookId}")
	public void deleteBook(@PathVariable("bookId") Integer bookId, HttpServletResponse hsr) {
		try {
			if (bookService.deleteById(bookId)) {
				hsr.setStatus(204);
			} else {
				hsr.setStatus(404);
			}
		} catch (Exception e) {
			hsr.setStatus(400);
			e.printStackTrace();
		}
	}

	@GetMapping("books/search/{keyword}")
	public List<Book> keywordSearch(@PathVariable("keyword") String keyword) {
		return bookService.searchByKeyword(keyword);
	}

}
