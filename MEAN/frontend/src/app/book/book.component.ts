import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../book.service';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Rating } from '../models/rating';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookService:BookService,private userService:UserService,private router:Router) { }

  async ngOnInit() {


    
    
   this.book=JSON.parse(localStorage.getItem('book'));

await this.getComments();
await this.getRatings();


console.log(this.allRatings[0]);


  }



  poruka:string;
  a:boolean;
book:Book;
allComments:Array<Comment>;
allRatings:Array<Rating>;

async getComments(){



  return new Promise((resolve,reject)=>{
    this.bookService.getComments().subscribe((comments:Array<Comment>)=>
    {
    
      this.allComments=comments;
      
        
        resolve();
      
    
    })
  
    })
  



}

async getRatings(){



  return new Promise((resolve,reject)=>{
    this.bookService.getRatings().subscribe((ratings:Array<Rating>)=>
    {
    
      this.allRatings=ratings;
      
        
        resolve();
      
    
    })
  
    })
  



}







seeProfile(){

this.poruka="Da biste videli korisnika koji je ostavio ovaj komentar ili njegov profil morate se registrovati!";
this.a=false;
return;
 
 
 
 
 
 
 
 }
 

 goBack(){

  this.router.navigate(["/guest"]);
 }






}
