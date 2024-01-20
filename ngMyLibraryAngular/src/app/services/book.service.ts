import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Book } from '../models/book';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  private url = environment.baseUrl + 'api/books';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url + '?sorted=true').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('BookService.index(): error retrieving book list: ' + err)
        );
      })
    );
  }
  create(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.url, newBook);
  }

  destroy(id: number): Observable<void> {
    return this.http.delete<void>(this.url + "/" + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.delete(): error deleting todo item: ' + err)
        );
      })
    );
  }

  update(id: number, editBook: Book): Observable<Book> {
      return this.http.put<Book>(this.url + "/" + id, editBook).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
            () => new Error('BookService.update(): error updating book list: ' + JSON.stringify(err))
          );
        })
      );
    }

}
