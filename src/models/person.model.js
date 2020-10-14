
const {model , Schema} = require('mongoose')

const personSchema = new Schema({
    name:String,

    phoneNumber:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
      },
    

})

module.exports = model('Person' , personSchema)