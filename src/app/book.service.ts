import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://127.0.0.1:3000/api';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books`);
  }

  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBook(bookID:number, title:string,author:string,publicationDate:Date,genre:string,price:number): Observable<any> {
    const createdata = {bookID,title,author,publicationDate,genre,price}
    return this.http.post(`${this.apiUrl}/books`, createdata);
  }

  updateBook(bookID:number, title:string,author:string,publicationDate:Date,genre:string,price:number): Observable<any> {
    const modifierdata = {bookID,title,author,publicationDate,genre,price}
    return this.http.put(`${this.apiUrl}/books/${bookID}`, modifierdata);
  }

  deleteBook(bookID: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/${bookID}`);
  }
  
}
