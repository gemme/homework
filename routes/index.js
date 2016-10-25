var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    _renders(req, res);
});

router.post('/', function(req, res, next){
    console.log('print');
    console.log(req.body);
    _renders(req, res);    
});

var _renders = function(req,res) {
    var currAge = req.body['current_age'];
    var retireAge = req.body['retirement_age'];
    var annualReturn = req.body['annual_return'];
    var presentValue = req.body['present_value'];
    var annualPayment = parseInt(req.body['annual_payment']);
    var initialAnnualPayment = annualPayment;
    var numberAnnualPayments = req.body['number_annual_payments'];
    var values = [0,1,2,3,4,5,6,7];
    if(currAge && 
            retireAge && 
                presentValue &&
                    annualPayment &&
                        numberAnnualPayments) {
        var range = retireAge - currAge;        
        for(var x = 0 ; x < values.length ; x++ )
            values[x] = new Array(range);
        var years = 0, ages= 1, pValue = 2, aPayment = 3,
            cumulativePayments = 4, interest=5, cumulativeInterest = 6, balance = 7;
        for(var i = 1 ; i <= range ; i++ ){
            //years
            values[years][i]=i;
            //ages
            values[ages][i]=parseInt(currAge) + i;
            //payment value
            values[pValue][i]=presentValue;
            // annual payment
            values[aPayment][i]=(i <= numberAnnualPayments)?annualPayment:0;
            //cumulative payment and balance
            if(i===1) {
                values[cumulativePayments][i] = annualPayment + initialAnnualPayment;
                values[balance][i-1] = initialAnnualPayment;                
            } else {     
                //cumulative payments    
                values[cumulativePayments][i] = 0;
                values[cumulativePayments][i] = values[cumulativePayments][i-1] + values[aPayment][i];                
            }
            //interest
            values[interest][i] = values[balance][i-1] * parseFloat(values[pValue][i]/100);           
            //cumulativeInterest
            values[cumulativeInterest][i] = (i===1)
                                            ? values[interest][i]
                                            : values[cumulativeInterest][i-1] + values[interest][i];         
            //balance
            values[balance][i] = values[cumulativeInterest][i] + values[cumulativePayments][i];
            console.log('balance');
            console.log(values[cumulativeInterest][i]);
            console.log(values[cumulativePayments][i]);
            console.log(values[cumulativeInterest][i]+values[cumulativePayments][i]);
        }
    } else {
            console.log('not all fields are filled out');
    }
    res.render('index', {
        title: 'homework',
        values: values
    });        
}


module.exports = router;
