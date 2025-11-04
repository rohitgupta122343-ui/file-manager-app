
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get("/",(req,res)=>{

    fs.readdir('./file',(err,files)=>{

        res.render("index",{files})

    })    
})

app.post("/create",(req,res)=>{

    console.log(req.body);
    
    
    fs.writeFile(`./file/${req.body.title.split(" ").join("")}.txt`,`${req.body.content}`,(err)=>{
        if(err) return res.send(err)
        res.redirect("/");   
    })

})

app.get("/read/:filename",(req,res)=>{

    fs.readFile(`./file/${req.params.filename}`,"utf-8",(err,filedata)=>{
        
        res.render("read",{filename:req.params.filename,content:filedata});
    })

    
})

app.get("/edit/:filename",(req,res)=>{

    fs.readFile(`./file/${req.params.filename}`,(err,filedata)=>{
        res.render("edit",{filename:req.params.filename})
    })
})

app.post("/update/:filename",(req,res)=>{

    fs.rename(`./file/${req.params.filename}`,`./file/${req.body.new}`,(err)=>{
        if(err) return res.send(err);
        res.redirect("/");
    })
})

app.listen(3000)