const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'employeedb',
    mutipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)                                 //if there is no error then print the message
    console.log('DB connection succeded');
    else
    console.log("DB connection failed \n error "+JSON.stringify(err,undefined, 2));

});

app.listen(3000,()=>console.log('express server is running at port no.: 3000'));
//GET all Employees
app.get('/employeeinfo',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employeeinfo',(err,rows,fields)=>{
        if(!err)
        console.log(rows[0].empid);
        else
        console.log(err);
    })
});
// Get an employee
app.get('/employeeinfo/id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employeeinfo WHERE empid= ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })

});

    // Delete an employee
app.delete('/employeeinfo/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM employeeinfo WHERE empid= ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('Deleted Successfully.');
        else
        console.log(err);
    })
});

   // insert an employee
   app.post('/employee',(req,res)=>{
       let emp = req.body;
       var sql = " SET @empid = ?; SET @ename = ?; SET @city = ?; SET @salary = ?;\
       CALL EmployeeAddOrEdit(empid,ename,deptid,city,salary);";
    mysqlConnection.query(sql, [emp.empid,emp.ename,emp.deptid,emp.city,emp.salary],(err, rows, fields)=>{
        if(!err)
        rows.forEach(element => {
            if (element.constructor == Array)
            res.send('Inserted employee id: '+element[0].empid);
        });
        else
        console.log(err);
    })
});

// update an employee
app.put('/employee',(req,res)=>{
    let emp = req.body;
    var sql = " SET @empid = ?; SET @ename = ?; SET @deptid =?; SET @city = ?; SET @salary = ?;\
    CALL EmployeeAddOrEdit(@empid,@ename,@deptid,@city,@salary);";
 mysqlConnection.query(sql,[emp.empid,emp.ename,emp.deptid,emp.city,emp.salary],(err,rows,fields)=>{
     if(!err)
         res.send(`Updated successfully`);
     else
     console.log(err);
 })
});
