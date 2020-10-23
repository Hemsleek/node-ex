
const mongoose = require('mongoose')
const {Schema , model} = mongoose


if(process.argv.length < 3) {
    console.log('please pass the database password as argument')
    process.exit(1)
    }
    console.log(process.argv)
const DbPass = process.argv[2]

const DB_URL = `mongodb+srv://fullstack:${DbPass}@cluster0.8cmno.mongodb.net/ReactExercise?retryWrites=true&w=majority`

const DB_SETUP = {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: false
}

mongoose.connect(DB_URL , DB_SETUP)

const testSchema = new Schema({
    name:String,

    phoneNumber:{
        type:String,
        required:true
    },
    test:{
        type:String,
        default:"ana"
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

const Test = model('Test' , testSchema)

if(process.argv.length === 3){

    // Test.find({}, 'name phoneNumber -_id').then(res =>{
    //     console.log('PhoneBook')
    //     console.log(res)
    //     res.forEach(person => console.log(person.name , person.phoneNumber))
    //     process.exit(1) 
    //     })
    //     .catch(error => {

    //     console.log({error})
    //     process.exit(1)

    //     })

    // console.log('Loading Data')
    // const newTest = new Test({
    //    name:'mubashir',
    //    phoneNumber:'08173435345',

    // }).save().then(result => console.log(result)).catch(error => console.log(error))
    async function test(){
        testSchema.add({prefix:{aa :String}})
        
        const testt = await Test.findOne({"name": "mubashir"})
        console.log(testt)
        
        // testt.set(test , 'sdsfdsgg')
        // console.log(testt)
    }
         
    test()

     
   
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
