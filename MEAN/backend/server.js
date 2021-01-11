
const mongoose=require('mongoose');
const express=require('express');
const cors=require('cors');
//const bodyParser = require('express').json();
const multer =require('multer');
const path=require('path');

const nodemailer = require('nodemailer');








//import mongoose from 'mongoose'
//import express from 'express'
//import cors from 'cors'
import bodyParser from 'body-parser'
//import multer from 'multer'
import fs from 'fs'
import User from './models/User'
import Book from './models/Book'
import Ganre from './models/Ganre'
import Page from './models/Page';
import Comment from './models/Comment'
import Happening from './models/Happening';
import Rating from './models/Rating';
//import path from 'path'
//import { isRegExp } from 'util'

//var async=require('async');



const upload=multer({dest:'uploads/'});
const app=express();


app.get('/',(req,res)=>res.send('Hello world!'));





const router=express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads',express.static(path.join(__dirname,'uploads')));








router.route('/users').get(async (req,res)=>{ 

   mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });


    const connection=mongoose.connection;
       
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully!get acceptedUsers');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;

  


await User.find((err,users)=>{
if(err)
  { console.log("ERROR!");res.status(400).json(null);}
else res.json(users);



});



let p2=new Promise((resolve,reject)=>{
  
  connection.close(function () {
  console.log('Mongoose connection disconnected get accepted users');
resolve();

});
});
await p2;


}

);






router.get('/getRequests',async (req,res)=>{

  mongoose.connect('mongodb://localhost:27017/request',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! getRequest');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;


  await User.find((err,users)=>{
    if(err)
      { console.log("ERROR!");res.status(400).json(null);}
    else res.json(users);
    
    //console.log(1);
    
    });


    let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected getRequest');
    resolve();
    
    });
    });

    await p2;

})






router.post("/registration",upload.single('profileImg'),async  (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/request',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully registration');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;



let user=new User(JSON.parse(req.body.user));

if (req.file==null) {

    
    user.profileImage=   req.protocol +
"://" +
req.get("host") +
"/uploads/" +"generic.jpg";



}
else{



 const oldFilePath=req.file.path;


req.file.originalname=user.username+path.extname(req.file.originalname).toLocaleLowerCase();
req.file.filename=user.username+path.extname(req.file.originalname).toLocaleLowerCase();
req.file.path='uploads\\'+req.file.originalname;


//use the fs object's rename method to re-name the file
let p4=new Promise((resolve,reject)=>{

 fs.rename(oldFilePath, req.file.path, function (err) {
if (err) {console.log(err); return; }
 
resolve();
});});


await p4;


user.profileImage=   req.protocol +
"://" +
req.get("host") +
"/uploads/" +
user.username +
path.extname(req.file.originalname).toLowerCase();



}

user._id=new mongoose.Types.ObjectId();




await user.save().
then(data=>{// u data ti je odgovor tj ono sto je sacuvano
console.log(data.name);
    console.log(data);
   res.json(data);//posalje user-a frontend-u
  // console.log(5);


}).catch(err=>{
    res.status(400);
    console.log(err);
   
})

let p2=new Promise((resolve,reject)=>{
  
  connection.close(function () {
  console.log('Mongoose connection disconnected registration');
resolve();

});
});
await p2;



}



);





router.post('/login',async (req,res)=>{


    mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully! login');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;


    let username=req.body.username;
    let password=req.body.password;

 var promise=   User.findOne({username:username,password:password}).exec();
 
await promise.then((user)=>{

  if(user){res.json(user); console.log(user.username)}
  else {res.json(null);}
  
      }).catch((err)=>{
          
        res.status(400);

      });
 


    let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected login');
    resolve();
    
    });
    });


    await p2;
   console.log(10);
  
  });




router.post('/passwordForget',async (req,res)=>{

    mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully password forget!');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;
    console.log(req.body.email);

    await   User.findOne({email:req.body.email},(err,user)=>{
       
        if(user){sendMail(req.body.email,"Promena lozinke","Idite na link i promenite lozinku "+ req.body.link); res.json({user:user,poruka:"Email je uspesno poslat!",flag:true})}
        else {res.json({user:null,poruka:"Ne postoji korisnik sa datom email adresom",flag:false});}
        if(err){res.status(400);}
        
            })


   await connection.close(function () {
        console.log('Mongoose connection disconnected password forget');
      });



});



function sendMail(to,subject,text){

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dukakcar97@gmail.com',
        pass: 'dukajecar'
      }
    });
  
  var mailOptions = {
    from: 'dukakcar97@gmail.com',
    to: to,
    subject: subject,
    text: text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) 
      console.log(error+" HEJ");
  });
  
  }





router.post('/passwordReset',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! passwordReset');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



  await   User.findOne({username:req.body.user.username}, async (err,user)=>{
       
    if(user){

      
      if(user.password==req.body.oldPassword){
     
        await User.updateOne({username:req.body.user.username},{password:req.body.newPassword},(err)=>{
          
        if (err) res.status(400);
        else res.json({flag:true,poruka:"Lozinka uspesno promenjena!"});
          
        });

        
      }
    
    else{

        res.json({flag:false,poruka:"Niste lepo uneli staru lozinku!"});
      }
    }else if (err){


      res.status(400);


    }else{res.json({flag:false,poruka:"Korisnik ne postoji!"});}
    

    
        })




        let p2=new Promise((resolve,reject)=>{
  
          connection.close(function () {
          console.log('Mongoose connection disconnected passwordReset');
        resolve();
        
        });
        });
        await p2;

});









router.get('/books',async (req,res)=>{

  mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! books');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;


  await Book.find((err,books)=>{
    if(err)
      { console.log("ERROR!");res.status(400).json(null);}
    else res.json(books);
    
    //console.log(1);
    
    });


    let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected 3 books');
    resolve();
    
    });
    });
    await p2;

})










router.post('/requestAccept',async(req,res)=>{
  console.log(1);

  mongoose.connect('mongodb://localhost:27017/request',{ useNewUrlParser: true, useUnifiedTopology: true });



 const connection1=mongoose.connection;
     
 let p1= new Promise((resolve,reject)=>{ 
    
  connection1.once('open',()=>{
  console.log('MongoDB database connection established successfully requestAccept!');
  resolve();
  console.log("Promise resolved");
  });
  
  
  
});
 await p1;


 

let user=new User(JSON.parse(req.body.user));

console.log(user.username);

await User.deleteOne({username:user.username},(err,data)=>{



  if (err)res.status(400).json(null);

  

});


let p4=new Promise((resolve,reject)=>{
  
  connection1.close(function () {
  console.log('Mongoose connection disconnected requestAccept');
resolve();

});
});
await p4;


mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



const connection2=mongoose.connection;
    
let p2= new Promise((resolve,reject)=>{ 
    
  connection2.once('open',()=>{
  console.log('MongoDB database connection established successfully requestaccept 2!');
  resolve();
  console.log("Promise resolved");
  });
  
  
  
});
 await p2;




console.log(2);
console.log(user.username);

user._id=new mongoose.Types.ObjectId();
user.userType='korisnik';

await user.save().
then(data=>{// u data ti je odgovor tj ono sto je sacuvano

res.status(200).json(data);



}).catch(err=>{
    //res.status(400);
    console.log(err);
    res.status(400);
   
})



let p3=new Promise((resolve,reject)=>{
  
  connection2.close(function () {
  console.log('Mongoose connection disconnected acceptRequest2');
resolve();

});


});
await p3;




})





router.post('/changePrivilege',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully changePrivilege!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



let user=new User(JSON.parse(req.body.user));
let type;


if (req.body.give==true) type='moderator';
else type='korisnik';



await User.updateOne({username:user.username},{userType:type},(err)=>{
          
  if (err) res.status(400).json(null);
  else{ res.json(true);}
 
    
  });








   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})







router.post("/addBook",upload.single('profileImg'),async  (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully addBook');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;



let book=new Book(JSON.parse(req.body.book));

if (req.file==null) {

    
    book.coverImage=   req.protocol +
"://" +
req.get("host") +
"/uploads/" +"generic.jpg";



}
else{



 const oldFilePath=req.file.path;


req.file.originalname=book.id+path.extname(req.file.originalname).toLocaleLowerCase();
req.file.filename=book.id+path.extname(req.file.originalname).toLocaleLowerCase();
req.file.path='uploads\\'+req.file.originalname;


//use the fs object's rename method to re-name the file
let p4=new Promise((resolve,reject)=>{

 fs.rename(oldFilePath, req.file.path, function (err) {
if (err) {console.log(err); return; }
 
resolve();
});});


await p4;


book.coverImage=   req.protocol +
"://" +
req.get("host") +
"/uploads/" +
book.id +
path.extname(req.file.originalname).toLowerCase();



}

book._id=new mongoose.Types.ObjectId();
book.rating=0;
book.n=0;

console.log(book.pages)

if (book.pages==null || book.pages==undefined)
  book.pages=100;



await book.save().
then(data=>{// u data ti je odgovor tj ono sto je sacuvano
console.log(data.name);
    console.log(data);
   res.json(data);//posalje user-a frontend-u
  // console.log(5);


}).catch(err=>{
    res.status(400);
    console.log(err);
   res.json(null);
})

let p2=new Promise((resolve,reject)=>{
  
  connection.close(function () {
  console.log('Mongoose connection disconnected registration');
resolve();

});
});
await p2;



}



);





router.get('/getGanres',async (req,res)=>{

  mongoose.connect('mongodb://localhost:27017/ganres',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! ganres');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;


  await Ganre.find((err,ganres)=>{
    if(err)
      { console.log("ERROR!");res.status(400).json(null);}
    else res.json(ganres);
    
    //console.log(1);
    
    });


    let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected ganres!');
    resolve();
    
    });
    });

    await p2;

})



router.post("/addGanre",async(req,res)=>{



  mongoose.connect('mongodb://localhost:27017/ganres',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! addganre');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;

   console.log(req.body.ganre);


   let ganre=new Ganre();

ganre.name=req.body.ganre;


ganre._id=new mongoose.Types.ObjectId();




await ganre.save().
then(data=>{// u data ti je odgovor tj ono sto je sacuvano

    console.log(data);
   res.json(data);//posalje user-a frontend-u
  // console.log(5);


}).catch(err=>{
    res.status(400);
    console.log(err);
   res.json(null);
})





  let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected addganre!');
  resolve();
  
  });
  });

  await p2;



})








router.post("/deleteGanre",async(req,res)=>{



  mongoose.connect('mongodb://localhost:27017/ganres',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! addganre');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;

   console.log(req.body.ganre);




await Ganre.deleteOne({name:req.body.ganre},(err,data)=>{



  if (err)res.status(400).json(false);
else res.json(true);
  

});





  let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected addganre!');
  resolve();
  
  });
  });

  await p2;



})



router.post('/updateBooksLists',async(req,res)=>{


  console.log(2);


  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;
 


let user=new User(JSON.parse(req.body.user));
  
console.log(3)
   

    await User.updateOne({username:user.username},{booksToRead:user.booksToRead,booksReading:user.booksReading,booksFinished:user.booksFinished},(err)=>{

if(err){console.log(err); res.json(false)}
else res.json(true);


    });

      



     let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected ');
    resolve();
    
    });
    });
  
    await p2;

})



router.post('/changeUserName',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully changePrivilege!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



let user=new User(JSON.parse(req.body.user));



 



await User.updateOne({username:user.username},{name:req.body.name},(err)=>{
          
  if (err) res.status(400).json(false);
  else{ res.json(true);}
 
    
  });








   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})



router.post('/changeUserSurname',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully changePrivilege!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



let user=new User(JSON.parse(req.body.user));



 



await User.updateOne({username:user.username},{surname:req.body.surname},(err)=>{
          
  if (err) res.status(400).json(false);
  else{ res.json(true);}
 
    
  });








   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})








router.post('/changeUserBirthday',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully changePrivilege!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



let user=new User(JSON.parse(req.body.user));



 



await User.updateOne({username:user.username},{birthday:req.body.birthday},(err)=>{
          
  if (err) res.status(400).json(false);
  else{ res.json(true);}
 
    
  });



   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})





router.post('/changeUserCountry',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully changePrivilege!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



let user=new User(JSON.parse(req.body.user));



 



await User.updateOne({username:user.username},{country:req.body.country},(err)=>{
          
  if (err) res.status(400).json(false);
  else{ res.json(true);}
 
    
  });



   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})


router.post('/changeUserCity',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully changePrivilege!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



let user=new User(JSON.parse(req.body.user));



 



await User.updateOne({username:user.username},{city:req.body.city},(err)=>{
          
  if (err) res.status(400).json(false);
  else{ res.json(true);}
 
    
  });



   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})





router.post('/changeUserUsername',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! passwordReset');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;

let user=new User(JSON.parse(req.body.user))



  await   User.findOne({username:req.body.username}, async (err,data)=>{
       
    if(data){

    res.json(false);  
    
    }else if (err){


      res.status(400).json(false);
      console.log(err);


    }else{

      await User.updateOne({username:user.username},{username:req.body.username},(err,data)=>{

        if (err){console.log(err); res.json(null);}
        else res.json(true);
 
       });
    }
    

    
        })




        let p2=new Promise((resolve,reject)=>{
  
          connection.close(function () {
          console.log('Mongoose connection disconnected passwordReset');
        resolve();
        
        });
        });
        await p2;

});





router.post('/changeUserEmail',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! passwordReset');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;

let user=new User(JSON.parse(req.body.user))



  await   User.findOne({email:req.body.email}, async (err,data)=>{
       
    if(data){

    res.json(false);  
    
    }else if (err){


      res.status(400).json(false);
      console.log(err);


    }else{

      await User.updateOne({username:user.username},{email:req.body.email},(err,data)=>{

       if (err){console.log(err); res.json(null);}
       else res.json(true);

      });
     
    }
    

    
        })




        let p2=new Promise((resolve,reject)=>{
  
          connection.close(function () {
          console.log('Mongoose connection disconnected passwordReset');
        resolve();
        
        });
        });
        await p2;

});







router.post("/changeImg",upload.single('profileImg'),async  (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully registration');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;



let user=new User(JSON.parse(req.body.user));



 const oldFilePath=req.file.path;


req.file.originalname=user.username+path.extname(req.file.originalname).toLocaleLowerCase();
req.file.filename=user.username+path.extname(req.file.originalname).toLocaleLowerCase();
req.file.path='uploads\\'+req.file.originalname;


//use the fs object's rename method to re-name the file
let p4=new Promise((resolve,reject)=>{

 fs.rename(oldFilePath, req.file.path, function (err) {
if (err) {console.log(err); return; }
 
resolve();
});});


await p4;


user.profileImage=   req.protocol +
"://" +
req.get("host") +
"/uploads/" +
user.username +
path.extname(req.file.originalname).toLowerCase();


await User.updateOne({username:user.username},{profileImage:user.profileImage},(err)=>{


if (err) res.status(400).json(null);

else {

res.json(user.profileImage);


}


});



let p2=new Promise((resolve,reject)=>{
  
  connection.close(function () {
  console.log('Mongoose connection disconnected registration');
resolve();

});
});
await p2;



}



);


router.post('/updateBookPage',async(req,res)=>{





  mongoose.connect('mongodb://localhost:27017/pages',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;
 
     console.log(req.body.page)
     console.log(req.body.username)
     console.log(req.body.idBook)

    await Page.updateOne({username:req.body.username,idBook:req.body.idBook},{page:req.body.page},(err)=>{


    });

      



     let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected ');
    resolve();
    
    });
    });
  
    await p2;

})


router.post('/findPages',async(req,res)=>{





  mongoose.connect('mongodb://localhost:27017/pages',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;
 


await Page.findOne({username:req.body.username,idBook:req.body.idBook},(err,page)=>{


if (page){res.json(page)}
else res.json(null);



})
  
   

  

     let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected ');
    resolve();
    
    });
    });
  
    await p2;

})




router.post("/makeNewPage",async(req,res)=>{



  mongoose.connect('mongodb://localhost:27017/pages',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! addganre');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;




   let page=new Page(JSON.parse(req.body.page));




page._id=new mongoose.Types.ObjectId();




await page.save().
then(data=>{// u data ti je odgovor tj ono sto je sacuvano

    console.log(data);
   res.json(data);//posalje user-a frontend-u
  // console.log(5);


}).catch(err=>{
    res.status(400);
    console.log(err);
   res.json(null);
})





  let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected addganre!');
  resolve();
  
  });
  });

  await p2;



})



router.post("/addNewComment",async(req,res)=>{



  mongoose.connect('mongodb://localhost:27017/comments',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! ');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;

   


   let comment=new Comment(JSON.parse(req.body.comment));




comment._id=new mongoose.Types.ObjectId();




await comment.save().
then(data=>{// u data ti je odgovor tj ono sto je sacuvano

    console.log(data);
   res.json(data);//posalje user-a frontend-u
  // console.log(5);


}).catch(err=>{
    res.status(400);
    console.log(err);
   res.json(null);
})





  let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected !');
  resolve();
  
  });
  });

  await p2;



})






router.get('/getComments',async (req,res)=>{

  console.log(2)
    mongoose.connect('mongodb://localhost:27017/comments',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;

   console.log(1);

  await Comment.find((err,comments)=>{
    if(err)
      { console.log("ERROR!");res.status(400).json(null);}
    else res.json(comments);
    
    //console.log(1);
    
    });


    let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected');
    resolve();
    
    });
    });
    await p2;

})






router.post('/findUser',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
  
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! login');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;


  let username=req.body.username;
 

var promise=   User.findOne({username:username}).exec();

await promise.then((user)=>{

if(user){res.json(user); console.log(user.username)}
else {res.json(null);}

    }).catch((err)=>{
        
      res.status(400);
       console.log(err);
    });



  let p2=new Promise((resolve,reject)=>{

    connection.close(function () {
    console.log('Mongoose connection disconnected login');
  resolve();
  
  });
  });


  await p2;
 console.log(10);

});



router.post('/deleteComment',async (req,res)=>{

  mongoose.connect('mongodb://localhost:27017/comments',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;

   let comment=new Comment(JSON.parse(req.body.comment))

  await Comment.deleteOne({id:comment.id},(err,data)=>{

    if (err){console.log(err); res.json(null)}
    else res.json(true);

  });

    let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected');
    resolve();
    
    });
    });
    await p2;

})




router.post('/changeComment',async(req,res)=>{





  mongoose.connect('mongodb://localhost:27017/comments',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;
 
     let comment=new Comment(JSON.parse(req.body.comment))
    

    await Comment.updateOne({id:comment.id},{comment:req.body.updateComment},(err)=>{

      if(!err) res.json(true);

    });

      



     let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected ');
    resolve();
    
    });
    });
  
    await p2;

})






router.post('/findBook',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
  
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! login');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;


  let id=req.body.id;
 

var promise=   Book.findOne({id:id}).exec();

await promise.then((book)=>{

if(book){res.json(book); }
else {res.json(null);}

    }).catch((err)=>{
        
      res.status(400);
       console.log(err);
    });



  let p2=new Promise((resolve,reject)=>{

    connection.close(function () {
    console.log('Mongoose connection disconnected login');
  resolve();
  
  });
  });


  await p2;
 console.log(10);

});







router.post('/acceptBookRequest',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;

   


let book=new Book(JSON.parse(req.body.book));

console.log(book.name)


await Book.updateOne({id:book.id},{request:false},(err)=>{
          
  if (err) res.status(400).json(null);
  else{ res.json(true);}
 
    
  });








   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})




router.post('/updateFollowingList',async(req,res)=>{





  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;
 


let user=new User(JSON.parse(req.body.user));
  

   

    await User.updateOne({username:user.username},{following:user.following});

      res.json(true);



     let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected ');
    resolve();
    
    });
    });
  
    await p2;

})





router.post('/updateNotifications',async(req,res)=>{





  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;
 


let user=new User(JSON.parse(req.body.user));
  

   console.log(user.notifications.length);

    await User.updateOne({username:user.username},{notifications:user.notifications},(err,data)=>{

if (err){console.log(err);res.json(false)}
else res.json(true);

    });

      



     let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected ');
    resolve();
    
    });
    });
  
    await p2;

})









router.post("/makeHappening",async(req,res)=>{



  mongoose.connect('mongodb://localhost:27017/happenings',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! addganre');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;




   let happening=new Happening(JSON.parse(req.body.happening));




happening._id=new mongoose.Types.ObjectId();




await happening.save().
then(data=>{// u data ti je odgovor tj ono sto je sacuvano

    console.log(data);
   res.json(data);//posalje user-a frontend-u
  // console.log(5);


}).catch(err=>{
    res.status(400);
    console.log(err);
   res.json(null);
})





  let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected addganre!');
  resolve();
  
  });
  });

  await p2;



})





router.route('/getHappenings').get(async (req,res)=>{ 

  mongoose.connect('mongodb://localhost:27017/happenings',{ useNewUrlParser: true, useUnifiedTopology: true });


   const connection=mongoose.connection;
      
 let p1= new Promise((resolve,reject)=>{ 
   
   connection.once('open',()=>{
   console.log('MongoDB database connection established successfully!get acceptedUsers');
   resolve();
   console.log("Promise resolved");
   });
   
   
   
 });
  await p1;

 


await Happening.find((err,data)=>{
if(err)
 { console.log("ERROR!");res.status(400).json(null);}
else res.json(data);



});



let p2=new Promise((resolve,reject)=>{
 
 connection.close(function () {
 console.log('Mongoose connection disconnected get accepted users');
resolve();

});
});
await p2;


}

);






router.post('/updateHappening',async(req,res)=>{


  console.log(2);


  mongoose.connect('mongodb://localhost:27017/happenings',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;
 





    await Happening.updateOne({id:req.body.id},{active:req.body.active},(err,data)=>{

if(err){console.log(err); res.json(false)}
else {res.json(true); console.log(1)}


    });

      



     let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected ');
    resolve();
    
    });
    });
  
    await p2;

})








router.post('/changeBookName',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully changePrivilege!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



let book=new Book(JSON.parse(req.body.book));



 



await Book.updateOne({id:book.id},{name:req.body.name},(err)=>{
          
  if (err) res.status(400).json(false);
  else{ res.json(true);}
 
    
  });





   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})


router.post('/changeBookAuthors',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully changePrivilege!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



let book=new Book(JSON.parse(req.body.book));




await Book.updateOne({id:book.id},{authors:book.authors},(err)=>{
          
  if (err) res.status(400).json(false);
  else{ res.json(true);}
 
    
  });





   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})



router.post("/changeCover",upload.single('profileImg'),async  (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully registration');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;



let book=new Book(JSON.parse(req.body.book));

console.log(book.id);

 const oldFilePath=req.file.path;


req.file.originalname=book.id+path.extname(req.file.originalname).toLocaleLowerCase();
req.file.filename=book.id+path.extname(req.file.originalname).toLocaleLowerCase();
req.file.path='uploads\\'+req.file.originalname;

console.log(2);

//use the fs object's rename method to re-name the file
let p4=new Promise((resolve,reject)=>{

 fs.rename(oldFilePath, req.file.path, function (err) {
if (err) {console.log(err); return; }
 
resolve();
});});


await p4;


book.coverImage=   req.protocol +
"://" +
req.get("host") +
"/uploads/" +
book.id +
path.extname(req.file.originalname).toLowerCase();

console.log(book.coverImage)

await Book.updateOne({id:book.id},{coverImage:book.coverImage},(err)=>{


if (err) res.status(400).json(null);

else {

res.json(true);


}


});



let p2=new Promise((resolve,reject)=>{
  
  connection.close(function () {
  console.log('Mongoose connection disconnected registration');
resolve();

});
});
await p2;



}



);





router.post('/changeBookGanres',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully changePrivilege!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



let book=new Book(JSON.parse(req.body.book));




await Book.updateOne({id:book.id},{ganres:book.ganres},(err)=>{
          
  if (err) res.status(400).json(false);
  else{ res.json(true);}
 
    
  });





   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})





router.post('/changeBookDescr',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully changePrivilege!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



let book=new Book(JSON.parse(req.body.book));




await Book.updateOne({id:book.id},{description:req.body.newDescr},(err)=>{
          
  if (err) res.status(400).json(false);
  else{ res.json(true);}
 
    
  });





   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})




router.post('/changeBookDate',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully changePrivilege!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



let book=new Book(JSON.parse(req.body.book));




await Book.updateOne({id:book.id},{date:req.body.newDate},(err)=>{
          
  if (err) res.status(400).json(false);
  else{ res.json(true);}
 
    
  });





   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})



router.post('/changeBookPages',async (req,res)=>{


  mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
      
  let p1= new Promise((resolve,reject)=>{ 
      
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully changePrivilege!');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;



let book=new Book(JSON.parse(req.body.book));




await Book.updateOne({id:book.id},{pages:req.body.newPages},(err)=>{
          
  if (err) res.status(400).json(false);
  else{ res.json(true);}
 
    
  });





   let p2=new Promise((resolve,reject)=>{
  
    connection.close(function () {
    console.log('Mongoose connection disconnected changePrivilege');
  resolve();
  
  });
  
  
  });
  await p2;


})




router.post("/makeRating",async(req,res)=>{



  mongoose.connect('mongodb://localhost:27017/ratings',{ useNewUrlParser: true, useUnifiedTopology: true });



  const connection=mongoose.connection;
     
  let p1= new Promise((resolve,reject)=>{ 
    
    connection.once('open',()=>{
    console.log('MongoDB database connection established successfully! ');
    resolve();
    console.log("Promise resolved");
    });
    
    
    
  });
   await p1;

   





   let rating=new Rating(JSON.parse(req.body.rating));



   await Rating.findOne({username:rating.username,bookId:rating.bookId},async (err,r)=>{


    if (r!=null){

      console.log("k");
await Rating.updateOne({username:rating.username,bookId:rating.bookId},{note:rating.note},(err)=>{


});
console.log("KK");
      res.json(r);
     
    }else {

console.log("LLL");
      rating._id=new mongoose.Types.ObjectId();

      await rating.save().
      then(data=>{// u data ti je odgovor tj ono sto je sacuvano
      
          console.log(data);
         res.json(null);//posalje user-a frontend-u
        // console.log(5);
      
      
      }).catch(err=>{
          res.status(400);
          console.log(err);
         res.json(null);
      })

    }


    let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected !');
    resolve();
    
    });
    });
  
    await p2;
  




   })








})







router.post('/rateBook',async(req,res)=>{


  console.log(2);


  mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;
 


let book=new Book(JSON.parse(req.body.book));
  
console.log(3)
   

    await Book.updateOne({id:book.id},{rating:book.rating,n:book.n},(err)=>{

if(err){console.log(err); res.json(false)}
else res.json(true);


    });

      



     let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected ');
    resolve();
    
    });
    });
  
    await p2;

})







router.route('/followHappening').post(async (req,res)=>{ 

  mongoose.connect('mongodb://localhost:27017/happenings',{ useNewUrlParser: true, useUnifiedTopology: true });


   const connection=mongoose.connection;
      
 let p1= new Promise((resolve,reject)=>{ 
   
   connection.once('open',()=>{
   console.log('MongoDB database connection established successfully!');
   resolve();
   console.log("Promise resolved");
   });
   
   
   
 });
  await p1;

 
let happening=new Happening(JSON.parse(req.body.happening));

console.log(happening.followers)
console.log(happening.id)
await Happening.updateOne({id:happening.id},{followers:happening.followers},(err,data)=>{

  if (data){
    res.json(true);
    console.log(data)
  }
  else res.json(false);
})




let p2=new Promise((resolve,reject)=>{
 
 connection.close(function () {
 console.log('Mongoose connection disconnected');
resolve();

});
});
await p2;


}

);






router.post('/updateHapReq',async(req,res)=>{





  mongoose.connect('mongodb://localhost:27017/users',{ useNewUrlParser: true, useUnifiedTopology: true });

 

    const connection=mongoose.connection;
       
    let p1= new Promise((resolve,reject)=>{ 
    
      connection.once('open',()=>{
      console.log('MongoDB database connection established successfully');
      resolve();
      console.log("Promise resolved");
      });
      
      
      
    });
     await p1;
 


let user=new User(JSON.parse(req.body.user));
  

   

    await User.updateOne({username:user.username},{followHappeningRequests:user.followHappeningRequests});

      res.json(true);



     let p2=new Promise((resolve,reject)=>{
  
      connection.close(function () {
      console.log('Mongoose connection disconnected ');
    resolve();
    
    });
    });
  
    await p2;

})





router.route('/getRatings').get(async (req,res)=>{ 

  mongoose.connect('mongodb://localhost:27017/ratings',{ useNewUrlParser: true, useUnifiedTopology: true });


   const connection=mongoose.connection;
      
 let p1= new Promise((resolve,reject)=>{ 
   
   connection.once('open',()=>{
   console.log('MongoDB database connection established successfully!get acceptedUsers');
   resolve();
   console.log("Promise resolved");
   });
   
   
   
 });
  await p1;

 


await Rating.find((err,ratings)=>{
if(err)
 { console.log("ERROR!");res.status(400).json(null);}
else res.json(ratings);


});



let p2=new Promise((resolve,reject)=>{
  
  connection.close(function () {
  console.log('Mongoose connection disconnected ');
resolve();

});
});

await p2;


})






app.use('/',router);

app.listen(4000,()=> console.log('Express server running on port 4000!'));















