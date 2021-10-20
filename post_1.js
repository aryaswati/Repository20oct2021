const express = require('express');
const app = express();
//const bodyparser = require("body-parser");
//app.use(bodyparser.json());

const users = [
    {Name: 'Madhav', Age: 18},
    {Name: 'Nayan' , Age:20},
    {Name: 'Shrein', Age:12}
];

const posts =[
    {Title:'My favourite sport'},
    {Title:'My favourite food'},
    {Title:'My favourite place'}
];
app.get('/', (req,res) => {
    req.send ({
        msg:'Hello',
        user:{}
    });
});
app.post('/', (req, res) => {
    console.log (req.body);
    res.status (201).send('created user');

});
