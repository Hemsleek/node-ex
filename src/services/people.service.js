const {Person} = require('../models')


const errorMsg = (error , res) => {

      console.log(JSON.stringify(error , null, 3))
      res.status(500).json({
        message: 'internal server Error'
      })
}

module.exports ={
    async getPeople(req , res){
      try {
        const people =await Person.find({} , 'name phoneNumber')
        res.json(people)

      }catch (error) {
        errorMsg(error , res)
      }
        
        
    },

   async getPerson(req , res){
        const {id} = req.params

        try {
          const person = await Person.findById(id)
          res.json(person)
          if(!person) return res.status(400).json({
            message: `person with id:${id} was not found`
          })

          res.json(person)
          
        } catch (error) {

         errorMsg(error , res)
        }
    },

    async addPerson(req , res){

      const newPerson = req.body

      if(!newPerson.name || !newPerson.phoneNumber) return res.status(400).json({
        message:`Name or Number is missing`
      })

      try {
        const personExist = await Person.countDocuments({name:newPerson.name})

        if(personExist) return res.status(400).json({
          message:`${newPerson.name} already exist , name must be unique`
        })
        let newPersonAdded = new Person({

          name:newPerson.name,
          phoneNumber : newPerson.phoneNumber,

        })
        newPersonAdded = await newPersonAdded.save()

        res.json(newPersonAdded)

      } catch (error) {
         errorMsg(error , res)
      }
     
    },

    async editPerson(req , res){

        const {id} = req.params
        const personUpdate = req.body

        if(!personUpdate.name && !personUpdate.phoneNumber) return res.status(400).json({
          message:"Nothing to Update"
        })
        try {
          const updateData = {}
          if(personUpdate.name) updateData.name = personUpdate.name
          if(personUpdate.phoneNumber) updateData.phoneNumber = personUpdate.phoneNumber

          const updatedPerson = await Person.findByIdAndUpdate(id ,updateData )
          // if(!updatedPerson) res.status(400).json({
          //   message:`person id:${id} not found`
          // })
          res.json(updatedPerson)

        } catch (error) {
            errorMsg(error , res)
        }
        
    },

    async removePerson(req , res){

        const {id} =req.params

        try {
          // console.log(await Person.findById(id))   
          // if(! await Person.findById(id)) return res.status(400).json({message:`person id:${id} not found`})

          const persons = await Person.findByIdAndRemove(id)
          // console.log(persons)
          res.json({message:`person id:${id} removed`}) 

        } catch (error) {
          errorMsg(error , res)
        }
    }

}