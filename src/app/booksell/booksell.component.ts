import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BookDetails, JavaServiceService } from '../java-service.service';

@Component({
  selector: 'app-booksell',
  templateUrl: './booksell.component.html',
  styleUrls: ['./booksell.component.css']
})
export class BooksellComponent implements OnInit {

  book:any;
  name:any;
  array:any;
  bookObj=new BookDetails();
  isBook:boolean=false;

  // book details variables 
  // title:string;
  // authors:string;
  // description:string; 
  // publisher:string;
  // publishedDate:string;
  // categories:string;
  // contentVersion:string;
  // isbn_type_10:string; 
  // isbnNo1:number; 
  // isbn_type_13:string;
  // isbnNo2:number;
  // smallThumbnail:string;
  // thumbnail:string;
  // amount:number=0.0;
  // currencyCode:string;
  // checkPrice:boolean;

  constructor(private httpClient:HttpClient,private javaService:JavaServiceService) { }

  sendData(){
     this.name=this.book.value;

     //console.log(this.name.isbnNo);

       this.httpClient.get('https://www.googleapis.com/books/v1/volumes?q='+this.name.isbnNo).subscribe(
         data=>{
           
            this.array=data;
            console.log(this.array.items[0]);
       
            this.isBook=true;
            // this.javaService.requestBookDetails(this.bookObj);
         }
       );
       
       
     }

  ngOnInit(): void {
    this.book = new FormGroup({
      isbnNo: new FormControl('')
    });
  }
  sellBook(bookNumber:number){
    console.log(this.array.items[bookNumber]);
           this.bookObj.book_name=this.array.items[bookNumber].volumeInfo.title;
           this.bookObj.authors= this.array.items[bookNumber].volumeInfo.authors[0];
           try {
           this.bookObj.description=this.array.items[bookNumber].volumeInfo.description.substring(0,255);
             
           } catch (error) {
           this.bookObj.description='No Description';
             
           }
          //  this.bookObj.description=this.array.items[bookNumber].volumeInfo.description.substring(0,255);
          //  console.log(this.bookObj.description.substring(0,255));
           this.bookObj.publisher=this.array.items[bookNumber].volumeInfo.publisher;
           this.bookObj.publishedDate=this.array.items[bookNumber].volumeInfo.publishedDate;
           try {
            this.bookObj.categories=this.array.items[bookNumber].volumeInfo.categories[0];
              
           } catch (error) {
            this.bookObj.categories='Miscellaneous';     
           }
           this.bookObj.contentVersion=this.array.items[bookNumber].volumeInfo.contentVersion;
           this.bookObj.isbn_type_10=this.array.items[bookNumber].volumeInfo.industryIdentifiers[0].type;
           this.bookObj.isbnNo1=this.array.items[bookNumber].volumeInfo.industryIdentifiers[0].identifier;
           this.bookObj.isbn_type_13=this.array.items[bookNumber].volumeInfo.industryIdentifiers[1].type;
           this.bookObj.isbnNo2=this.array.items[bookNumber].volumeInfo.industryIdentifiers[1].identifier;
           try{
            this.bookObj.smallThumbnail=this.array.items[bookNumber].volumeInfo.imageLinks.smallThumbnail;
            this.bookObj.thumbnail=this.array.items[bookNumber].volumeInfo.imageLinks.thumbnail;
           }catch(error){
            this.bookObj.smallThumbnail="";
            this.bookObj.thumbnail="";
           }
           this.bookObj.checkPrice=this.array.items[bookNumber].saleInfo.isEbook;
           if(this.bookObj.checkPrice){
                this.bookObj.amount =this.array.items[bookNumber].saleInfo.listPrice.amount;
                this.bookObj.currencyCode=this.array.items[bookNumber].saleInfo.listPrice.currencyCode;
           }
          this.javaService.requestBookDetails(this.bookObj);
  }
}
