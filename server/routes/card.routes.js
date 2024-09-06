const make = require('../controllers/makeBoard')
const validate = require('../controllers/validate')
module.exports = function(app) {
    app.use('/api',function(req, res) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
    });



app.get('/randomize',(req,res)=>make.getValue(req,res))
app.get('/validate/:rowProp/:rowVal/:columnProp/:columnVal',(req,res)=>validate.validate(req,res))




}
