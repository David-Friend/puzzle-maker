const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models')

app.use(cors())
db.mongoose
  .connect(`mongodb://localhost:27017/yugidoku_db`)

  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// parse requests of content-type - application/json
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.listen(8080, () => {
    console.log('server listening on port 8080')
})

require('./routes/card.routes')(app)
require('./routes/puzzle.routes')(app)
