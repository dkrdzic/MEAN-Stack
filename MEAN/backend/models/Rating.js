import mongoose from 'mongoose'




const Schema=mongoose.Schema;


let Rating =new Schema({

    _id: {
        type: Schema.Types.ObjectId,
        auto: true
      },
username:{
    type:String
},
bookId:{
    type:Number
},
note:{
    type:Number
}


});

export default mongoose.model('Rating',Rating);


