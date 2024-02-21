import express from 'express'
import bodyParser from "body-parser"
import { localsName } from 'ejs';

const app = express();
const port = process.env.PORT || 3000; // SERVER would itself take a port number or my num.
var title = [];
var content = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})
app.get('/',(req,res)=>{
    res.render("home.ejs")
})
app.get("/postCreation",(req,res)=>{
    res.render("postCreation.ejs");
})

app.get("/postUpdation",(req,res)=>{
    res.render("postUpdation.ejs");
})

app.get("/postDeletion",(req,res)=>{
    res.render("postDeletion.ejs");
})
app.post('/',(req,res)=>{
    title.push(req.body['title']);
    content.push(req.body['content']);
    const data = {
        title,
        content,
        updatedTitle:(req.body['updatedTitle']),
        updatedContent:(req.body['updatedContent']),
        deleteTitle:(req.body['deleteTitle']),
        deleteAll:(req.body['deleteAll'])
    }
    if (data.deleteAll==='on') {
        title=[];
        content=[];
        res.render("home.ejs",data);
    }
    else{
         res.render("home.ejs",data);
    }
})