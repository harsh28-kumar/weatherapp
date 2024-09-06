const express = require('express');
const app = express();
const PORT = 8000;
const path = require('path');
const hbs = require('hbs');
const request = require('requests');

const staticPath = path.join(__dirname, '../public');
const dynamicPath = path.join(__dirname, '../templets/views');
const partialsPath = path.join(__dirname, '../templets/partials');

app.use(express.static(staticPath));

app.set("views", dynamicPath);

app.set("view engine", 'hbs');

hbs.registerPartials(partialsPath);

app.get('/', (req, res)=>{
    var temp='kuldeep';
    const cityname = req.query.cityname;
    if(cityname){
    const api = `https://api.openweathermap.org/data/2.5/weather?q=pune&appid=dbd8ccb09e8a88fe3a1a297ffd32f122`
    
    console.log(api);
    request(api).on('data', (chunk)=>{
        const objData = JSON.parse(chunk);
            console.log(objData);
            temp = Math.round((objData.main).temp-271.15);
            console.log(temp);
            res.render('home', {
                tempval:temp,
                tempcity:cityname,
            });
    });
    }else{
        res.render('404');
    }
});


app.listen(8000, ()=>{
    console.log(`listeing at port ${PORT}`);
    console.log(`http://localhost:${PORT}/?cityname=Bhilai`);
});