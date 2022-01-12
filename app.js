const PORT=8000;
const express= require('express');
const axios=require('axios');
const cheerio=require('cheerio')

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
            const band=$(this).text().trim();
            console.log(band);
            bands.push({
                band
            })
        });
        res.json(bands)
    }).catch((err)=>console.log(err))
    
})

app.listen(PORT,()=>console.log(`server running in port ${PORT}`))