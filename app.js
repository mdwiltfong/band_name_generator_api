const PORT=8000;
const express= require('express');
const axios=require('axios');
const cheerio=require('cheerio');
const { next } = require('cheerio/lib/api/traversing');

const app=express();
const bands=[]
app.get('/',(req,res,next)=>{
    res.json('Welcome to the band generator app!');
})


app.get('/rockhall',(req,res,next)=>{
    axios.get('https://spinditty.com/learning/cool-band-name-ideas')
    .then((resp)=>{
        const html=resp.data;
        const $ = cheerio.load(html);

        $('td:first-child',html).each(function (){
            const bandName=$(this).text().trim();
            bands.push({
                bandName
            })
        });
        const lg=bands.length;
        res.json(bands[Math.floor(Math.random()*lg)])
    }).catch((err)=>console.log(err))
    
})

const adjectives = ["Lilac", "Scary", "Enormous", "Blind", "Hopeful", "Warped", "Vintage", "Great", "Terrible", "Dental"]
const nouns = ["Octopi", "Happiness", "Shrubbery", "Bracelets", "Code", "Soap", "Cans", "Messages", "Lighter", "Bass"]
function GenerateBandName() {

    function randomAjective() {
      return adjectives[(Math.floor(Math.random() * adjectives.length))]
  
  }
  
  function randomNoun() {
      return nouns[(Math.floor(Math.random() * nouns.length))]
  
  }
      return `Hey, we should call the band The ${randomAjective() +  ' ' + randomNoun()}.`
  }
  

app.get('/random',(req,res,next)=>{
    res.json({
        bandName:GenerateBandName()
    })
})

app.listen(PORT,()=>console.log(`server running in port ${PORT}`))