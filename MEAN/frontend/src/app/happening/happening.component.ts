import { Component, OnInit } from '@angular/core';
import { Happening } from '../models/happening';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { UserEvent } from '../models/userEvent';
import {Comment} from '../models/comment'
import { BookService } from '../book.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-happening',
  templateUrl: './happening.component.html',
  styleUrls: ['./happening.component.css']
})
export class HappeningComponent implements OnInit {

  constructor(private userService:UserService, private bookService:BookService,private router:Router) { }

 async ngOnInit() {
    this.element=JSON.parse(localStorage.getItem('happening'));
    this.user=JSON.parse(localStorage.getItem("user"));
await this.getComments();


     for (let i=0;i<this.user.followHappeningRequests.length;i++){

     let help=this.user.followHappeningRequests[i].split(" ");
     let username=help[0];
     let id=parseInt(help[1]);
     let uE=new UserEvent();
     uE.username=username;
     uE.event=id;

     this.userEvent.push(uE);


     } 
      

  }

  element:Happening;
a:boolean;
poruka:string;
user:User;

userEvent:Array<UserEvent>=new Array<UserEvent>();


 async closeHappening(){

   if (this.element.active){

    await new Promise((resolve,reject)=>{
      this.userService.updateHappening(this.element.id,false).subscribe((data:boolean)=>{
      
        if (data){
      resolve();
    this.element.active=false;
    }
      else resolve();
      
      })
      })


   }else{

    this.poruka='Dogadjaj je vec zatvoren';
    this.a=false;
    return;

   }

   localStorage.setItem('happening',JSON.stringify(this.element));


  }



  async openHappening(){

    this.poruka="";

    if (this.element.dateEnd!=null )
    {
    
      let  datumPocetak=this.element.dateEnd.split('-');
    
     let  dateEnd= new Date(parseInt(datumPocetak[0]),parseInt(datumPocetak[1])-1,parseInt(datumPocetak[2]));
    
    if (dateEnd.getTime()>Date.now()){
    
      await new Promise((resolve,reject)=>{
    this.userService.updateHappening(this.element.id,true).subscribe((data:boolean)=>{
    
      if (data){
    resolve();
    this.element.active=true;
      }
    else resolve();
    
    })
    })
    
    }else {

      this.poruka='Ne mozete otvoriti dogadjaj koji je zavrsen!';
      this.a=false;
      
      return;
  

    }
    
    }else {

      await new Promise((resolve,reject)=>{
        this.userService.updateHappening(this.element.id,true).subscribe((data:boolean)=>{
        
          if (data){
        resolve();
        this.element.active=true;
        localStorage.setItem("happening",JSON.stringify(this.element));
      
      }
        else reject
        
        })
        })


    }






  }




async followRequest(){

let creator:User;

await new Promise((resolve,reject)=>{

this.userService.findUser(this.element.creator).subscribe((data:User)=>{

if (data)
{

  creator=data;
  resolve();

}else {


  alert("Doslo je do greske!!!");
  resolve();
  return;
}



})

})

console.log(creator.username);

if (creator.followHappeningRequests==null){

  creator.followHappeningRequests=new Array<string>();
}else {

for (let i=0;i<creator.followHappeningRequests.length;i++){
console.log("PP")

let help=this.user.username+" "+this.element.id;

if (creator.followHappeningRequests[i]==help){

  alert("Vec ste poslali zahtev!");
  return;
}

}


}

creator.followHappeningRequests.push(this.user.username+" "+this.element.id);

this.userService.updateHapReq(creator).subscribe((data:boolean)=>{

if (data){

alert("Uspesno ste poslali zahtev za pracenje");



}else alert("Doslo je do greske");




})


return new Promise((resolve,reject)=>{
  resolve();
})


}










async followHappening(){

  for(let i=0;i<this.element.followers.length;i++){


    if (this.element.followers[i]==this.user.username){
    
    alert("Vec pratite ovaj dogadjaj")
      return;
    }
    
    
    }


if (this.element.type=="privatno" && this.element.creator!=this.user.username && this.element.active){


 await this.followRequest();


  return;



}



if (this.element.active==false){

alert("Ne mozete pratiti dogadjaj koji nije aktivan!");
  return;
}




if (this.element.followers==null)
 this.element.followers=new Array<string>();

this.element.followers.push(this.user.username);
localStorage.setItem("happening",JSON.stringify(this.element));



this.userService.followHappening(this.element).subscribe((data:boolean)=>{

if (data)
  alert("Uspesno pratite dogadjaj!");
else
alert("Doslo je do greske!");

})





}


allHappenings:Array<Happening>;


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







async acceptEventReq(username:string){



  for (let i=0;i<this.user.followHappeningRequests.length;i++){
    console.log("PP")
    console.log(this.user.followHappeningRequests[i]);
    let help=username+" "+this.element.id;
    
    if (this.user.followHappeningRequests[i]==help){
    
console.log("www")
      this.user.followHappeningRequests.splice(i,1);
      this.userEvent.splice(i,1);
    

    

    }
    
    }



this.userService.updateHapReq(this.user).subscribe((data1:boolean)=>{


if (data1){



this.userService.findUser(username).subscribe((data2:User)=>{


if (data2.notifications==null)
 data2.notifications=new Array<string>();

let r:boolean;

 if (this.element.active==false){

  data2.notifications.push("Dogadjaj "+this.element.name+" za koji ste poslali zahtev je zatvoren i ne mozete ga pratiti");


r=false;


  }else 
  {data2.notifications.push("Vas zahtev za pracenje dogadjaja "+this.element.name+" je prihvacen!");

r=true;
}
  
  if (this.element.followers==null)
   this.element.followers=new Array<string>();
  
  this.element.followers.push(data2.username);
  localStorage.setItem("happening",JSON.stringify(this.element));
  localStorage.setItem("user",JSON.stringify(this.user));
  

  this.userService.updateNotifications(data2).subscribe((data3:boolean)=>{
 
 
if (data3){

  if(r){


  this.userService.followHappening(this.element).subscribe((data3:boolean)=>{
  
  
    
    })
    
  }



}

 
 
 
  })
 


})


}


})



}


newComment:Comment=new Comment();




async makeComment(){


  if (this.newComment.comment==null){

    alert("Morate popuniti polje");
    return;
  }

  if (this.newComment.comment.length>1000){
  
  
    this.poruka="Komentar ne sme imati preko 1000 reci!";
    this.a=false;
    return;
  }

let k:number;
  for( k=0;k<this.element.followers.length;k++){

if (this.element.followers[k]==this.user.username){
  break;
}


  }

  if (k==this.element.followers.length){

    alert("Ne mozete ostaviti komentar ako ne pratite dogadjaj!")
    return;
  }
  
  this.newComment.username=this.user.username;
  
  this.newComment.idBook=this.element.id;
  
  await this.getComments();
  
  let id:number;
  
  if (this.allComments.length==0 || this.allComments==null) id=-1;
  else
  id=this.allComments[this.allComments.length-1].id;
  
  
  this.newComment.id=++id;
  
  this.newComment.type="event";
  
  this.bookService.addNewComment(this.newComment).subscribe(async (data)=>{
  
  
  if (data){
 alert("Uspesno ste ostavili komentar")
  await this.getComments();
  
  
  
  for (let i=0;i<this.element.followers.length;i++){

    let follower:User;
  await new Promise((resolve,reject)=>{


    this.userService.findUser(this.element.followers[i]).subscribe((data:User)=>{


follower=data;
      resolve();
    })



  })

  
    if (follower.notifications==null)
       follower.notifications=new Array<string>();
  
 
  
 
  
  follower.notifications.push("Korisnik "+follower.username+"je postavio komentra o dogadjaju "+this.element.name+" koga pratite ");
  
  await new Promise((resolve,reject)=>{
  
  this.userService.updateNotifications(follower).subscribe((data:Boolean)=>{
  
    if(data)
  resolve();
  
  });
  })
  
  
  
  
  
  
  
  
  }
  
  
  
  
    
  }
  else{
  
    this.poruka="Komentar nije uspesno postavljen!"
    this.a=false;
  
  }
  
  
  });
  
  
  
  
  
  
  }
  
  allComments:Array<Comment>;
  

  async getComments(){



    return new Promise((resolve,reject)=>{
      this.bookService.getComments().subscribe((comments:Array<Comment>)=>
      {
  
        if (comments){
      console.log(1);
        this.allComments=comments;
        
          
          resolve();
        }
        else reject()
      
      })
    
      })
    
  
  
  
  }





}







