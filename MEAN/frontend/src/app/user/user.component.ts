import { Component, OnInit,Input } from '@angular/core';
import { User } from '../models/user';
import { Ganre } from '../models/ganre';
import { Book } from '../models/book';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {Comment} from '../models/comment'

import { CommentBook } from '../models/commentBook';
import { Happening } from '../models/happening';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private bookService:BookService,private router:Router,private userService:UserService) { }

 async ngOnInit(){





    this.user=JSON.parse(localStorage.getItem('user'));
  
    localStorage.setItem("forgetPassword",JSON.stringify(false));

    await this.getBooks();
  
    await this.getComments();

    for (let i=0;i<this.allComments.length;i++){

     let commentAndBook=new CommentBook();
    

      let p1=  new Promise((resolve,reject)=>{
     
         this.bookService.findBook(this.allComments[i].idBook).subscribe((book:Book)=>{
      
           
           if(book) {this.commentedBooks.push(book); 
            commentAndBook.book=book; 
            commentAndBook.comment=this.allComments[i]; 
            this.arrayCommentAndBook.push(commentAndBook);
          }
      
     
           resolve();
     
         })
       })
     
       await p1;
     
         }

         
         await this.getGanres();

let help=new Ganre();
help.name="";

this.ganres.unshift(help);

await this.getUsers();

  }







  user:User
  poruka:string
 a:boolean

 users:Array<User>;

 book:Book=new Book();
 authors:string;
 bookGanres:Array<string>=new Array<string>();
porukaAddBook:string;
k:boolean
addBookBool:boolean;
 
 ganres:Array<Ganre>=new Array<Ganre>();
ganre:string
author:string;
name:string
books:Array<Book>=new Array<Book>();
foundBooks:Array<Book>=new Array<Book>();
h1:boolean;
readingBooks:Array<Book>=new Array<Book>();
h2:boolean;
booksToRead:Array<Book>=new Array<Book>();
booksFinished:Array<Book>=new Array<Book>();
h3:boolean;

commentedBooks:Array<Book>=new Array<Book>();



arrayCommentAndBook:Array<CommentBook>=new Array<CommentBook>();

userName:string;
changeNameBool:boolean;
porukaName:string;

userSurname:string;
porukaSurname:string;
changeSurnameBool:boolean;

userBirthday:string;
porukaBirthday:string;
changeBirthdayBool:boolean;

userCountry:string;
porukaCountry:string;
changeCountryBool:boolean;

userCity:string;
porukaCity:string;
changeCityBool:boolean;

userUsername:string;
porukaUsername:string;
changeUsernameBool:boolean;

userEmail:string;
porukaEmail:string;
changeEmailBool:boolean;

fileToUpload:File=null;
changeImgBool:boolean;
porukaImg:string;


allComments:Array<Comment>;


showBookRequestsBool:boolean;


onFileSelected(files:FileList){



  this.fileToUpload=files.item(0);
  
  
  
  
  }



foundUsers:Array<User>=new Array<User>();
userSearchName:string;
userSearchSurname:string;
userSearchEmail:string;
userSearchUsername:string;
porukaSearchUser:string;
l:boolean;

async getUsers(){



  return new Promise((resolve,reject)=>{


    this.userService.getUsers().subscribe((users:Array<User>)=>{

    if(users)
      {
        this.users=users;
        
        resolve();
      }
      else reject();


    });




  });


}







searchUser(){


this.porukaSearchUser="";

this.foundUsers=new Array<User>();

if (this.emptyField(this.userSearchEmail) && this.emptyField(this.userSearchName) && this.emptyField(this.userSearchSurname) && this.emptyField(this.userSearchUsername))
{

  this.porukaSearchUser="Bar jedno polje mora biti popunjeno!"
  this.l=false;
return;
}


let mailRegex = /^\w+@\w+\.\w+$/;

if (!mailRegex.test(this.user.email)){

  this.porukaSearchUser="Email adresa nije u korektnom formatu!";
  this.l=false;
  return;
  
  
  }

 if (this.userSearchUsername){
 
  for (let i=0;i<this.users.length;i++){

  if (this.users[i].username==this.userSearchUsername){

   this.foundUsers.push(this.users[i]);
   break;

  }

  }
 

 } 
else
 if (this.userSearchEmail){
 
  for (let i=0;i<this.users.length;i++){

  if (this.users[i].email==this.userSearchEmail){

   this.foundUsers.push(this.users[i]);
   break;

  }

  }
 

 } else
 if (this.userSearchName){
 
  for (let i=0;i<this.users.length;i++){

  if (this.users[i].name==this.userSearchName){

   this.foundUsers.push(this.users[i]);
   

  }

  }
 

 } else
 if (this.userSearchSurname){
 
  for (let i=0;i<this.users.length;i++){

  if (this.users[i].surname==this.userSearchSurname){

   this.foundUsers.push(this.users[i]);
   

  }

  }
 

 }
 
 if (this.foundUsers.length==0){

  this.porukaSearchUser="Nema takvog korisnika";
  this.l=false;
  return;
 }

  
} 


seeProfile(user:User){

let seeUser:User=user;
 

 
   

   localStorage.setItem('seeUserProfile',JSON.stringify(seeUser));
   
   this.router.navigate(['/seeUserProfile']);
 
 
 

 
 
 }




async showBookRequests(){

this.poruka="";
this.porukaAddBook="";

await this.getBooks();

this.showBookRequestsBool=true;
this.addBookBool=false;


}


acceptBookRequest(book:Book){

 
console.log(book.name)

  this.bookService.acceptBookRequest(book).subscribe(async (data)=>{



await  this.getBooks();
  });


  


}









showChangeImg(){


this.changeImgBool=true;

}


changeImg(){


  if (this.emptyField(this.fileToUpload)){
    
    this.porukaImg="Polje mora biti popunjeno";
    return;
  }



  this.userService.changeImg(this.user,this.fileToUpload).subscribe((data:string)=>{




    if (data){


      alert("Uspesno ste promeili sliku");

       this.user.profileImage=data;

  console.log(data)

  localStorage.setItem('user',JSON.stringify(this.user));
this.changeImgBool=false;
 
 
 
 }
 
    else{

      alert("Doslo je do greske!");

    }
 
 
   
   });



}


  

async getBooks(){




  return new Promise((resolve,reject)=>{
  this.bookService.getBooks().subscribe((books:Array<Book>)=>
  {
  
    
    
      this.books=books;
      resolve();
    
  
  })

  })


}


async getGanres(){


  return new Promise((resolve,reject)=>{
    this.bookService.getGanres().subscribe((ganres:Array<Ganre>)=>
    {
    
      
      
        this.ganres=ganres;
        resolve();
      
    
    })
  
    })


}






async search(){

  let b1:boolean;
  let b2:boolean;
  let b3:boolean;



  this.foundBooks=new Array<Book>();
  
  this.a=false;
  //console.log(this.ganre);
  
  if (this.emptyField(this.author) && this.emptyField(this.name) && this.emptyField(this.ganre)){
  
    this.poruka="Barem jedno polje mora biti popunjeno!";
  this.a=false;
    return;
  }
  
  
  if (!this.emptyField(this.author))b1=true;
  if (!this.emptyField(this.name))b2=true;
  if (!this.emptyField(this.ganre))b3=true;
  
  for(let i:number=0;i<this.books.length;i++){
  
  if(b1 && !b2 && !b3){
  
  for (let j:number=0;j<this.books[i].authors.length;j++){
  
  if(this.books[i].authors[j].indexOf(this.author)>=0){
  
    this.foundBooks.push(this.books[i]);
  
  break;
  }
  
  }
  
  
  }
  else if(b2 && !b1 && !b3){
    
  
    if(this.books[i].name.indexOf(this.name)>=0){
   
      this.foundBooks.push(this.books[i]);
  
    }
  
  
  }else if(b3 && !b1 && !b2){
  
    for (let j:number=0;j<this.books[i].ganres.length;j++){
  
      if(this.books[i].ganres[j]==this.ganre){
      
        this.foundBooks.push(this.books[i]);
       break;
      }
      
      }
  
  
  
  }
  else if(b1 && b2 && !b3){
  
    let h1:boolean;
    let h2:boolean;
    for (let j:number=0;j<this.books[i].authors.length;j++){
  
      if(this.books[i].authors[j].indexOf(this.author)>=0){
      h1=true;
        
      break;
      }
      
      }
      
      if(this.books[i].name.lastIndexOf(this.name)>=0){
  
        h2=true;
      
      }
  
  if (h1 && h2) this.foundBooks.push(this.books[i]);
  
  }else if(b1 && b3 && !b2){
  
  
   let h1:boolean;
    let h2:boolean;
    for (let j:number=0;j<this.books[i].authors.length;j++){
  
      if(this.books[i].authors[j].indexOf(this.author)>=0){
      h1=true;
        
      break;
      }
      
      }
      for (let j:number=0;j<this.books[i].ganres.length;j++){
  
        if(this.books[i].ganres[j]==this.ganre){
        
          h2=true;
         break;
        }
        
        }
  
        if (h1 && h2) this.foundBooks.push(this.books[i]);
  
  
  
  }else if(!b1 && b2 && b3){
  
    let h1:boolean;
    let h2:boolean;
  
  
  
      
    if(this.books[i].name.lastIndexOf(this.name)>=0){
  
      h1=true;
    
    }
  
  
  
    for (let j:number=0;j<this.books[i].ganres.length;j++){
  
      if(this.books[i].ganres[j]==this.ganre){
      
        h2=true;
       break;
      }
      
      }
  
      if (h1 && h2) this.foundBooks.push(this.books[i]);
  
  
  }else if(b1 && b2 && b3){
  
  
    let h1:boolean;
    let h2:boolean;
  let h3:boolean;
  
  
      
    if(this.books[i].name.lastIndexOf(this.name)>=0){
  
      h2=true;
    
    }
  
  
    for (let j:number=0;j<this.books[i].authors.length;j++){
  
      if(this.books[i].authors[j].indexOf(this.author)>=0){
      h1=true;
        
      break;
      }
      
      }
  
  
  
  
  
    for (let j:number=0;j<this.books[i].ganres.length;j++){
  
      if(this.books[i].ganres[j]==this.ganre){
      
        h3=true;
       break;
      }
      
      }
  
      if (h1 && h2 && h3) this.foundBooks.push(this.books[i]);
  
  }
  
  
  }
  
  if (this.foundBooks.length>0)this.a=true;
  else this.poruka="Knjiga koju trazite ne postoji u bazi!"




}




emptyField(field): boolean{
  return (field=="" || field==null);
}


goToBookPage(book:Book){

  console.log(book.name)

  localStorage.setItem('book',JSON.stringify(book));



this.router.navigate(['user/book']);


}



showReadingBooks(){

  this.poruka="";

this.readingBooks=new Array<Book>();

for (let i=0;i<this.user.booksReading.length;i++){


 for(let j=0;j<this.books.length;j++){

 if(this.user.booksReading[i]==this.books[j].id){ this.readingBooks.push(this.books[j]); break;}

 }



}


if(this.readingBooks.length==0){alert("Lista knjiga za citanje je prazna!")}
  
else this.h1=true;




}


showBooksToRead(){

this.booksToRead=new Array<Book>();
this.poruka="";

  for (let i=0;i<this.user.booksToRead.length;i++){
  
  
   for(let j=0;j<this.books.length;j++){
  
   if(this.user.booksToRead[i]==this.books[j].id){ this.booksToRead.push(this.books[j]); break;}
  
   }
  
  
  
  }
  
  if(this.booksToRead.length==0){alert("Lista knjiga za citanje je prazna!")}
  
  else this.h2=true;
  
  
  
  
  }
  
showFinishedBooks(){


  this.booksFinished=new Array<Book>();
  this.poruka="";
  
    for (let i=0;i<this.user.booksFinished.length;i++){
    
    
     for(let j=0;j<this.books.length;j++){
    
     if(this.user.booksFinished[i]==this.books[j].id){ this.booksFinished.push(this.books[j]); break;}
    
     }
    
    
    
    }
    
    if(this.booksFinished.length==0){alert("Lista knjiga za citanje je prazna!")}
    
    else this.h3=true;




}


async removeFromToReadList(book:Book){



  
  for (let i=0;i<this.user.booksToRead.length;i++){
    if(this.user.booksToRead[i]==book.id){

 this.user.booksToRead.splice(i,1);

 await new Promise((resolve,reject)=>{
  this.bookService.updateBooksLists(this.user).subscribe((data:boolean)=>{

if (data)
resolve();
else reject()

  });




})

   
   localStorage.setItem('user',JSON.stringify(this.user));
   this.h2=false;
    return;
    }
  }

this.a=false;
this.poruka="Knjiga koju zelite da izbrisete nije u listi citanja";






}


showChangeName(){

this.changeNameBool=true;





}

changeName(){

  if (this.emptyField(this.userName)){
    
    this.porukaName="Polje mora biti popunjeno";
    return;
  }




this.userService.changeUserName(this.user,this.userName).subscribe((data:boolean)=>{

if (data){

  alert("Uspesno ste promenili ime korisnika")
 
  this.user.name=this.userName;

  localStorage.setItem('user',JSON.stringify(this.user));
this.changeNameBool=false;

}else{

  alert("Promena nija bila uspesna");


}



})



}



showChangeSurname(){

  this.changeSurnameBool=true;


}


changeSurname(){


  if (this.emptyField(this.userSurname)){
    
    this.porukaSurname="Polje mora biti popunjeno";
    return;
  }




this.userService.changeUserSurname(this.user,this.userSurname).subscribe((data:boolean)=>{

if (data){

  alert("Uspesno ste promenili prezime korisnika")
 
  this.user.surname=this.userSurname;

  localStorage.setItem('user',JSON.stringify(this.user));
  this.changeSurnameBool=false;

}else{

  alert("Promena nija bila uspesna");



}



})




}

showChangeBirthday(){

this.changeBirthdayBool=true;

  
}




changeBirthday(){


  if (this.emptyField(this.userBirthday)){
    
    this.porukaBirthday="Polje mora biti popunjeno";
    return;
  }




this.userService.changeUserBirthday(this.user,this.userBirthday).subscribe((data:boolean)=>{

if (data){

  alert("Uspesno ste promenili datum rodjenja korisnika")
 
  this.user.birthday=this.userBirthday;

  localStorage.setItem('user',JSON.stringify(this.user));
  this.changeBirthdayBool=false;

}else{

  alert("Promena nija bila uspesna");



}



})


}



showChangeCountry(){

this.changeCountryBool=true;

}


changeCountry(){


  if (this.emptyField(this.userCountry)){
    
    this.porukaCountry="Polje mora biti popunjeno";
    return;
  }




this.userService.changeUserCountry(this.user,this.userCountry).subscribe((data:boolean)=>{

if (data){

  alert("Uspesno ste promenili drzavu korisnika")
 
  this.user.country=this.userCountry;

  localStorage.setItem('user',JSON.stringify(this.user));
  this.changeCountryBool=false;

}else{

  alert("Promena nija bila uspesna");



}



})


}



showChangeCity(){

  this.changeCityBool=true;
  
  }
  
  
  changeCity(){
  
  
    if (this.emptyField(this.userCity)){
      
      this.porukaCity="Polje mora biti popunjeno";
      return;
    }
  
  
  
  
  this.userService.changeUserCity(this.user,this.userCity).subscribe((data:boolean)=>{
  
  if (data){
  
    alert("Uspesno ste promenili grad korisnika")
   
    this.user.city=this.userCity;
  
    localStorage.setItem('user',JSON.stringify(this.user));
    this.changeCityBool=false;
  
  }else{
  
    alert("Promena nija bila uspesna");
  
  
  
  }
  
  
  
  })
  
  
  }




  showChangeUsername(){

this.changeUsernameBool=true;

  }



changeUsername(){



  if (this.emptyField(this.userUsername)){
      
    this.porukaUsername="Polje mora biti popunjeno";
    return;
  }




this.userService.changeUserUsername(this.user,this.userUsername).subscribe((data:boolean)=>{

if (data){

  alert("Uspesno ste promenili username korisnika")
 
  this.user.username=this.userUsername;

  localStorage.setItem('user',JSON.stringify(this.user));
  this.changeUsernameBool=false;

}else{

  alert("Promena nija bila uspesna");



}



})



}



showChangeEmail(){

  this.changeEmailBool=true;
  this.addBookBool=false;
  this.porukaEmail="";
  
    }
  
  
  
  changeEmail(){
  
  
  
    if (this.emptyField(this.userEmail)){
        
      this.porukaEmail="Polje mora biti popunjeno";
      return;
    }


  let mailRegex = /^\w+@\w+\.\w+$/;
  
  if (!mailRegex.test(this.userEmail)){

    this.porukaEmail="Email adresa nije u korektnom formatu!";
   
    return;
    
    
    }
  
  this.userService.changeUserEmail(this.user,this.userEmail).subscribe((data:boolean)=>{
  
  if (data){
  
    alert("Uspesno ste promenili email korisnika")
   
    this.user.email=this.userEmail;
  
    localStorage.setItem('user',JSON.stringify(this.user));
    this.changeEmailBool=false;
  
  }else{
  
    alert("Promena nija bila uspesna");
  
  
  
  }
  
  
  
  })
  
  
  
  }





  async getComments(){



    return new Promise((resolve,reject)=>{
      this.bookService.getComments().subscribe((comments:Array<Comment>)=>
      {
      
        this.allComments=comments;
        
          
          resolve();
        
      
      })
    
      })
    
  
  
  
  }




  


async showAddBook(){

this.addBookBool=true;
this.poruka="";
this.changeNameBool=false;
this.changeSurnameBool=false;
this.changeUsernameBool=false;
this.changeImgBool=false;
this.changeBirthdayBool=false;
this.changeCityBool=false;
this.changeCountryBool=false;
this.changeEmailBool=false;

await this.getGanres();


}


async addBook(){


console.log(this.book.pages);

await this.getBooks();

for (let i=0;i<this.books.length;i++){

  if (this.book.name==this.books[i].name)
  {this.k=false;
  this.porukaAddBook="Knjiga vec postoji u sistemu!";
  return;
  }


}


if (this.emptyField(this.authors) || this.emptyField(this.book.date)|| this.emptyField(this.bookGanres) || this.emptyField(this.book.name)
){

alert("Polja sa * moraju biti popunjena!")
  return;


}


let  authorsRegex=/^(.)*(,(.)+)*$/;

if (!authorsRegex.test(this.authors)){



alert('Autor(i) se unose u obliku autor1(,autor2,autor3...)')

return;
}

let autori=this.authors.split(',');

console.log(autori[0]);
this.book.authors=new Array<string>();

for (let i:number=0;i<autori.length;i++)this.book.authors.push(autori[i]);

console.log(this.book.authors[0]);

if (this.bookGanres.length>3){

 alert("Mozete maksimalno izabrati 3 zanra");

  return;
}

this.book.ganres=new Array<string>();

for (let i:number=0;i<this.bookGanres.length;i++)this.book.ganres.push(this.bookGanres[i]);

let id:number;

if (this.books.length==0 || this.books==null) id=-1;
else
id=this.books[this.books.length-1].id;


this.book.id=++id;

this.book.request=true;

this.bookService.addBook(this.book,this.fileToUpload).subscribe(async (data)=>{

if (data){

  this.porukaAddBook="Uspesno ste dodali knjigu!";
  this.k=true;
  


}
else{
  this.porukaAddBook="Knjiga nije dodata, doslo je do neke greske!";
  this.k=false;

}

await this.getBooks();

});







}


notificationsBool:boolean;

showNotifications(){

this.notificationsBool=true;



}


async eraseNotification(i:number){


console.log(i);

this.user.notifications.splice(i,1);


localStorage.setItem('user',JSON.stringify(this.user));


await new Promise((resolve,reject)=>{
this.userService.updateNotifications(this.user).subscribe((data:boolean)=>{

  if(data)
  resolve();



});



})

}


happeningBool:boolean;
happening:Happening=new Happening();

porukaHappening:string;
u:boolean;
happeningType:string;



async showMakeHappening(){

this.happeningBool=true;
this.porukaHappening="";

this.addBookBool=false;
this.poruka="";
this.changeNameBool=false;
this.changeSurnameBool=false;
this.changeUsernameBool=false;
this.changeImgBool=false;
this.changeBirthdayBool=false;
this.changeCityBool=false;
this.changeCountryBool=false;
this.changeEmailBool=false;

await this.getUsers();

this.happening=new Happening();
this.happening.active=false;
this.happening.noEnd=false;

}


allHappenings:Array<Happening>;



async makeHappening(){







  if (this.emptyField(this.happening.description) ||  this.emptyField(this.happening.name)){

    this.u=false;
    
    this.porukaHappening='Polja sa * moraju biti popunjena';
    
    return;
  
  }

if (this.happening.followers!=null){


for (let i=0;i<this.happening.followers.length;i++){


await new Promise((resolve,reject)=>{


  this.userService.findUser(this.happening.followers[i]).subscribe((data:User)=>{


  if (data){
  
    data.notifications.push("Korisnik "+this.user.username+" vas je dodao u svoj dogadjaj "+this.happening.name);


    this.userService.updateNotifications(data).subscribe((data2:boolean)=>{

        if (data2) resolve();


    })
  



  }



  })




})

if (this.happening.followers[i]==this.user.username)
  {
    this.user.notifications.push("Korisnik "+this.user.username+" vas je dodao u svoj dogadjaj "+this.happening.name);
    localStorage.setItem("user",JSON.stringify(this.user))}

}


    

}

  
if (this.happening.dateEnd==null && this.happening.noEnd==false){

  this.u=false;
  this.porukaHappening="Ako ne upisete kraj onda morate reci da je dogadjaj nema kraja i obrnuto!";
return;


}


let dateEnd:Date;
let dateBegin:Date;

  if (this.happening.dateEnd!=null){
    
    this.happening.noEnd=false;
  
  let  datumPocetak=this.happening.dateEnd.split('-');

     dateEnd= new Date(parseInt(datumPocetak[0]),parseInt(datumPocetak[1])-1,parseInt(datumPocetak[2]));
    

  
  }






if (this.user.userType=="moderator"){

  if (this.emptyField(this.happeningType)){

    this.u=false;
  
    this.porukaHappening='Moderator mora odabrati kakav tip desavanja pravi privatan ili javan';
    
    return;
  

  }


}else {this.happeningType="privatno"}

this.happening.type=this.happeningType;

this.happening.creator=this.user.username;


console.log(this.happening.active);




if (this.happening.dateBegin!=null){
let datumPocetak=this.happening.dateBegin.split('-');

 dateBegin= new Date(parseInt(datumPocetak[0]),parseInt(datumPocetak[1])-1,parseInt(datumPocetak[2]));



}






if (this.happening.dateBegin!=null && this.happening.dateEnd!=null){

  if (dateBegin.getTime()>dateEnd.getTime()){

    this.porukaHappening="Datum pocetka ne moze poceti kasnije od datuma kraja!";
    this.u=false;
    return;
  }
}

await this.getHappenings();

let id:number;
if (this.allHappenings==null) id=-1;
else id=this.allHappenings.length;

this.happening.id=++id;





this.userService.makeHappening(this.happening).subscribe((data:boolean)=>{

if (data){


  this.u=true;
  
  this.porukaHappening='Uspesno ste napravili dogadjaj!';
  
  this.happeningBool=false;



}



})


}



seeAllHappenings(){

  this.router.navigate(['/allHappenings']);



}


async getHappenings(){



  return new Promise((resolve,reject)=>{


    this.userService.getHappenings().subscribe((data:Array<Happening>)=>{

    if(data)
      {
        this.allHappenings=data;
        
        resolve();
      }
      else reject();


    });




  });


}



logout(){


  localStorage.clear();

this.router.navigate(['']);


}



}
