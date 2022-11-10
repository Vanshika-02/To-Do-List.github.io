const express = require("express");
const bodyparser = require("body-parser");
const date=require(__dirname+"/date.js");


let items = ["Wakeup", "break-fast", "code"];
let workitems = [];
const app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

let day=date.getDate();
  res.render("list", {
    listtitle: day,
    newlistitem: items
  })

})
app.get("/work", function(req, res) {
  res.render("list", {
    listtitle: "work list",
    newlistitem: workitems
  })
})
app.get("/about",function(req,res){
  res.render("about");
})
app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "work") {
    workitems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

})

app.post("/work", function(req, res) {
  let workitem = req.body.newItem;
  workitems.push(workitem);
  res.redirect("/work")
})
app.post("/about",function(req,res){
res.send("something")
})


app.listen(3000, function(req, res) {
  console.log("my server is starte at port 3000");
})
