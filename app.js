// Express
const express = require("express");
const app = express();
const port = 3000;

// Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

// Date Function module
const date = require(__dirname + "/date.js");
// Public staticitem 
app.use(express.static("public"));
let items = ["Buy Food" , "Cook Food" , "Eat Food"];
let workItem = [];
// EJs
app.set("view engine", "ejs");
// 
app.get("/", (req, res) => {
  let day = date();
  res.render("list", { listTitle: day , newItems : items });
});

app.post("/" , (req,res)=>{
  let newItems = req.body.newItem;
  if(req.body.list === "work"){
    workItem.push(newItems);
    res.redirect('/work')
  }else{
    items.push(newItems);
    res.redirect('/');
  }
})

app.get('/work' , (req,res)=>{
  res.render("list" , {listTitle : "work" , newItems : workItem})
})

app.post('/work' , (req,res)=>{
  items = req.body.newItem;
  workItem.push(items);
  res.redirect('/');
})
app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
