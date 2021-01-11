import { Component, OnInit } from '@angular/core';
import { HappeningComponent } from '../happening/happening.component';
import { Happening } from '../models/happening';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Component({
  selector: 'app-all-happenings',
  templateUrl: './all-happenings.component.html',
  styleUrls: ['./all-happenings.component.css']
})
export class AllHappeningsComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  async ngOnInit() {


this.user=JSON.parse(localStorage.getItem("user"));

await this.getHappenings();



for (let i=0;i<this.allHappenings.length;i++){

let happening=this.allHappenings[i];

if (happening.dateEnd!=null )
{

  let  datumPocetak=happening.dateEnd.split('-');

 let  dateEnd= new Date(parseInt(datumPocetak[0]),parseInt(datumPocetak[1])-1,parseInt(datumPocetak[2]));

if (dateEnd.getTime()<Date.now()){

  await new Promise((resolve,reject)=>{
this.userService.updateHappening(happening.id,false).subscribe((data:boolean)=>{

  if (data){
resolve();
happening.active=false;

}
else reject

})
})

}

}


}



  }

allHappenings:Array<Happening>;
user:User;

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


goToHappeningPage(happening:Happening){


localStorage.setItem('happening',JSON.stringify(happening));

this.router.navigate(['/happening']);


}





}
