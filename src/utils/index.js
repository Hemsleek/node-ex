//utils
const generateId =  () => persons.length > 0? 
                    Math.max(...persons.map(person => person.id)) + 1:
module.exports = {
    generateId
}