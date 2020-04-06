var express = require("express");
var indexRouter = require('./routes/index');

var app = express();
var shutdown; 

// Set the routes
app.use('/hud/api', indexRouter);

app.listen(3000, () => {
 console.log("Server running on port 3000");
 shutdown = app.close:
});

module.exports = app;
