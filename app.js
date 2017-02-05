var express = require('express');
var app = express();

//Enable public static file access
app.use(express.static('public'))

app.listen(3234);
console.log('Running on port 3234')
