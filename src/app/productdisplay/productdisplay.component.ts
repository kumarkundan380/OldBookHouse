import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productdisplay',
  templateUrl: './productdisplay.component.html',
  styleUrls: ['./productdisplay.component.css']
})
export class ProductdisplayComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  booksell(){
    //console.log("for book sell.....");
    this.router.navigate(['/booksell']);
  }

}
