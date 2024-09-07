const db = require("../models");
Puzzle = db.puzzle

function postBoard(req,res){
    const board = req.body

    const newPuzzle = new Puzzle({
        rows:board.rows,
        columns:board.columns,
        createdDate: board.createdDate
    })
    try{
        newPuzzle.save()
    }
    catch(err){
        console.error(err)
    }
    res.send({message:'submitted'})
}


function duplicateCheck(req,res){
    const data=req.body
    Puzzle.findOne({$and: [data.rows,data.columns]})
    .then((puzzle)=>{
        if(puzzle){
            res.send(JSON.stringify({date:'0'}))
        }
        else{
            res.send(JSON.stringify({date:puzzle.createdDate}))
        }
    })
}





module.exports = function(app) {
    app.use('/api',function(req, res) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
    });

    app.post('/makepuzzle',(req,res)=>postBoard(req,res))
    app.post('/checkduplicate', (req,res)=>duplicateCheck(req,res))


}

