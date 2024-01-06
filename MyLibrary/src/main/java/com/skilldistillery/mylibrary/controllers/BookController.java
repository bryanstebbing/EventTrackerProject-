package com.skilldistillery.mylibrary.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.mylibrary.entities.Book;
import com.skilldistillery.mylibrary.services.BookService;

@RestController
@RequestMapping("api")
public class BookController {
	
	@Autowired
	private BookService bookService;
	
	@GetMapping("books")
	public List<Book> index(){
		List<Book> books = bookService.getAllBooks();
		return books;
		}
}
