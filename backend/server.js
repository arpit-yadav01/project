const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const countries = [
 { country:"India", capital:"New Delhi", states:["UP","MP","RJ","MH","GJ","PB","HR","BR","WB","TN","KA"] },
 { country:"Canada", capital:"Ottawa", states:["Ontario","Quebec","BC","Alberta","Manitoba"] },
 { country:"Japan", capital:"Tokyo", states:["Hokkaido","Honshu","Shikoku","Kyushu"] },
 { country:"France", capital:"Paris", states:["Île-de-France","Normandy","Occitanie"] },
 { country:"Germany", capital:"Berlin", states:["Bavaria","Hesse","Saxony"] },
 { country:"Mexico", capital:"Mexico City", states:["Jalisco","Puebla","Yucatan"] },
 { country:"Italy", capital:"Rome", states:["Lazio","Sicily","Tuscany"] },
 { country:"Spain", capital:"Madrid", states:["Catalonia","Andalusia","Valencia"] },
 { country:"South Africa", capital:"Pretoria", states:["Gauteng","Limpopo","Mpumalanga"] },
 { country:"Argentina", capital:"Buenos Aires", states:["Cordoba","Santa Fe","Mendoza"] }
];

function shuffle(arr){
 return arr.sort(() => Math.random() - 0.5);
}

app.get("/countries",(req,res)=>{

 let filtered = countries.filter(
  c => c.states.length <= 5
 );

 let countriesList = shuffle(
  filtered.map(c => c.country)
 );

 let capitalsList = shuffle(
  filtered.map(c => c.capital)
 );

 res.json({
  mapping: filtered,
  countries: countriesList,
  capitals: capitalsList
 });

});

app.listen(5000,()=>{
 console.log("server running");
});