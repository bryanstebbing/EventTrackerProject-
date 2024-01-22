import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  books: Book[] = [];
  newBook: Book = new Book();
  selected: Book | null = null;
  editBook: Book | null = null;
  id: Book | 0 | undefined;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

getNumberOfBooks(): number{
  return this.books.length;
}

selectBook(books: Book): void {
  this.selected = books;
}

resetSelection(): void {
  this.selected = null;
}

  reload() {
    this.bookService.index().subscribe({
      next: (bookList) => {
        this.books = bookList;
      },
      error: (fail) => {
        console.error('BookListComponenet.reload: error')
        console.error(fail);
      }
    });
  }

  loadBooks() {
    this.bookService.index().subscribe({
      next: (bookList) => {
        this.books = bookList;
      },
      error: (oops) => {
        console.error('BookComponent.loadBooks error: error getting books');
        console.error(oops);

      }

    });
  }

  createBook(newBook: Book): void {
    this.bookService.create(newBook).subscribe({
      next: (data) => {
        this.loadBooks();
      },
      error: (err) => {
        console.log(err);
        console.log("Error block createBook: loadBooks in home.component");
      }
    });
  }

  deleteBook(id: number): void {
    if (id) {
      this.bookService.destroy(id).subscribe({
        next: (updatedTodo: any) => {
          this.reload();
        },
        error: (err: any) => {
          console.error('BookListComponent.updateTodo: error');
          console.error(err);
        }
      });
    }
  }

  setEditBook(): void {
    this.editBook = Object.assign({}, this.selected);
  }

  updateBook(id: number, updateBook: Book): void {
    if (this.editBook) {
      this.bookService.update(id, updateBook).subscribe({
        next: (editBook: any) => {
          this.reload();
          this.editBook = null;
        },
        error: (err: any) => {
          console.error('TodoListComponent.updateTodo: error');
          console.error(err);
        }
      });
    }
  }

}
