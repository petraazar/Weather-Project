const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended : true }));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html")
   
})

app.post("/",function(req,res){
const query = req.body.cityName;
const apiKey = "12901296310205936ab0ffd8562c5cd4";
const units = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units
https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data" ,function(data){
        const weatherData = JSON.parse(data);
        const imgID = weatherData.weather[0].icon;
        const imgURL = "http://openweathermap.org/img/wn/"+imgID+"@2x.png"
        const tempreature = weatherData.main.temp;
        const Description = weatherData.weather[0].description;
        res.write(`<h1>The tempreature in ${query} is ${tempreature}  Degree Celcius</h1>`);
        res.write("<p>The weather description in "+query+" is "+Description+"<p>");
        res.write("<img src="+imgURL+">");
        res.send();
        
        
    })

    
}) 
})





 












app.listen("3000", function(){
    console.log("Server is on and listening on port 3000");
})