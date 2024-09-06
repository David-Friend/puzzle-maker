const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const Puzzle = mongoose.model(
    'Puzzle',

    new Schema({
        rows:[{type:Object}],
        columns:[{type:Object, required:true}],
        createdDate: {type:String, default: new Date().toLocaleDateString(), unique:true, required:true},
        presented: {type:Boolean, default:false, required:true}
    })
)



module.exports = Puzzle
