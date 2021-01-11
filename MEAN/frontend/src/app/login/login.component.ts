import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }

   ngOnInit(): void {
  }



password:string;
username:string;
poruka:string;
a:boolean;

login(){

if (this.password==null || this.password=="" || this.username==null || this.username==""){

this.poruka="Morate popuniti username i password"
  this.a=false;
  return;
}

this.userService.login(this.username,this.password).subscribe((user:User)=>{

  if(user){

  localStorage.setItem("user",JSON.stringify(user)); 
console.log(user.username);
  //vodi do neke rute
if(user.userType=='admin') this.router.navigate(['admin']);
else if (user.userType=='korisnik' || user.userType=='moderator') this.router.navigate(['user']);
  this.poruka="Uspesno ste se ulogovali!";
  this.a=true;

  }else{

    this.poruka="Ne postoji korisnik sa datim kredencijalima!";
this.a=false;
  }


});



}

}
