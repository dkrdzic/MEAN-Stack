import mongoose from 'mongoose'




const Schema=mongoose.Schema;


let Book =new Schema({

    _id: {
        type: Schema.Types.ObjectId,
        auto: true
      },
id:{
    type:Number
}
      ,
name:{
    
    type:String,
    //required:true

}
,
authors:{
    
    type:[String],
//required:true

}
,
date:{
    
    type:String ,
   // required:true

}
,
ganres:{
    
    type:[String],
   // required:true

}
,
description:{
    
    type:String,
  // required:true

}

,
rating:{
    
    type:Number,
   // required:true

}
,
coverImage:{type:String},

pages:
{
type:Number
}
,
request:{
type:Boolean
},

n:{
    type:Number
}



});

export default mongoose.model('Book',Book);


