package com.skilldistillery.mylibrary.services;

import java.util.List;

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
	public Book getBook(int bookId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Book create(Book book) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Book update(int bookId, Book book) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteById(int bookId) {
		// TODO Auto-generated method stub
		return false;
	}

}
