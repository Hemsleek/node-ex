const {Person} = require('../models')

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
    ]

module.exports ={
    getPeople(req , res){
        res.json(persons)
    },

    getPerson(req , res){
        const {id} = req.params
      
        const person = persons.find(person => person.id === parseInt(id))
  
        if(!person) return res.status(404)
                    .json({
                         message:`person with id:${id} was not found`
                    })
  
        res.json(person)
    },
    addPerson(req , res){
    const newPerson = req.body

    if(!newPerson.name || !newPerson.number) return res.status(400).json({
      message:`Name or Number is missing`
    })
    if(persons.some(person => person.name === newPerson.name)) return res.status(409).json({

    message:'Name must be unique'
  })

    newPerson.id =generateId() 
    persons = persons.concat(newPerson)
    res.json(newPerson)
    },

    editPerson(req , res){

        const {id} = req.params
        const noteUpdate = req.body
        
        const note = notes.find(note => note.id === parseInt(id))
        notes = notes.map(note => {
          if(note.id === parseInt(id)){
            note = {
              ...note,
              ...noteUpdate
            }
          }
          return note
        })
        
        res.status(200).json({
          ...note,
          ...noteUpdate
        })
    },

    removePerson(req , res){
        const {id} =req.params
   

        if(!persons.find(person => person.id == parseInt(id))) return res.status(400).json(persons)
        persons = persons.filter(person => person.id !== parseInt(id))
    
        res.json(persons)
    }

}