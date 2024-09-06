const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Card = mongoose.model(
    'Card',
    new Schema({
        card_id:{
            type: Number,
            required: true,
        },

        name:{
            type: String,
            required: true,
            unique:true
        },

        level:{
            type:Number,
            default:null,
            required:false
        },

        rank:{
            type:Number,
            default:null,
            required:false
        },

        pend_scale:{
            type:Number,
            default: null,
            required:false,
        },

        link_rating:{
            type:Number,
            default: null,
            required:false
        },

        link_markers:[{
            type:String,
            required:false,
            default:null
        }],

        attribute:{
            type:String,
            required:true
        },

        type:[{
            type:String,
            required:true
        }],

        race:{
            type:String,
            required:true
        },

        image:{
            type:String,
            required:true
        },
        atk:{
            type:Number,
            required:true,
            minimum:0
        },
        def:{
            type:Number,
            required:false,
            default:null,
            minimum:0
        },

        md_rarity:{
            type:String,
            required:false,
            default:'normal'
        },

        tcg_status:{
            type:String,
            required:false,
            default: 'unlimited'
        },
        ocg_status:{
            type:String,
            required:false,
            default:'unlimited'
        },
        md_status:{
            type:String,
            required:false,
            default: 'unlimited'
        },
        monster_desc:{
            type:String,
            default:''
        },
        pend_desc:{
            type:String,
            required:false,
            default:null
        },
        effect:[{type:mongoose.Schema.Types.ObjectId,
                ref:'Effect',
                required:false,
                default:null
            }]

    })
)


module.exports = Card
