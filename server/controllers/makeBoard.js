const db = require("../models");
const Card = db.card
const Puzzle = db.puzzle
let usedProperties = []
let usedValues = []
const types = ['normal', 'effect', 'ritual', 'fusion', 'synchro', 'xyz', 'pendulum', 'link','tuner','spirit', 'toon', 'union', 'gemini', 'flip']

const randomStat = ()=> {return(1500 + (Math.floor(Math.random()*15)*100)*(Math.round(Math.random()) * 2 - 1))}

const card = {
attribute : [ 'fire', 'water', 'earth', 'wind', 'dark', 'light'],

type : ['normal', 'effect', 'ritual', 'fusion', 'synchro', 'xyz', 'pendulum', 'link','tuner','spirit', 'toon', 'union', 'gemini', 'flip'],

race : ['aqua', 'beast-warrior', 'beast', 'cyberse', 'dinosaur', 'dragon', 'fairy','fiend', 'fish',
        'insect', 'machine', 'plant', 'psychic', 'pyro', 'reptile','rock', 'sea-serpent', 'spellcaster',
        'illusion', 'thunder', 'warrior', 'winged-beast', 'wyrm', 'zombie'],

level : [1,2,3,4,5,6,7,8,9,10],

rank : [1,2,3,4,5,6,7,8,9,10,],

pend_scale : [1,2,3,4,5,6,7,8,9,10],

link_rating: [1,2,3,4],

link_markers: ['top-right', 'top', 'top-left', 'right', 'left', 'bottom-right', 'bottom', 'bottom-left'],

atk: [randomStat()],

def: [randomStat()],

tcg_status:['banned','semi-limited','limited','unlimited'],
/* idk if I want this in the final product, but I might in the future */
//ocg_status:['banned','semi-limited','limited','unlimited'],
md_status:['banned','semi-limited','limited','unlimited'],
md_rarity: ['normal','rare','super rare', 'ultra rare'],
}

const illegalPropertyParings = {
    attribute: ['attribute'],
    type: ['link_rating', 'link_markers','rank','pend_scale'],
    race: ['race'],
    level: ['level','rank','link_rating','link_markers', ],
    rank: ['rank','level', 'link_rating', 'link_markers', 'pend_scale', 'type'],
    pend_scale: ['pend_scale','link_rating', 'link_markers', 'type'],
    link_rating: ['link_rating','pend_scale','level','rank', 'def', 'type'],
    link_markers: ['pend_scale','level','rank', 'def', 'type','link_markers'],
    atk:['atk'],
    def: ['def', 'link_rating', 'link_markers'],
    tcg_status: ['tcg_status'],
    ocg_status: ['ocg_status'],
    md_status: ['md_status'],
    md_rarity: ['md_rarity']
}

const illegalTypeParings = {
    normal:['normal', 'effect', 'ritual', 'fusion', 'synchro', 'xyz', 'pendulum', 'link', 'spirit', 'toon', 'union', 'gemini', 'flip'],
    effect:['effect', 'normal'],
    ritual:['ritual','normal','fusion', 'synchro','xyz','link','toon','union','gemini',],
    fusion:['fusion','normal','ritual','synchro','xyz','link','toon', 'union','gemini','flip'],
    synchro:['synchro', 'normal', 'ritual', 'xyz', 'link','spirit','toon','union','gemini','flip'],
    xyz:['xyz','normal','ritual','fusion','synchro','link','tuner','spirit', 'toon', 'union', 'gemini', 'flip'],
    pendulum:['pendulum','link','toon', 'union', 'gemini'],
    link:['link','normal','ritual', 'fusion', 'synchro', 'xyz', 'pendulum', 'tuner','spirit', 'toon', 'union', 'gemini', 'flip'],
    tuner:['tuner','xyz','link','spirit', 'toon', 'gemini'],
    spirit:['spirit','normal','fusion','synchro', 'xyz', 'link', 'toon', 'union', 'gemini', 'flip'],
    toon:['toon', 'normal', 'ritual', 'fusion', 'synchro', 'xyz', 'pendulum', 'link', 'spirit', 'tuner', 'union', 'gemini', 'flip'],
    union:['union', 'normal', 'ritual', 'fusion', 'synchro', 'xyz', 'pendulum', 'link', 'spirit', 'toon',  'gemini', 'flip'],
    gemini:['gemini','normal','ritual', 'fusion', 'synchro', 'xyz', 'pendulum', 'link','tuner', 'spirit', 'toon', 'union',  'flip'],
    flip:['flip', 'normal', 'fusion', 'synchro', 'xyz', 'link', 'spirit', 'toon', 'union', 'gemini']
}

function getLegalProperty(){
    let legal  = Object.keys(card)
    for(prop of usedProperties){
        const badprops = illegalPropertyParings[prop]
        legal =legal.filter((element)=>!badprops.includes(element))
    }
    return legal
}

function getLegalType(){
    let legal = types
    for(val of usedValues){
        if(types.includes(val)){
            const badTypes = illegalTypeParings[val]
            legal = legal.filter((element)=> !badTypes.includes(element))
        }
    }
    return legal
}

function pickValue(){
    let propertyKeys
    if(usedProperties.length <3){
        propertyKeys = Object.keys(card).filter((prop)=> getLegalProperty().includes(prop))
    }
    else{
        propertyKeys = Object.keys(card).filter((prop)=> getLegalProperty().includes(prop))
    }
    console.log(propertyKeys)
    const propertyIndex = Math.floor(Math.random() * propertyKeys.length)
    const randomProperty = propertyKeys[propertyIndex]
    const cardValues = card[randomProperty]

    let randomItem
    if(randomProperty == 'type'){

        const legalTypes = getLegalType()
        randomItem = cardValues[Math.floor(Math.random() * cardValues.length)]
    }
    else if(randomProperty == 'effect'){
        //  else effect handle here
    }
    else{
        randomItem = cardValues[Math.floor(Math.random() * cardValues.length)]
    }
    usedProperties.push(randomProperty)
    usedValues.push(randomItem)
    return({property:randomProperty,value:randomItem})
}


function getBoard(){
    let labels = {rows:[], columns:[]}
    for(let j= 0; j<3; j++){
        label = pickValue()
        labels.rows.push(label)
    }
    for(let i=0; i<3; i++){
        label = pickValue()
        labels.columns.push(label)
        }
    return labels
}


exports.getValue = function(req,res){
    v=pickValue()

   res.send(v)
}

