var fs = require('fs');

function f(done){
    fs.readFile('n.txt', function(err, content){
        var n = parseInt(content); //n.txt contains 42
        n++;
        done(n);
    });
}

f(function(n){
    console.log(n);
});

