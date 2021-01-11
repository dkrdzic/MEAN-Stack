import mongoose from 'mongoose'




const Schema=mongoose.Schema;


let Page =new Schema({

    _id: {
        type: Schema.Types.ObjectId,
        auto: true
      },

username:{
    type:String
},page:{
    type:Number
},
idBook:{
    type:Number
}

});

export default mongoose.model('Page',Page);

