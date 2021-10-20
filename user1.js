const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name: "course1"},
    {id:2, name: "course2"},
    {id:3, name: "course3"},
    {id:4, name: "course4"}
]
app.get('/', (req, res) => {
    res.send("Hi I am There...!!!");

});

/*app.get('/api/courses', (req,res) => {
res.send([ 1,2,3]);
});*/

app.get('/api/courses', (req,res) => {
    res.send(courses);
    });

app.get('/api/courses/:id',(req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id));    // Logic
        if(!course) res.status(404).send('The course with given id was not found');
        res.send(course);
    });
   //  const schema = Joi.object({
    //     name: Joi.string().min(3).required()
  //   });
    // Simple code without Joi
/*app.post('/api/courses', (req,res) => {
if(!req.body.name ||  req.body.name < 3){
    //400 bad request
    res.status(400).send('Name is required and should be minimum of 3 characters');
    return;
}
        const course = {
            id: courses.length +1,
            name: req.body.name
        };
        courses.push(course);
        res.send(course);
        });   
   */
        app.post('/api/courses', (req,res) => {
            const schema = Joi.object({
                name: Joi.string().min(3).required()
            });

            const validation = schema.validate(req.body);
               
            if(validation.error){
                res.status(400).send(validation.error.details[0].message);
                return;
            }
                    const course = {
                        id: courses.length + 1,
                        name: req.body.name
                    };
                    courses.push(course);
                    res.send(course);
         });   

         app.put('/api/courses/:id',(req,res) =>{

            //Look up the course
            //If not existing, return 404
            const course = courses.find(c => c.id === parseInt(req.params.id));    // Logic
            if(!course) {
                res.status(404).send('The course with given id was not found');
                return;  
            }      
             //validate
            //if invalid, return 400- Bad request
            const schema = Joi.object({
            name: Joi.string().min(3).required()
            });
            const validation = schema.validate(req.body);
          //  const {error} = validateCourse(req.body);//result.error
            if(validation.error){
                res.status(400).send(validation.error.details[0].message);
                //return;
            }
            //update course
            //Return the update course
            course.name = req.body.name;
            res.send(course);
         });

               app.delete('/api/courses/:id',(req,res) =>{

            // Look up the course
            //Not Existing, return 404
            const course = courses.find(c => c.id === parseInt(req.params.id));    // Logic
            if(!course) {
                res.status(404).send('The course with given id was not found');
            return;
            }
           //Delete
            const index = courses.indexOf(course);
            courses.splice(index, 1);
            //Return the same course
            res.send(course);
         });


         
/*app.get('/api/courses/:id',(req, res) => {
    res.send(req.params.id);
});*/

// Passing Multiple parameters
//app.get('/api/posts/:year/: month',(req, res) => {
 //   res.send(req.query);

//});
 //PORT.......object.it's property.property name
 const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}....`));