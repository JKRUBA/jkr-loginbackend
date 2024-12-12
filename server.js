const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const SignupTemplateCopy = require("./model/SignupModel")

const app = express();

app.use(cors());
app.use(express.json());

const user = {
     email: 'user@example.com',
     password: 'password123'
}; 

app.post("/login",(request,response)=>
    {
        const jk = new SignupTemplateCopy({
        email: request.body.email,
        password: request.body.password
        }); //frontend login details
        jk.save().then(data=>
            {
              response.json(data);
              console.log('Data added successfully')
            }
            ).catch(error=>
            {
                response.json(error);
            }
            )
    
        //check if email matches the hardcoded email
    
        if(jk.email!=user.email||jk.password!=user.password)
            {
                return response.status(401).json({message: 'Invalid email or password'});

            }  
       //If password and email match, create jwt token

       const token = jwt.sign({email: user.email},'your_secret_key',{expiresIn:'1h'});
        //send token back in response
        response.json({token}); //login.js

    })

    
   
if(mongoose.connect('mongodb+srv://JkRDwaraka0608:JkRDwaraka0608@cluster0.z0bxu.mongodb.net/loginpage?retryWrites=true&w=majority&appName=Cluster0'))
{
    console.log('Database is connected');
}
   

app.listen(5000,()=>
{
    console.log('Server is running')
})