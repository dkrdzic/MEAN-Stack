import mongoose from 'mongoose'
import Book from './Book';



const Schema=mongoose.Schema;


let User =new Schema({

    _id: {
        type: Schema.Types.ObjectId,
        auto: true
      },
name:{
    
    type:String,
   //required:true

}
,
surname:{
    
    type:String,
   // required:true

}
,
username:{
    
    type:String,
   // required:true

}
,
password:{
    
    type:String,
   //required:true

}
,
birthday:{
    
    type:String,
  // required:true

}
,
city:{
    
    type:String,
 // required:true

},
country:{
    
    type:String,
  // required:true

}

,
email:{
    
    type:String,
  //  required:true

},

    userType:{
    
        type:String,
  //   required:true
    
    }
,
profileImage:{type:String},

booksToRead:{type:[Number]},

booksReading:{type:[Number]},

booksFinished:{type:[Number]}
,
following:{type:[String]},
notifications:{type:[String]},
followHappeningRequests:{type:[String]}



});

export default mongoose.model('User',User);


