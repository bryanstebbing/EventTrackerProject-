package com.skilldistillery.mylibrary.services;

import java.util.List;

import com.skilldistillery.mylibrary.entities.Book;

public interface BookService {
	
	List<Book> getAllBooks();
	Book getBook(int bookId);
	Book create(Book book);
	Book update(int bookId, Book book);
	boolean deleteById(int bookId);
}
