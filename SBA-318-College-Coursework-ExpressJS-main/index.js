const Joi = require('joi'); //input validator module
const express = require('express') //LOAD THE EXPRESS MODULE
const app = express(); //APPLICATION
const port = 3000; 
const courses = require('./data/collegecourses');
const collegeCourses = require('./data/collegecourses');

const connectDB = require('./data/db')
const itemModel = require('./data/models/item.js')

// mongodb+srv://rockellegardner:<password>@sba319.byijayw.mongodb.net/?retryWrites=true&w=majority&appName=SBA319

connectDB()
itemModel()


// PARSER
app.use(express.json());


// HTTP METHODS
app.get('/', (req,res)=> { 
    res.send('SBA EXPRESS COLLEGE COURSE DEMO'); 
});

// ALL COURSES END POINT
app.get('/api/collegecourses', (req, res) => {
    // console.log(collegeCourses)
    try {
        res.json(collegeCourses); // Respond with JSON data of all college courses
    } catch (error) {
        console.error('Error fetching college courses:', error);
        res.status(500).send('Internal Server Error'); // If error occurs, return 500 status
    }
});

// GET A SINGLE COURSE 
app.get('/api/collegecourses/:id', (req, res, next) => {
    try {
        // console.log(req.params.id)
        const collegeCourse = collegeCourses.find(collegeCourse => collegeCourse.id == req.params.id);
    //    console.log(`final id`, collegeCourse)
        if(!collegeCourse) throw Error
       res.status(200).json(collegeCourse)
    } catch (error) {
        res.status(400).json({error: `Course ID not found`})
    }
});



// POST=========================================
// app.post()
app.post('/api/collegecourses/:id', (req,res)=>{ 
    const course = { 
        id : courses.length + 1, 
        name: req.body.name,
        department: req.body.department, 
        professor: req.body.professor, 
        credits: req.body.credits, 
        description: req.body.description
    }; 
    collegeCourses.push(course);
    res.send(course);
});

// app.put()
app.put('/api/collegecourses/:id', (req,res)=> { 
    try {
        // console.log(req.params.id)
        const collegeCourse = collegeCourses.find(collegeCourse => collegeCourse.id == req.params.id);
    //    console.log(`final id`, collegeCourse)
        if(!collegeCourse) throw Error
       res.status(200).json(collegeCourse)
    } catch (error) {
        res.status(400).json({error: `Course ID not found`})

        const schema = { 
            name: Joi.string()
        }
        const result = Joi.validate(req.body, schema); 
        if (result.error){  
            res.status(404).send(result.error); 
            return
        }
        collegeCourse.name= req.body.name; 
        res.send(collegeCourse);
    } 
})

function validateCourse(collegeCourse){ 
    const schema = { 
        name: Joi.string()
    }
    return Joi.validate(collegeCourse,schema);
}

// app.delete()
app.delete('/api/collegecourses/:id', (req,res)=> { 
    try {
        // console.log(req.params.id)
        console.log(`college course:`,collegeCourse)
        console.log(`college courses:`, collegeCourses)
        const collegeCourse = collegeCourses.find(collegeCourse => collegeCourse.id == req.params.id);
    //    console.log(`final id`, collegeCourse)
        if(!collegeCourse)res.status(404).send(`The course with the given ID is not found`)
    } catch (error) {
        res.status(400).json({error: `Course ID not found`})
        const index = collegeCourses.indexOf(collegeCourses); 
        collegeCourses.splice(index,1); 

        res.send(collegeCourses); 
    }

})
app.listen(port, ()=>{ 
    console.log(`server is running on port ${port}`)
});