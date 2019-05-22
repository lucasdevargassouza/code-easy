const express = require("express");

app = express();

/* app.get('/', function (req, res) { 
  res.send(); 
  
}); */
app.use(express.static('./app/index'))
//app.get('/', express.static(__dirname + '/app/index'))
app.listen(3000);
