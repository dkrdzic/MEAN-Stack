import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'
import { User } from './models/user';
import { Happening } from './models/happening';





@Injectable({
  providedIn: 'root'
})
export class UserService {



  uri="http://localhost:4000";

  constructor(private http:HttpClient) { }


register(user:User,img:File){

  const formData:FormData=new FormData();
if (img!=null)


formData.append('profileImg',img,img.name);
else formData.append('profileImg',img);

formData.append('user',JSON.stringify(user));



return this.http.post(`${this.uri}/registration`,formData);

//return this.http.post(`${this.uri}/registration`,user.img);

}


getUsers(){




return this.http.get(`${this.uri}/users`);


}



login(username,password){


const data={

  username:username,
  password:password
}


return this.http.post(`${this.uri}/login`,data);

}




findUser(username){

const data={

  username:username
}

return this.http.post(`${this.uri}/findUser`,data)


}



sendMail(email){

  const data={

  email:email,
  link:"http://localhost:4200/passwordReset"


  }


  return this.http.post(`${this.uri}/passwordForget`,data)




}




passwordReset(newPassword,oldPassword,user:User){

const data={

  newPassword:newPassword,
  oldPassword:oldPassword,
  user:user
}


return this.http.post(`${this.uri}/passwordReset`,data);



}



getRequest(){

return this.http.get(`${this.uri}/getRequests`);


}


acceptRequest(user:User){

const data={
user:JSON.stringify(user)
}

return this.http.post(`${this.uri}/requestAccept`,data);


}


changePrivilege(user:User,give:boolean){


  const data={

   user:JSON.stringify(user),
   give:give

  }


  return this.http.post(`${this.uri}/changePrivilege`,data);






}




changeUserName(user:User,name:string){

const data={

  user:JSON.stringify(user),
  name:name

}

return this.http.post(`${this.uri}/changeUserName`,data);

}

changeUserSurname(user:User,surname:string){

  const data={
  
    user:JSON.stringify(user),
    surname:surname
  
  }
  
  return this.http.post(`${this.uri}/changeUserSurname`,data);
  
  }
  

  changeUserBirthday(user:User,birthday:string){

    const data={
    
      user:JSON.stringify(user),
      birthday:birthday
    
    }
    
    return this.http.post(`${this.uri}/changeUserBirthday`,data);
    
    }


    changeUserCountry(user:User,country:string){

      const data={
      
        user:JSON.stringify(user),
        country:country
      
      }
      
      return this.http.post(`${this.uri}/changeUserCountry`,data);
      
      }
  
      changeUserCity(user:User,city:string){

       

        const data={
        
          user:JSON.stringify(user),
          city:city
        
        }
        
        return this.http.post(`${this.uri}/changeUserCity`,data);
        
        }


 
        changeUserUsername(user:User,username:string){

          
  
          const data={
          
            user:JSON.stringify(user),
            username:username
          
          }
          
          return this.http.post(`${this.uri}/changeUserUsername`,data);
          
          }
  


          changeUserEmail(user:User,email:string){

          
  
            const data={
            
              user:JSON.stringify(user),
              email:email
            
            }
            
            return this.http.post(`${this.uri}/changeUserEmail`,data);
            
            }



            changeImg(user:User,img:File){

              const formData:FormData=new FormData();
            if (img!=null)
            
            
            formData.append('profileImg',img,img.name);
            else formData.append('profileImg',img);
            
            formData.append('user',JSON.stringify(user));
            
            
            
            return this.http.post(`${this.uri}/changeImg`,formData);
            
            //return this.http.post(`${this.uri}/registration`,user.img);
            
            }
            


            updateFollowingList(user:User){



              const data={
            
                user:JSON.stringify(user)
              }
            
             return this.http.post(`${this.uri}/updateFollowingList`,data);
            
            
            
            }

            


 updateNotifications(user:User){

   
  const data={
   user:JSON.stringify(user)
      }
            
    return this.http.post(`${this.uri}/updateNotifications`,data);
            
    }


    makeHappening(happening:Happening){

    const data={

      happening:JSON.stringify(happening)
    }

    return this.http.post(`${this.uri}/makeHappening`,data);

    }



    getHappenings(){

      return this.http.get(`${this.uri}/getHappenings`);
    }


    updateHappening(id:number,active:boolean){

      console.log(active);

      const data={
        id:id,
        active:active
      }

      return this.http.post(`${this.uri}/updateHappening`,data);

    }




followHappening(happening:Happening){

const data={

  happening:JSON.stringify(happening),
 
}


return this.http.post(`${this.uri}/followHappening`,data);



}



updateHapReq(user:User){



  const data={

    user:JSON.stringify(user)
  }

 return this.http.post(`${this.uri}/updateHapReq`,data);



}




}
