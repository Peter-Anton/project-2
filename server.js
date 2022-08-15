// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express=require('express');
const app=express();
// Start up an instance of app
const bodyParser=require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors=require('cors');
app.use(cors({
    origin: '*'
}));
// Initialize the main project folder
const localhost = 3030;
app.get('/',function (req, res){
    res.send("Hello World");
})

app.get('/all',function (req, res){
    res.send(projectData);
})
app.post("/addWeather",function (req, res){
    let data=req.body;
    projectData={
        temp:data.temp,
        date:data.date,
        userResponse:data.content,
    }
    res.send(projectData);
})
// Setup Server
app.listen(localhost, () => {
    console.log(`localhost is running at port: ${localhost}`)
});