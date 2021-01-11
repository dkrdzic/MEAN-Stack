import mongoose from 'mongoose'



const Schema=mongoose.Schema;


let Happening =new Schema({

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
dateBegin:{
    
    type:String ,
   // required:true

},
dateEnd:{
    
    type:String ,
   // required:true

}

,
description:{
    
    type:String,
  // required:true

},
active:{
    type:Boolean
}
,
creator:{

    type:String
}
,
type:{
    type:String
},
noEnd:{
    type:Boolean
},

followers:{

    type:[String]
}




});

export default mongoose.model('Happening',Happening);


