
const mongoose = require('mongoose')
const {Schema , model} = mongoose


if(process.argv.length < 3) {
    console.log('please pass the database password as argument')
    process.exit(1)
    }
const DbPass = process.argv[2]

const DB_URL = `mongodb+srv://fullstack:${DbPass}@cluster0.8cmno.mongodb.net/ReactExercise?retryWrites=true&w=majority`

const DB_SETUP = {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: false
}

mongoose.connect(DB_URL , DB_SETUP)

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
    

}, {collection:'people'}) //option1: add the name of the collection to use schema

const testSchema = new Schema({}) // option2: schema to connect to an existing collection

const person = model('People' , testSchema , 'people') //option2: model to connect to an existing collection

if(process.argv.length === 3){
  
    person.find().then(result => {

        console.log("yapiiiii")
        console.log(JSON.stringify(result , null , 2))
        process.exit(1)
    
    })
    .catch(error => {

        console.log({error})
        process.exit(1)
    })

    console.log('kukuma kill me')
   

}
else if(process.argv.length > 3 && process.argv.length===5){

    const newPerson = new person({
        name: process.argv[3],
        phoneNumber: process.argv[4]
      })
      newPerson.save()
        .then(result => {
            console.log('we have a new contact!')
            console.log({ newPersonSaved: result })
        })
        .catch(console.log)
       
       
}

 