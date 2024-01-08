package com.skilldistillery.mylibrary.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.mylibrary.entities.Book;
import com.skilldistillery.mylibrary.repositories.BookRepository;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepository bookRepo;

	
	@Override
	public List<Book> getAllBooks() {
		return bookRepo.findAll();
	}

	@Override
	public Book create(Book book, Integer bookId) {
        if (book.getName() == null || book.getName().isEmpty()) {
            throw new IllegalArgumentException("Book name cannot be empty.");
		}
		return bookRepo.save(book);
	}

	@Override
	public Book update(int bookId, Book book) {
		Optional<Book> currentBook = bookRepo.findById(bookId);
		Book managedBook = null;
		if (currentBook.isPresent()) {
			managedBook = currentBook.get();
			managedBook.setName(book.getName());
			managedBook.setAuthor(book.getAuthor());
			managedBook.setGenre(book.getGenre());
			managedBook.setFormat(book.getFormat());
			managedBook.setLength(book.getLength());
			managedBook.setDescription(book.getDescription());
			
			bookRepo.saveAndFlush(managedBook);
			return managedBook;
		}
		return null;
	}

	@Override
	public boolean deleteById(int bookId) {
		Book book = bookRepo.findById(bookId).orElse(null);
		if (book != null) {
			bookRepo.delete(book);
			return true;
		}
		return false;
	}

	@Override
	public Book show(int bookId) {
		Optional<Book> bookById = bookRepo.findById(bookId);
		return bookById.get();
	}

	@Override
	public List<Book> searchByKeyword(String keyword) {
		keyword = "%" + keyword + "%";
		return bookRepo.findByNameLikeOrGenreLikeOrAuthorLikeOrFormatLike(keyword, keyword, keyword, keyword);
	}


}
