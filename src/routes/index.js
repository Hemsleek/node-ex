const router =  require('express').Router()

const {
    getPeople ,
    getPerson,
    addPerson , 
    editPerson , 
    removePerson
} = require('../services/people.service')

router.get('/persons' , getPeople)
router.get('/persons/:id' , getPerson)
router.post('/persons' , addPerson)
router.patch('/persons/:id' , editPerson)
router.delete('/persons/:id' , removePerson)

router.all('/' , (req , res) => res.json({
    message:'welcome😎',
    hint:'try "/persons" sub-route'
}))

module.exports = router
