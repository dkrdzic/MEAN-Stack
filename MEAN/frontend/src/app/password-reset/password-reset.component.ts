import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

oldPassword:string;
newPassword:string;
confirmNewPassword:string;
poruka:string;
a:boolean;


passwordReset(){

  console.log("HEJ");

let user=JSON.parse(localStorage.getItem('user'));

console.log(user.username);

let passwordRegex = /^((([a-z])(?=.*\d)(?=.*(\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\{|\}|\[|\]|\||\\|\/|\:|\;|\'|\"|\<|\>|\,|\.|\?))(?=.*[A-Z]))|(([A-Z])(?=.*\d)(?=.*(\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\{|\}|\[|\]|\||\\|\/|\:|\;|\'|\"|\<|\>|\,|\.|\?))).{6,})$/;


if (this.emptyField(this.newPassword) || this.emptyField(this.oldPassword) || this.emptyField(this.confirmNewPassword)){

this.poruka="Polja ne smeju biti prazna!";
  this.a=false;
  return;
}




if (!passwordRegex.test(this.newPassword)){


this.poruka="Lozinka nije u odgovarajucem formatu!";
this.a=false;
return;

}

if (this.newPassword!=this.confirmNewPassword){

  this.poruka="Nova lozinka se ne poklapa sa potvrdom lozinke!";
this.a=false;
  return;
}



this.userService.passwordReset(this.newPassword,this.oldPassword,user).subscribe((data:{flag:boolean,poruka:string})=>
  {

  
  this.a=data.flag;
  this.poruka=data.poruka;

  if (this.a){
    let b:boolean=JSON.parse(localStorage.getItem("forgetPassword"));
    
    if(!b)
  {  
    console.log("HHH")
    localStorage.clear();
      
  this.router.navigate(['']);

  }else{
    user.password=this.newPassword;
    console.log("Lozinka je "+user.password)
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem("forgetPassword",JSON.stringify(false));
this.router.navigate(['user']);


  }

}

  });



}





emptyField(field): boolean{
  return (field=="" || field==null);
}


}
