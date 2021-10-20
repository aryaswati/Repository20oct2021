const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name: 'courses1'},
    {id:2, name: 'courses2'},
    {id:3, name: 'courses3'}
]

// get api
app.get('/',(req,res) =>{
    res.send("Hello world");
});
app.get('/api/courses',(req,res) =>{
    res.send(courses);

});


// search get api
 app.get('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
     if (!course){ 
     res.status(404).send('The courses with the given id was not found')
     }
     else { res.send(course)};
 });

    

  // post api  
app.post('/api/courses',(req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
     });
   const validation = schema.validate(req.body);
   if(validation.error){
       res.status(400).send(validation.error.details[0].message);
       //return;
   }
    
   const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


//Put api
app.put('/api/courses/:id',(req,res) =>{
    //find the id
const course = courses.find(c => c.id === parseInt(req.params.id));
     if (!course){ 
     res.status(404).send('The courses with the given id was not found')
     return;
    }
     //validation
     const schema = Joi.object({
       name: Joi.string().min(3).required()
      });
     const validation = schema.validate(req.body);
   if(validation.error){
       res.status(400).send(validation.error.details[0].message);
       return;
   }
   //update course
   course.name = req.body.name;
   res.send(course);  
})


//Delete Api
app.delete('/api/courses/:id', (req,res) =>{
  //first look up the id
  const course = courses.find(c => c.id === parseInt(req.params.id));
     if (!course){ 
     res.status(404).send('The courses with the given id was not found');
    return; 
   }
  
     const index = courses.indexOf(course);
     courses.splice(index, 1);
     res.send(course);

})
port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}...`));