const db = require("../models");
const Card = db.card


exports.validate = function(req,res){
    const request =req.params
    const query = {}
    let solutions =0
    query[request.rowProp] = request.rowVal
    query[request.columnProp]=request.columnVal
    Card.find({$and: [query]})
    .then((cards)=>{
        if(cards.length!=0){
            solutions=cards.length
        }
        res.send(JSON.stringify(solutions))
    })
}
