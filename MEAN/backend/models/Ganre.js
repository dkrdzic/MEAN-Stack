


import mongoose from 'mongoose'



const Schema=mongoose.Schema;


let Ganre =new Schema({

    _id: {
        type: Schema.Types.ObjectId,
        auto: true
      },
name:{
    
    type:String,
   //required:true

}



});

export default mongoose.model('Ganre',Ganre);





