import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = environment.baseUrl + 'api/books';

  constructor(
    private http: HttpClient
  ) { }
}
