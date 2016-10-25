var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    _renders(res);
});

router.post('/', function(req, res, next){
    console.log('print');
    console.log(req.body);
    _renders(res);
});

var _renders = function(res) {
    var years = [];    
    var init = 1955;
    for(var i = init; i < init + 50 ;  i++)
        years.push(i);
    res.render('index', 
    { 
        title: 'Homework',
        years: years
    });
}


module.exports = router;
