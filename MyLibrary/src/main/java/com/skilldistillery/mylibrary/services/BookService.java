package com.skilldistillery.mylibrary.services;

import java.util.List;

import com.skilldistillery.mylibrary.entities.Book;

public interface BookService {
	
	List<Book> getAllBooks();
	Book show(int bookId);
	Book create(Book book, Integer bookId);
	Book update(int bookId, Book book);
	boolean deleteById(int bookId);
	List<Book> searchByKeyword(String keyword);

}
