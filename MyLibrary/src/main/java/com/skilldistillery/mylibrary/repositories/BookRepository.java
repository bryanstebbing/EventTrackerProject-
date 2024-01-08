package com.skilldistillery.mylibrary.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.mylibrary.entities.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {
	List<Book> findByNameLikeOrGenreLikeOrAuthorLikeOrFormatLike(String keyword1, String keyword2, String keyword3, String keyword4);
}
