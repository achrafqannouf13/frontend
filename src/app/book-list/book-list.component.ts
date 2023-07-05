import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  displayedColumns: string[] = ['bookID','title', 'author', 'publicationDate', 'genre', 'price'];
  selectedBooks: Book[] = [];

  showModaladd = false;
  showModalsupp = false;
  showModalmod = false;
  bookID: number=0;
  title:string= '';
  author:string= '';
  publicationDate: Date = new Date();
  genre:string= '';
  price:number= 0;
  errorMessage: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.getBooks();
  }
  

  openModaladd() {
    this.showModaladd = true;
  }
  openModalsupp() {
    this.showModalsupp = true;
  }
  openModalmod() {
    this.showModalmod = true;
  }
  closeModaladd() {
    this.showModaladd = false;
  }
  closeModalsupp() {
    this.showModalsupp = false;
  }
  closeModalmod() {
  this.showModalmod = false;
                  }
  getBooks() {
    this.bookService.getAllBooks().subscribe((books: Book[]) => {
      this.dataSource.data = books;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  
  createBooks():void{
this.bookService.createBook(this.bookID,this.title,this.author,this.publicationDate,this.genre,this.price)
.subscribe(
  (response) => {
    // Inscription réussie, rediriger vers la page de connexion
    console.log('creation réussie:', response);
    window.location.reload(); 
  },
  (error) => {
    // Erreur d'inscription, afficher un message d'erreur
    console.error('Erreur d\'creation:', error);
    this.errorMessage = 'remplir tous les champs !';
  }
);
  }
  deleteBooks():void{
    this.bookService.deleteBook(this.bookID)
.subscribe(
  (response) => {
   // Suppression réussie, recharger le tableau des livres
    console.log('Suppression réussie:', response);
    window.location.reload(); 
  },
  (error) => {
    // Erreur d'inscription, afficher un message d'erreur
    console.error('Erreur de Suppression:', error);
    this.errorMessage = 'remplir tous les champs !';
  }
);
  }
  updateBooks(): void {
    this.bookService.updateBook(this.bookID,this.title,this.author,this.publicationDate,this.genre,this.price)
.subscribe(
  (response) => {
    // modification réussie, recharger le tableau des livres
    console.log('modification  réussie:', response);
    window.location.reload(); 
  },
  (error) => {
    // Erreur de modification , afficher un message d'erreur
    console.error('Erreur d\'modification :', error);
    this.errorMessage = 'remplir tous les champs !';
  }
);
  }
}
