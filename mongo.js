
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
    

}) 

const Person = model('Person' , personSchema)

if(process.argv.length === 3){

    Person.find().then(res =>{
        console.log('PhoneBook')
        res.forEach(person => console.log(person.name , person.phoneNumber))
        process.exit(1) 
        })
        .catch(error => {

        console.log({error})
        process.exit(1)

        })

    console.log('Loading Data')
   
}

else if(process.argv.length > 3 && process.argv.length===5){

    const newPerson = new Person({
        name: process.argv[3],
        phoneNumber: process.argv[4]
      })
      newPerson.save()
        .then(result => {
            console.log(`Added ${result.name} number ${result.phoneNumber} to PhoneBook`)
            process.exit(1)
        })
        .catch((error) => {
            console.log('error saving')
            process.exit(1)
        })
       
       
}
