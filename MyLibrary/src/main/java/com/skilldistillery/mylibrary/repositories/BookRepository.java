package com.skilldistillery.mylibrary.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.mylibrary.entities.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {

}
