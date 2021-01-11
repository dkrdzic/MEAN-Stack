import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

//import { CaptchaComponent } from 'angular-captcha'; 

//import { load } from 'recaptcha-v3'



//6Ld_z7sZAAAAAD9CNIPgKuP0b9_QrE14QsOC7Wf5 html code

//6Ld_z7sZAAAAADrW5hZMK_BtyqfNn2V7Op8lG6DM

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
 
})





export class RegistrationComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.user=new User();
  
  }


user:User;
poruka:String;
a:boolean;
users:Array<User>;
passwordConfirm:String;
fileToUpload:File=null;
requests:Array<User>;


 // uncomment the line bellow if you use Angular 8
   //@ViewChild(CaptchaComponent, { static: true }) captchaComponent: CaptchaComponent;
 

onFileSelected(files:FileList){



this.fileToUpload=files.item(0);




}




async getUsers(){



  return new Promise((resolve,reject)=>{


    this.userService.getUsers().subscribe((users:Array<User>)=>{

    if(users)
      {
        this.users=users;
        console.log(1);
        resolve();
      }
      else reject();


    });




  });


  /*
  const result=this.userService.getUsers().toPromise();
  
  
  result.then((resolve:Array<User>)=>{

    if(resolve){

      this.users=resolve;
     //console.log(this.users.length)
     //console.log(this.users[0].name);
     console.log(2);
     console.log(this.users[0].name);
      
    }
    



    });


    return result;
*/
}




async getRequests(){

  return new Promise((resolve,reject)=>{


    this.userService.getRequest().subscribe((users:Array<User>)=>{

    if(users)
      {
        this.requests=users;
        console.log(3);
        resolve();
      }
      


    });




  });


  


}







async register(){


  
await  this.getUsers();
 
 await   this.getRequests();   
 

if (this.requests.length>0)console.log(this.requests[0].name);


let passwordRegex = /^((([a-z])(?=.*\d)(?=.*(\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\{|\}|\[|\]|\||\\|\/|\:|\;|\'|\"|\<|\>|\,|\.|\?))(?=.*[A-Z]))|(([A-Z])(?=.*\d)(?=.*(\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\{|\}|\[|\]|\||\\|\/|\:|\;|\'|\"|\<|\>|\,|\.|\?))).{6,})$/;


let mailRegex = /^\w+@\w+\.\w+$/;
//let gradDrzavaRegex=/^[A-Z]( |[[:alpha:]])*$/;

if(this.emptyField(this.user.name) || this.emptyField(this.user.username) || this.emptyField(this.user.password)
|| this.emptyField(this.user.birthday) || this.emptyField(this.user.city) || this.emptyField(this.user.country)||this.emptyField(this.user.email)||this.emptyField(this.passwordConfirm)){
  this.poruka = "Morate popuniti sva polja sa zvezdicom!";
  return;
}



if (!passwordRegex.test(this.user.password)){

this.poruka="Lozinka nije u dobrom formatu! Lozinka mora poceti slovom, sadrzati minimum 7 karaktera, medju kojima mora biti 1 broj, 1 veliko slovo i 1 specijalni karakter!"
this.a=false;
return;
}


if (this.user.password!=this.passwordConfirm){

this.poruka="Lozinka se ne poklapa sa ponovljenom lozinkom! Molim Vas popunite opet!"
this.a=false;
return;

}

if (!mailRegex.test(this.user.email)){

this.poruka="Email adresa nije u korektnom formatu!";
this.a=false;
return;


}


let i:number=0;

for (;i<this.users.length;i++){

if (this.user.username==this.users[i].username || this.user.email==this.users[i].email){

  this.poruka="Korisnicko ime ili email adresa su vec zauzeti! "
  this.a=false;
  return;

}
  


}

i=0;


for (;i<this.requests.length;i++){

  if (this.user.username==this.requests[i].username || this.user.email==this.requests[i].email){
  
    this.poruka="Korisnicko ime ili email adresa su vec zauzeti! "
    this.a=false;
    return;
  
  }
    
  
  
  }


this.user.userType="gost";



let promise=new Promise((resolve,reject)=>{  
  
  this.userService.register(this.user,this.fileToUpload).subscribe((user:User)=>{

   if (user){
this.poruka="Uspesno ste se registrovali!";

console.log(user.username);
//console.log(help.username);
this.a=true;
resolve('a');


}

   else{
this.poruka="Regsitracija nije uspela!";
this.a=false;
reject();
   }


  
  });
});
console.log(7);
await promise;
console.log(8);
  await this.getUsers();
  await this.getRequests();  




}



emptyField(field): boolean{
  return (field=="" || field==null);
}



 


}
