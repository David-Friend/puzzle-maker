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
    res.send('submitted')
}





module.exports = function(app) {
    app.use('/api',function(req, res) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
    });

    app.post('/makepuzzle',(req,res)=>postBoard(req,res))


}

