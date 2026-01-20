const mongoose = require('mongoose');
const {Schema} = mongoose;

const toDoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        // required:true

    },
    isCompleted:{
        type:Boolean,
        required:true,
    },
    completedOn:{
        type:String,
        // required:true,
    },
    createdBy:{
        ref: "User",
        type:Schema.ObjectId
    }
},
{
    timestamps: true
}
);

const ToDo = mongoose.model("ToDo",toDoSchema);

module.exports= ToDo;