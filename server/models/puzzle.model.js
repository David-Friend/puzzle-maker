const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId
const today = new Date()
today.setHours(0,0,0,0)
const Puzzle = mongoose.model(
    'Puzzle',


    new Schema({
        rows:[{type:Object}],
        columns:[{type:Object, required:true}],
        createdDate: {type:Date, default: today, unique:true, required:true},
        presented: {type:Boolean, default:false, required:true}
    })
)



module.exports = Puzzle
