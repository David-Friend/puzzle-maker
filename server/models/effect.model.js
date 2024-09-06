const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Effect = mongoose.model('Effect',new Schema({
    description: {
        type:String,
        required: true,
        unique:true,
    },
    effect_type:{
        type:String,
        required:true,
    }
}
))


module.exports = Effect
