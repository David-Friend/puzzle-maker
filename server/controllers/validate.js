const db = require("../models");
const Card = db.card


exports.validate = function(req,res){
    const request =req.params
    const query1 = {}
    const query2 = {}
    let solutions =0
    query1[request.rowProp] = request.rowVal
    query2[request.columnProp]=request.columnVal
    Card.find({$and: [query1,query2]})
    .then((cards)=>{
        if(cards.length!=0){
            solutions=cards.length
        }
        res.send(JSON.stringify(solutions))
    })
}
