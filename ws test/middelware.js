var express = require('express');

//a middleware delimiter component
function delimiter(request, response, next){
    console.log("-----------------");
    // next();
}

//a middleware logger component
function logger(request, response, next) {
    console.log('%s\t%s\t%s', new Date(), request.method, request.url);
    // next(); //control shifts to next middleware function
}

var app = express();
app.use(logger); //register middleware component
app.use(delimiter);
app.listen(3001);
