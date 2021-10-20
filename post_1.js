const express = require('express');
const app = express();
//const bodyparser = require("body-parser");
//app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded ({extended: false}));
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
app.listen(9000,()=>console.log('express server is running at port no.: 9000'));
app.get('/', (req,res) => {
    res.send ({
        msg:'Hello',
        user:{}
    });
});
app.post('/', (req, res) => {
    //console.log (req.body);
    const user = req.body;
    users.push(user);
    res.status (201).send('created user');

});

app.post('/posts', (req, res) => {
    console.log (req.headers);
    
});
app.get('/posts', (req, res) => {
    console.log (req.query);
   

});
